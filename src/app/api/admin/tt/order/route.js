import { Order_Create_data } from "@/constant/dummy";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    // const data = await request.json();
    const data = Order_Create_data;
    console.log("==============CHECKOUT HEADER==============");
    console.log("id : ", "auto pk");
    console.log("order_id : ", data?.payload?.id.split("_")[1]);
    console.log("order_type : ", "T");
    console.log("order_value : ", data?.payload?.total);
    console.log("currency : ", data?.payload?.currency?.code?.toUpperCase());
    console.log("checkout_date : ", data?.created_at);
    console.log("created_at : ", Date.now());
    console.log("payment_provider : ", data?.payload?.payment_method?.type);
    console.log("payment_id : ", data?.payload?.txn_id);
    console.log("state : ", data?.payload?.status === "completed" ? 1 : 0);
    console.log("==============CHECKOUT DETAILS==============");
    console.log("id : ", "auto pk");
    console.log("checkout_id : ", "checkout_hed.id fk");
    console.log(
      "item_id : ",
      data?.payload?.event_summary?.event_id.split("_")[1],
    );
    console.log(
      "event_id : ",
      data?.payload?.event_summary?.event_id.split("_")[1],
    );
    console.log("product_id : ", null);
    console.log("item_name : ", data?.payload?.event_summary?.name);
    console.log("quantity : ", 1);
    console.log("unit : ", data?.payload?.total);
    console.log("line_total : ", data?.payload?.total);
    console.log("==============CUSTOMER DETAILS==============");
    console.log("id : ", "auto pk");
    console.log("checkout_id : ", "checkout_hed.id fk");
    console.log("first_name : ", data?.payload?.buyer_details?.first_name);
    console.log("last_name : ", data?.payload?.buyer_details?.last_name);
    console.log("email : ", data?.payload?.buyer_details?.email);
    console.log("phone : ", data?.payload?.buyer_details?.phone);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.log("Internal Server Error ! : ", err);
    return NextResponse.json(
      { error: "Internal Server Error !" },
      { status: 500 },
    );
  }
};
