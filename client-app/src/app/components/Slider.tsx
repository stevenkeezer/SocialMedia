import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import PhotoDropzone from "../common/imageUpload/PhotoDropzone";
import Dropdown from "../common/Dropdown";
import SliderBanner from "./SliderBanner";
import CommentImages from "./comment/CommentImages";

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
  const [showShadow, setShowShadow] = useState(false);
  const [toggleCommentHt, setToggleCommentHt] = useState(false);

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, [id, router]);

  // funcition to tell if a container is scrolled to the top or not if it is return true if false return false useffect
  const isScrolledToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop === 0
        ? setShowShadow(false)
        : setShowShadow(true);
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [files, setFiles] = useState<any>([]);

  const [isDragged, setIsDragged] = useState(false);

  useEffect(() => {
    if (files.length > 0) handlePhotoUpload(files[0]);
  }, [files]);

  function capitalizeFirstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  return (
    <Transition.Root show={editMode} as="div">
      <div className="fixed inset-0  pointer-events-none" />

      <div className="fixed inset-y-0 z-40 right-0 flex max-w-full top-[4.55rem]">
        <Transition.Child
          as="div"
          appear
          enter="transform transition ease-in-out duration-400 sm:duration-[400ms]"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-400 sm:duration-[400ms]"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div
            onDragEnter={() => setIsDragged(true)}
            className="border-l w-screen h-screen max-w-[41.3rem] bg-white dark:bg-[#1e1f21] border-[#edeae9] dark:border-[#424244] "
          >
            <SliderHeader activity={activity} />

            <PhotoDropzone
              setFiles={setFiles}
              isDragged={isDragged}
              cropperDisabled={true}
              setIsDragged={setIsDragged}
            />
            <div
              ref={scrollRef}
              onScroll={isScrolledToTop}
              className={classNames(
                showShadow && "shadow-inner",
                toggleCommentHt
                  ? "max-h-[calc(100vh-20.45rem)]"
                  : "max-h-[calc(100vh-16.4rem)]",
                "bg-white dark:bg-[#1e1f21] transition-all overflow-y-auto h-full dark:border-[#424244] border-gray-200"
              )}
            >
              {activity?.isCancelled ? (
                <SliderBanner
                  icon={
                    <ExclamationCircleIcon className="h-4 w-4 mr-2 text-[#6d6e6f]" />
                  }
                  text={`${
                    activity?.isHost
                      ? "You have"
                      : capitalizeFirstLetter(activity?.host?.username) + " has"
                  } cancelled this event.`}
                />
              ) : (
                !activity?.isHost && (
                  <SliderBanner
                    icon={
                      <ExclamationCircleIcon className="h-4 w-4 mr-2 text-[#6d6e6f]" />
                    }
                    text={`${capitalizeFirstLetter(
                      activity?.host?.username
                    )} is hosting this event.`}
                  />
                )
              )}

              {activity?.isHost && !activity?.isCancelled && (
                <SliderBanner
                  icon={
                    <ExclamationCircleIcon className="h-4 w-4 mr-2 text-[#6d6e6f]" />
                  }
                  text="You are hosting this event."
                />
              )}

              <ActivityForm />
              {/* <Attendees activity={activity} /> */}
              <PhotoUpload
                cropperDisabled={true}
                files={files}
                setFiles={setFiles}
                loading={uploadingPhoto}
                uploadPhoto={handlePhotoUpload}
              />
              <UploadedPhotos
                activity={activity}
                setFiles={setFiles}
                files={files[0] && files[0].name}
              />

              {activity?.activityPhotos.length > 0 && comments?.length > 0 && (
                <div className="dark:bg-[#252628] bg-[#f9f8f8] pb-5">
                  <CommentImages activity={activity} />

                  {comments.length > 0 && <CommentList />}
                </div>
              )}

              <Comment
                setToggleCommentHt={setToggleCommentHt}
                toggleCommentHt={toggleCommentHt}
                showShadow={showShadow}
                setIsAddingComment={setIsAddingComment}
                activityId={activity?.id}
              />
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
});
