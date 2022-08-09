import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { useStore } from "../../stores/store";
import { Profile } from "../models/profile";

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
        className="flex justify-center items-center px-4 py-1 shadow-sm text-sm font-medium rounded-md text-white bg-[#4573d2]"
        onClick={(e) => handleFollow(e, profile?.username)}
      >
        {profile?.following ? "Following" : "Follow"}
        {loading && <span>...</span>}
      </button>
    </div>
  );
});
