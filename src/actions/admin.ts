"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { EventType } from "@/lib/types";
import { events } from "@/data/events";
import { proctors } from "@/data/proctor";
import { courseRegistrations } from "@/data/courseRegistration";
import { transportInfo } from "@/data/transport";
import { hostelInfo } from "@/data/hostel";
import { contacts } from "@/data/contacts";

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/main-induction");
  revalidatePath("/school-induction");
  revalidatePath("/ept");
  revalidatePath("/course-registration");
  revalidatePath("/document-verification");
  revalidatePath("/proctor");
  revalidatePath("/transport");
  revalidatePath("/hostel");
  revalidatePath("/contacts");
}

const normalizeOptionalString = (value: FormDataEntryValue | null) => {
  const text = typeof value === "string" ? value.trim() : "";
  return text.length > 0 ? text : null;
};

const parseBoolean = (value: FormDataEntryValue | null) => {
  const text = typeof value === "string" ? value.trim() : "";
  if (text === "true") return true;
  if (text === "false") return false;
  return null;
};

export async function createEvent(formData: FormData) {
  events.push({
    id: randomUUID(),
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    date: String(formData.get("date") ?? ""),
    time: String(formData.get("time") ?? ""),
    venue: String(formData.get("venue") ?? ""),
    type: formData.get("type") as EventType,
    schoolName: normalizeOptionalString(formData.get("schoolName")),
    eptRequired: parseBoolean(formData.get("eptRequired")),
    instructions: normalizeOptionalString(formData.get("instructions")),
    requiredDocuments: normalizeOptionalString(formData.get("requiredDocuments")),
  });
  revalidateAll();
}

export async function updateEvent(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const event = events.find((item) => item.id === id);
  if (!event) return;

  event.title = String(formData.get("title") ?? "");
  event.description = String(formData.get("description") ?? "");
  event.date = String(formData.get("date") ?? "");
  event.time = String(formData.get("time") ?? "");
  event.venue = String(formData.get("venue") ?? "");
  event.type = formData.get("type") as EventType;
  event.schoolName = normalizeOptionalString(formData.get("schoolName"));
  event.eptRequired = parseBoolean(formData.get("eptRequired"));
  event.instructions = normalizeOptionalString(formData.get("instructions"));
  event.requiredDocuments = normalizeOptionalString(formData.get("requiredDocuments"));

  revalidateAll();
}

export async function deleteEvent(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const index = events.findIndex((item) => item.id === id);
  if (index >= 0) {
    events.splice(index, 1);
  }
  revalidateAll();
}

export async function createProctor(formData: FormData) {
  proctors.push({
    id: randomUUID(),
    name: String(formData.get("name") ?? ""),
    photoUrl: normalizeOptionalString(formData.get("photoUrl")),
    department: String(formData.get("department") ?? ""),
    venue: String(formData.get("venue") ?? ""),
    meetingDate: String(formData.get("meetingDate") ?? ""),
    meetingTime: String(formData.get("meetingTime") ?? ""),
    notes: normalizeOptionalString(formData.get("notes")),
  });
  revalidateAll();
}

export async function updateProctor(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const proctor = proctors.find((item) => item.id === id);
  if (!proctor) return;

  proctor.name = String(formData.get("name") ?? "");
  proctor.photoUrl = normalizeOptionalString(formData.get("photoUrl"));
  proctor.department = String(formData.get("department") ?? "");
  proctor.venue = String(formData.get("venue") ?? "");
  proctor.meetingDate = String(formData.get("meetingDate") ?? "");
  proctor.meetingTime = String(formData.get("meetingTime") ?? "");
  proctor.notes = normalizeOptionalString(formData.get("notes"));

  revalidateAll();
}

export async function deleteProctor(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const index = proctors.findIndex((item) => item.id === id);
  if (index >= 0) {
    proctors.splice(index, 1);
  }
  revalidateAll();
}

