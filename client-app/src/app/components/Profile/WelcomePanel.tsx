import React, { useState } from "react";
import FollowButton from "../../common/FollowButton";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import Modal from "../../common/Modal/Modal";
import { formatDistanceToNow } from "date-fns";
import PhotoModal from "../../common/Modal/PhotoModal";
import { Profile } from "../../models/profile";

interface Props {
  profile: Profile;
}

export default observer(function WelcomePanel({ profile }: Props) {
  const { profileStore, userStore, commonStore } = useStore();
  const { isCurrentUser } = profileStore;
  const { openModal, modalType } = commonStore;
  const { user } = userStore;

  const UserDetails = () => (
    <div className="sm:flex items-center sm:space-x-5">
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
        <p className="text-xl font-bold text-gray-900 dark:text-white capitalize sm:text-2xl">
          {profile?.username}
        </p>
        <p className="text-xs pt-1">
          Joined {profile?.createdAt && formatDistanceToNow(profile?.createdAt)}{" "}
          ago
        </p>
      </div>
    </div>
  );

  return (
    <section aria-labelledby="profile-overview-title">
      <div className="bg-transparent overflow-hidden">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="bg-white dark:bg-transparent px-6 pt-6 pb-0.5">
          <div className="sm:flex sm:items-center sm:justify-between">
            <UserDetails />
            <div className="mt-5 flex justify-center sm:mt-0">
              <FollowButton profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
