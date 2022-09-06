import { CheckIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import { useTheme } from "next-themes";
import React from "react";
import { useStore } from "../../../stores/store";
import Spinner from "../../common/Spinner";
import { Activity } from "../../models/Activity";
import { classNames } from "../../utils/classNames";
import styles from "../../components/Slider/styles.module.css";

interface Props {
  activity: Activity;
}

export default observer(function AttendeesToolbar({ activity }: Props) {
  const { activityStore } = useStore();
  const {
    updateAttendance,
    cancelActivityToggle,
    loading,
    loadingActivity,
    settingActivity,
  } = activityStore;

  const { resolvedTheme } = useTheme();
  const skeleton =
    resolvedTheme === "light" ? styles.skeleton : styles.skeletonDark;

  const successBtn =
    "bg-[#e6f8f1] border-[#8dc2ac] text-[#0d7f56] hover:bg-[#e0f4ec] hover:border-[#58a182] hover:text-[#12714d] dark:bg-[#1d3733] dark:border-[#32695d] dark:text-[#66a88b] dark:hover:bg-[#21433d] dark:hover:border-[#4b8a73] dark:hover:text-[#93c0aa]";
  const dangerBtn =
    "bg-[#feebec] border-[#f1a2a9] text-[#c92f54] hover:text-[#a42b45] hover:border-[#e37281] hover:bg-[#fcdadc] dark:bg-[#581e28] dark:text-[#e26d7e] dark:border-[#b12d4b] dark:hover:text-[#ec8e98] dark:hover:bg-[#64202c] dark:hover:border-[#d1395a]";

  const EventToggle = () => (
    <button
      onClick={cancelActivityToggle}
      className={classNames(
        activity?.isCancelled ? successBtn : dangerBtn,
        "border transition-color duration-200 dark:border-[#424244] text-xs rounded-md px-2 py-[.3rem]"
      )}
    >
      {loading && (
        <Spinner
          small
          color={classNames(
            activity.isCancelled
              ? "fill-[#58a182] text-white"
              : "fill-[#d33e5d] text-white"
          )}
        />
      )}
      {activity?.isCancelled ? "Re-activate event" : "Cancel event"}
    </button>
  );

  if (loadingActivity || settingActivity || !activity)
    return <div className={classNames(skeleton, "h-7 w-32 rounded")} />;
  return (
    <div className="flex items-center">
      {activity?.isHost ? (
        <EventToggle />
      ) : activity?.isGoing ? (
        <button
          onClick={updateAttendance}
          className="border border-gray-300 dark:border-[#424244] text-xs  rounded-md px-2 py-[.3rem]"
        >
          {loading && <Spinner small color="fill-[#58a182] text-white" />}
          Cancel attendance
        </button>
      ) : (
        <button
          onClick={updateAttendance}
          disabled={activity?.isCancelled}
          className="border border-[#edeae9] dark:border-[#565557] text-xs flex items-center rounded-md px-2 py-[.3rem]"
        >
          {loading ? (
            <Spinner small />
          ) : (
            <CheckIcon className="h-[.9rem] w-[.9rem] mr-1 text-[#6d6e6f]" />
          )}
          Join event
        </button>
      )}
    </div>
  );
});
