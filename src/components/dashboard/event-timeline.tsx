import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EVENT_TYPE_LABELS } from "@/lib/constants/navigation";
import { formatEventDate } from "@/lib/utils";
import type { Event } from "@/lib/types";

export function EventTimeline({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-0 border-l-2 border-secondary/30 pl-6">
          {events.map((event, index) => (
            <li key={event.id} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[1.6rem] flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground ring-4 ring-background">
                {index + 1}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                  {EVENT_TYPE_LABELS[event.type]}
                </p>
                <h4 className="mt-1 font-medium text-primary">{event.title}</h4>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatEventDate(event.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {event.time}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {event.venue}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
