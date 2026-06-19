export enum EventType {
  MAIN_INDUCTION = "MAIN_INDUCTION",
  SCHOOL_INDUCTION = "SCHOOL_INDUCTION",
  EPT = "EPT",
  DOCUMENT_VERIFICATION = "DOCUMENT_VERIFICATION",
  PROCTOR_MEETING = "PROCTOR_MEETING",
}

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  type: EventType;
  schoolName?: string | null;
  eptRequired?: boolean | null;
  instructions?: string | null;
  requiredDocuments?: string | null;
};

export type Proctor = {
  id: string;
  name: string;
  photoUrl?: string | null;
  department: string;
  venue: string;
  meetingDate: string;
  meetingTime: string;
  notes?: string | null;
};

export type CourseRegistration = {
  id: string;
  title: string;
  description: string;
  steps: string;
  notes: string;
  links: string;
};

export type TransportInfo = {
  id: string;
  title: string;
  busInformation: string;
  shuttleInformation: string;
  arrivalInstructions: string;
  mapLink?: string | null;
};

export type HostelInfo = {
  id: string;
  instructions: string;
  documents: string;
  itemsToBring: string;
  rules: string;
  contactInfo: string;
};

export type Contact = {
  id: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  department: string;
};
