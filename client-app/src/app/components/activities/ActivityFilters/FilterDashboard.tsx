import React, { SyntheticEvent, useEffect, useState } from "react";
import {
  CalendarIcon,
  CogIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  ViewGridAddIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  ChevronLeftIcon,
  FilterIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../stores/store";
import { Photo, Profile } from "../../../models/profile";
import { useRouter } from "next/router";
import PhotoUpload from "../../../common/imageUpload/PhotoUpload";
import FollowButton from "../../../common/FollowButton";
import ProfileFollowings from "../../Profile/ProfileFollowings";
import ActivityFilters from "./ActivityFilters";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  profile: Profile;
}

export default observer(function FilterDashboard() {
  const { userStore, activityStore } = useStore();
  const { closeForm, predicate, setPredicate } = activityStore;
  const { user, logout, isLoggedIn } = userStore;

  const router = useRouter();
  const { profileStore } = useStore();
  const {
    loadingProfile,
    loadProfile,
    profile,
    isCurrentUser,
    uploadPhoto,
    uploading,
    loading,
    deletePhoto,
    setMainPhoto,
    setActiveTab,
    loadUserActivities,
    userActivities,
  } = profileStore;

  const { profile: username } = router.query;

  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  }

  function handleSetMainPhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  function handleDeletePhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  useEffect(() => {
    if (username) {
      loadProfile(username as string);
    }
    return () => {
      setActiveTab(0);
    };
  }, [loadProfile, username, setActiveTab]);

  useEffect(() => {
    loadUserActivities(profile?.username, "hosting"); // also past default is upcoming events
  }, [loadUserActivities, profile]);

  return (
    <article className="pt-4">
      {/* Profile header */}
      <div>
        <div className="h-20 w-full object-cover">
          {/* <img
            className="h-32 w-full object-cover lg:h-48"
            src={profile.coverImageUrl}
            alt=""
          /> */}
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <img
                className="h-24 w-24 rounded-full ring-4 ring-white "
                src={profile?.image}
                alt=""
              />
            </div>
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {loadingProfile ? "Loading profile" : profile?.displayName}
                </h1>
              </div>
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <MailIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Message</span>
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <PhoneIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Call</span>
                </button>
              </div>
            </div>
          </div>
          <button onClick={() => setPredicate("all", "true")}>All</button>
          <br />
          <button onClick={() => setPredicate("isGoing", "true")}>
            is Going
          </button>
          <br />
          <input
            onChange={(e) => setPredicate("searchTerm", e.target.value)}
          ></input>

          <button onClick={() => setPredicate("isHost", "true")}>
            Is Hosting
          </button>
          <ActivityFilters />
          <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
              {loadingProfile ? "Loading profile" : profile?.displayName}
            </h1>
            <div className="text-white">
              <div>followers {profile?.followersCount}</div>
              <div>following {profile?.followingCount}</div>
            </div>
            <FollowButton profile={profile} />
            <ProfileFollowings />
            <div className="flex space-x-3 border p-4">
              {profile?.photos.map((photo) => {
                return (
                  <>
                    <img
                      className="h-24 w-24ring-4 ring-white "
                      src={photo.url}
                      alt=""
                    />
                    {isCurrentUser && (
                      <button
                        onClick={(e) => handleSetMainPhoto(photo, e)}
                        disabled={photo.isMain}
                        name={"main" + photo.id}
                      >
                        Make default{" "}
                        {target === "main" + photo.id && loading && (
                          <span>loading</span>
                        )}
                      </button>
                    )}
                    <button
                      name={photo.id}
                      disabled={photo.isMain}
                      onClick={(e) => handleDeletePhoto(photo, e)}
                    >
                      Delete{" "}
                      {target === photo.id && loading && <span>loading</span>}
                    </button>
                  </>
                );
              })}
            </div>
            {isCurrentUser && !loadingProfile && (
              <>
                <button onClick={() => setAddPhotoMode(!addPhotoMode)}>
                  {addPhotoMode ? "Cancel" : "Add Photo"}
                </button>
                {addPhotoMode && (
                  <PhotoUpload
                    uploadPhoto={handlePhotoUpload}
                    loading={uploading}
                  />
                )}
              </>
            )}
            <br />
            Users events
            {userActivities.length > 0 &&
              userActivities.map((activity) => (
                <div key={activity.id}>
                  <div className="flex justify-between">
                    {activity.title} aaa
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </article>
  );
});
