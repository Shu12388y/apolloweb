import { NextResponse, NextRequest } from "next/server";
import { DBCONNECT } from "@/lib/db";
import Doctor from "@/schema/schema";

DBCONNECT();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const doctor = new Doctor(body);
    await doctor.save();

    return NextResponse.json(
      { message: "Doctor created successfully", doctor },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Failed to create doctor"},
      { status: 500 }
    );
  }
}
