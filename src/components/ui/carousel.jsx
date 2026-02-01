"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
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
  autoplayDelay = 3500,
  breakpoints,
  fade = false, // ✅ NEW PROP
  className,
  children,
  ...props
}) {
  const autoplayRef = React.useRef(
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  );

  const plugins = React.useMemo(() => {
    const list = [autoplayRef.current];
    if (fade) list.push(Fade());
    return list;
  }, [fade]);

  const [carouselRef, api] = useEmblaCarousel(
    {
      axis: fade ? "x" : orientation === "horizontal" ? "x" : "y",
      loop: true,
      align: "start",
    },
    plugins,
  );

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  const [currentSlides, setCurrentSlides] = React.useState(slidesToShow);
  const [gap, setGap] = React.useState(16);

  React.useEffect(() => {
    if (!breakpoints || fade) return; // ❗ no responsive math in fade mode

    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1024 && breakpoints.lg) setCurrentSlides(breakpoints.lg);
      else if (width >= 768 && breakpoints.md) setCurrentSlides(breakpoints.md);
      else if (width >= 640 && breakpoints.sm) setCurrentSlides(breakpoints.sm);
      else if (breakpoints.xs) setCurrentSlides(breakpoints.xs);
      else setCurrentSlides(slidesToShow);

      setGap(width >= 1024 ? 24 : 16);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints, slidesToShow, fade]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        slidesToShow: fade ? 1 : currentSlides,
        gap,
        fade,
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
  const { carouselRef, orientation, fade } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        className={cn(
          fade
            ? "flex"
            : orientation === "horizontal"
              ? "flex gap-4 lg:gap-6"
              : "flex flex-col gap-4 lg:gap-6",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function CarouselItem({ className, ...props }) {
  const { slidesToShow, gap, fade } = useCarousel();

  if (fade) {
    return (
      <div
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-full shrink-0 rounded-lg shadow-md bg-background",
          className,
        )}
        {...props}
      />
    );
  }

  const totalGap = gap * (slidesToShow - 1);

  return (
    <div
      role="group"
      aria-roledescription="slide"
      style={{
        flex: `0 0 calc((100% - ${totalGap}px) / ${slidesToShow})`,
      }}
      className={cn(
        "min-w-0 shrink-0 rounded-lg shadow-md bg-background",
        className,
      )}
      {...props}
    />
  );
}

/* arrows optional */
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
