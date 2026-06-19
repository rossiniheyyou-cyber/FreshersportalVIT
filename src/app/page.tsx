import { EventTimeline } from "@/components/dashboard/event-timeline";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { getDashboardData } from "@/lib/data/portal";

export default async function DashboardPage() {
  const data = await getDashboardData();

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
        <h3 className="text-lg font-semibold text-primary">All Sections</h3>
        <DashboardTabs
          events={data.events}
          proctor={data.proctor}
          courseRegistration={data.courseRegistration}
          transport={data.transport}
          hostel={data.hostel}
          contacts={data.contacts}
        />
      </section>

      <section>
        <EventTimeline events={data.upcomingEvents} />
      </section>
    </div>
  );
}
