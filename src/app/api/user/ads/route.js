import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const ads_query = `SELECT id, name, image, link FROM
    ads WHERE NOW() BETWEEN start_date AND end_date AND state = 1`;

    const ads = await query(ads_query);

    if (!ads || ads.length === 0) {
      return NextResponse.json({ error: "No Ads Found !" }, { status: 404 });
    }

    return NextResponse.json(ads, { status: 200 });
  } catch (err) {
    console.log(`Internal Server Error ! ,`, err);
    return NextResponse.json(
      { error: "Internal Server Error !" },
      { status: 500 },
    );
  }
};
