import WidthFitter from "@/components/common/layout/widthFitter/WidthFitter";
import Button from "@/components/user/button/button/Button";
import EventCard from "@/components/user/cards/event/EventCard";
import Hero from "@/components/user/layout/sections/hero/Hero";
import Image from "next/image";

async function get_event_cards() {
  try {
    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/user/home`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to Fetch Event Cards : ${res.status}`);
      return { events: [] };
    }

    return await res.json();
  } catch (err) {
    console.error(`Error Fetching Event Cards : ${err}`);
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

      <section className="relative z-20 mt-[100vh] bg-black overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/crowd.jpg"
            alt="crowd.png"
            className="object-cover object-center blur-md"
            fill
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <WidthFitter>
          <div className="py-12 md:py-20 flex justify-center w-full flex-col space-y-6">
            {/* Header */}
            <div className="-space-y-1 -mt-2">
              <h2 className="text-4xl font-bold text-orange-500 text-center">
                VIEW OUR EVENTS
              </h2>
              <p className="text-white text-center text-xl leading-tight font-light">
                Find Your Favourite Event And Book Your Tickets Easily
              </p>
            </div>

            {/* Ticket Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {events &&
                events
                  ?.slice(0, 4)
                  .map((event, index) => (
                    <EventCard key={index} event={event} />
                  ))}
            </div>

            {/* Promo Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="relative rounded-lg shadow-md aspect-video overflow-hidden">
                <Image
                  src="/ads/promo.png"
                  alt="promo.png"
                  className="object-cover object-center"
                  fill
                />
              </div>
            </div>

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
    </main>
  );
};

export default Homepage;
