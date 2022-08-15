import { TrashIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import { useStore } from "../../../stores/store";
import PhotoDropzone from "../../common/imageUpload/PhotoDropzone";
import PhotoUpload from "../../common/imageUpload/PhotoUpload";
import { Photo } from "../../models/profile";
import { classNames } from "../../utils/classNames";

export default observer(function ProfileImages() {
  const { userStore, activityStore } = useStore();
  const { closeForm, predicate, setPredicate } = activityStore;
  const { user, logout, isLoggedIn } = userStore;

  const router = useRouter();
  const { profileStore } = useStore();
  const {
    loadingProfile,
    loadProfile,
    profile,
    isCurrentUser,
    uploadPhoto,
    uploading,
    loading,
    deletePhoto,
    setMainPhoto,
    setActiveTab,
    loadUserActivities,
    userActivities,
  } = profileStore;

  const { profile: username } = router.query;

  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [target, setTarget] = useState("");
  const [isDragged, setIsDragged] = useState(false);

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  }

  function handleSetMainPhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  function handleDeletePhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <div onDragEnter={() => setIsDragged(true)}>
      {isCurrentUser && !loadingProfile && (
        <div className="flex justify-end pb-4 ">
          <button
            className="bg-blue-500 px-2 py-2 rounded-lg"
            onClick={() => setAddPhotoMode(!addPhotoMode)}
          >
            {addPhotoMode ? "Cancel" : "Add Photo"}
          </button>
          {addPhotoMode && (
            <>
              <PhotoDropzone setFiles={setFiles} />
              <PhotoDropzone
                setFiles={setFiles}
                isDragged={isDragged}
                cropperDisabled={true}
                setIsDragged={setIsDragged}
              />
              {/* <PhotoUpload
                files={files}
                setFiles={setFiles}
                cropperDisabled={false}
                uploadPhoto={handlePhotoUpload}
                loading={uploading}
              /> */}
            </>
          )}
        </div>
      )}

      <div className="container grid grid-cols-5 px-4 gap-5 mx-auto">
        {profile?.photos.map((photo) => {
          return (
            <>
              <li key={photo.id} className="relative">
                <div
                  className={classNames(
                    photo.isMain
                      ? "ring-2 ring-offset-2 ring-indigo-500"
                      : "focus-within:ring-2 focus-within:ring-offset-2 bg-transparent focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
                    "group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"
                  )}
                >
                  <img
                    src={photo.url}
                    alt=""
                    className={classNames(
                      photo.isMain ? "" : "group-hover:opacity-75",
                      "object-cover pointer-events-none"
                    )}
                  />
                </div>
                {isCurrentUser && !loadingProfile && (
                  <>
                    <button
                      onClick={(e) => handleSetMainPhoto(photo, e)}
                      disabled={photo.isMain}
                      name={"main" + photo.id}
                      className="mt-2 block text-sm font-medium text-white truncate"
                    >
                      Make default{" "}
                      {target === "main" + photo.id && loading && (
                        <span>loading</span>
                      )}
                    </button>
                    <button
                      name={photo.id}
                      disabled={photo.isMain}
                      onClick={(e) => handleDeletePhoto(photo, e)}
                      className="block text-sm font-medium text-gray-500"
                    >
                      Delete{" "}
                      {target === photo.id && loading && <span>loading</span>}
                    </button>
                  </>
                )}
              </li>
            </>
          );
        })}
      </div>
    </div>
  );
});
