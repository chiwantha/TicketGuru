import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const data = await request.json();
    console.log("Checkout Data Received:", data);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.log("Internal Server Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
