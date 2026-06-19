import { Calendar, Clock, ExternalLink, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  parseJsonArray,
  parseJsonLinks,
  formatEventDate,
} from "@/lib/utils";
import type {
  Contact,
  CourseRegistration,
  Event,
  HostelInfo,
  Proctor,
  TransportInfo,
} from "@/lib/types";

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-md bg-muted/50 p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 text-sm">{value}</p>
      </div>
    </div>
  );
}

function ChecklistSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <h4 className="mb-3 font-medium text-primary">{title}</h4>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-2 rounded-md border border-border bg-card p-3 text-sm"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MainInductionSection({ event }: { event: Event | null }) {
  if (!event) return <EmptySection message="Main induction details are not available yet." />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>Main Induction Programme</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{event.description}</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <InfoRow icon={Calendar} label="Date" value={formatEventDate(event.date)} />
          <InfoRow icon={Clock} label="Time" value={event.time} />
          <InfoRow icon={MapPin} label="Venue" value={event.venue} />
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/main-induction">View full page →</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function SchoolInductionSection({ event }: { event: Event | null }) {
  if (!event) return <EmptySection message="School induction details are not available yet." />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.schoolName ?? event.title}</CardTitle>
        <CardDescription>School Induction</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{event.description}</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <InfoRow icon={Calendar} label="Date" value={formatEventDate(event.date)} />
          <InfoRow icon={Clock} label="Time" value={event.time} />
          <InfoRow icon={MapPin} label="Venue" value={event.venue} />
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/school-induction">View full page →</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function EPTSection({ event }: { event: Event | null }) {
  if (!event) return <EmptySection message="EPT details are not available yet." />;

  if (event.eptRequired === false) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-lg font-medium text-primary">
            You are not required to attend EPT.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>English Proficiency Test (EPT)</CardTitle>
        <CardDescription>
          {event.eptRequired ? "Attendance Required" : "Optional"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {event.instructions && (
          <p className="rounded-md border border-accent/30 bg-accent/10 p-4 text-sm">
            {event.instructions}
          </p>
        )}
        <div className="grid gap-3 sm:grid-cols-3">
          <InfoRow icon={Calendar} label="Date" value={formatEventDate(event.date)} />
          <InfoRow icon={Clock} label="Time" value={event.time} />
          <InfoRow icon={MapPin} label="Venue" value={event.venue} />
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/ept">View full page →</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function CourseRegistrationSection({
  data,
}: {
  data: CourseRegistration | null;
}) {
  if (!data) return <EmptySection message="Course registration details are not available yet." />;

  const steps = parseJsonArray(data.steps);
  const links = parseJsonLinks(data.links);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          {steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        {data.notes && (
          <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">{data.notes}</p>
        )}
        {links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-primary"
              >
                {link.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        )}
        <Button asChild variant="outline" size="sm">
          <Link href="/course-registration">View full page →</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function DocumentVerificationSection({ event }: { event: Event | null }) {
  if (!event) return <EmptySection message="Document verification details are not available yet." />;

  const documents = parseJsonArray(event.requiredDocuments);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Verification</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <InfoRow icon={Calendar} label="Date" value={formatEventDate(event.date)} />
          <InfoRow icon={Clock} label="Time" value={event.time} />
          <InfoRow icon={MapPin} label="Venue" value={event.venue} />
        </div>
        <ChecklistSection title="Required Documents" items={documents} />
        <Button asChild variant="outline" size="sm">
          <Link href="/document-verification">View full page →</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function ProctorSection({ proctor }: { proctor: Proctor | null }) {
  if (!proctor) return <EmptySection message="Proctor information is not available yet." />;

  return (
    <Card>
      <CardContent className="flex flex-col gap-6 p-6 sm:flex-row">
        <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-lg bg-muted text-4xl font-bold text-secondary">
          {proctor.name.charAt(0)}
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-xl font-semibold text-primary">{proctor.name}</h3>
            <p className="text-sm text-muted-foreground">{proctor.department}</p>
          </div>
          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <InfoRow icon={MapPin} label="Venue" value={proctor.venue} />
            <InfoRow icon={Calendar} label="Meeting Date" value={formatEventDate(proctor.meetingDate)} />
            <InfoRow icon={Clock} label="Meeting Time" value={proctor.meetingTime} />
          </div>
          {proctor.notes && (
            <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">{proctor.notes}</p>
          )}
          <Button asChild variant="outline" size="sm">
            <Link href="/proctor">View full page →</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function TransportSection({ data }: { data: TransportInfo | null }) {
  if (!data) return <EmptySection message="Transport information is not available yet." />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <h4 className="mb-1 font-medium text-primary">Bus Information</h4>
          <p className="text-muted-foreground">{data.busInformation}</p>
        </div>
        <div>
          <h4 className="mb-1 font-medium text-primary">Shuttle Information</h4>
          <p className="text-muted-foreground">{data.shuttleInformation}</p>
        </div>
        <div>
          <h4 className="mb-1 font-medium text-primary">Arrival Instructions</h4>
          <p className="text-muted-foreground">{data.arrivalInstructions}</p>
        </div>
        {data.mapLink && (
          <a
            href={data.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:underline"
          >
            View Campus Map
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        <Button asChild variant="outline" size="sm">
          <Link href="/transport">View full page →</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function HostelSection({ data }: { data: HostelInfo | null }) {
  if (!data) return <EmptySection message="Hostel information is not available yet." />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hosteller Information</CardTitle>
        <CardDescription>{data.instructions}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ChecklistSection title="Documents Required" items={parseJsonArray(data.documents)} />
        <ChecklistSection title="Items To Bring" items={parseJsonArray(data.itemsToBring)} />
        <div>
          <h4 className="mb-2 font-medium text-primary">Hostel Rules</h4>
          <p className="text-sm text-muted-foreground">{data.rules}</p>
        </div>
        <p className="text-sm">
          <span className="font-medium text-primary">Contact: </span>
          {data.contactInfo}
        </p>
        <Button asChild variant="outline" size="sm">
          <Link href="/hostel">View full page →</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function ContactsSection({ contacts }: { contacts: Contact[] }) {
  if (contacts.length === 0) return <EmptySection message="Contact details are not available yet." />;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {contacts.map((contact) => (
        <Card key={contact.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{contact.department}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p className="font-medium">{contact.name}</p>
            <p className="text-muted-foreground">{contact.designation}</p>
            <p>
              <a href={`mailto:${contact.email}`} className="text-secondary hover:underline">
                {contact.email}
              </a>
            </p>
            <p>
              <a href={`tel:${contact.phone}`} className="text-secondary hover:underline">
                {contact.phone}
              </a>
            </p>
          </CardContent>
        </Card>
      ))}
      <div className="sm:col-span-2">
        <Button asChild variant="outline" size="sm">
          <Link href="/contacts">View full page →</Link>
        </Button>
      </div>
    </div>
  );
}

function EmptySection({ message }: { message: string }) {
  return (
    <Card>
      <CardContent className="py-8 text-center text-sm text-muted-foreground">
        {message}
      </CardContent>
    </Card>
  );
}
