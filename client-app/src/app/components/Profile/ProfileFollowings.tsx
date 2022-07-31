import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../../stores/store";

export default observer(function ProfileFollowings() {
  const { profileStore } = useStore();
  const { profile, followings, loadFollowings, loadingFollowings } =
    profileStore;

  // remove this when tab reaction functionality is added
  useEffect(() => {
    loadFollowings(profile?.username, "following");
  }, [loadFollowings, profile]);

  return (
    <div>
      <br />
      {loadingFollowings && <div>loading following </div>}
      <div className="flex">
        People <div> {profile?.displayName} </div> following
      </div>
      <div>
        {followings.length > 0 &&
          followings.map((following) => (
            <div key={following?.username}>{following?.displayName}</div>
          ))}
      </div>
    </div>
  );
});
