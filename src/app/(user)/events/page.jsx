import WidthFitter from "@/components/common/layout/widthFitter/WidthFitter";
import EventGrid from "@/components/user/grids/event_grid/EventGrid";
import React from "react";

export const dynamic = "force-dynamic";

const EventsPage = () => {
  return (
    <div className="pt-30">
      <WidthFitter>
        <div className=" space-y-6">
          <div className="w-full rounded-lg p-6 bg-linear-to-t from-orange-600 via-orange-500 to-orange-500"></div>
          <EventGrid cards={16} />
        </div>
      </WidthFitter>
    </div>
  );
};

export default EventsPage;
