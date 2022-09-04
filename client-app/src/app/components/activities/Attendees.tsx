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
    <div className="pt-2 flex items-center">
      <span className="pr-2.5">Attendees</span>
      {activity?.attendees?.map((attendee) => (
        <div key={attendee.username}>
          {attendee.username === activity.host?.username && (
            <div>
              {/* Host {activity.host?.username} */}
              {activity.host?.username === user.username ? (
                <img
                  alt={activity.host?.username}
                  className="inline-block h-6 w-6 rounded-full"
                  src={user.image}
                />
              ) : (
                <>
                  <img
                    alt={activity.host?.username}
                    className="inline-block h-6 w-6 rounded-full"
                    src={activity.host?.image}
                  />
                </>
              )}
            </div>
          )}
        </div>
      ))}
      <div className="flex overflow-hidden">
        {activity?.attendees?.map((attendee) => (
          <div key={attendee.username} className="flex">
            {attendee.username !== activity.host?.username && (
              <>
                <img
                  className="inline-block h-6 w-6 ml-1 rounded-full"
                  src={attendee.image}
                  alt={attendee.username}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
