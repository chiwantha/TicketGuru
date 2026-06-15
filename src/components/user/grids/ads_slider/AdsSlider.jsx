import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

const adsList = [
  {
    image: `boat-party-2026.png`,
  },
  {
    image: `erabadu-wasanthaya-2026-dubai.png`,
  },
  {
    image: `ticket-guru-2026.png`,
  },
];

const AdsSlider = async () => {
  const ads = adsList;

  return (
    <div className="grid grid-cols-1">
      <Carousel
        className={`rounded-lg overflow-hidden`}
        slidesToShow={2}
        autoplayDelay={5000}
        breakpoints={{ xs: 1, sm: 2 }}
      >
        <CarouselContent>
          {ads && ads.length > 0 ? (
            ads.map((ad, index) => (
              <CarouselItem
                key={index}
                className="relative rounded-lg shadow-md aspect-video overflow-hidden"
              >
                <Image
                  src={`/ads/${ad.image}`}
                  alt={`/ads/${ad.image}` || "/ads/boat-party-2026.png"}
                  className="object-cover object-center bg-gray-200"
                  fill
                />
              </CarouselItem>
            ))
          ) : (
            <>
              <CarouselItem>
                <div className="relative rounded-lg shadow-md aspect-video overflow-hidden bg-gray-300 animate-pulse delay-75" />
              </CarouselItem>
              <CarouselItem>
                <div className="relative rounded-lg shadow-md aspect-video overflow-hidden bg-gray-300 animate-pulse delay-100" />
              </CarouselItem>
            </>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default AdsSlider;
