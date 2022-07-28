import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { useStore } from "../../../stores/store";
import { ActivityPhoto } from "../../models/profile";

export default observer(function UploadedPhotos({ activity }: any) {
  const { activityStore } = useStore();
  const {
    uploadingPhoto,
    uploadActivityPhoto,
    deleteActivityPhoto,
    loading,
    setMainActivityPhoto,
  } = activityStore;

  const [target, setTarget] = useState("");

  function handleSetMainPhoto(
    photo: ActivityPhoto,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    setMainActivityPhoto(photo);
  }

  function handleDeletePhoto(
    photo: ActivityPhoto,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    deleteActivityPhoto(photo);
  }

  return (
    <div className="flex overflow-x-auto">
      {activity?.activityPhotos?.length > 0 &&
        activity.activityPhotos.map((photo) => (
          <>
            <img
              key={photo.id}
              src={photo.url}
              className="w-24 h-24 bg-transprent border-2 border-gray-600 rounded-lg"
            />
            {/* {isCurrentUser && ( */}
            <button
              onClick={(e) => handleSetMainPhoto(photo, e)}
              disabled={photo.isMain}
              name={"main" + photo.id}
            >
              Make default{" "}
              {target === "main" + photo.id && loading && <span>loading</span>}
            </button>
            {/* )} */}
            <button
              name={photo.id}
              disabled={photo.isMain}
              onClick={(e) => handleDeletePhoto(photo, e)}
            >
              Delete {target === photo.id && loading && <span>loading</span>}
            </button>
          </>
        ))}
    </div>
  );
});
