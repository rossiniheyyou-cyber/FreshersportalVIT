import { Calendar, CheckCircle2, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getEventByType } from "@/lib/data/portal";
import { formatEventDate, parseJsonArray } from "@/lib/utils";
import { EventType } from "@/lib/types";

export default async function DocumentVerificationPage() {
  const event = await getEventByType(EventType.DOCUMENT_VERIFICATION);

  if (!event) {
    return (
      <p className="text-muted-foreground">Document verification details are not available yet.</p>
    );
  }

  const documents = parseJsonArray(event.requiredDocuments);

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Document Verification</CardTitle>
          <CardDescription>{event.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
          <div>
            <h3 className="mb-4 font-semibold text-primary">Required Documents</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {documents.map((doc) => (
                <div
                  key={doc}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
