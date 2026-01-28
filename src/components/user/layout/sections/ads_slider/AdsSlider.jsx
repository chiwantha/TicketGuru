import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

async function get_Ads() {
  try {
    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/user/ads`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to Fetch Ads : ${res.status}`);
      return { ads: [] };
    }

    return await res.json();
  } catch (err) {
    console.error(`Error Fetching Ads : ${err}`);
    return { ads: [] };
  }
}

const AdsSlider = async () => {
  const ads = await get_Ads();

  return (
    <div className="grid grid-cols-1">
      <Carousel
        className={`rounded-lg overflow-hidden`}
        slidesToShow={2}
        autoplayDelay={1000}
        breakpoints={{ xs: 1, sm: 2 }}
      >
        <CarouselContent>
          {ads && ads.length > 0 ? (
            ads.map((ad, index) => (
              <CarouselItem
                key={index}
                className="relative  rounded-lg shadow-md aspect-video overflow-hidden"
              >
                <Image
                  src={"/ads/boat-party-2026.png"}
                  alt={`/ads/${ad.image}` || "/ads/boat-party-2026.png"}
                  className="object-cover object-center"
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
