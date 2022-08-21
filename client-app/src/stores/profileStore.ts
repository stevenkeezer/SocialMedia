import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../app/api/agents";
import { Photo, Profile, UserActivity } from "../app/models/profile";
import { store } from "./store";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile: boolean = false;
  uploading: boolean = false;
  loading: boolean = false;
  followings: Profile[] = [];
  loadingFollowings: boolean = false;
  activeTab = 0;
  userActivities: UserActivity[] = [];
  loadingUserActivities = false;
  activitiesCount = {};

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.activeTab,
      (activeTab) => {
        if (activeTab === 1) {
          // const predicate = activeTab === 3 ? "followers" : "following";
          // this.loadFollowings(predicate);
        } else {
          this.followings = [];
        }
      }
    );
  }

  clearUserActivities = () => {
    this.userActivities = [];
  };

  setActiveTab = (activeTab: number) => {
    this.activeTab = activeTab;
  };

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.username === this.profile.username;
    }
    return false;
  }

  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);

      runInAction(() => {
        this.profile = profile;
        this.profile.createdAt = new Date(profile.createdAt);
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingProfile = false;
      });
    }
  };

  uploadPhoto = async (file: Blob) => {
    this.uploading = true;

    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
        this.uploading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.uploading = false;
      });
    }
  };

  setMainPhoto = async (photo: Photo | any) => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);

      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find((p) => p.isMain)!.isMain = false;
          this.profile.photos.find((p) => p.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
          this.loading = false;
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deletePhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos?.filter(
            (p) => p.id !== photo.id
          );
          this.loading = false;
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateFollowing = async (username: string, following: boolean) => {
    this.loading = true;
    try {
      await agent.Profiles.updateFollowing(username);
      store.activityStore.updateAttendeeFollowing(username);
      runInAction(() => {
        if (
          this.profile &&
          this.profile.username !== store.userStore.user?.username &&
          this.profile.username === username
        ) {
          following
            ? this.profile.followersCount++
            : this.profile.followersCount--;
          this.profile.following = !this.profile.following;
        }

        if (
          this.profile &&
          this.profile.username === store.userStore.user?.username
        ) {
          following
            ? this.profile.followingCount++
            : this.profile.followingCount--;
        }

        this.followings.forEach((profile) => {
          if (profile.username === username) {
            profile.following
              ? profile.followersCount--
              : profile.followersCount++;
            profile.following = !profile.following;
          }
        });
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  loadFollowings = async (username: string, predicate: string) => {
    this.loadingFollowings = true;
    try {
      const followings = await agent.Profiles.listFollowings(
        username,
        predicate
      );

      runInAction(() => {
        this.followings = followings;
        this.loadingFollowings = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingFollowings = false;
      });
    }
  };

  loadUserActivitiesCount = async (username) => {
    try {
      const pastActivities = await agent.Profiles.listActivities(
        username,
        "past"
      );
      const upcomingActivities = await agent.Profiles.listActivities(
        username,
        "upcoming"
      );
      const allActivities = await agent.Profiles.listActivities(
        username,
        "all"
      );

      runInAction(() => {
        this.activitiesCount["past"] = pastActivities.length;
        this.activitiesCount["upcoming"] = upcomingActivities.length;
        this.activitiesCount["all"] = allActivities.length;

        this.loadingUserActivities = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingUserActivities = false;
      });
    }
  };

  loadUserActivities = async (username: string, predicate?: string) => {
    this.loadingUserActivities = true;

    try {
      const activities = await agent.Profiles.listActivities(
        username,
        predicate
      );
      runInAction(() => {
        this.userActivities = activities;
        this.loadingUserActivities = false;
      });
      return activities;
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingUserActivities = false;
      });
    }
  };
}
