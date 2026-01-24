import FireworksLayer from "@/components/common/fx/FireworksLayer/FireworksLayer";
import Image from "next/image";

const ComingSoonMode = () => {
  return (
    <div className="relative h-screen min-h-166.75 w-full bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/hero/background.webp"
          alt="background"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center blur-sm"
        />
        {/* black overlay */}
        <FireworksLayer />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/50" />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-6 px-2">
        <div className="relative w-auto h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 2xl:h-62.5 aspect-1397/679 md:-mt-8 lg:-mt-13">
          <Image
            src={"/logo/logo.png"}
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
        <p
          className="text-white text-xl sm:text-2xl md:text-[24px] lg:text-[26px] xl:text-[27px] 2xl:text-[30px]  text-center
         leading-tight font-bold xl:-mt-2 uppercase animate-bounce"
        >
          Coming Soon !
        </p>
        <p
          className="text-white text-lg sm:text-xl md:text-[22px] lg:text-[23px] xl:text-[24px] 2xl:text-[25px] w-85 sm:w-125 md:w-150 text-center
         leading-tight font-light xl:-mt-2"
        >
          Your favorite concerts, festivals, and events—booked fast and easy.
          Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default ComingSoonMode;
