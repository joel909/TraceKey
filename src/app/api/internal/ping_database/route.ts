// src/app/api/internal/ping_database/route.ts
import { pool } from "@/lib/database/config/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW()");
    return new Response(
      JSON.stringify({ success: true, time: result.rows[0].now }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown ) {
    console.error("DB connection test failed:", err);
    if(err instanceof Error){
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );}
  }
}
