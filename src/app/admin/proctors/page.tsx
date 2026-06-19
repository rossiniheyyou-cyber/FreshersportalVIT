import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createProctor, deleteProctor, updateProctor } from "@/actions/admin";
import { getAllProctors } from "@/lib/data/portal";

export default async function AdminProctorsPage() {
  const proctors = await getAllProctors();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">Manage Proctors</h1>
        <Link href="/admin" className="text-sm text-secondary hover:underline">← Admin</Link>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Create Proctor</CardTitle></CardHeader>
        <CardContent>
          <form action={createProctor} className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Photo URL" name="photoUrl" />
            <Field label="Department" name="department" required />
            <Field label="Venue" name="venue" required />
            <Field label="Meeting Date" name="meetingDate" type="date" required />
            <Field label="Meeting Time" name="meetingTime" required />
            <div className="sm:col-span-2"><Field label="Notes" name="notes" textarea /></div>
            <Button type="submit" className="w-fit">Create Proctor</Button>
          </form>
        </CardContent>
      </Card>

      {proctors.map((proctor) => (
        <Card key={proctor.id}>
          <CardHeader><CardTitle className="text-base">{proctor.name}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <form action={updateProctor} className="grid gap-3 sm:grid-cols-2">
              <input type="hidden" name="id" value={proctor.id} />
              <Field label="Name" name="name" defaultValue={proctor.name} required />
              <Field label="Photo URL" name="photoUrl" defaultValue={proctor.photoUrl ?? ""} />
              <Field label="Department" name="department" defaultValue={proctor.department} required />
              <Field label="Venue" name="venue" defaultValue={proctor.venue} required />
              <Field label="Meeting Date" name="meetingDate" type="date" defaultValue={proctor.meetingDate} required />
              <Field label="Meeting Time" name="meetingTime" defaultValue={proctor.meetingTime} required />
              <div className="sm:col-span-2"><Field label="Notes" name="notes" textarea defaultValue={proctor.notes ?? ""} /></div>
              <Button type="submit" size="sm">Update</Button>
            </form>
            <form action={deleteProctor}>
              <input type="hidden" name="id" value={proctor.id} />
              <Button type="submit" variant="destructive" size="sm">Delete</Button>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Field({ label, name, type = "text", required, textarea, defaultValue }: {
  label: string; name: string; type?: string; required?: boolean; textarea?: boolean; defaultValue?: string;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={`${name}-${defaultValue ?? "new"}`}>{label}</Label>
      {textarea ? (
        <Textarea id={`${name}-${defaultValue ?? "new"}`} name={name} required={required} defaultValue={defaultValue} rows={3} />
      ) : (
        <Input id={`${name}-${defaultValue ?? "new"}`} name={name} type={type} required={required} defaultValue={defaultValue} />
      )}
    </div>
  );
}
