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
  const [zoom, setZoom] = useState(0.27);

  const zoomIn = () => {
    setZoom(zoom + 0.2);
  };
  const zoomOut = () => {
    setZoom(zoom - 0.2);
  };
  const resetZoom = () => {
    setZoom(0.27);
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
            <div className="flex min-h-full items-center justify-center text-center">
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
                <div className="w-full h-screen  transform overflow-hidden bg-[#252628] dark:bg-[#363639] text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between text-white items-center pl-4 pr-3 border-b border-[#424244]">
                    {selectedActivity?.title}
                    <button onClick={zoomIn}>zoom in</button>
                    <button onClick={zoomOut}>zoom out</button>
                    <button onClick={resetZoom}>reset</button>

                    <div className="border-l h-[3.75rem] border-[#424244] pl-3 flex justify-center items-center">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-lg border border-transparent px-2 py-2 text-sm font-medium text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          closePhotoViewer();
                        }}
                      >
                        <XIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex justify-between items-center overflow-y-auto max-h-[70vh] my-12 px-6">
                      <ArrowCircleLeftIcon
                        onClick={() => getPreviousImage(mainImage)}
                        className="w-10 h-10 text-red-500"
                      />
                      <img
                        src={selectedActivity?.activityPhotos[mainImage]?.url}
                        alt=""
                        className="object-cover"
                        style={{
                          width: zoom * 100 + "%",
                          height: zoom * 100 + "%",
                        }}
                      />
                      <ArrowCircleRightIcon
                        onClick={() => getNextImage(mainImage)}
                        className="w-10 h-10 text-red-500"
                      />
                    </div>

                    <div className="flex justify-center items-center  space-x-5">
                      {selectedActivity?.activityPhotos.map((photo, index) => (
                        <div className="flex justify-center h-14 overflow-hidden items-center">
                          <img
                            src={photo.url}
                            onClick={() => {
                              setCurrentImage(index);
                            }}
                            alt=""
                            className="w-20 object-cover"
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
