import { CalendarIcon, XCircleIcon } from "@heroicons/react/solid";
import { observer } from "mobx-react-lite";
import React from "react";
import { Activity } from "../../models/Activity";
import SliderBanner from "./SliderBanner";

interface Props {
  activity: Activity;
}

export default observer(function SliderBanners({ activity }: Props) {
  function capitalizeFirstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  return (
    <div>
      {activity?.isCancelled ? (
        <SliderBanner
          icon={<XCircleIcon className="h-4 w-4 mr-2 text-[#6d6e6f]" />}
          text={`${
            activity?.isHost
              ? "You have"
              : capitalizeFirstLetter(activity?.host?.username) + " has"
          } cancelled this event.`}
        />
      ) : (
        !activity?.isHost && (
          <SliderBanner
            icon={<CalendarIcon className="h-4 w-4 mr-2 text-[#6d6e6f]" />}
            text={`${capitalizeFirstLetter(
              activity?.host?.username
            )} is hosting this event.`}
          />
        )
      )}
      {activity?.isHost && !activity?.isCancelled && (
        <SliderBanner
          icon={<CalendarIcon className="h-4 w-4 mr-2 text-[#6d6e6f]" />}
          text="You are hosting this event."
        />
      )}
    </div>
  );
});
