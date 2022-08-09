import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../app/api/agents";
import {
  Activity,
  ActivityFormValues,
} from "../app/components/activities/Activity";
import { format } from "date-fns";
import { store } from "./store";
import { ActivityPhoto, Profile } from "../app/models/profile";
import { Pagination, PagingParams } from "../app/models/pagination";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  uploadingPhoto = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set("all", true);
  loadingMainActivityPhoto = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.activityRegistry.clear();
        this.loadActivities();
      }
    );
  }

  setPagingParams = (params: PagingParams) => {
    this.pagingParams = params;
  };

  setPredicate = (predicate: string, value: string | Date) => {
    this.setLoadingInitial(true);
    const resetPredicate = () => {
      this.predicate.forEach((value, key) => {
        this.predicate.delete(key);
      });
    };

    switch (predicate) {
      case "all":
        resetPredicate();
        this.predicate.set("all", true);
        break;
      case "isGoing":
        resetPredicate();
        this.predicate.set("isGoing", true);
        break;
      case "isHost":
        resetPredicate();
        this.predicate.set("isHost", true);
        break;
      case "searchTerm":
        this.predicate.delete("searchTerm");
        this.predicate.set("searchTerm", value);
        break;
      case "startDate":
        this.predicate.delete("startDate");
        this.predicate.set("startDate", value);
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      if (key === "startDate") {
        params.append(key, (value as Date).toISOString());
      } else {
        params.append(key, value);
      }
    });
    return params;
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = format(activity.date, "dd MMM yyyy");
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  get activityPhotos() {
    const activityImages = this.activitiesByDate
      .filter((activity) => activity.isHost)
      .map((activity) => {
        return {
          id: activity.id,
          title: activity.title,
          photos: activity.activityPhotos,
        };
      })
      .flat();

    return activityImages;
  }

  loadActivities = async () => {
    try {
      const result = await agent.Activities.list(this.axiosParams);
      result?.data.forEach((activity) => {
        activity.mainImage = activity?.activityPhotos.find(
          (p) => p.isMainActivityPhoto
        );
        this.setActivity(activity);
      });

      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        });
        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setActivity = (activity: Activity) => {
    const user = store.userStore.user;

    if (user) {
      activity.isGoing = activity.attendees?.some(
        (a) => a.username === user.username
      );
      activity.isHost = activity.hostUsername === user.username;
      activity.host = activity.attendees?.find(
        (x) => x.username === activity.hostUsername
      );
    }

    activity.date = new Date(activity.date);

    this.activityRegistry.set(activity.id, activity);
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  setLoadingInitial = (value: boolean) => {
    this.loadingInitial = value;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    this.editMode = true;
  };

  selectAnActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
  };

  closeForm = () => {
    this.cancelSelectedActivity();
    this.editMode = false;
  };

  createActivity = async (activity: ActivityFormValues) => {
    const user = store.userStore.user;
    const attendee = new Profile(user!);

    try {
      await agent.Activities.create(activity);
      const newActivity = new Activity(activity);
      newActivity.hostUsername = user!.username;
      newActivity.attendees = [attendee];
      this.setActivity(newActivity);

      runInAction(() => {
        this.selectedActivity = newActivity;
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateActivity = async (activity: ActivityFormValues) => {
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        if (activity.id) {
          let updatedActivity = {
            ...this.getActivity(activity.id),
            ...activity,
          };
          this.activityRegistry.set(activity.id, updatedActivity as Activity);
          this.selectedActivity = updatedActivity as Activity;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;

    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity?.isGoing) {
          this.selectedActivity.attendees =
            this.selectedActivity.attendees?.filter(
              (a) => a.username !== user?.username
            );
          this.selectedActivity.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedActivity.attendees?.push(attendee);
          this.selectedActivity!.isGoing = true;
        }
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (error) {
      console.log("error");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  cancelActivityToggle = async () => {
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        this.selectedActivity!.isCancelled =
          !this.selectedActivity?.isCancelled;
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  clearSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  uploadActivityPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const response = await agent.Activities.uploadPhoto(
        file,
        this.selectedActivity!.id
      );
      const photo = response.data;

      runInAction(() => {
        if (this.selectedActivity) {
          if (!this.selectedActivity.activityPhotos) {
            this.selectedActivity.activityPhotos = [];
          }

          this.selectedActivity.activityPhotos.push(photo);
          if (!this.selectedActivity.mainImage) {
            this.selectedActivity.mainImage = photo;
          }
        }
        this.uploadingPhoto = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.uploadingPhoto = false;
      });
    }
  };

  setMainActivityPhoto = async (photo: ActivityPhoto) => {
    this.loadingMainActivityPhoto = true;
    try {
      await agent.Activities.setMainPhoto(photo.id, this.selectedActivity.id);

      runInAction(() => {
        if (this.selectedActivity && this.selectedActivity.activityPhotos) {
          this.selectedActivity.activityPhotos.find(
            (p) => p.isMainActivityPhoto
          )!.isMainActivityPhoto = false;
          this.selectedActivity.activityPhotos.find(
            (p) => p.id === photo.id
          )!.isMainActivityPhoto = true;

          this.selectedActivity.mainImage = photo;
          this.loadingMainActivityPhoto = false;
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingMainActivityPhoto = false;
      });
    }
  };

  deleteActivityPhoto = async (photo: ActivityPhoto) => {
    this.loadingMainActivityPhoto = true;
    try {
      await agent.Activities.deletePhoto(photo.id);
      runInAction(() => {
        if (this.selectedActivity) {
          this.selectedActivity.activityPhotos =
            this.selectedActivity.activityPhotos?.filter(
              (p) => p.id !== photo.id
            );
          this.loadingMainActivityPhoto = false;
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingMainActivityPhoto = false;
      });
    }
  };

  updateAttendeeFollowing = (username: string) => {
    this.activityRegistry.forEach((activity) => {
      activity.attendees.forEach((attendee) => {
        if (attendee.username === username) {
          attendee.following
            ? attendee.followersCount--
            : attendee.followersCount++;
          attendee.following = !attendee.following;
        }
      });
    });
  };
}
