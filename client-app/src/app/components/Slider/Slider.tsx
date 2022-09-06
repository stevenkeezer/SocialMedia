import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import ActivityForm from "../Forms/ActivityForm";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { Activity } from "../../models/Activity";
import { ActivityPhoto } from "../../models/profile";
import Comment from "../Comments/CommentField";
import CommentList from "../Comments/CommentList";
import SliderHeader from "./SliderHeader";
import PhotoUpload from "../../common/ImageUpload/PhotoUpload";
import UploadedPhotos from "./SliderPhotos";
import Attendees from "../Activities/Attendees";
import PhotoDropzone from "../../common/ImageUpload/PhotoDropzone";
import CommentImages from "../Comments/CommentImages";
import SliderBanners from "./SliderBanners";
import ActivityCreatedBanner from "../Activities/ActivityCreatedBanner";
import styles from "./styles.module.css";
import { classNames } from "../../utils/classNames";
import { useTheme } from "next-themes";
import { sliderTransitionProps } from "./transitionProps";
import Skeleton from "./Skeleton";

export default observer(function Slider() {
  const {
    activityStore,
    commonStore,
    commentStore,
    commentStore: { comments, createHubConnection },
    userStore: { user },
  } = useStore();
  const {
    editMode,
    loadActivity,
    setIsUploadingPhoto,
    clearSelectedActivity,
    uploadingPhoto,
    uploadActivityPhoto,
    selectedActivity,
    selectAnActivity,
    closeForm,
    deleteActivityPhoto,
    loadingActivity,
    setMainActivityPhoto,
    settingActivity,
  } = activityStore;

  const { openPhotoViewer, sliderAnimationComplete } = commonStore;

  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const [isAddingComment, setIsAddingComment] = useState(false);
  const [toggleCommentHt, setToggleCommentHt] = useState(false);
  const [initialTimeOut, setInitialTimeOut] = useState(500);
  const [activity, setActivity] = useState<Activity>(null);
  const [showShadow, setShowShadow] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [target, setTarget] = useState("");

  function handlePhotoUpload(file: Blob) {
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

  useEffect(() => {
    id === "0" && setActivity(null);
  }, [activity, id]);

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

  const sliderHandler = (state) => {
    sliderAnimationComplete(state);
  };

  const { resolvedTheme } = useTheme();
  const lightMode = resolvedTheme === "light";
  const skeleton = lightMode ? styles.skeleton : styles.skeletonDark;
  const boxShadow = lightMode && {
    boxShadow: "-10px 0 10px -6px rgba(115,115,115,0.05)",
  };

  return (
    <Transition.Root show={editMode} as="div">
      <div className="fixed inset-0 pointer-events-none" />
      <div className="absolute lg:fixed inset-y-0 z-40 right-0 flex max-w-full top-[4.55rem]">
        <Transition.Child
          as="div"
          {...sliderTransitionProps}
          afterEnter={() => sliderHandler(true)}
          afterLeave={() => sliderHandler(false)}
        >
          <div
            onDragEnter={() => {
              setToggleCommentHt(false);
              if (isActivityHost) setIsDragged(true);
            }}
            style={boxShadow || {}}
            className="w-screen h-screen max-w-[41.3rem] border-l border-[#edeae9] dark:border-[#424244] bg-white dark:bg-[#1e1f21]"
          >
            <SliderHeader activity={activity} />

            {isActivityHost && (
              <PhotoDropzone
                setFiles={setFiles}
                isDragged={isDragged}
                cropperDisabled={true}
                setIsDragged={setIsDragged}
                className="mt-[8.2rem]"
                heightModifier="h-[calc(100vh-20.4rem)]"
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
              {loadingActivity || settingActivity || !activity ? (
                <Skeleton skeleton={skeleton} />
              ) : (
                <>
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
                </>
              )}

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
