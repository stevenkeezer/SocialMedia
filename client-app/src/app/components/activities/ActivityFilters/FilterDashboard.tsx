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
import WelcomePanel from "../../Profile/WelcomePanel";
import FollowersPanel from "../../Profile/EventsList";
import FollowPanel from "../../Profile/EventsList";
import ProfileTabs from "../../Profile/ProfileTabs";
import PhotoDropzone from "../../../common/imageUpload/PhotoDropzone";
import ProfileNav from "../../Profile/ProfileNav";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  profile: Profile;
}

export default observer(function FilterDashboard() {
  const router = useRouter();
  const { profileStore } = useStore();
  const {
    loadingProfile,
    loadProfile,
    profile,
    setActiveTab,
    loadUserActivities,
    userActivities,
  } = profileStore;

  const { profile: username } = router.query;

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
  }, [loadUserActivities, profile?.username, router]);

  return (
    <article className="w-full">
      <WelcomePanel profile={profile} />
      <div className=" dark:bg-transparent max-h-screen bg-[#f9f8f8]">
        <ProfileNav />
        <div className="max-w-5xl -pt-6 mx-auto px-4 sm:px-6">
          <ActivityFilters />
          <div className="hidden  relative sm:block 2xl:hidden min-w-0 flex-1 ">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
              {loadingProfile && "Loading profile"}
            </h1>
          </div>
        </div>
      </div>
    </article>
  );
});
