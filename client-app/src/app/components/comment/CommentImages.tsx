import { PaperClipIcon } from "@heroicons/react/outline";
import React from "react";
import Dropdown from "../../common/Dropdown";
import { Activity } from "../../models/Activity";
import CommentLayout from "./CommentLayout";

export default function CommentImages({
  activity,
  settingActivity,
  openPhotoViewer,
  handleDeletePhoto,
}: {
  activity: Activity;
  settingActivity: boolean;
  openPhotoViewer: (index: number) => void;
  handleDeletePhoto: any;
}) {
  const DropdownElement = ({ photo }) => (
    <Dropdown
      data={photo}
      buttonClass="hover:bg-gray-300 rounded-md py-1 px-1 flex items-center text-[#6d6e6f] dark:text-white dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
    >
      <button
        type="submit"
        onClick={(e) => {
          e.stopPropagation();
          handleDeletePhoto(photo, e);
        }}
      >
        Delete
      </button>
      <br />
      <button>Edit</button>
    </Dropdown>
  );

  return (
    <div className="pt-3">
      {activity?.activityPhotos.map((photo, index) => (
        <CommentLayout
          key={photo.id}
          avatar={activity.host.image}
          createdAt={!settingActivity && photo?.createdAt}
          username={activity.host.username}
          icon={
            <>
              <PaperClipIcon className="w-4 h-4 ml-1 text-[#afabac]" />
              <div className="pl-1">attached</div>
            </>
          }
          dropdown={<DropdownElement photo={photo} />}
        >
          <div className="mt-2">
            <img
              key={photo.id}
              src={photo.url}
              alt={photo.id}
              onClick={() => {
                openPhotoViewer(index);
              }}
              className="w-auto h-auto max-h-[30.5rem] object-cover bg-transparent cursor-pointer rounded-lg"
            />
          </div>
        </CommentLayout>
      ))}
    </div>
  );
}
