import { UserAddIcon, UserRemoveIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { useStore } from "../../stores/store";
import { Profile } from "../models/profile";
import Spinner from "./Spinner";

interface Props {
  profile: Profile;
}

export default observer(function FollowButton({ profile }: Props) {
  const { profileStore, userStore } = useStore();
  const { updateFollowing, loading } = profileStore;

  if (userStore.user?.username === profile?.username) return null;

  function handleFollow(e: SyntheticEvent, username: string) {
    e.preventDefault();
    profile?.following
      ? updateFollowing(username, false)
      : updateFollowing(username, true);
  }

  return (
    <div>
      <button
        className="flex justify-center items-center px-3 py-1 shadow-sm text-sm font-semibold rounded-md text-white bg-[#4573d2]"
        onClick={(e) => handleFollow(e, profile?.username)}
      >
        {loading && <Spinner small />}
        {profile?.following && !loading && (
          <UserRemoveIcon className="w-3.5 h-3.5 mr-1.5" />
        )}
        {!profile?.following && !loading && (
          <UserAddIcon className="w-3.5 h-3.5 mr-1.5" />
        )}
        {profile?.following ? "Following" : "Follow"}
      </button>
    </div>
  );
});
