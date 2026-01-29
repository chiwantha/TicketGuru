import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const sql = `SELECT 
    events.name,
    events.slug,
    mst_category.category AS category,
    events.start_time,
    events.end_time,
    events.venue,
    events.date,
    events.face_img,
    events.card_description
     FROM events
     INNER JOIN mst_category ON events.category_id = mst_category.id
     WHERE events.state = 1 ORDER BY events.date ASC LIMIT 8 ;`;
    const events = await query(sql);

    if (!events) {
      console.log("No Event Cards Found");
      return NextResponse.json({ events: [] }, { status: 404 });
    }

    return NextResponse.json(events, { status: 200 });
  } catch (err) {
    console.error(`Internal Server Error ! `, err);
    return NextResponse.json(
      { error: `Internal Server Error` },
      { status: 500 },
    );
  }
};
