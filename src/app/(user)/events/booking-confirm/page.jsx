import WidthFitter from "@/components/common/layout/widthFitter/WidthFitter";
import Button from "@/components/user/button/button/Button";
import EventGrid from "@/components/user/grids/event_grid/EventGrid";
import Image from "next/image";

async function get_event(tt_event_id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_BASE_URL}/api/user/events/confirm?tt_event_id=${tt_event_id}`,
      { cache: "no-store" },
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

const BookingConfirm = async ({ searchParams }) => {
  const params = (await searchParams) || {};
  const tt_event_id = params.tt_event_id || "";
  const event = await get_event(tt_event_id);

  return (
    <div className="flex flex-col relative">
      {/* Event banner */}
      <div className="relative w-full h-100 bg-black">
        <Image
          src={
            event.banner_img
              ? `/event/banner/${event.banner_img}`
              : `/event/face/${event.face_img}`
          }
          alt="Event banner"
          fill
          className={`object-cover object-center ${!event.banner_img && "blur-sm"}`}
        />

        <div className="absolute inset-0 bg-black/50" />
      </div>

      <WidthFitter>
        <div className="flex flex-col space-y-12 md:space-y-20">
          {/* content area */}
          <div className="-mt-48 rounded-xl relative bg-white shadow-lg overflow-hidden">
            {/* Perforation top */}
            <div className="absolute top-0 left-0 w-full border-t-2 border-dashed border-orange-300" />

            {/* Perforation bottom */}
            <div className="absolute bottom-0 left-0 w-full border-b-2 border-dashed border-orange-300" />

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 ">
              <div className="relative w-full aspect-square rounded-xl  shadow-lg">
                <Image
                  src={
                    event.face_img
                      ? `/event/face/${event.face_img}`
                      : `/event/face/default.png`
                  }
                  alt="Event poster"
                  fill
                  priority
                  className="object-contain"
                />
                {/* Left notch */}
                <div className="absolute xs:left-0 md:right-0 bottom-0 md:top-0 md:-translate-y-1/2 translate-y-1/2 md:translate-x-1/2 -translate-x-1/2 w-20 h-20 bg-orange-600 rounded-full" />

                {/* Right notch */}
                <div className="absolute right-0 bottom-0 translate-y-1/2 translate-x-1/2 w-20 h-20 bg-orange-600 rounded-full" />
              </div>
              <div className="col-span-1 md:col-span-2  gap-4 lg:gap-6 md:py-4 px-4 pb-7 flex items-center flex-col justify-center">
                <h3 className="text-orange-600 lg:text-6xl text-4xl font-black animate-bounce">
                  THANK YOU !
                </h3>
                <span className="w-[95%] sm:w-[85%] md:w-[60%] text-center font-light text-gray-700 leading-tight lg:text-lg">
                  {`Your booking for "${event.name}" has been confirmed. We look forward to seeing you at the event! Your tickets will be emailed to you shortly.`}
                </span>
                <div className="flex gap-4 items-center justify-center">
                  <Button title={`Book Another`} link={`/events`} />
                  <Button
                    title={`Review Us`}
                    link={`#`}
                    bg={`bg-orange-100 hover:bg-orange-200`}
                    fg={`text-orange-600 font-bold text-lg`}
                  />
                </div>
              </div>
            </div>
          </div>
          <EventGrid />
        </div>
      </WidthFitter>
    </div>
  );
};

export default BookingConfirm;
