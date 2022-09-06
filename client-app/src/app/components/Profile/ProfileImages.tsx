import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { useStore } from "../../../stores/store";
import PhotoDropzone from "../../common/ImageUpload/PhotoDropzone";
import { Photo } from "../../models/profile";
import { classNames } from "../../utils/classNames";

export default observer(function ProfileImages() {
  const { profileStore } = useStore();
  const {
    loadingProfile,
    profile,
    isCurrentUser,
    uploadPhoto,
    loading,
    deletePhoto,
    setMainPhoto,
  } = profileStore;

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
      <div className="container grid grid-cols-5 gap-5 px-4 pt-2 mx-auto">
        {profile?.photos.map((photo) => {
          return (
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
              {isCurrentUser && !loadingProfile && profile?.photos?.length > 1 && (
                <>
                  <button
                    onClick={(e) => handleSetMainPhoto(photo, e)}
                    disabled={photo.isMain}
                    name={"main" + photo.id}
                    className="block mt-2 text-sm font-medium text-white truncate"
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
          );
        })}
      </div>
    </div>
  );
});
