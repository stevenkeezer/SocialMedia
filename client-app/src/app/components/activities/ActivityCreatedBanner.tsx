import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../stores/store";
import { Activity } from "../../models/Activity";
import CommentLayout from "../Comments/CommentLayout";

interface Props {
  activity: Activity;
}

export default observer(function ActivityCreatedBanner({ activity }: Props) {
  const { userStore } = useStore();

  const image =
    activity.host.username === userStore.user.username
      ? userStore.user.image
      : activity.host.image;

  return (
    <div className="pt-3">
      <CommentLayout
        avatar={image}
        createdAt={activity?.createdAt}
        username={activity?.host?.username}
        icon={
          <>
            <div className="pl-1">created this event.</div>
          </>
        }
      />
    </div>
  );
});
