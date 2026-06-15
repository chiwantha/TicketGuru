import Skeleton from "@/components/common/skeleton/Skeleton";
import EventCard from "@/components/user/cards/event/EventCard";
import { eventsList } from "@/constant/dummy";

async function get_event_cards(limit) {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await fetch(
      `${process.env.NEXT_BASE_URL}/api/user/events?limit=${limit || 4}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.log(`Failed to Fetch Event Cards : ${res.status}`);
      return { events: [] };
    }

    return await res.json();
  } catch (err) {
    console.log(`Error Fetching Event Cards : ${err}`);
    return { events: [] };
  }
}

const EventGrid = async ({ cards }) => {
  const events = eventsList;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6">
      {events && events.length > 0 ? (
        events.map((event, index) => (
          <EventCard key={event.id ?? index} event={event} />
        ))
      ) : (
        <>
          <Skeleton skfor={`event_card`} />
          <Skeleton skfor={`event_card`} />
          <Skeleton skfor={`event_card`} />
          <Skeleton skfor={`event_card`} />
        </>
      )}
    </div>
  );
};

export default EventGrid;
