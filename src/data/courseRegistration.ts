import type { CourseRegistration } from "@/lib/types";

export const courseRegistrations: CourseRegistration[] = [
  {
    id: "course-registration-1",
    title: "First-Year Course Registration",
    description:
      "Complete course registration for the first semester through the VIT academic portal.",
    steps: JSON.stringify([
      "Open the VIT academic portal and sign in with your student credentials.",
      "Verify your personal and academic details before selecting courses.",
      "Review the recommended curriculum for your school and choose elective options.",
      "Submit the registration form and download the confirmation receipt.",
      "Contact the academic office if you need help with course selection or timetable clashes.",
    ]),
    notes:
      "Course registration is mandatory for all new students. The window closes at 5 PM on the last day.",
    links: JSON.stringify([
      {
        label: "VIT Academic Portal",
        url: "https://vit.ac.in/student-portal",
      },
    ]),
  },
];
