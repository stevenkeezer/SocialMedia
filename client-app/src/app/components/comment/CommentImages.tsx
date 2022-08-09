import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../stores/store";
import Dropdown from "../../common/Dropdown";
import { Activity } from "../activities/Activity";

export default observer(function CommentImages({
  activity,
}: {
  activity: Activity;
}) {
  const {
    commonStore: { openPhotoViewer },
    userStore: { user },
  } = useStore();
  return (
    <div className="px-6">
      {activity?.activityPhotos.map((photo, index) => (
        <li key={photo.id} className="list-none">
          <div className="relative pt-3">
            <div className="relative flex items-start space-x-3">
              <div className="relative pt-1">
                <img
                  className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center"
                  src={activity.host.image}
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1 space-y-[0.15rem]">
                <div>
                  <div className="text-sm flex justify-between items-center">
                    <div className="flex space-x-1 items-baseline font-medium dark:text-white">
                      <a className=" capitalize flex items-center">
                        {user.username}

                        <PaperClipIcon className="w-3.5 h-3.5 ml-1 text-[#afabac]" />
                      </a>
                      <span>attached</span>
                    </div>
                    <Dropdown
                      data={photo}
                      buttonClass="hover:bg-gray-300 rounded-md py-1 px-1 flex items-center text-[#6d6e6f] dark:text-white dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    >
                      <button
                        type="submit"
                        onClick={(e) => {
                          // commentStore.deleteComment(comment.id);
                        }}
                      >
                        Delete comment
                      </button>
                      <br />
                      <button>Edit</button>
                    </Dropdown>
                  </div>
                </div>
                <div className="pt-1.5">
                  <img
                    key={photo.id}
                    src={photo.url}
                    alt={photo.id}
                    onClick={() => {
                      openPhotoViewer(index);
                    }}
                    className="w-auto h-auto object-cover bg-transparent  rounded-lg"
                  />
                </div>
                {/* <div
                  contentEditable
                  ref={ref}
                  // submit on enter
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onSubmit(e);
                    }
                    if (e.key === "Enter" && e.shiftKey) {
                      e.preventDefault();
                    }
                  }}
                  className="text-sm dark:text-white whitespace-pre-wrap text-gray-700"
                /> */}
              </div>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
});
