import { PlusIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import React, { Fragment, SyntheticEvent, useState } from "react";
import { useStore } from "../../../stores/store";
import { ActivityPhoto } from "../../models/profile";
import Dropdown from "../Dropdown";
import PhotoLoading from "../imageUpload/PhotoLoading";
import Spinner from "../Spinner";
import PhotoUploadBtn from "../imageUpload/PhotoUploadBtn";
import CommentImages from "../../components/comment/CommentImages";

export default observer(function UploadedPhotos({
  activity,
  files,
  setFiles,
  handleSetMainPhoto,
  target,
  handleDeletePhoto,
}: any) {
  const { activityStore, commonStore } = useStore();
  const {
    uploadingPhoto,
    deleteActivityPhoto,
    loadingMainActivityPhoto,
    setMainActivityPhoto,
    settingActivity,
  } = activityStore;
  const { openPhotoViewer } = commonStore;

  return (
    <Fragment>
      <div className="flex space-x-3 px-6 pb-6 pt-6 overflow-x-auto overflow-y-visible	 max-w-[39.6rem]">
        {activity?.activityPhotos?.length > 0 &&
          activity.activityPhotos.map((photo, index) => (
            <div
              key={index + photo.id}
              onClick={() => {
                openPhotoViewer(index);
              }}
              className="relative"
            >
              <div className="absolute w-full rounded-lg bg-gray-900/40 h-full opacity-0 hover:opacity-100">
                {loadingMainActivityPhoto && (
                  <div className="flex justify-center items-center">
                    <Spinner />
                  </div>
                )}

                <div className="flex justify-end h-full mt-3 mr-3">
                  <Dropdown originTopRight buttonClass="mt-3">
                    <>
                      {!photo.isMainActivityPhoto && (
                        <button
                          onClick={(e) => handleSetMainPhoto(photo, e)}
                          disabled={photo.isMain}
                          name={"main" + photo.id}
                        >
                          Make default{" "}
                          {target === "main" + photo.id &&
                            loadingMainActivityPhoto && <span>loading</span>}
                        </button>
                      )}

                      <div className="flex flex-col">
                        <button
                          name={photo.id}
                          disabled={photo.isMain}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePhoto(photo, e);
                          }}
                        >
                          Delete{" "}
                          {target === photo.id && loadingMainActivityPhoto && (
                            <span>loading</span>
                          )}
                        </button>
                      </div>
                    </>
                  </Dropdown>
                </div>
              </div>
              <div className="shrink-0 min-w-max">
                <img
                  key={photo.id}
                  src={photo.url}
                  className="w-full min-w-[4rem] h-16 bg-transparent object-cover border border-[#edeae9] dark:border-[#424244] rounded-lg"
                />
              </div>
            </div>
          ))}
        {uploadingPhoto && (
          <PhotoLoading loading={uploadingPhoto} files={files} />
        )}

        <PhotoUploadBtn
          setFiles={setFiles}
          button={
            <div className="border-[2px] h-16 border-dotted border-[#edeae9] dark:border-[#424244] flex items-center w-16 rounded-lg justify-center">
              <PlusIcon className="w-5 h-5 dark:text-[#edeae9] text-[#6d6e6f]" />
            </div>
          }
        />
      </div>
    </Fragment>
  );
});
