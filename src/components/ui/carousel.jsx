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
  if (!context) {
    throw new Error("useCarousel must be used within <Carousel />");
  }
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
      stopOnInteraction: false,
    }),
  );

  const [carouselRef, api] = useEmblaCarousel(
    {
      axis: orientation === "horizontal" ? "x" : "y",
      loop: true,
      align: "start",
    },
    autoplay ? [autoplayRef.current] : [],
  );

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

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

    handleResize();
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
          orientation === "horizontal" ? "flex gap-6" : "flex flex-col gap-6",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function CarouselItem({ className, ...props }) {
  const { slidesToShow } = useCarousel();

  /**
   * gap-6 = 24px
   * total gaps = slidesToShow - 1
   */
  const GAP = 24;
  const totalGap = GAP * (slidesToShow - 1);

  return (
    <div
      role="group"
      aria-roledescription="slide"
      style={{
        flex: `0 0 calc((100% - ${totalGap}px) / ${slidesToShow})`,
      }}
      className={cn("min-w-0 shrink-0", className)}
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
        "absolute z-10 size-8 rounded-full",
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
        "absolute z-10 size-8 rounded-full",
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
