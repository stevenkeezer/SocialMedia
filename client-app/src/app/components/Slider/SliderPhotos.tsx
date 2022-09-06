import { PlusIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { useStore } from "../../../stores/store";
import PhotoLoading from "../../common/ImageUpload/PhotoLoading";
import PhotoUploadBtn from "../../common/ImageUpload/PhotoUploadBtn";
import Dropdown from "../../common/Dropdown/Dropdown";

export default observer(function SliderPhotos({
  activity,
  files,
  setFiles,
  handleSetMainPhoto,
  target,
  handleDeletePhoto,
}: any) {
  const { activityStore, commonStore } = useStore();
  const { uploadingPhoto } = activityStore;
  const { openPhotoViewer } = commonStore;
  const [open, setOpen] = React.useState(false);

  const photoUploadBtn = (
    <div className="border-[2px] h-16 border-dotted border-[#edeae9] dark:border-[#424244] flex items-center w-16 rounded-lg justify-center">
      <PlusIcon className="w-5 h-5 dark:text-[#edeae9] text-[#6d6e6f]" />
    </div>
  );

  return (
    <Fragment>
      <div className="flex space-x-3 px-6 pb-6 pt-6 max-w-[39.6rem]">
        {activity?.activityPhotos?.length > 0 &&
          activity.activityPhotos.map((photo, index) => (
            <div
              key={index + photo.id}
              onClick={() => {
                openPhotoViewer(index);
              }}
              className="relative"
            >
              <div className="absolute w-full h-full rounded-lg opacity-0 bg-gray-900/40 hover:opacity-100">
                <div className="flex justify-end h-full mt-3 mr-2">
                  <Dropdown
                    open={open}
                    originTopRight
                    buttonClass="mt-3 p-0.5 bg-gray-800/40 rounded-md"
                    buttons={[
                      !photo.isMainActivityPhoto && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetMainPhoto(photo, e);
                            setOpen(false);
                          }}
                          disabled={photo.isMain}
                          name={"main" + photo.id}
                          className="dropdown-item"
                        >
                          Make default
                        </button>
                      ),
                      <button
                        name={photo.id}
                        disabled={photo.isMain}
                        className="dropdown-item text-[#e26d7e]"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePhoto(photo, e, activity.id);
                        }}
                      >
                        Delete
                      </button>,
                    ]}
                  />
                </div>
              </div>
              <div className="shrink-0 min-w-max">
                <img
                  alt={photo.fileName}
                  key={photo.id}
                  src={photo.url}
                  className="min-w-[4rem] w-auto h-16 bg-transparent object-cover border border-[#edeae9] dark:border-[#424244] rounded-lg"
                />
              </div>
            </div>
          ))}

        {uploadingPhoto && (
          <PhotoLoading loading={uploadingPhoto} files={files} />
        )}
        <PhotoUploadBtn setFiles={setFiles} button={photoUploadBtn} />
      </div>
    </Fragment>
  );
});
