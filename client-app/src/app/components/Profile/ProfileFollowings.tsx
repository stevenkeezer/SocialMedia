import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../../stores/store";
import Spinner from "../../common/Spinner";
import Tabs from "../../common/Tabs/Tabs";
import FollowersEmpty from "./EmptyState/FollowersEmpty";
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
      <div className="flex items-baseline justify-between">
        <div className="flex items-center px-4 pb-4 space-x-2">
          <div className="text-xl font-semibold">
            {profile?.displayName}'s Followers{" "}
          </div>

          <div className="dark:bg-white bg-gray-200 text-gray-500 flex items-center text-sm justify-center px-2 py-0.5 rounded-full">
            {profile?.followersCount}
          </div>
        </div>
        <div className="px-4 space-x-3">
          <button
            className="px-4 py-1 text-sm text-white bg-gray-500 rounded-lg "
            onClick={() => {
              loadFollowings(profile?.username, "followers");
            }}
          >
            Followers
          </button>
          <button
            className="px-4 py-1 text-sm text-white bg-gray-500 rounded-lg "
            onClick={() => {
              loadFollowings(profile?.username, "followering");
            }}
          >
            Following
          </button>
        </div>
      </div>

      <div className="pr-4">
        {followings.length > 0 && <FollowList followings={followings} />}
      </div>
    </div>
  );
});
