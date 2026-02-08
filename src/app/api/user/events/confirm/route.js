import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const tt_event_id = searchParams.get(`tt_event_id`) || "";

    const sql = `SELECT ticket_tailor_link.tt_event_id,events.name, events.id, events.face_img, events.banner_img FROM ticket_tailor_link
    INNER JOIN events ON ticket_tailor_link.event_id = events.id WHERE ticket_tailor_link.tt_event_id = ?`;

    const event = await query(sql, [tt_event_id]);

    if (event.length === 0 || !event[0].id) {
      return NextResponse.json({ error: "Event Not Found !" }, { status: 404 });
    }

    return NextResponse.json(event[0], { status: 200 });
  } catch (err) {
    console.log("Internal Server Error ! : ", err);
    return NextResponse.json(
      { error: "Internal Server Error !" },
      { status: 500 },
    );
  }
};
