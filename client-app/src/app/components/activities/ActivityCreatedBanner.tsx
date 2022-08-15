import React from "react";
import CommentLayout from "../comment/CommentLayout";

export default function ActivityCreatedBanner({ activity }) {
  return (
    <div className="pt-3">
      <CommentLayout
        avatar={activity.host.image}
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
}
