import WidthFitter from "@/components/common/layout/widthFitter/WidthFitter";

import Button from "@/components/user/button/button/Button";
import EventCard from "@/components/user/cards/event/EventCard";
import AdsSlider from "@/components/user/layout/sections/ads_slider/AdsSlider";
import Hero from "@/components/user/layout/sections/hero/Hero";

async function get_event_cards() {
  try {
    const res = await fetch(
      `${process.env.NEXT_BASE_URL}/api/user/home/events`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.log(`Failed to Fetch Event Cards : ${res.status}`);
      return { events: [] };
    }

    return await res.json();
  } catch (err) {
    console.log(`Error Fetching Event Cards : ${err}`);
    return { events: [] };
  }
}

const Homepage = async () => {
  const events = await get_event_cards();

  return (
    <main className="relative">
      {/* HERO (fixed background layer) */}
      <section className="fixed inset-0 z-10">
        <Hero />
      </section>

      <section className="relative z-20 mt-[100vh] bg-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "#ffffff",
            backgroundImage: ` radial-gradient(circle at top center,rgba(150, 140, 60, 0.15),transparent 70%)`,
            filter: "blur(80px)",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Content */}
        <WidthFitter>
          <div className="py-12 md:py-20 flex justify-center w-full flex-col space-y-6">
            {/* Header */}
            <div className=" -mt-2">
              <h2 className="text-4xl font-bold text-orange-500 text-center">
                VIEW LATEST EVENTS
              </h2>
              <p className="text-gray-500 text-center text-xl leading-tight font-light">
                Find Your Favourite Event And Book Your Tickets Easily
              </p>
            </div>

            {/* Event Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {events &&
                events.length > 0 &&
                events
                  ?.slice(0, 4)
                  .map((event, index) => (
                    <EventCard key={index} event={event} />
                  ))}
            </div>

            {/* ads slider */}
            <AdsSlider />

            {/* Button */}
            <Button
              title="View All"
              wfull={false}
              fg="font-medium text-white text-lg uppercase self-center"
              pd="px-6 py-1.5"
            />
          </div>
        </WidthFitter>
      </section>

      <div className=""></div>
    </main>
  );
};

export default Homepage;
