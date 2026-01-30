import React from "react";

const Skeleton = ({ skfor }) => {
  if (skfor === "event_card") {
    return (
      <article
        className="relative overflow-hidden rounded-lg bg-white shadow-md 
             animate-pulse"
      >
        {/* -------- Date Banner -------- */}
        <div className="absolute top-0 left-4 z-40 h-14 w-14 rounded-b-lg bg-gray-300" />

        {/* -------- Event Image -------- */}
        <div className="relative aspect-square bg-gray-200">
          {/* Category */}
          <div className="absolute bottom-4 right-4 h-7 w-24 rounded-lg bg-gray-300" />
        </div>

        {/* -------- Event Content -------- */}
        <div className="p-4 flex flex-col space-y-3">
          {/* Title */}
          <div className="h-7 w-3/4 rounded-lg bg-gray-300" />

          {/* Date + Location */}
          <div className="flex flex-col space-y-2">
            <div className="h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-5 w-2/3 rounded bg-gray-300" />
          </div>

          {/* Button */}
          <div className="mt-2 h-10 w-full rounded-lg bg-gray-300" />
        </div>
      </article>
    );
  }

  // Return null for other cases
  return null;
};

export default Skeleton;
