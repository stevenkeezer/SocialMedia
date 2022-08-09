import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../../stores/store";
import FollowList from "./FollowList";

export default observer(function ProfileFollowings() {
  const { profileStore } = useStore();
  const { profile, followings, loadFollowings, loadingFollowings } =
    profileStore;

  // remove this when tab reaction functionality is added
  useEffect(() => {
    loadFollowings(profile?.username, "followers");
  }, [loadFollowings, profile]);

  return (
    <div className="px-4">
      {loadingFollowings && <div>loading following </div>}
      <div className="flex">
        <div className="text-xl">{profile?.displayName}'s Followers </div>
      </div>
      <div>
        {followings.length > 0 &&
          followings.map((following) => (
            <div key={following?.username}>{following?.displayName}</div>
          ))}
      </div>
      <div className="text-white">
        <div>{profile?.followersCount}</div>
      </div>
      <FollowList />
    </div>
  );
});
