import Link from "next/link";
import { EventTimeline } from "@/components/dashboard/event-timeline";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { getDashboardData } from "@/lib/data/portal";
import { NAV_ITEMS, EVENT_TYPE_LABELS } from "@/lib/constants/navigation";

export default async function DashboardPage() {
  const data = await getDashboardData();

  // determine which event-driven pages are shown in key events
  const keyEventHrefs = new Set<string>(
    data.summaryEvents.map((e) => {
      switch (e.type) {
        case "MAIN_INDUCTION":
          return "/main-induction";
        case "SCHOOL_INDUCTION":
          return "/school-induction";
        case "EPT":
          return "/ept";
        case "DOCUMENT_VERIFICATION":
          return "/document-verification";
        case "PROCTOR_MEETING":
          return "/proctor";
        default:
          return "/";
      }
    })
  );

  const otherSections = NAV_ITEMS.filter((item) => item.href !== "/" && !keyEventHrefs.has(item.href));

  const eventByHref = (href: string) => {
    switch (href) {
      case "/main-induction":
        return data.events.find((event) => event.type === "MAIN_INDUCTION");
      case "/school-induction":
        return data.events.find((event) => event.type === "SCHOOL_INDUCTION");
      case "/ept":
        return data.events.find((event) => event.type === "EPT");
      case "/document-verification":
        return data.events.find((event) => event.type === "DOCUMENT_VERIFICATION");
      default:
        return null;
    }
  };

  const sectionMeta = (href: string) => {
    const event = eventByHref(href);

    if (event) {
      return {
        label: EVENT_TYPE_LABELS[event.type as keyof typeof EVENT_TYPE_LABELS] ?? event.title,
        description: `${event.date} · ${event.time}`,
        venue: event.venue,
      };
    }

    if (href === "/proctor" && data.proctor) {
      return {
        label: data.proctor.name,
        description: `${data.proctor.meetingDate} · ${data.proctor.meetingTime}`,
        venue: data.proctor.venue,
      };
    }

    if (href === "/course-registration" && data.courseRegistration) {
      return {
        label: data.courseRegistration.title,
        description: data.courseRegistration.description,
      };
    }

    if (href === "/transport" && data.transport) {
      return {
        label: data.transport.title,
        description: data.transport.arrivalInstructions || data.transport.busInformation,
      };
    }

    if (href === "/hostel" && data.hostel) {
      return {
        label: "Hosteller Information",
        description: data.hostel.instructions,
      };
    }

    if (href === "/contacts") {
      return {
        label: "Contact Details",
        description: "Find the right campus contact for support and queries.",
      };
    }

    return {
      label: "Details",
      description: "Open this section for more information.",
    };
  };

  const quickLinks = [
    { label: "Admission Info", href: "https://chennai.vit.ac.in/apply-now/" },
    { label: "Campus Tour", href: "https://chennaicampustour.vit.ac.in/" },
    { label: "Way Finder", href: "https://chennaiwayfinder.vit.ac.in/" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-primary">Welcome, Fresher!</h2>
        <p className="mt-1 text-muted-foreground">
          Find all your onboarding information in one place — induction schedules,
          registration steps, hostel details, and important contacts.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Key Events at a Glance</h3>
        <SummaryCards events={data.summaryEvents} />
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Other Sections</h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {otherSections.map((item) => {
            const meta = sectionMeta(item.href);
            return (
              <Link key={item.href} href={item.href} className="rounded-2xl border border-border bg-card p-4 text-sm transition hover:shadow-md">
                <div className="space-y-3">
                  <div className="font-semibold text-primary">{item.label}</div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{meta.description}</p>
                  {meta.venue ? (
                    <p className="text-xs text-muted-foreground">Venue: {meta.venue}</p>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Upcoming Events</h3>
        <EventTimeline events={data.upcomingEvents} />
        <Card>
          <CardHeader>
            <CardTitle>Need help?</CardTitle>
            <CardDescription>Use the official VIT Chennai admission and campus links for more details.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={`${link.label}-dashboard`}
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
      </section>
    </div>
  );
}
