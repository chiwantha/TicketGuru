"use client";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within <Carousel />");
  return context;
}

export function Carousel({
  orientation = "horizontal",
  slidesToShow = 1,
  autoplay = false,
  autoplayDelay = 4000,
  breakpoints,
  className,
  children,
  ...props
}) {
  const autoplayRef = React.useRef(
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction: false, // never stop
    }),
  );

  const [carouselRef, api] = useEmblaCarousel(
    {
      axis: orientation === "horizontal" ? "x" : "y",
      loop: true,
    },
    autoplay ? [autoplayRef.current] : [],
  );

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  // Responsive slides
  const [currentSlides, setCurrentSlides] = React.useState(slidesToShow);

  React.useEffect(() => {
    if (!breakpoints) return;

    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024 && breakpoints.lg) setCurrentSlides(breakpoints.lg);
      else if (width >= 768 && breakpoints.md) setCurrentSlides(breakpoints.md);
      else if (width >= 640 && breakpoints.sm) setCurrentSlides(breakpoints.sm);
      else if (breakpoints.xs) setCurrentSlides(breakpoints.xs);
      else setCurrentSlides(slidesToShow);
    };

    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints, slidesToShow]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        slidesToShow: currentSlides,
        scrollPrev,
        scrollNext,
      }}
    >
      <div className={cn("relative", className)} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function CarouselItem({ className, ...props }) {
  const { orientation, slidesToShow } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      style={{ flex: `0 0 ${100 / slidesToShow}%` }}
      className={cn(
        "min-w-0 shrink-0 grow-0",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

export function CarouselPrevious({ className, ...props }) {
  const { orientation, scrollPrev } = useCarousel();

  return (
    <Button
      onClick={scrollPrev}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      <ArrowLeft />
    </Button>
  );
}

export function CarouselNext({ className, ...props }) {
  const { orientation, scrollNext } = useCarousel();

  return (
    <Button
      onClick={scrollNext}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      <ArrowRight />
    </Button>
  );
}
