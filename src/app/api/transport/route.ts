import { NextResponse } from "next/server";
import { transportInfo } from "@/data/transport";

export async function GET() {
  return NextResponse.json(transportInfo);
}
