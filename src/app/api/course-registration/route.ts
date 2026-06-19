import { NextResponse } from "next/server";
import { courseRegistrations } from "@/data/courseRegistration";

export async function GET() {
  return NextResponse.json(courseRegistrations);
}
