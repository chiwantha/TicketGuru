import WidthFitter from "@/components/common/layout/widthFitter/WidthFitter";
import EventCard from "@/components/user/cards/event/EventCard";
import Hero from "@/components/user/layout/sections/hero/Hero";

const Homepage = () => {
  return (
    <main className="relative">
      {/* HERO (fixed background layer) */}
      <section className="fixed inset-0 z-10">
        <Hero />
      </section>

      {/* SCROLL CONTENT */}
      <section className="relative z-20 mt-[100vh] min-h-screen bg-white shadow-md">
        {/* Latest Events */}
        <WidthFitter>
          <div className="sm:py-6 md:py-20 flex justify-center w-full flex-col space-y-10">
            {/* Header */}
            <div className="space-y-2">
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
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
            </div>
          </div>
        </WidthFitter>
      </section>
    </main>
  );
};

export default Homepage;
