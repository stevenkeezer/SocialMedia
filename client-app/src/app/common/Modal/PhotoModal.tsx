import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useStore } from "../../../stores/store";
import { Profile } from "../../models/profile";
import PhotoDropzone from "../ImageUpload/PhotoDropzone";
import PhotoUpload from "../ImageUpload/PhotoUpload";
import PhotoUploadBtn from "../ImageUpload/PhotoUploadBtn";

interface Props {
  profile: Profile;
}

export default observer(function PhotoModal({ profile }: Props) {
  const { profileStore, userStore } = useStore();
  const { isCurrentUser, uploadPhoto, uploading } = profileStore;
  const [isDragged, setIsDragged] = useState(false);
  const [files, setFiles] = useState([]);
  const { user } = userStore;

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => console.log("photo uploaded"));
    setFiles([]);
  }

  return (
    <div
      onDragEnter={() => setIsDragged(true)}
      className="bg-white dark:bg-[#1e1f21] relative"
    >
      <div className="py-8">
        {uploading && <div>uploading</div>}

        <PhotoDropzone
          setFiles={setFiles}
          isDragged={isDragged}
          cropperDisabled={true}
          setIsDragged={setIsDragged}
          heightModifier="h-[18.6rem] "
        />

        {files?.length > 0 ? (
          <PhotoUpload
            loading={false}
            uploadPhoto={handlePhotoUpload}
            files={files}
            setFiles={setFiles}
            cropperDisabled={false}
            hidePreview={true}
          />
        ) : (
          <img
            className="mx-auto border-2 rounded-full cursor-pointer h-44 w-44"
            src={isCurrentUser ? user?.image : profile?.image}
            alt=""
          />
        )}
      </div>
      <hr />
      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <PhotoUploadBtn setFiles={setFiles} />
        </div>
        <div>Delete </div>
      </div>
    </div>
  );
});
