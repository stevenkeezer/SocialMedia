import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../stores/store";
import { Activity } from "../../models/Activity";

interface Props {
  activity: Activity;
}

export default observer(function Attendees({ activity }: Props) {
  const {
    userStore: { user },
  } = useStore();
  return (
    <>
      {activity?.attendees?.map((attendee) => (
        <div key={attendee.username}>
          {attendee.username === activity.host?.username && (
            <div>
              {/* Host {activity.host?.username} */}
              {activity.host?.username === user.username ? (
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src={user.image}
                />
              ) : (
                <>
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src={activity.host?.image}
                  />
                  {attendee.following && <div>following</div>}
                </>
              )}
            </div>
          )}
        </div>
      ))}
      <div className="flex -space-x-2 overflow-hidden">
        {activity?.attendees?.map((attendee) => (
          <div key={attendee.username} className="flex">
            {attendee.username !== activity.host?.username && (
              <>
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src={attendee.image}
                  alt={attendee.username}
                />

                {/* <div className="ml-4">
                  <div className="text-sm">{attendee.username}</div>
                </div> */}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
});
