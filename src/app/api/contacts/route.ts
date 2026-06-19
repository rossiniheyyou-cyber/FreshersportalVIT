import { NextResponse } from "next/server";
import { contacts } from "@/data/contacts";

export async function GET() {
  const sortedContacts = [...contacts].sort((a, b) => a.department.localeCompare(b.department));
  return NextResponse.json(sortedContacts);
}
