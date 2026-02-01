import WidthFitter from "@/components/common/layout/widthFitter/WidthFitter";
import Image from "next/image";
import Purifire from "@/components/common/purifire/Purifire";
import { formatTime } from "@/lib/herper";
import EventMap from "@/components/user/widgets/eventMap/EventMap";
import TicketModal from "@/components/user/widgets/ticketTailor/TicketTailorWidget";

async function get_event(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_BASE_URL}/api/user/events/${slug}`,
    );

    if (!res.ok) {
      console.log(`Error Fetching Event !`);
      return {
        event: {},
      };
    }

    return await res.json();
  } catch (err) {
    console.log(`Error Fetching Event : `, err);
    return {
      event: {},
    };
  }
}

const EventShowPage = async ({ params }) => {
  const { slug } = await params;
  const event = await get_event(slug);

  return (
    <div className="flex flex-col">
      {/* Event banner */}
      <div className="relative w-full h-100 bg-orange-100">
        <Image
          src={
            event.banner_img
              ? `/event/banner/${event.banner_img}`
              : `/event/banner/default.png`
          }
          alt="Event banner"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <WidthFitter>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-3 py-6  md:gap-6">
            {/* EVENT CONTENT */}
            <div className="sm:col-span-2 flex flex-col space-y-6 order-2 md:order-1 ">
              <div>
                <span className="uppercase font-medium  sm:text-lg text-orange-500">
                  Ticketguru Proudly Presents
                </span>

                <h2 className="text-4xl py-2 md:text-6xl font-black text-gray-700 uppercase">
                  {event.name || "EVENT NAME HERE"}
                </h2>

                <div className="flex flex-col sm:flex-row sm:gap-2 -space-y-2">
                  <span className=" text-orange-700 text-lg uppercase font-bold">
                    <span className=" text-gray-600  text-lg mr-2">ON</span>
                    {event.date?.split("T")[0]}
                  </span>
                  <span className=" text-orange-700 text-lg uppercase font-bold">
                    <span className=" text-gray-600  text-lg mr-2">FROM</span>
                    {formatTime(event?.start_time)}
                    {event?.end_time
                      ? " - " + formatTime(event.end_time)
                      : " ONWARDS"}
                  </span>

                  <span className=" text-orange-700 text-lg uppercase font-bold">
                    <span className=" text-gray-600 text-lg mr-2">@</span>
                    {event.venue || "LOCATION NAME HERE"}
                  </span>
                </div>
              </div>

              <hr className="border-orange-200" />

              <Purifire description={event?.description} />
            </div>

            {/* EVENT IMAGE */}
            <div className=" -mt-56 space-y-4 md:space-y-6 order-1 md:order-2 bg-red-700 mb-4">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={
                    event.face_img
                      ? `/event/face/${event.face_img}`
                      : `/event/face/default.png`
                  }
                  alt="Event poster"
                  fill
                  className="object-contain"
                />
              </div>
              <TicketModal
                tt_id={event.tt_id}
                chekout_hash={event.checkout_hash}
              />
            </div>
          </div>
          <EventMap postalCode={event.postal_code} />
        </div>
      </WidthFitter>
    </div>
  );
};

export default EventShowPage;
