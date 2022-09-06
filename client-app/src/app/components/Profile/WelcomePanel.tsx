import React, { useState } from "react";
import FollowButton from "../../common/FollowButton";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import Modal from "../../common/Modal/Modal";
import { formatDistanceToNow } from "date-fns";
import PhotoModal from "../../common/Modal/PhotoModal";
import { Profile } from "../../models/profile";
import { classNames } from "../../utils/classNames";
import styles from "../../components/Slider/styles.module.css";
import { useTheme } from "next-themes";

interface Props {
  profile: Profile;
}

export default observer(function WelcomePanel({ profile }: Props) {
  const { profileStore, userStore, commonStore } = useStore();
  const { isCurrentUser } = profileStore;
  const { openModal, modalType } = commonStore;
  const { user } = userStore;

  const { resolvedTheme } = useTheme();
  const lightMode = resolvedTheme === "light";
  const skeleton = lightMode ? styles.skeleton : styles.skeletonDark;

  const UserDetails = () => (
    <div className="items-center sm:flex sm:space-x-5">
      <div className="flex-shrink-0">
        <img
          className="mx-auto h-[3.6rem] w-[3.6rem] rounded-full cursor-pointer"
          onClick={() => {
            openModal("profile-photo");
          }}
          src={isCurrentUser ? user?.image : profile?.image}
          alt=""
        />
        {modalType === "profile-photo" && (
          <Modal title="Profile Photo">
            <PhotoModal profile={profile} />
          </Modal>
        )}
      </div>
      <div className="-mt-1 text-center sm:text-left">
        <p className="text-xl font-bold text-gray-900 capitalize dark:text-white sm:text-2xl">
          {profile?.username}
        </p>
        <p className="pt-1 text-xs">
          Joined {profile?.createdAt && formatDistanceToNow(profile?.createdAt)}{" "}
          ago
        </p>
      </div>
    </div>
  );

  const Skeleton = () => (
    <div className="p-6">
      <div className={classNames(skeleton, "h-5 ml-2.5 w-24")} />
      <div className="flex flex-col py-4 pl-12 pr-1 space-y-2">
        <div className={classNames(skeleton, "h-4 w-full")} />
        <div className={classNames(skeleton, "h-4 w-full")} />
      </div>
    </div>
  );

  return (
    <section aria-labelledby="profile-overview-title">
      <div className="overflow-hidden bg-transparent">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="bg-white dark:bg-transparent px-6 pt-6 pb-0.5">
          <div className="sm:flex sm:items-center sm:justify-between">
            <UserDetails />
            <div className="flex justify-center mt-5 sm:mt-0">
              <FollowButton profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
