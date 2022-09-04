import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../../stores/store";
import Spinner from "../../common/Spinner";
import FollowList from "./FollowList";

export default observer(function ProfileFollowings() {
  const { profileStore } = useStore();
  const { profile, followings, loadFollowings, loadingFollowings } =
    profileStore;

  useEffect(() => {
    loadFollowings(profile?.username, "followers");
  }, [loadFollowings, profile]);

  if (loadingFollowings)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  return (
    <div>
      {loadingFollowings && <div>loading following </div>}
      <div className="flex px-4 items-center space-x-2 pb-6">
        <div className="text-xl">{profile?.displayName}'s Followers </div>
        <div className="bg-white text-gray-500 flex items-center text-sm justify-center px-2 py-0.5 rounded-full">
          {profile?.followersCount}
        </div>
      </div>
      <div className="pr-4">
        {followings.length > 0 && <FollowList followings={followings} />}
      </div>
    </div>
  );
});
