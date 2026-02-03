import Image from "next/image";

const TicketguruLoading = async () => {
  // Fake 3-second delay on the server

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="aspect-video relative w-75">
        <Image
          src="/assets/loading.gif"
          alt="loading.gif"
          className="object-center object-contain"
          fill
        />
      </div>
    </div>
  );
};

export default TicketguruLoading;
