"use client";
import WidthFitter from "@/components/common/layout/widthFitter/WidthFitter";
import Button from "@/components/user/button/button/Button";
import React from "react";

const Newsletter = () => {
  return (
    <div className="relative py-12 md:py-20">
      {/* Orange Dashed Grid Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f97316 1px, transparent 1px),
            linear-gradient(to bottom, #f97316 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 100%, black 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 100%, black 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
          opacity: 0.3,
        }}
      />

      <WidthFitter>
        <div className="relative mx-auto">
          {/* Ticket Card */}
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Perforation top */}
            <div className="absolute top-0 left-0 w-full border-t-2 border-dashed border-orange-300" />

            {/* Perforation bottom */}
            <div className="absolute bottom-0 left-0 w-full border-b-2 border-dashed border-orange-300" />

            {/* Left notch */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-orange-600 rounded-full" />

            {/* Right notch */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-orange-600 rounded-full" />

            {/* Content */}
            <div className="px-6 md:px-12 py-10 flex flex-col items-center space-y-6">
              <span className="text-3xl md:text-4xl font-bold uppercase text-orange-600 text-center">
                Get Latest News & Offers
              </span>

              <div className="py-2 px-2 bg-gray-100 flex items-center sm:flex-row flex-col rounded-xl w-full sm:w-[80%] gap-2">
                <input
                  type="email"
                  className="bg-transparent w-full text-lg text-center sm:text-left p-2 text-black outline-none"
                  placeholder="Enter your email"
                />
                <Button
                  title={"Join"}
                  fg="text-white text-lg font-medium uppercase"
                />
              </div>
            </div>
          </div>
        </div>
      </WidthFitter>
    </div>
  );
};

export default Newsletter;
