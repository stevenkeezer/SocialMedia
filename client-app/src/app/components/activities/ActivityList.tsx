import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { classNames } from "../../utils/classNames";
import {
  CheckCircleIcon,
  ClipboardIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import { Activity } from "../../models/Activity";

interface Props {
  activity: Activity;
}

export default observer(function ActivityList({ activity }: Props) {
  const { activityStore } = useStore();
  const { selectAnActivity, openForm, closeForm, uploadingPhoto } =
    activityStore;

  const router = useRouter();
  const { query } = router;
  const { id } = query;
  const base = router.asPath.split("/")[2];

  const activityClickHandler = (event, arg, activityId) => {
    if (uploadingPhoto) {
      toast("Photo uploading, please wait...");
      return;
    }

    if (arg === "profile") {
      closeForm();
      setTimeout(() => {
        router.push({
          pathname: `/0/list/0`,
          query: { profile: activity.hostUsername },
        });
      }, 400);
    }

    if (arg === "activityContainer") {
      openForm();

      if (!id || id === "0") {
        setTimeout(() => {
          router
            .push(`/0/${base}/${activityId}`, "", {
              shallow: true,
              scroll: false,
            })
            .then(() => {
              selectAnActivity(activityId as string);
            });
        }, 400);
      } else {
        router.push(`/0/${base}/${activityId}`, "", {
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
      openForm();
    }
  }, [id]);

  const ActivityStatusElement = () => (
    <div className="focus:outline-none">
      <div className="flex">
        <p className="text-sm text-gray-900 dark:text-white">
          {activity?.title}
        </p>
        {activity?.isDraft && (
          <div className="pb-0.5 mt-1 text-xs text-gray-500">Draft</div>
        )}
      </div>
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

      {activity?.isHost ? (
        <div className="text-xs mt-1 flex items-center text-[#a2a0a2]">
          <ClipboardIcon className="w-[.8rem] h-[.8rem] mb-px mr-1" />
          You are hosting this event.
        </div>
      ) : (
        activity?.isGoing &&
        !activity.isHost && (
          <div className="text-xs mt-1 flex items-center text-[#a2a0a2]">
            <CheckCircleIcon className="w-[.8rem] h-[.8rem] mr-1 mb-px" />
            You are going this event.
          </div>
        )
      )}
      {!activity?.isGoing && !activity?.isHost && (
        <div className="text-xs text-[#a2a0a2] flex items-center mt-1">
          <PencilAltIcon className="w-[.8rem] h-[.8rem] mr-1 mb-px" />
          <div className="w-64 truncate"> {activity?.description}</div>
        </div>
      )}
      {!activity?.isGoing && !activity?.isHost && !activity?.description && (
        <div className="h-5" />
      )}
    </div>
  );

  return (
    <li
      className="overflow-x-hidden list-none"
      onClick={(e) => {
        activityClickHandler(e, "activityContainer", activity?.id);
      }}
    >
      <div
        className={classNames(
          activity?.id === id
            ? "bg-[#f1f2fc] dark:bg-[#2a2b2d] border-[#f1f2fc]"
            : "bg-transparent hover:bg-[#f9f8f8] dark:hover:bg-[#2a2b2d] hover:border-[#f9f8f8]",
          "relative px-[1.45rem] py-3.5 flex cursor-pointer items-center  dark:border-[#252628] border-t border-b border-white active:border-blue-400 focus-inner:border-blue-400 focus:border-blue-400 dark:active:border-blue-400 dark:focus:border-blue-400"
        )}
      >
        {activity?.mainImage && (
          <div className="flex-shrink-0 pr-3">
            <img
              className="h-[3.65rem] w-[3.65rem] rounded-lg object-cover border border-[#edeae9] dark:border-[#424244]"
              src={activity?.mainImage?.url}
              alt=""
            />
          </div>
        )}
        <div className="flex justify-between flex-1 min-w-0">
          <ActivityStatusElement />
          <div>
            <div className="flex items-center">
              {activity?.commentCount > 0 && (
                <div className="flex items-start">
                  <div className="flex items-center space-x-1.5">
                    <div className="flex-1 text-xs text-[#a2a0a2]">
                      {activity?.commentCount}
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
        </div>
      </div>
    </li>
  );
});
