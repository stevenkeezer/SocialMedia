import React, { useState } from "react";
import FollowButton from "../../common/FollowButton";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import Modal from "../../common/Modal";
import PhotoUpload from "../../common/imageUpload/PhotoUpload";
import PhotoDropzone from "../../common/imageUpload/PhotoDropzone";
import PhotoUploadBtn from "../../common/imageUpload/PhotoUploadBtn";
import { formatDistanceToNow } from "date-fns";

export default observer(function WelcomePanel({ profile }: any) {
  const [files, setFiles] = useState([]);
  const { profileStore, userStore, commonStore, activityStore } = useStore();
  const { isCurrentUser, uploadPhoto, uploading } = profileStore;
  const { openModal } = commonStore;
  const { user } = userStore;
  const [isDragged, setIsDragged] = useState(false);

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => console.log("photo uploaded"));
    setFiles([]);
  }

  const modalContent = (
    <div
      onDragEnter={() => setIsDragged(true)}
      className="bg-gray-800 relative"
    >
      <div className="py-8">
        {uploading && <div>uploading</div>}
        <PhotoDropzone
          setFiles={setFiles}
          isDragged={isDragged}
          cropperDisabled={true}
          setIsDragged={setIsDragged}
        />
        {files?.length > 0 ? (
          <>
            <PhotoUpload
              loading={false}
              uploadPhoto={handlePhotoUpload}
              files={files}
              setFiles={setFiles}
              cropperDisabled={false}
              hidePreview={true}
            />
          </>
        ) : (
          <img
            className="mx-auto h-44 w-44 rounded-full border-2 cursor-pointer"
            src={isCurrentUser ? user?.image : profile?.image}
            alt=""
          />
        )}
      </div>
      <hr className="" />
      <div className="flex justify-between px-4 py-4 items-center">
        <div>
          Add photo
          <PhotoUploadBtn setFiles={setFiles} />
        </div>
        <div>Delete </div>
      </div>
    </div>
  );

  return (
    <section aria-labelledby="profile-overview-title">
      <div className="bg-transparent overflow-hidden">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="bg-white dark:bg-transparent px-6 pt-6 pb-0.5">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex items-center sm:space-x-5">
              <div className="flex-shrink-0">
                <img
                  className="mx-auto h-[3.6rem] w-[3.6rem] rounded-full cursor-pointer"
                  onClick={() => {
                    openModal();
                  }}
                  src={isCurrentUser ? user?.image : profile?.image}
                  alt=""
                />
                <Modal title="Profile Photo">{modalContent}</Modal>
              </div>
              <div className="-mt-1 text-center sm:text-left">
                <p className="text-xl font-bold text-gray-900 dark:text-white capitalize sm:text-2xl">
                  {profile?.username}
                </p>
                <p className="text-xs pt-1">
                  Joined{" "}
                  {profile?.createdAt &&
                    formatDistanceToNow(profile?.createdAt)}{" "}
                  ago
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <FollowButton profile={profile} />
            </div>
          </div>
        </div>

        {/* <hr className="border-[#edeae9] dark:border-[#424244]" /> */}
      </div>
    </section>
  );
});
