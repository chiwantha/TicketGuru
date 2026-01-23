import React from "react";
import Button from "../../button/button/Button";

const EventCard = ({ data }) => {
  const { title, start_time, end_time, venue, card_caption, slug } = data || {};
  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      {/* Event Iamge */}
      <div className="bg-red-500 aspect-359/236 top-0"></div>
      <div className="p-4 flex-col flex space-y-2">
        {/* Event Title */}
        <h3 className="font-bold text-lg uppercase line-clamp-1 text-ellipsis">
          {title || `Event Title`}
        </h3>
        {/* Event Time & Venue */}
        <div className="flex flex-col uppercase -space-y-1.5 text-orange-500">
          <span className="font-medium">
            {start_time
              ? `${start_time} - ${end_time || "ONWARDS"}`
              : "00:00 AM - 00:00 AM"}
          </span>
          <span className="font-light">{venue || "Venue"}</span>
        </div>
        <p className="text-[#848484] tracking-normal leading-5 font-light line-clamp-3 text-ellipsis">
          {card_caption ||
            ` A high-energy house music night featuring deep beats, vibrant vibes,
          and nonstop dancing till late night`}
        </p>
        <Button
          wfull={true}
          title={`Book Now`}
          link={slug || `#`}
          margins={`mt-3`}
        />
      </div>
    </div>
  );
};

export default EventCard;
