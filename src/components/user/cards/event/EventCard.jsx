import { memo, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import Button from "../../button/button/Button";

const EventCard = ({ event = {} }) => {
  const {
    name = "Event Name",
    category = "Category",
    start_time,
    end_time,
    venue = "Venue",
    date,
    face_img,
    card_description,
    slug,
    sale,
  } = event;

  /* ---------- Time formatting ---------- */
  const { start, end } = useMemo(() => {
    const format = (t) =>
      typeof t === "string" ? t.split(":").slice(0, 2).join(":") : null;

    return {
      start: format(start_time),
      end: format(end_time),
    };
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
  }, [start_time, end_time]);

  /* ---------- Date formatting ---------- */
  const { day, month, isoDate } = useMemo(() => {
    if (!date) {
      return { day: "00", month: "MON", isoDate: null };
    }

    const d = new Date(date);
    return {
      day: d.getDate().toString().padStart(2, "0"),
      month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      isoDate: d.toISOString(),
    };
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
  }, [date]);

  /* ---------- Absolute URLs ---------- */
  const baseUrl = process.env.NEXT_BASE_URL;

  /* ---------- Structured Data (Google Events) ---------- */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    startDate: isoDate,
    endDate: isoDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: venue,
    },
    image: [
      face_img
        ? `${baseUrl}/event/face/${face_img}`
        : `${baseUrl}/event/face/default.png`,
    ],
    description: card_description,
    organizer: {
      "@type": "Organization",
      name: "TicketGuru",
      url: baseUrl,
    },
    url: `${baseUrl}/event/${slug}`,
  };

  return (
    <article
      className="relative rounded-lg shadow-md hover:shadow-lg transition-all duration-300
      overflow-hidden bg-white"
      itemScope
      itemType="https://schema.org/Event"
    >
      {/* -------- JSON-LD (SEO) -------- */}
      {isoDate && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
        </Head>
      )}

      {/* -------- Date Banner -------- */}
      <div
        className="z-40 text-center absolute -space-y-1.5 flex flex-col text-white
        top-0 left-4 rounded-b-lg px-3 py-1 bg-orange-500 shadow-md uppercase justify-center"
      >
        <time
          dateTime={isoDate || undefined}
          className="text-3xl font-bold"
          itemProp="startDate"
        >
          {day}
        </time>
        <span>{month}</span>
      </div>

      {/* -------- Event Image -------- */}
      {/* <div className="relative aspect-359/236 top-0"> */}
      <div className="relative aspect-square top-0">
        {/* Category */}
        <div
          className="absolute z-40 bottom-4 right-4 px-4 py-1 bg-orange-500 text-white font-medium 
          uppercase rounded-lg text-sm shadow-md"
        >
          {category}
        </div>

        <Image
          src={face_img ? `/event/face/${face_img}` : `/event/face/default.png`}
          alt={`${name} event at ${venue} | ${category}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-center object-cover"
          itemProp="image"
        />
      </div>

      {/* -------- Event Content -------- */}
      <div className="p-4 flex-col flex space-y-2 ">
        <h3
          className="font-bold text-gray-600 text-xl uppercase line-clamp-1 text-ellipsis"
          itemProp="name"
        >
          {name}
        </h3>

        <div className="flex flex-col uppercase -space-y-1.5 text-orange-500">
          <span className="font-bold">
            {start ? `${start} - ${end || "ONWARDS"}` : "00:00 - 00:00"}
          </span>

          <address
            className="font-normal not-italic line-clamp-1 text-ellipsis"
            itemProp="location"
          >
            {venue}
          </address>
        </div>

        <p
          className="text-[#646464] tracking-normal leading-5 font-light line-clamp-3 text-ellipsis"
          itemProp="description"
        >
          {card_description ||
            `A high-energy live event featuring unforgettable moments and amazing experiences.`}
        </p>

        <Button
          wfull={true}
          title={
            sale == 1 ? `Buy Tickets` : sale == 2 ? `Coming Soon` : `Sold Out`
          }
          link={`/event/${slug}`}
          margins="mt-3"
          disabled={sale == 2 || sale == 0}
        />
      </div>
    </article>
  );
};

export default memo(EventCard);
