import { NextResponse } from "next/server";
import { events } from "@/data/events";

export async function GET() {
  const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return NextResponse.json(sortedEvents);
}
