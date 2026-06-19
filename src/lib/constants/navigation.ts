export const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/main-induction", label: "Main Induction", icon: "GraduationCap" },
  { href: "/school-induction", label: "School Induction", icon: "School" },
  { href: "/ept", label: "EPT", icon: "BookOpen" },
  { href: "/course-registration", label: "Course Registration", icon: "ClipboardList" },
  { href: "/document-verification", label: "Document Verification", icon: "FileCheck" },
  { href: "/proctor", label: "Proctor Information", icon: "UserCircle" },
  { href: "/transport", label: "Transport Information", icon: "Bus" },
  { href: "/hostel", label: "Hosteller Information", icon: "Building" },
  { href: "/contacts", label: "Contact Details", icon: "Phone" },
] as const;

export const EVENT_TYPE_LABELS = {
  MAIN_INDUCTION: "Main Induction",
  SCHOOL_INDUCTION: "School Induction",
  EPT: "EPT",
  DOCUMENT_VERIFICATION: "Document Verification",
  PROCTOR_MEETING: "Proctor Meeting",
} as const;
