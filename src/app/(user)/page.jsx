import WidthFitter from "@/components/common/layout/widthFitter/WidthFitter";
import Skeleton from "@/components/common/skeleton/Skeleton";

import Button from "@/components/user/button/button/Button";
import AdsSlider from "@/components/user/grids/ads_slider/AdsSlider";
import EventGrid from "@/components/user/grids/event_grid/EventGrid";
import Hero from "@/components/user/sections/hero/Hero";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const Homepage = async () => {
  return (
    <main className="">
      {/* HERO (fixed background layer) */}
      <section className="">
        <Hero />
      </section>
      <section className=" bg-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "#ffffff",
            backgroundImage: ` radial-gradient(circle at top center,rgba(255, 140, 60, 0.15),transparent 70%)`,
            filter: "blur(80px)",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Content */}
        <WidthFitter>
          <div className="pt-12 md:pt-20 flex justify-center w-full flex-col space-y-6">
            {/* Header */}
            <div className=" -mt-2">
              <h2 className="text-4xl font-bold text-orange-500 text-center">
                VIEW LATEST EVENTS
              </h2>
              <p className="text-gray-500 text-center text-xl leading-tight font-light">
                Find Your Favourite Event And Book Your Tickets Easily
              </p>
            </div>

            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                  <Skeleton skfor={`event_card`} />
                  <Skeleton skfor={`event_card`} />
                  <Skeleton skfor={`event_card`} />
                  <Skeleton skfor={`event_card`} />
                </div>
              }
            >
              <EventGrid />
            </Suspense>

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
    </main>
  );
};

export default Homepage;
