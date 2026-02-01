import WidthFitter from "@/components/common/layout/widthFitter/WidthFitter";
import EventGrid from "@/components/user/grids/event_grid/EventGrid";
import EventSearch from "@/components/user/widgets/search/EventSearch";
import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";

const EventsPage = () => {
  return (
    <div className=" space-y-6">
      <div className="relative flex flex-col items-center justify-center -z-40 h-100 bg-black">
        <Image
          src={"/assets/event_temp.png"}
          alt="temp"
          fill
          className="object-cover object-center -z-10 blur-xs"
        />
        <div className="absolute -z-5 bg-black/75 w-full h-full" />
        <h1 className="font-black text-4xl md:text-6xl text-orange-600 ">
          FIND EVENTS
        </h1>
        <p className="mt-3 text-shadow-md leading-tight uppercase md:text-base text-gray-100 text-center max-w-[80%] lg:max-w-[50%]">
          Discover concerts, parties, cultural events, and experiences happening
          near you. Search, explore, and book your next unforgettable moment
        </p>
      </div>
      <WidthFitter>
        <div className="flex flex-col space-y-6 -mt-22 z-50">
          <EventSearch />
          <EventGrid cards={16} />
        </div>
      </WidthFitter>
    </div>
  );
};

export default EventsPage;
