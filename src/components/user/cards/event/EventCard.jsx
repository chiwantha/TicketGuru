import Button from "../../button/button/Button";
import Image from "next/image";

const EventCard = ({ data }) => {
  const {
    name,
    category,
    start_time,
    end_time,
    venue,
    date,
    face,
    card_caption,
    slug,
  } = data || {};
  return (
    <div
      className="relative rounded-lg shadow-md hover:shadow-lg transition-all duration-300
     overflow-hidden hover:scale-105"
    >
      {/* Date Banner */}
      <div
        className="z-40 text-center absolute -space-y-1.5 flex flex-col text-white
       top-0 left-4 rounded-b-lg px-3 py-1 bg-orange-500 shadow-md uppercase"
      >
        <span className="text-4xl font-bold">{date || `00`}</span>
        <span>{data || `MON`}</span>
      </div>

      {/* Event Iamge */}
      <div className="relative bg-red-500 aspect-359/236 top-0">
        {/* Category */}
        <div
          className="absolute z-40 bottom-4 right-4 px-4 py-1 bg-orange-500 text-white font-light 
      uppercase rounded-lg text-sm shadow-sm"
        >
          {category || `Category`}
        </div>

        <Image
          src={face ? `/event/face/${face}` : `/event/face/default.png`}
          alt="/event/face/default.png"
          fill
          className="object-center object-cover"
        />
      </div>
      {/* Event Content */}
      <div className="p-4 flex-col flex space-y-2 bg-white">
        {/* Event Title */}
        <h3 className="font-bold text-gray-600 text-xl uppercase line-clamp-1 text-ellipsis">
          {name || `Event Name`}
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
            `A high-energy house music night featuring deep beats, vibrant vibes,
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
