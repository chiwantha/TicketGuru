import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { slug } = await params;

    const sql = `SELECT * FROM events WHERE slug=?`;

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
