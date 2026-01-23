import FireworksLayer from "@/components/common/fx/FireworksLayer/FireworksLayer";
import Button from "@/components/user/button/button/Button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative h-screen min-h-166.75 w-full bg-black flex items-center justify-center overflow-hidden">
      {/* background image */}
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

      {/* hero content */}
      <div className="relative z-10 flex flex-col items-center space-y-4 px-2">
        <div className="relative w-auto h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 2xl:h-62.5 aspect-1397/679 md:-mt-8 lg:-mt-13">
          <Image
            src={"/logo/logo.png"}
            alt="logo"
            fill
            className="object-contain"
          />
        </div>

        <p
          className="text-white text-lg sm:text-xl md:text-[22px] lg:text-[23px] xl:text-[24px] 2xl:text-[25px] w-85 sm:w-125 md:w-150 lg:w-192.5 text-center
         leading-tight font-light xl:-mt-2"
        >
          Book your favorite event tickets with ease. Discover concerts,
          festivals, and exclusive experiences all in one place, with a fast,
          secure, and reliable booking process
        </p>

        <div className="flex gap-4 lg:gap-6 items-center justify-center mt-2 sm:mt-4 2xl:mt-8">
          <Button
            title={"Events"}
            wfull={false}
            fg={"font-medium text-white text-lg xl:text-xl uppercase"}
            pd={"px-6 py-1.5"}
          />
          <Button
            title={"About"}
            wfull={false}
            bg={"bg-white hover:bg-gray-200"}
            fg={
              "font-medium text-orange-500 hover:texr-orange-400 text-lg xl:text-xl uppercase"
            }
            pd={"px-6 py-1.5"}
          />
        </div>
      </div>

      <span
        className="font-londrina-outline text-orange-500 absolute  -bottom-35 leading-80 
      text-[150px] sm:text-[170px] md:text-[230px] lg:text-[290px] xl:text-[360px] 2xl:text-[450px] "
      >
        TICKETGURU
      </span>
    </div>
  );
};

export default Hero;
