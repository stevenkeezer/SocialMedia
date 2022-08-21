import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { classNames } from "../../utils/classNames";
import { CheckCircleIcon, ClipboardIcon } from "@heroicons/react/outline";

export default observer(function ActivityList({ activity }: any) {
  const {
    activityStore,
    userStore: { user },
  } = useStore();
  const {
    selectAnActivity,
    openForm,
    closeForm,
    uploadingPhoto,
    loadActivity,
  } = activityStore;

  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const activityClickHandler = (event, arg, activityId) => {
    if (uploadingPhoto) {
      toast("Photo uploading, please wait...");
      return;
    }

    if (arg === "profile") {
      closeForm();
      setTimeout(() => {
        router.push({
          pathname: `/list/0`,
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

  useEffect(() => {
    !uploadingPhoto && toast.dismiss();
  }, [uploadingPhoto]);

  useEffect(() => {
    if (id !== "0" && id) {
      console.log(id, "yates");
      openForm();
    }
  }, [id]);

  const defaultPhoto =
    "https://media.istockphoto.com/vectors/gardening-tools-and-plants-in-the-garden-vector-id1268196717?k=20&m=1268196717&s=612x612&w=0&h=RBA2SisPRx6OIeouAQ2R7I78eiazDS2gvGPr17mHvy4=";

  return (
    <li
      className="list-none"
      onClick={(e) => {
        activityClickHandler(e, "activityContainer", activity?.id);
      }}
    >
      <div
        className={classNames(
          activity?.id === id
            ? "bg-[#f1f2fc] dark:bg-[#2a2b2d] border-[#f1f2fc]"
            : "bg-transparent hover:bg-[#f9f8f8] dark:hover:bg-[#2a2b2d] hover:border-[#f9f8f8]",
          "relative px-[1.45rem] py-3.5 flex cursor-pointer items-center dark:border-[#252628] border-t border-b space-x-3 border-white active:border-blue-400 focus-inner:border-blue-400 focus:border-blue-400 dark:active:border-blue-400 dark:focus:border-blue-400"
        )}
      >
        <div className="flex-shrink-0">
          <img
            className="h-[3.65rem] w-[3.65rem] rounded-lg object-cover border border-[#edeae9] dark:border-[#424244]"
            src={activity?.mainImage?.url || defaultPhoto}
            alt=""
          />
        </div>
        <div className="flex-1 min-w-0 flex justify-between">
          <div className="focus:outline-none">
            <p className="text-sm text-gray-900 dark:text-white">
              {activity?.title}
            </p>
            <div className="text-xs mt-0.5 pb-[.1rem] text-gray-400">
              Hosted by{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  activityClickHandler(e, "profile", activity?.id);
                }}
                className="text-[#6296f1] cursor-pointer"
              >
                {activity?.host?.displayName}
              </span>
            </div>
            {/* {activity?.attendees.length > 0 && (
              <div className="flex items-center">
                <div className="flex text-xs space-x-0.5 items-center">
                  <div>{activity.attendees.length}</div>
                  <ClipboardIcon className="h-4 w-4 mb-px" />
                </div>
              </div>
            )} */}

            {activity?.isHost ? (
              <div className="text-xs mt-1 flex items-center text-[#a2a0a2]">
                <ClipboardIcon className="w-[.8rem] h-[.8rem] mb-px mr-1" />
                You are hosting this event.
              </div>
            ) : (
              activity?.isGoing &&
              !activity.isHost && (
                <div className="text-xs mt-1 flex items-center text-[#a2a0a2]">
                  <CheckCircleIcon className="w-[.8rem] h-[.8rem] mr-1 -mb-px" />
                  You are going this event.
                </div>
              )
            )}
            {!activity?.isGoing && !activity?.isHost && <div className="h-5" />}
            {/* {activity.isCancelled && (
              <div className="text-xs mt-1 text-gray-500">Event cancelled</div>
            )} */}
            {activity?.isDraft && (
              <div className="text-xs mt-1 text-gray-500">Draft</div>
            )}
          </div>
          <div>
            <div className="flex items-center">
              {activity?.commentCount > 0 && (
                <div className="flex items-start">
                  <div className="flex items-center space-x-1.5">
                    <div className="flex-1 text-xs text-[#a2a0a2]">
                      {activity.commentCount}
                    </div>
                    <div className="flex-shrink-0 mb-px">
                      <svg
                        className="w-[.8rem] h-[.8rem] text-[#a2a0a2]"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                        fill="currentColor"
                      >
                        <path d="M4.2,24.1c-0.2,0-0.3,0-0.5-0.1c-0.3-0.2-0.5-0.5-0.5-0.9v-5.2C1.1,16.1,0,13.7,0,11c0-5,4-9,9-9h6c5,0,9,4,9,9 c0,5-4,9-9,9h-4.1l-6.3,3.9C4.5,24,4.3,24.1,4.2,24.1z M9,4c-3.9,0-7,3.1-7,7c0,2.2,1,4.2,2.8,5.6C5,16.8,5.2,17,5.2,17.4v3.9 l5-3.1c0.2-0.1,0.3-0.2,0.5-0.2H15c3.9,0,7-3.1,7-7c0-3.9-3.1-7-7-7H9z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <div className="flex flex-col ml-auto">
            <div className="flex -space-x-1 relative z-0 ml-auto">
              {activity.attendees?.length > 0 &&
                activity?.attendees.map((attendee, index) => (
                  <Fragment key={attendee.username + activity.id}>
                    {attendee.username === user?.username ? (
                      <img
                        className="inline-block h-[1.2rem] w-[1.2rem] object-cover rounded-full ring-1 ring-[#edeae9] dark:ring-[#1e2021]"
                        src={user.image}
                      />
                    ) : (
                      <img
                        className="inline-block h-[1.2rem] w-[1.2rem] object-cover rounded-full ring-1 ring-[#edeae9] dark:ring-[#1e2021]"
                        src={attendee.image}
                      />
                    )}
                  </Fragment>
                ))}
            </div>
            <span className="text-xs text-gray-500 pt-1.5 text-right">
              {activity.attendees?.length} going
            </span>
          </div> */}
        </div>
      </div>
    </li>
  );
});
