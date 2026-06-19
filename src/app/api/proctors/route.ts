import { NextResponse } from "next/server";
import { proctors } from "@/data/proctor";

export async function GET() {
  const sortedProctors = [...proctors].sort((a, b) => a.name.localeCompare(b.name));
  return NextResponse.json(sortedProctors);
}
