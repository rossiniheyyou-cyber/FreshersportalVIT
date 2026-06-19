import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createEvent, deleteEvent, updateEvent } from "@/actions/admin";
import { getAllEvents } from "@/lib/data/portal";
import { EVENT_TYPE_LABELS } from "@/lib/constants/navigation";
import { EventType } from "@/lib/types";

export default async function AdminEventsPage() {
  const events = await getAllEvents();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">Manage Events</h1>
        <Link href="/admin" className="text-sm text-secondary hover:underline">← Admin</Link>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Create Event</CardTitle></CardHeader>
        <CardContent>
          <form action={createEvent} className="grid gap-4 sm:grid-cols-2">
            <Field label="Title" name="title" required />
            <Field label="Type" name="type" select options={Object.values(EventType)} />
            <div className="sm:col-span-2"><Field label="Description" name="description" textarea required /></div>
            <Field label="Date" name="date" type="date" required />
            <Field label="Time" name="time" required />
            <div className="sm:col-span-2"><Field label="Venue" name="venue" required /></div>
            <Field label="School Name (optional)" name="schoolName" />
            <Field label="EPT Required (true/false)" name="eptRequired" />
            <div className="sm:col-span-2"><Field label="Instructions (optional)" name="instructions" textarea /></div>
            <div className="sm:col-span-2"><Field label="Required Documents (JSON array)" name="requiredDocuments" textarea /></div>
            <Button type="submit" className="sm:col-span-2 w-fit">Create Event</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle className="text-base">{EVENT_TYPE_LABELS[event.type]} — {event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form action={updateEvent} className="grid gap-3 sm:grid-cols-2">
                <input type="hidden" name="id" value={event.id} />
                <Field label="Title" name="title" defaultValue={event.title} required />
                <Field label="Type" name="type" select options={Object.values(EventType)} defaultValue={event.type} />
                <div className="sm:col-span-2"><Field label="Description" name="description" textarea defaultValue={event.description} required /></div>
                <Field label="Date" name="date" type="date" defaultValue={event.date} required />
                <Field label="Time" name="time" defaultValue={event.time} required />
                <div className="sm:col-span-2"><Field label="Venue" name="venue" defaultValue={event.venue} required /></div>
                <Field label="School Name" name="schoolName" defaultValue={event.schoolName ?? ""} />
                <Field label="EPT Required" name="eptRequired" defaultValue={event.eptRequired?.toString() ?? ""} />
                <div className="sm:col-span-2"><Field label="Instructions" name="instructions" textarea defaultValue={event.instructions ?? ""} /></div>
                <div className="sm:col-span-2"><Field label="Required Documents" name="requiredDocuments" textarea defaultValue={event.requiredDocuments ?? ""} /></div>
                <Button type="submit" size="sm">Update</Button>
              </form>
              <form action={deleteEvent}>
                <input type="hidden" name="id" value={event.id} />
                <Button type="submit" variant="destructive" size="sm">Delete</Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  select,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  select?: boolean;
  options?: string[];
  defaultValue?: string;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      {textarea ? (
        <Textarea id={name} name={name} required={required} defaultValue={defaultValue} rows={3} />
      ) : select ? (
        <select
          id={name}
          name={name}
          required={required}
          defaultValue={defaultValue}
          className="flex h-10 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
        >
          {options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <Input id={name} name={name} type={type} required={required} defaultValue={defaultValue} />
      )}
    </div>
  );
}
