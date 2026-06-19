import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getEventByType } from "@/lib/data/portal";
import { formatEventDate } from "@/lib/utils";
import { EventType } from "@/lib/types";

export default async function SchoolInductionPage() {
  const event = await getEventByType(EventType.SCHOOL_INDUCTION);

  if (!event) {
    return <p className="text-muted-foreground">School induction details are not available yet.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>{event.schoolName ?? event.title}</CardTitle>
          <CardDescription>School Induction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="leading-relaxed text-muted-foreground">{event.description}</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border p-4">
              <Calendar className="mb-2 h-5 w-5 text-secondary" />
              <p className="text-xs font-medium uppercase text-muted-foreground">Date</p>
              <p className="mt-1 font-medium">{formatEventDate(event.date)}</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <Clock className="mb-2 h-5 w-5 text-secondary" />
              <p className="text-xs font-medium uppercase text-muted-foreground">Time</p>
              <p className="mt-1 font-medium">{event.time}</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <MapPin className="mb-2 h-5 w-5 text-secondary" />
              <p className="text-xs font-medium uppercase text-muted-foreground">Venue</p>
              <p className="mt-1 font-medium">{event.venue}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
