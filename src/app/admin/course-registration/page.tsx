import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createCourseRegistration, deleteCourseRegistration, updateCourseRegistration } from "@/actions/admin";
import { getAllCourseRegistrations } from "@/lib/data/portal";

export default async function AdminCourseRegistrationPage() {
  const items = await getAllCourseRegistrations();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">Manage Course Registration</h1>
        <Link href="/admin" className="text-sm text-secondary hover:underline">← Admin</Link>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Create Entry</CardTitle></CardHeader>
        <CardContent>
          <form action={createCourseRegistration} className="space-y-4">
            <Field label="Title" name="title" required />
            <Field label="Description" name="description" textarea required />
            <Field label="Steps (JSON array of strings)" name="steps" textarea required />
            <Field label="Notes" name="notes" textarea required />
            <Field label='Links (JSON array: [{"label":"","url":""}])' name="links" textarea required />
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>

      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader><CardTitle className="text-base">{item.title}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <form action={updateCourseRegistration} className="space-y-3">
              <input type="hidden" name="id" value={item.id} />
              <Field label="Title" name="title" defaultValue={item.title} required />
              <Field label="Description" name="description" textarea defaultValue={item.description} required />
              <Field label="Steps" name="steps" textarea defaultValue={item.steps} required />
              <Field label="Notes" name="notes" textarea defaultValue={item.notes} required />
              <Field label="Links" name="links" textarea defaultValue={item.links} required />
              <Button type="submit" size="sm">Update</Button>
            </form>
            <form action={deleteCourseRegistration}>
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
