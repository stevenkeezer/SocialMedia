import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  XIcon,
} from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../../stores/store";

export default observer(function PhotoViewer({ children, title }: any) {
  const { commonStore, activityStore } = useStore();
  const {
    photoViewer,
    openModal,
    closePhotoViewer,
    mainImage,
    setCurrentImage,
  } = commonStore;
  const { selectedActivity } = activityStore;

  const getNextImage = (currImage: number) => {
    if (currImage === selectedActivity.activityPhotos.length - 1) {
      return setCurrentImage(0);
    } else {
      return setCurrentImage(currImage + 1);
    }
  };
  const getPreviousImage = (currImage: number) => {
    if (currImage === 0) {
      return setCurrentImage(selectedActivity.activityPhotos.length - 1);
    } else {
      return setCurrentImage(currImage - 1);
    }
  };

  return (
    <>
      <Transition appear show={photoViewer} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => closePhotoViewer()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="w-full h-screen  transform overflow-hidden bg-[#363639] text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center py-2 px-5 border-b">
                    {selectedActivity?.title}
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-full border border-transparent bg-blue-100 px-2 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => closePhotoViewer()}
                      >
                        <XIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col py-10">
                    <div className="flex justify-between items-center px-6">
                      <ArrowCircleLeftIcon
                        onClick={() => getPreviousImage(mainImage)}
                        className="w-10 h-10 text-red-500"
                      />
                      <img
                        src={selectedActivity?.activityPhotos[mainImage].url}
                        alt=""
                        className="w-auto h-1/2"
                      />
                      <ArrowCircleRightIcon
                        onClick={() => getNextImage(mainImage)}
                        className="w-10 h-10 text-red-500"
                      />
                    </div>

                    <div className="flex justify-center items-center py-3 space-x-5">
                      {selectedActivity?.activityPhotos.map((photo, index) => (
                        <div className="flex justify-center items-center">
                          <img
                            src={photo.url}
                            onClick={() => setCurrentImage(index)}
                            alt=""
                            className="w-auto h-16 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});
