import React, {
  Fragment,
  SyntheticEvent,
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
import { Activity } from "../models/Activity";
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
import SliderBanners from "./SliderBanners";
import { classNames } from "../utils/classNames";
import { formatDistanceToNow } from "date-fns";
import { ActivityPhoto } from "../models/profile";
import ActivityCreatedBanner from "./activities/ActivityCreatedBanner";

export default observer(function Slider() {
  const {
    activityStore,
    profileStore,
    commonStore,
    commentStore,
    commentStore: { comments, createHubConnection, clearComments },
    userStore: { user },
  } = useStore();
  const {
    editMode,
    loadActivity,
    updateAttendance,
    setIsUploadingPhoto,
    clearSelectedActivity,
    uploadingPhoto,
    uploadActivityPhoto,
    openForm,
    selectedActivity,
    selectAnActivity,
    loading,
    closeForm,
    loadingInitial,
    deleteActivityPhoto,
    loadingMainActivityPhoto,
    setMainActivityPhoto,
    settingActivity,
  } = activityStore;

  const { openPhotoViewer } = commonStore;

  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const [isAddingComment, setIsAddingComment] = useState(false);
  const [activity, setActivity] = useState<Activity>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showShadow, setShowShadow] = useState(false);
  const [toggleCommentHt, setToggleCommentHt] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [target, setTarget] = useState("");
  const [initialTimeOut, setInitialTimeOut] = useState(500);

  function handlePhotoUpload(file: Blob) {
    console.log(files[0]);
    const { name: fileName, size } = files[0];
    uploadActivityPhoto(file, activity?.id, fileName, size).then(() =>
      setFiles([])
    );
  }

  useEffect(() => {
    if (id && id !== "0") {
      setTimeout(() => {
        selectAnActivity(id as string);
        loadActivity(id as string).then((activity) => {
          setInitialTimeOut(0);
          return setActivity(activity);
        });
      }, initialTimeOut);
    }
    if (id === "0") clearSelectedActivity();
  }, [id, selectedActivity, clearSelectedActivity, loadActivity, createHubConnection]);

  useEffect(() => {
    if (activity?.id) {
      commentStore.createHubConnection(activity.id);
    }
    return () => {
      commentStore.clearComments();
    };
  }, [activity, router, commentStore]);

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
    if (id === "0") closeForm();
  }, [id, router]);

  const isScrolledToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop === 0
        ? setShowShadow(false)
        : setShowShadow(true);
    }
  };

  const [isDragged, setIsDragged] = useState(false);

  useEffect(() => {
    if (files.length > 0) handlePhotoUpload(files[0]);
  }, [files]);

  const isActivityHost = selectedActivity?.host.username === user?.username;

  function handleSetMainPhoto(
    photo: ActivityPhoto,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    setMainActivityPhoto(photo);
  }

  function handleDeletePhoto(
    photo: ActivityPhoto,
    e: SyntheticEvent<HTMLButtonElement>,
    activityId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteActivityPhoto(photo, activityId);
  }

  useEffect(() => {
    setIsUploadingPhoto(false);
  }, [id]);

  return (
    <Transition.Root show={editMode} as="div">
      <div className="fixed inset-0  pointer-events-none" />

      <div className="fixed inset-y-0 z-40 right-0 flex max-w-full top-[4.55rem]">
        <Transition.Child
          as="div"
          enter="transform transition ease-in-out duration-400 sm:duration-[400ms]"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-400 sm:duration-[400ms]"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div
            onDragEnter={() => {
              if (isActivityHost) setIsDragged(true);
            }}
            style={{ boxShadow: "-10px 0 10px -6px rgba(115,115,115,0.05)" }}
            className="border-l w-screen h-screen max-w-[41.3rem] bg-white dark:bg-[#1e1f21] border-[#edeae9] dark:border-[#424244] "
          >
            <SliderHeader activity={activity} />

            {isActivityHost && (
              <PhotoDropzone
                setFiles={setFiles}
                isDragged={isDragged}
                cropperDisabled={true}
                setIsDragged={setIsDragged}
              />
            )}
            <div
              ref={scrollRef}
              onScroll={isScrolledToTop}
              className={classNames(
                showShadow && "shadow-inner",
                toggleCommentHt
                  ? "max-h-[calc(100vh-21.1rem)]"
                  : "max-h-[calc(100vh-17.1rem)]",
                "bg-white dark:bg-[#1e1f21] transition-all overflow-y-auto h-full dark:border-[#424244] border-gray-200"
              )}
            >
              <SliderBanners activity={activity} />
              <ActivityForm />
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
                handleDeletePhoto={handleDeletePhoto}
                handleSetMainPhoto={handleSetMainPhoto}
                target={target}
              />

              <div className="dark:bg-[#252628] bg-[#f9f8f8] px-6 pb-4">
                {activity?.createdAt && (
                  <ActivityCreatedBanner activity={activity} />
                )}

                {activity?.activityPhotos.length > 0 && (
                  <CommentImages
                    activity={activity}
                    settingActivity={settingActivity}
                    openPhotoViewer={openPhotoViewer}
                    handleDeletePhoto={handleDeletePhoto}
                  />
                )}

                {comments.length > 0 && <CommentList />}
              </div>

              <Comment
                setToggleCommentHt={setToggleCommentHt}
                toggleCommentHt={toggleCommentHt}
                showShadow={showShadow}
                setIsAddingComment={setIsAddingComment}
                activityId={activity?.id}
              >
                <Attendees activity={activity} />
              </Comment>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
});
