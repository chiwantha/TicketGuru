import WidthFitter from "@/components/common/layout/widthFitter/WidthFitter";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

async function get_event(tt_event_id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_BASE_URL}/api/user/events/thankyou?tt_event_id=${tt_event_id}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      return { event: {} };
    }

    return await res.json();
  } catch (err) {
    return { event: {} };
  }
}

export default async function CheckoutSuccessPage({ searchParams }) {
  const params = (await searchParams) || {};
  const tt_event_id = params.tt_event_id || "";
  const event = await get_event(tt_event_id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative w-full h-[320px]">
        <Image
          src={
            event.banner_img
              ? `/event/banner/${event.banner_img}`
              : `/event/face/${event.face_img}`
          }
          alt="Event banner"
          fill
          className={`object-cover ${!event.banner_img && "blur-sm"}`}
          priority
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
          <div>
            <CheckCircle className="mx-auto mb-4" size={56} />
            <h1 className="text-3xl sm:text-4xl font-bold">
              Thank You for Your Purchase!
            </h1>
            <p className="mt-2 text-lg opacity-90">Your booking is confirmed</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <WidthFitter>
        <div className="- pb-20">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 grid sm:grid-cols-[200px_1fr] gap-6 items-center">
            {/* Poster */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={
                  event.face_img
                    ? `/event/face/${event.face_img}`
                    : `/event/face/default.png`
                }
                alt="Event poster"
                fill
                className="object-contain"
              />
            </div>

            {/* Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
              <p className="text-gray-600 mb-4">
                We’ve successfully received your payment. Your tickets are now
                secured.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500">Order Reference</p>
                  <p className="font-medium">TT-{event.tt_id}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium text-green-600">
                    Payment Successful
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/"
                  className="px-6 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
                >
                  Back to Home
                </a>
                <a
                  href="/my-tickets"
                  className="px-6 py-3 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-50 transition"
                >
                  View My Tickets
                </a>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-gray-500 mt-8">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </WidthFitter>
    </div>
  );
}
