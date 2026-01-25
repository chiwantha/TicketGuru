import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const sql = `SELECT * FROM events WHERE state = 1 ORDER BY created_at DESC LIMIT 8 ;`;
    const events = await query(sql);

    if (!events) {
      console.log("No Event Cards Found");
      return NextResponse.json({ events: [] }, { status: 404 });
    }

    return NextResponse.json(events, { status: 200 });
  } catch (err) {
    console.error(`Internal Server Error : ${err}`);
    return NextResponse.json(
      { error: `Internal Server Error` },
      { status: 500 },
    );
  }
};
