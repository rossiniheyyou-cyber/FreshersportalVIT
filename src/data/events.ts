import { EventType, type Event } from "@/lib/types";

export const events: Event[] = [
  {
    id: "evt-main-induction",
    title: "VIT Chennai Freshers Inauguration",
    description:
      "Welcome ceremony for first-year students, introduction to campus life, faculty, and support services.",
    date: "2026-07-01",
    time: "09:00",
    venue: "Auditorium A",
    type: EventType.MAIN_INDUCTION,
    instructions:
      "Please carry your admission letter and government-issued photo ID for verification.",
  },
  {
    id: "evt-school-induction",
    title: "School of Computer Science & Engineering Induction",
    description:
      "Campus orientation and academic briefing for the School of Computer Science & Engineering.",
    date: "2026-07-03",
    time: "11:00",
    venue: "School of Computing Seminar Hall",
    type: EventType.SCHOOL_INDUCTION,
    schoolName: "School of Computer Science & Engineering",
  },
  {
    id: "evt-ept",
    title: "English Proficiency Test (EPT)",
    description:
      "English proficiency assessment for incoming first-year students to support elective and remedial class placement.",
    date: "2026-07-05",
    time: "14:00",
    venue: "Language Lab 4",
    type: EventType.EPT,
    eptRequired: true,
    instructions:
      "Arrive 15 minutes early with stationery and a valid photo ID. Mobile phones are not permitted inside the exam hall.",
  },
  {
    id: "evt-doc-verification",
    title: "Document Verification",
    description:
      "Verification of original certificates, photo ID, and admission documents for first-year students.",
    date: "2026-06-30",
    time: "10:00",
    venue: "Academic Block C, Room 102",
    type: EventType.DOCUMENT_VERIFICATION,
    requiredDocuments: JSON.stringify([
      "Class 12 Marksheet",
      "Entrance Exam Scorecard",
      "Transfer Certificate",
      "Aadhaar Card",
      "Passport-sized photographs",
    ]),
  },
  {
    id: "evt-proctor-meeting",
    title: "Proctor Meeting for First Year Students",
    description:
      "Meet your assigned proctor, collect academic guidance, and clarify hostel and transport procedures.",
    date: "2026-07-02",
    time: "16:00",
    venue: "Proctor Office, Academic Block B",
    type: EventType.PROCTOR_MEETING,
    instructions:
      "Bring your provisional admission letter and hostel allotment slip for record verification.",
  },
];
