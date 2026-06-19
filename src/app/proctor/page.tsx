import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getProctor } from "@/lib/data/portal";
import { formatEventDate } from "@/lib/utils";

export default async function ProctorPage() {
  const proctor = await getProctor();

  if (!proctor) {
    return <p className="text-muted-foreground">Proctor information is not available yet.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="flex items-center justify-center bg-primary p-8 sm:w-48">
              {proctor.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={proctor.photoUrl}
                  alt={proctor.name}
                  className="h-32 w-32 rounded-full object-cover ring-4 ring-accent"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-accent text-4xl font-bold text-accent-foreground">
                  {proctor.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 space-y-4 p-6">
              <div>
                <h2 className="text-2xl font-bold text-primary">{proctor.name}</h2>
                <p className="text-muted-foreground">{proctor.department}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 text-secondary" />
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Venue</p>
                    <p>{proctor.venue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Calendar className="mt-0.5 h-4 w-4 text-secondary" />
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Meeting Date</p>
                    <p>{formatEventDate(proctor.meetingDate)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Clock className="mt-0.5 h-4 w-4 text-secondary" />
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Meeting Time</p>
                    <p>{proctor.meetingTime}</p>
                  </div>
                </div>
              </div>
              {proctor.notes && (
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    Meeting Notes
                  </p>
                  <p className="mt-1 text-sm">{proctor.notes}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
