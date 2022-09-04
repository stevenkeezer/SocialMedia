import React from "react";

export default function Gallery({ activityPhotos, setCurrentImage }) {
  return (
    <div className="w-full h-full pt-8 flex items-center justify-center">
      <div className="flex justify-center items-center space-x-5">
        {activityPhotos.map((photo, index) => (
          <div className="flex justify-center h-11 overflow-hidden rounded items-center">
            <img
              src={photo.url}
              onClick={() => {
                setCurrentImage(index);
              }}
              alt=""
              className="w-16 object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
