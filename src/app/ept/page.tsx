import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getEventByType } from "@/lib/data/portal";
import { formatEventDate } from "@/lib/utils";
import { EventType } from "@/lib/types";

export default async function EPTPage() {
  const event = await getEventByType(EventType.EPT);

  if (!event) {
    return <p className="text-muted-foreground">EPT details are not available yet.</p>;
  }

  if (event.eptRequired === false) {
    return (
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-xl font-medium text-primary">
              You are not required to attend EPT.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>English Proficiency Test (EPT)</CardTitle>
          <CardDescription>Attendance Required</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {event.instructions && (
            <div className="rounded-lg border border-accent/40 bg-accent/10 p-4">
              <p className="text-sm font-medium text-primary">Instructions</p>
              <p className="mt-2 text-sm text-muted-foreground">{event.instructions}</p>
            </div>
          )}
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
