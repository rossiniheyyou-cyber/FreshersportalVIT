import type { HostelInfo } from "@/lib/types";

export const hostelInfo: HostelInfo[] = [
  {
    id: "hostel-1",
    instructions:
      "Hostel allotment will be displayed on the student portal. Check your room number and follow the hostel entry process on arrival.",
    documents: JSON.stringify([
      "Original admission letter",
      "Aadhar card",
      "Passport-sized photographs",
      "Medical fitness certificate",
      "Hostel fee payment receipt",
    ]),
    itemsToBring: JSON.stringify([
      "Bedding and pillow covers",
      "Notebook and stationery",
      "Reusable water bottle",
      "Personal toiletries",
      "Power bank and adapters",
    ]),
    rules:
      "Maintain silence after 10 PM. Guests are allowed only with prior permission. Keep your room clean and do not tamper with hostel electrical installations.",
    contactInfo:
      "Hostel Office: +91 44 2747 1000 | Email: hostel@vit.ac.in",
  },
];
