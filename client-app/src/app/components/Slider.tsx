import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ActivityForm from "./form/ActivityForm";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { Activity } from "./activities/Activity";
import Comment from "./comment";
import CommentList from "./comment/CommentList";
import SliderHeader from "./SliderHeader";
import PhotoUpload from "../common/imageUpload/PhotoUpload";
import UploadedPhotos from "../common/UploadedPhotos/UploadedPhotos";
import Attendees from "./activities/Attendees";
import comment from "./comment";

export default observer(function Slider() {
  const {
    activityStore,
    profileStore,
    commentStore: { comments },
    userStore: { user },
  } = useStore();
  const {
    editMode,
    loadActivity,
    updateAttendance,
    cancelActivityToggle,
    clearSelectedActivity,
    uploadingPhoto,
    uploadActivityPhoto,
    loading,
  } = activityStore;

  function handlePhotoUpload(file: Blob) {
    uploadActivityPhoto(file).then(() => console.log("photo uploaded"));
  }

  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const [isAddingComment, setIsAddingComment] = useState(false);
  const [activity, setActivity] = useState<Activity>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id as string) {
      loadActivity(id as string).then((activity) => {
        return setActivity(activity);
      });
    }
    // return () => clearSelectedActivity();
  }, [id, loadActivity, clearSelectedActivity, router, profileStore]);

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTop = 0;
  //   }
  // }, [router.query]);

  useEffect(() => {
    if (isAddingComment) {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  }, [isAddingComment]);

  return (
    <Transition.Root show={editMode} as={Fragment}>
      <Dialog as="div" onClose={() => {}}>
        <div className="z-40 fixed inset-y-0 right-0 mt-[4.6rem] max-w-[41.3rem] flex">
          <Transition.Child
            as={Fragment}
            appear
            enter="transform transition ease-in-out duration-400 sm:duration-[400ms]"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-400 sm:duration-[400ms]"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="w-screen border-l dark:border-[#424244]">
              <div
                ref={scrollRef}
                className=" bg-white dark:bg-[#1e1f21] overflow-y-auto max-h-[calc(100vh-13.83rem)] dark:border-[#424244] border-gray-200"
              >
                {activity?.isCancelled && <div>This activity is cancelled</div>}

                <SliderHeader activity={activity} />
                <ActivityForm />
                <Attendees activity={activity} />
                <PhotoUpload
                  loading={uploadingPhoto}
                  uploadPhoto={handlePhotoUpload}
                />
                <UploadedPhotos activity={activity} />

                {comments.length > 0 && (
                  <div className="dark:bg-[#252628]">
                    <CommentList />
                  </div>
                )}
              </div>

              <Comment
                setIsAddingComment={setIsAddingComment}
                activityId={activity?.id}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
});