export async function createCourseRegistration(formData: FormData) {
  courseRegistrations.push({
    id: randomUUID(),
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    steps: String(formData.get("steps") ?? ""),
    notes: String(formData.get("notes") ?? ""),
    links: String(formData.get("links") ?? ""),
  });
  revalidateAll();
}

export async function updateCourseRegistration(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const item = courseRegistrations.find((record) => record.id === id);
  if (!item) return;

  item.title = String(formData.get("title") ?? "");
  item.description = String(formData.get("description") ?? "");
  item.steps = String(formData.get("steps") ?? "");
  item.notes = String(formData.get("notes") ?? "");
  item.links = String(formData.get("links") ?? "");

  revalidateAll();
}

export async function deleteCourseRegistration(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const index = courseRegistrations.findIndex((item) => item.id === id);
  if (index >= 0) {
    courseRegistrations.splice(index, 1);
  }
  revalidateAll();
}

export async function createTransportInfo(formData: FormData) {
  transportInfo.push({
    id: randomUUID(),
    title: String(formData.get("title") ?? ""),
    busInformation: String(formData.get("busInformation") ?? ""),
    shuttleInformation: String(formData.get("shuttleInformation") ?? ""),
    arrivalInstructions: String(formData.get("arrivalInstructions") ?? ""),
    mapLink: normalizeOptionalString(formData.get("mapLink")),
  });
  revalidateAll();
}

export async function updateTransportInfo(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const item = transportInfo.find((record) => record.id === id);
  if (!item) return;

  item.title = String(formData.get("title") ?? "");
  item.busInformation = String(formData.get("busInformation") ?? "");
  item.shuttleInformation = String(formData.get("shuttleInformation") ?? "");
  item.arrivalInstructions = String(formData.get("arrivalInstructions") ?? "");
  item.mapLink = normalizeOptionalString(formData.get("mapLink"));

  revalidateAll();
}

export async function deleteTransportInfo(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const index = transportInfo.findIndex((item) => item.id === id);
  if (index >= 0) {
    transportInfo.splice(index, 1);
  }
  revalidateAll();
}

export async function createHostelInfo(formData: FormData) {
  hostelInfo.push({
    id: randomUUID(),
    instructions: String(formData.get("instructions") ?? ""),
    documents: String(formData.get("documents") ?? ""),
    itemsToBring: String(formData.get("itemsToBring") ?? ""),
    rules: String(formData.get("rules") ?? ""),
    contactInfo: String(formData.get("contactInfo") ?? ""),
  });
  revalidateAll();
}

export async function updateHostelInfo(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const item = hostelInfo.find((record) => record.id === id);
  if (!item) return;

  item.instructions = String(formData.get("instructions") ?? "");
  item.documents = String(formData.get("documents") ?? "");
  item.itemsToBring = String(formData.get("itemsToBring") ?? "");
  item.rules = String(formData.get("rules") ?? "");
  item.contactInfo = String(formData.get("contactInfo") ?? "");

  revalidateAll();
}

export async function deleteHostelInfo(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const index = hostelInfo.findIndex((item) => item.id === id);
  if (index >= 0) {
    hostelInfo.splice(index, 1);
  }
  revalidateAll();
}

export async function createContact(formData: FormData) {
  contacts.push({
    id: randomUUID(),
    name: String(formData.get("name") ?? ""),
    designation: String(formData.get("designation") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    department: String(formData.get("department") ?? ""),
  });
  revalidateAll();
}

export async function updateContact(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const contact = contacts.find((record) => record.id === id);
  if (!contact) return;

  contact.name = String(formData.get("name") ?? "");
  contact.designation = String(formData.get("designation") ?? "");
  contact.email = String(formData.get("email") ?? "");
  contact.phone = String(formData.get("phone") ?? "");
  contact.department = String(formData.get("department") ?? "");

  revalidateAll();
}

export async function deleteContact(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const index = contacts.findIndex((item) => item.id === id);
  if (index >= 0) {
    contacts.splice(index, 1);
  }
  revalidateAll();
}
