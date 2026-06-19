import { EventType, type Contact, type CourseRegistration, type Event, type HostelInfo, type Proctor, type TransportInfo } from "@/lib/types";
import { events as eventsData } from "@/data/events";
import { proctors } from "@/data/proctor";
import { courseRegistrations } from "@/data/courseRegistration";
import { transportInfo } from "@/data/transport";
import { hostelInfo } from "@/data/hostel";
import { contacts as contactsData } from "@/data/contacts";

export { NAV_ITEMS, EVENT_TYPE_LABELS } from "@/lib/constants/navigation";

export const DASHBOARD_EVENT_TYPES: EventType[] = [
  EventType.MAIN_INDUCTION,
  EventType.SCHOOL_INDUCTION,
  EventType.EPT,
  EventType.DOCUMENT_VERIFICATION,
  EventType.PROCTOR_MEETING,
];

// Re-export for server components that import from portal.ts
export type { EventType };

const sortEventsByDate = (items: Event[]) =>
  [...items].sort((a, b) => a.date.localeCompare(b.date));

export async function getDashboardData() {
  const events = sortEventsByDate(eventsData);
  const proctor = proctors[0] ?? null;
  const courseRegistration = courseRegistrations[0] ?? null;
  const transport = transportInfo[0] ?? null;
  const hostel = hostelInfo[0] ?? null;
  const contacts = [...contactsData].sort((a, b) => a.department.localeCompare(b.department));

  const summaryEvents = events.filter((e) =>
    DASHBOARD_EVENT_TYPES.includes(e.type)
  );

  const upcomingEvents = events.filter(
    (e) => new Date(`${e.date}T23:59:59`) >= new Date()
  );

  return {
    events,
    summaryEvents,
    upcomingEvents,
    proctor,
    courseRegistration,
    transport,
    hostel,
    contacts,
  };
}

export async function getEventByType(type: EventType) {
  return eventsData.find((event) => event.type === type) ?? null;
}

export async function getProctor() {
  return proctors[0] ?? null;
}

export async function getCourseRegistration() {
  return courseRegistrations[0] ?? null;
}

export async function getTransportInfo() {
  return transportInfo[0] ?? null;
}

export async function getHostelInfo() {
  return hostelInfo[0] ?? null;
}

export async function getContacts() {
  return [...contactsData].sort((a, b) => a.department.localeCompare(b.department));
}

export async function getAllEvents() {
  return sortEventsByDate(eventsData);
}

export async function getAllProctors() {
  return [...proctors].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAllCourseRegistrations() {
  return [...courseRegistrations];
}

export async function getAllTransportInfo() {
  return [...transportInfo];
}

export async function getAllHostelInfo() {
  return [...hostelInfo];
}

export async function getAllContacts() {
  return [...contactsData].sort((a, b) => a.department.localeCompare(b.department));
}
