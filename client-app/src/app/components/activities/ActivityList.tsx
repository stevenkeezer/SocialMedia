import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useStore } from "../../../stores/store";
import { format } from "date-fns";
import {
  CheckCircleIcon,
  CheckIcon,
  ChevronRightIcon,
  MailIcon,
} from "@heroicons/react/outline";
import { Field, Form, Formik, useField, useFormikContext } from "formik";
import TextInput from "../../common/TextInput";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { Activity } from "./Activity";
import { v4 as uuid } from "uuid";
import TextArea from "../../common/TextArea";
import ActivityInput from "./details/ActivityInput";

export default observer(function ActivityList({
  activity,
  index,
  lastIndex,
}: any) {
  const {
    activityStore,
    userStore: { user },
  } = useStore();
  const { loading, selectAnActivity, openForm, closeForm } = activityStore;

  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const activityClickHandler = (event, arg, activityId) => {
    if (arg === "profile") {
      closeForm();
      setTimeout(() => {
        router.push({
          pathname: `/list/${activityId}`,
          query: { profile: activity.hostUsername },
        });
      }, 400);
    }

    if (arg === "activityContainer") {
      openForm();

      if (!id) {
        setTimeout(() => {
          router.push(`/list/${activityId}`, "", {
            shallow: true,
            scroll: false,
          });
          selectAnActivity(activityId as string);
        }, 400);
      } else {
        router.push(`/list/${activityId}`, "", {
          shallow: true,
          scroll: false,
        });
        selectAnActivity(activityId as string);
      }
    }
  };

  return (
    <li
      key={activity.id + index + activity.title}
      onClick={(e) => {
        activityClickHandler(e, "activityContainer", activity.id);
      }}
    >
      <div className="relative px-6 py-4 flex items-center bg-transparent dark:border-[#252628]  space-x-3  border-white active:border-blue-400 focus:border-blue-400 dark:active:border-blue-400 dark:focus:border-blue-400 hover:bg-gray-50 dark:hover:bg-[#2a2b2d] border-b border-t">
        <div className="flex-shrink-0">
          <img
            className="h-14 w-14 rounded-sm"
            src={`https://picsum.photos/200/300?random=${index}`}
            alt=""
          />
        </div>
        <div className="flex-1 min-w-0 flex justify-between">
          <div className="focus:outline-none">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {activity.title}
            </p>
            <div className="text-sm text-gray-400">
              Hosted by{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  activityClickHandler(e, "profile", activity.id);
                }}
                className="text-blue-500 cursor-pointer"
              >
                {activity.host?.displayName}
              </span>
            </div>

            {activity.isHost ? (
              <div className="text-xs mt-1 text-gray-400">
                You are hosting this event.
              </div>
            ) : (
              activity.isGoing &&
              !activity.isHost && (
                <div className="text-xs mt-1 text-gray-400">
                  You are going this event.
                </div>
              )
            )}
            {!activity.isGoing && !activity.isHost && <div className="h-5" />}
            {/* {activity.isCancelled && (
              <div className="text-xs mt-1 text-gray-500">Event cancelled</div>
            )} */}
          </div>
          <div className="flex flex-col ml-auto">
            <div className="flex -space-x-1 relative z-0 ml-auto">
              {activity.attendees?.length > 0 &&
                activity?.attendees.map((attendee) => (
                  <>
                    {attendee.username === user?.username ? (
                      <img
                        className="inline-block h-5 w-5 object-cover rounded-full ring-2 ring-white dark:ring-gray-300"
                        src={user.image}
                      />
                    ) : (
                      <img
                        className="inline-block h-5 w-5 object-cover rounded-full ring-2 ring-white dark:ring-gray-300"
                        src={attendee.image}
                      />
                    )}
                  </>
                ))}
            </div>
            <span className="text-xs text-gray-500 pt-1.5 text-right">
              {activity.attendees?.length} going
            </span>
          </div>
        </div>
      </div>
    </li>
  );
});
