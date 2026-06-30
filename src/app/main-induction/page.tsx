import Link from "next/link";
import { Calendar, Clock, ExternalLink, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ScheduleItem = {
  program: string;
  reportingDate: string;
  inductionDate: string;
  time?: string;
  venue?: string;
};

type ScheduleGroup = {
  title: string;
  items: ScheduleItem[];
};

const scheduleGroups: ScheduleGroup[] = [
  {
    title: "UG Arts & Science Programmes",
    items: [
      { program: "B.Sc. Computer Science", reportingDate: "1 Jul 2026", inductionDate: "2 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "B.Sc. Economics (Hons.)", reportingDate: "1 Jul 2026", inductionDate: "2 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "B.Sc. Fashion Design", reportingDate: "1 Jul 2026", inductionDate: "2 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "B.B.A. (Hons.)", reportingDate: "1 Jul 2026", inductionDate: "2 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "B.Com. (Hons.)", reportingDate: "1 Jul 2026", inductionDate: "2 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "B.Sc. Multimedia and Animation", reportingDate: "1 Jul 2026", inductionDate: "2 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "B.Sc. Visual Communication", reportingDate: "1 Jul 2026", inductionDate: "2 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
    ],
  },
  {
    title: "Integrated Programmes",
    items: [
      { program: "M.Tech. Computer Science and Engineering (Data Science)", reportingDate: "1 Jul 2026", inductionDate: "2 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "M.Tech. Software Engineering", reportingDate: "1 Jul 2026", inductionDate: "2 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "M.Sc. Applied Psychology", reportingDate: "1 Jul 2026", inductionDate: "2 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
    ],
  },
  {
    title: "PG Programmes",
    items: [
      { program: "M.Sc. Chemistry", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "M.Sc. Data Science", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "M.Sc. Physics", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "M.Tech. Structural Engineering", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "M.Tech. Computer Science and Engineering", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "M.Tech. CSE (Artificial Intelligence and Machine Learning)", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "M.Tech. AI & ML (In Collaboration with LTI Mindtree)", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "M.Tech. AI & Data Science (In Collaboration with LTI Mindtree)", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "M.Tech. CSE (Big Data Analytics)", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "Master of Computer Applications (MCA)", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "M.Tech. Electric Mobility", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "M.Tech. Embedded Systems", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "M.Tech. VLSI Design", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "M.Tech. Mechatronics", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "8:30 AM", venue: "MG Auditorium" },
      { program: "Master of Business Administration (MBA)", reportingDate: "2 Jul 2026", inductionDate: "3 Jul 2026", time: "10:00 AM", venue: "VOC Auditorium" },
    ],
  },
  {
    title: "Law Programmes",
    items: [
      { program: "B.A., LL.B. (Hons.) – 5 Year Integrated", reportingDate: "3 Jul 2026", inductionDate: "4 Jul 2026", time: "9:30 AM", venue: "MG Auditorium" },
      { program: "B.B.A., LL.B. (Hons.) – 5 Year Integrated", reportingDate: "3 Jul 2026", inductionDate: "4 Jul 2026", time: "9:30 AM", venue: "MG Auditorium" },
      { program: "LL.M. Corporate Laws (1 year)", reportingDate: "3 Jul 2026", inductionDate: "4 Jul 2026", time: "9:30 AM", venue: "MG Auditorium" },
      { program: "LL.M. International Law and Development (1 year)", reportingDate: "3 Jul 2026", inductionDate: "4 Jul 2026", time: "9:30 AM", venue: "MG Auditorium" },
      { program: "LL.M. Intellectual Property Laws (1 year)", reportingDate: "3 Jul 2026", inductionDate: "4 Jul 2026", time: "9:30 AM", venue: "MG Auditorium" },
    ],
  },
  {
    title: "UG Engineering Programmes",
    items: [
      { program: "B.Tech. Biotechnology", reportingDate: "14 Jul 2026", inductionDate: "15 Jul 2026" },
      { program: "B.Tech. Civil Engineering", reportingDate: "14 Jul 2026", inductionDate: "15 Jul 2026" },
      { program: "B.Tech. Civil Engineering (In Collaboration with L&T)", reportingDate: "14 Jul 2026", inductionDate: "15 Jul 2026" },
      { program: "B.Tech. Electrical and Computer Science Engineering", reportingDate: "14 Jul 2026", inductionDate: "15 Jul 2026" },
      { program: "B.Tech. Electrical and Electronics Engineering", reportingDate: "14 Jul 2026", inductionDate: "15 Jul 2026" },
      { program: "B.Tech. Mechanical Engineering", reportingDate: "14 Jul 2026", inductionDate: "15 Jul 2026" },
      { program: "B.Tech. Mechanical Engineering (Electric Vehicles)", reportingDate: "14 Jul 2026", inductionDate: "15 Jul 2026" },
      { program: "B.Tech. Mechatronics and Automation", reportingDate: "14 Jul 2026", inductionDate: "15 Jul 2026" },
      { program: "B.Tech. Fashion Technology", reportingDate: "14 Jul 2026", inductionDate: "15 Jul 2026" },
      { program: "B.Tech. Computer Science and Engineering", reportingDate: "15 Jul 2026", inductionDate: "16 Jul 2026" },
      { program: "B.Tech. CSE (Artificial Intelligence and Machine Learning)", reportingDate: "16 Jul 2026", inductionDate: "17 Jul 2026" },
      { program: "B.Tech. CSE (Artificial Intelligence and Robotics)", reportingDate: "16 Jul 2026", inductionDate: "17 Jul 2026" },
      { program: "B.Tech. CSE (Cyber Security)", reportingDate: "16 Jul 2026", inductionDate: "17 Jul 2026" },
      { program: "B.Tech. CSE (Cyber Security) – 2+2 Dual Degree", reportingDate: "16 Jul 2026", inductionDate: "17 Jul 2026" },
      { program: "B.Tech. CSE (Data Science)", reportingDate: "16 Jul 2026", inductionDate: "17 Jul 2026" },
      { program: "B.Tech. CSE (Quantum Computing)", reportingDate: "16 Jul 2026", inductionDate: "17 Jul 2026" },
      { program: "B.Tech. Electronics and Communication Engineering", reportingDate: "17 Jul 2026", inductionDate: "18 Jul 2026" },
      { program: "B.Tech. Electronics and Computer Engineering", reportingDate: "17 Jul 2026", inductionDate: "18 Jul 2026" },
      { program: "B.Tech. Electronics Engineering (VLSI Design and Technology)", reportingDate: "17 Jul 2026", inductionDate: "18 Jul 2026" },
    ],
  },
];

const quickLinks = [
  { label: "Admission Info", href: "https://chennai.vit.ac.in/apply-now/" },
  { label: "Campus Tour", href: "https://chennaicampustour.vit.ac.in/" },
  { label: "Way Finder", href: "https://chennaiwayfinder.vit.ac.in/" },
];

const contactDetails = [
  { icon: Mail, label: "Email", value: "admin.chennai@vit.ac.in" },
  { icon: Phone, label: "Phone", value: "+91 44 3993 1555" },
  { icon: MapPin, label: "Address", value: "Vellore Institute of Technology (VIT), Vandalur – Kelambakkam Road, Chennai – 600127, Tamil Nadu, India" },
];

export default function MainInductionPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-5 w-5 text-secondary" />
            Freshers&apos; Induction Programme 2026
          </CardTitle>
          <CardDescription>Hostel Reporting &amp; Induction Dates — All Programmes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The latest induction schedule published by VIT Chennai is now available in the portal so new students can review reporting dates, induction dates, timing, and venue details in one place.
          </p>

          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-lg border border-border bg-muted/40 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                <Calendar className="h-4 w-4 text-secondary" />
                Quick links
              </div>
              <div className="flex flex-wrap gap-2">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-primary hover:bg-secondary hover:text-secondary-foreground"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                <MapPin className="h-4 w-4 text-secondary" />
                Contact details
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                {contactDetails.map((detail) => {
                  const Icon = detail.icon;
                  return (
                    <div key={detail.label} className="flex gap-2">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      <div>
                        <p className="font-medium text-foreground">{detail.label}</p>
                        <p>{detail.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {scheduleGroups.map((group) => (
          <Card key={group.title}>
            <CardHeader>
              <CardTitle>{group.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <div key={item.program} className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="font-medium text-primary">{item.program}</p>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4 text-secondary" /> Reporting: {item.reportingDate}</span>
                          <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4 text-secondary" /> Induction: {item.inductionDate}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        {item.time ? (
                          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4 text-secondary" /> {item.time}</span>
                        ) : null}
                        {item.venue ? (
                          <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4 text-secondary" /> {item.venue}</span>
                        ) : (
                          <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4 text-secondary" /> To be announced</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Need help?</CardTitle>
          <CardDescription>Use the official VIT Chennai admission and campus links for more details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {quickLinks.map((link) => (
              <Link
                key={`${link.label}-secondary`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-primary"
              >
                {link.label}
                <ExternalLink className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
