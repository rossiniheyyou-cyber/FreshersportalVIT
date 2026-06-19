import { NextResponse } from "next/server";
import { hostelInfo } from "@/data/hostel";

export async function GET() {
  return NextResponse.json(hostelInfo);
}
