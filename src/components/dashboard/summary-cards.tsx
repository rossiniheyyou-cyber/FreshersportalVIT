import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EVENT_TYPE_LABELS } from "@/lib/constants/navigation";
import { formatEventDate } from "@/lib/utils";
import type { Event } from "@/lib/types";

function eventHref(event: Event) {
  switch (event.type) {
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
}

export function SummaryCards({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No induction events scheduled yet.</p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <Link key={event.id} href={eventHref(event)} className="group">
          <Card className="border-0 bg-white/90 transition-shadow group-hover:shadow-lg">
            <div className="rounded-[18px] p-4 transition-transform group-hover:-translate-y-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{EVENT_TYPE_LABELS[event.type]}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-1">{event.title}</p>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 shrink-0 text-secondary" />
                  <span>{formatEventDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 shrink-0 text-secondary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <span className="line-clamp-2">{event.venue}</span>
                </div>
              </CardContent>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
