import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createTransportInfo, deleteTransportInfo, updateTransportInfo } from "@/actions/admin";
import { getAllTransportInfo } from "@/lib/data/portal";

export default async function AdminTransportPage() {
  const items = await getAllTransportInfo();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">Manage Transport</h1>
        <Link href="/admin" className="text-sm text-secondary hover:underline">← Admin</Link>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Create Transport Info</CardTitle></CardHeader>
        <CardContent>
          <form action={createTransportInfo} className="space-y-4">
            <Field label="Title" name="title" required />
            <Field label="Bus Information" name="busInformation" textarea required />
            <Field label="Shuttle Information" name="shuttleInformation" textarea required />
            <Field label="Arrival Instructions" name="arrivalInstructions" textarea required />
            <Field label="Map Link" name="mapLink" />
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>

      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader><CardTitle className="text-base">{item.title}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <form action={updateTransportInfo} className="space-y-3">
              <input type="hidden" name="id" value={item.id} />
              <Field label="Title" name="title" defaultValue={item.title} required />
              <Field label="Bus Information" name="busInformation" textarea defaultValue={item.busInformation} required />
              <Field label="Shuttle Information" name="shuttleInformation" textarea defaultValue={item.shuttleInformation} required />
              <Field label="Arrival Instructions" name="arrivalInstructions" textarea defaultValue={item.arrivalInstructions} required />
              <Field label="Map Link" name="mapLink" defaultValue={item.mapLink ?? ""} />
              <Button type="submit" size="sm">Update</Button>
            </form>
            <form action={deleteTransportInfo}>
              <input type="hidden" name="id" value={item.id} />
              <Button type="submit" variant="destructive" size="sm">Delete</Button>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Field({ label, name, required, textarea, defaultValue }: {
  label: string; name: string; required?: boolean; textarea?: boolean; defaultValue?: string;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      {textarea ? (
        <Textarea id={name} name={name} required={required} defaultValue={defaultValue} rows={4} />
      ) : (
        <Input id={name} name={name} required={required} defaultValue={defaultValue} />
      )}
    </div>
  );
}
