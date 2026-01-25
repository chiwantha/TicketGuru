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

      {/* SCROLL CONTENT */}
      <section className="relative z-20 mt-[100vh] min-h-screen bg-white inset-shadow-sm shadow-md">
        {/* Latest Events */}
        <WidthFitter>
          <div className="py-12 md:py-20 flex justify-center w-full flex-col space-y-10">
            {/* Header */}
            <div className="-space-y-1">
              <h2 className="text-4xl font-bold text-orange-500 text-center">
                VIEW OUR EVENTS
              </h2>
              <p
                className="text-gray-400 text-center text-xl
         leading-tight font-light"
              >
                Find Your Facourite Event ANd Book Your Tickets Easily
              </p>
            </div>
            {/* TicketGrid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {events &&
                events.length > 0 &&
                events.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              <div
                className="lg:col-span-2 md:col-span-3 sm:col-span-2 col-span-1 relative rounded-lg shadow-md
                aspect-video lg:aspect-auto items-center flex justify-center bg-linear-to-b from-orange-50 to-yellow-50 overflow-hidden"
              >
                <Image
                  src={`/ads/promo.png`}
                  alt="promo.png"
                  className="object-center object-cover"
                  fill
                />
              </div>
            </div>
            <Button
              title={"View All"}
              wfull={false}
              fg={"font-medium text-white text-lg uppercase self-center"}
              pd={"px-6 py-1.5"}
            />
          </div>
        </WidthFitter>
      </section>
    </main>
  );
};

export default Homepage;
