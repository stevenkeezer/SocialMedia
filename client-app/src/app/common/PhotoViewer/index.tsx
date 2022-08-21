import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  ArrowsExpandIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  XIcon,
} from "@heroicons/react/outline";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../../stores/store";
import { classNames } from "../../utils/classNames";

export default observer(function PhotoViewer({ children, title }: any) {
  const { commonStore, activityStore } = useStore();
  const { photoViewer, closePhotoViewer, mainImage, setCurrentImage } =
    commonStore;
  const { selectedActivity } = activityStore;

  const defaultZoom =
    selectedActivity?.activityPhotos.length === 1 ? 0.4075 : 0.365;
  const [zoom, setZoom] = useState(defaultZoom);

  const router = useRouter();

  const moreThanOne = selectedActivity?.activityPhotos.length > 1;
  const containerHeight = moreThanOne ? "max-h-[72.8vh]" : "max-h-[82vh]";

  const zoomIn = () => {
    setZoom(zoom + 0.2);
  };
  const zoomOut = () => {
    setZoom(zoom - 0.2);
  };
  const resetZoom = () => {
    setZoom(defaultZoom);
  };

  const getNextImage = (currImage: number) => {
    resetZoom();
    if (currImage === selectedActivity.activityPhotos.length - 1) {
      return setCurrentImage(0);
    } else {
      return setCurrentImage(currImage + 1);
    }
  };
  const getPreviousImage = (currImage: number) => {
    resetZoom();
    if (currImage === 0) {
      return setCurrentImage(selectedActivity.activityPhotos.length - 1);
    } else {
      return setCurrentImage(currImage - 1);
    }
  };

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        closePhotoViewer();
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  if (selectedActivity?.activityPhotos.length === 0) return null;
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
            <div className="flex min-h-full relative items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                afterLeave={() => resetZoom()}
              >
                <div className="w-full h-screen transform overflow-hidden bg-[#252628] dark:bg-[#363639] text-left align-middle shadow-xl transition-all">
                  <div className="grid grid-cols-12 text-white items-center pl-4 pr-3 border-b border-[#424244]">
                    <div className="flex-col col-span-2 space-y-0.5 pl-2">
                      <div className="text-sm whitespace-nowrap">
                        {selectedActivity?.activityPhotos[mainImage]?.fileName}
                      </div>
                      <div className="text-sm text-gray-300">
                        {selectedActivity?.activityPhotos[mainImage]
                          ?.createdAt &&
                          format(
                            selectedActivity?.activityPhotos[mainImage]
                              ?.createdAt,
                            "MMMM dd, yyyy"
                          )}{" "}
                        <span className="pl-0.5"> at </span>
                        {selectedActivity?.activityPhotos[mainImage]
                          ?.createdAt &&
                          format(
                            selectedActivity?.activityPhotos[mainImage]
                              ?.createdAt,
                            "hh:mm a"
                          )}
                      </div>
                    </div>
                    <div className="col-span-8 pr-1 w-full flex items-center">
                      <div className="border flex mx-auto items-center rounded">
                        <div className="flex space-x-[1.09rem] border-r h-full py-[.3rem] px-[.85rem]">
                          <button onClick={zoomOut}>
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <div className="text-sm font-medium">
                            {(zoom * 100).toFixed() + "%"}
                          </div>
                          <button onClick={zoomIn}>
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center px-3.5 justify-center">
                          <button className="" onClick={resetZoom}>
                            <ArrowsExpandIcon className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="h-[3.75rem] col-span-2 border-[#424244] flex justify-end">
                      <div className=" border-l border-[#424244] h-full flex items-center  pl-3 justify-center">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-lg px-2 py-2 text-sm font-medium text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            closePhotoViewer();
                          }}
                        >
                          <XIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col group">
                    <div className="flex flex-col">
                      {moreThanOne && (
                        <ChevronLeftIcon
                          onClick={() => getPreviousImage(mainImage)}
                          className="w-9 h-9 p-2 bg-gray-900/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md text-white absolute left-8 top-[47.4%]"
                        />
                      )}
                      <div
                        className={classNames(
                          containerHeight,
                          "flex justify-center items-center overflow-y-auto max-w-[1250px] mx-auto mt-11 px-6"
                        )}
                      >
                        <img
                          src={selectedActivity?.activityPhotos[mainImage]?.url}
                          alt=""
                          // className="object-cover"
                          style={{
                            width: zoom * 100 + "%",
                            height: 100 + "%",
                          }}
                        />
                      </div>
                      {moreThanOne && (
                        <ChevronRightIcon
                          onClick={() => getNextImage(mainImage)}
                          className="w-9 h-9 p-2 bg-gray-900/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300  rounded-md text-white absolute right-8 top-[47.4%]"
                        />
                      )}
                    </div>
                    {selectedActivity?.activityPhotos.length > 1 && (
                      <div className="w-full h-full pt-8 flex items-center justify-center">
                        <div className="flex justify-center items-center space-x-5">
                          {selectedActivity?.activityPhotos.map(
                            (photo, index) => (
                              <div className="flex justify-center h-11 overflow-hidden items-center">
                                <img
                                  src={photo.url}
                                  onClick={() => {
                                    setCurrentImage(index);
                                  }}
                                  alt=""
                                  className="w-16 object-cover"
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
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
