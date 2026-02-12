import { NextResponse } from "next/server";
import pool, { formatDate, query } from "@/lib/db";

export const POST = async (request) => {
  try {
    const data = await request.json();
    let res;

    if (data?.event === "ORDER.CREATED") {
      res = await createOrder(data);
    } else {
      res = await updateOrder(data);
    }

    console.log("Result : ", res);

    return NextResponse.json({ success: res }, { status: 200 });
  } catch (err) {
    console.log("Internal Server Error ! : ", err);
    return NextResponse.json(
      { error: "Internal Server Error !" },
      { status: 500 },
    );
  }
};

async function createOrder(data) {
  let connection;
  let checkout_id;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Checkout header
    const { id, currency, txn_id, payment_method, status, total } =
      data?.payload || {};
    const checkout_hed_sql = `INSERT INTO checkout_hed (
      order_id, type,value, currency, payment_id, payment_provider, date, state
    ) VALUES (?,?,?,?,?,?,?,?)`;

    const [checkout_hed_res] = await connection.execute(checkout_hed_sql, [
      id.split("_")[1],
      "T",
      total,
      currency?.code,
      txn_id,
      payment_method?.type,
      formatDate(new Date()),
      status === "completed" ? 1 : status === "cancelled" ? 0 : null,
    ]);

    checkout_id = checkout_hed_res.insertId;

    // Checkout details
    const { line_items, event_summary } = data?.payload || {};

    const sys_event_id = await get_event_id(event_summary?.id.split("_")[1]);

    if (!sys_event_id) {
      throw new Error(
        "No system event found for tt_event_id: " + event_summary?.id,
      );
    }

    const checkout_det_sql = `INSERT INTO checkout_det (
      checkout_id, event_id, product_id, product_name, quantity, unit_price
    ) VALUES ?`;

    const line_values = (line_items || []).map((item) => [
      checkout_id,
      sys_event_id,
      item.item_id.split("_")[1],
      item.description,
      item.quantity,
      item.value,
    ]);

    if (line_values.length > 0) {
      await connection.query(checkout_det_sql, [line_values]);
    }

    // Checkout customer
    const { buyer_details } = data?.payload || {};
    const checkout_cust_sql = `INSERT INTO checkout_cust (
      checkout_id, first_name, last_name, email, phone
    ) VALUES (?,?,?,?,?)`;

    await connection.execute(checkout_cust_sql, [
      checkout_id,
      buyer_details?.first_name,
      buyer_details?.last_name,
      buyer_details?.email,
      buyer_details?.phone,
    ]);

    await connection.commit();
    return true;
  } catch (err) {
    console.log("Transaction failed, rolling back:", err);
    if (connection) await connection.rollback();
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function updateOrder(data) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const { id, status, buyer_details } = data?.payload || {};

    // Update checkout header state
    const sql = `UPDATE checkout_hed SET state = ? WHERE order_id = ?`;
    const [hedRes] = await connection.execute(sql, [
      status === "completed" ? 1 : status === "cancelled" ? 0 : null,
      id.split("_")[1],
    ]);

    // Update customer info
    const updateCustSql = `
      UPDATE checkout_cust 
      SET first_name = ?, last_name = ?, email = ?, phone = ? 
      WHERE checkout_id = (SELECT id FROM checkout_hed WHERE order_id = ?)
    `;
    await connection.execute(updateCustSql, [
      buyer_details?.first_name,
      buyer_details?.last_name,
      buyer_details?.email,
      buyer_details?.phone,
      id.split("_")[1],
    ]);

    await connection.commit();
    return true; // success
  } catch (err) {
    console.log("Update transaction failed, rolling back:", err);
    if (connection) await connection.rollback();
    return false; // fallback
  } finally {
    if (connection) connection.release();
  }
}

async function get_event_id(tt_event_id) {
  try {
    const sql = `SELECT event_id FROM ticket_tailor_link WHERE tt_event_id = ?`;
    const res = await query(sql, [tt_event_id]);
    if (res.length > 0) {
      return res[0].event_id;
    } else {
      console.log("No event found for tt_event_id:", tt_event_id);
      return false;
    }
  } catch (err) {
    console.log("Error fetching event id for tt_event_id:", tt_event_id, err);
    return false;
  }
}
