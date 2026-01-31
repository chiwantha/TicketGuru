import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { slug } = await params;

    const sql = `SELECT 
    ticket_tailor_link.tt_id,
    ticket_tailor_link.checkout_hash,
    events.name,
    mst_category.category,
    events.card_description,
    events.description, 
    events.date, 
    events.start_time, 
    events.end_time,
    events.venue,
    events.postal_code,
    events.country,
    events.face_img,
    events.banner_img,
    events.sale
     FROM events
     INNER JOIN mst_category ON mst_category.id = events.category_id
     INNER JOIN ticket_tailor_link ON ticket_tailor_link.event_id = events.id
     WHERE events.slug=?`;

    const event = await query(sql, [slug]);

    if (!event || event.length <= 0) {
      return NextResponse.json({ error: "No Event Found !" }, { status: 404 });
    }

    return NextResponse.json(event[0], { status: 200 });
  } catch (err) {
    console.log(`Internal Server Error ! `, err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
