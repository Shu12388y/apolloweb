/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { DBCONNECT } from "@/lib/db";
import Doctor from "@/schema/schema";



DBCONNECT();
export async function GET() {
  try {
    // @ts-nocheck
    const doctors = await (Doctor as any).find({});

    return NextResponse.json(doctors, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create doctor" },
      { status: 500 }
    );
  }
}
