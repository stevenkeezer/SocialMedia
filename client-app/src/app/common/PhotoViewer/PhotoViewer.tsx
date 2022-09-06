import { Dialog, Transition } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../../stores/store";
import { transitionOverlayProps, transitionProps } from "../transitionProps";
import Gallery from "./Gallery";
import PhotoCarousel from "./PhotoCarousel";
import PhotoViewerHeader from "./PhotoViewerHeader";

export default observer(function PhotoViewer() {
  const { commonStore, activityStore } = useStore();
  const { photoViewer, closePhotoViewer, mainImage, setCurrentImage } =
    commonStore;
  const {
    selectedActivity: { activityPhotos },
  } = activityStore;

  const defaultZoom = activityPhotos.length === 1 ? 0.4075 : 0.365;
  const [zoom, setZoom] = useState(defaultZoom);
  const router = useRouter();

  const moreThanOne = activityPhotos.length > 1;
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
    currImage === activityPhotos.length - 1
      ? setCurrentImage(0)
      : setCurrentImage(currImage + 1);
  };

  const getPreviousImage = (currImage: number) => {
    resetZoom();
    currImage === 0
      ? setCurrentImage(activityPhotos.length - 1)
      : setCurrentImage(currImage - 1);
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

  if (activityPhotos.length === 0) return null;
  return (
    <>
      <Transition appear show={photoViewer} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => closePhotoViewer()}
        >
          <Transition.Child {...transitionOverlayProps}>
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="relative flex items-center justify-center min-h-full text-center">
              <Transition.Child
                {...transitionProps}
                afterLeave={() => resetZoom()}
              >
                <div className="w-full h-screen transform overflow-hidden bg-[#252628] dark:bg-[#363639] text-left align-middle shadow-xl transition-all">
                  <PhotoViewerHeader
                    activityPhotos={activityPhotos}
                    mainImage={mainImage}
                    zoomOut={zoomOut}
                    zoomIn={zoomIn}
                    zoom={zoom}
                    resetZoom={resetZoom}
                    closePhotoViewer={closePhotoViewer}
                  />

                  <div className="flex flex-col group">
                    <PhotoCarousel
                      moreThanOne={moreThanOne}
                      getPreviousImage={getPreviousImage}
                      getNextImage={getNextImage}
                      activityPhotos={activityPhotos}
                      mainImage={mainImage}
                      containerHeight={containerHeight}
                      zoom={zoom}
                    />
                    {activityPhotos.length > 1 && (
                      <Gallery
                        activityPhotos={activityPhotos}
                        setCurrentImage={setCurrentImage}
                      />
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
