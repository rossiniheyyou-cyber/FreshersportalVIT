import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createHostelInfo, deleteHostelInfo, updateHostelInfo } from "@/actions/admin";
import { getAllHostelInfo } from "@/lib/data/portal";

export default async function AdminHostelPage() {
  const items = await getAllHostelInfo();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">Manage Hostel Info</h1>
        <Link href="/admin" className="text-sm text-secondary hover:underline">← Admin</Link>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Create Hostel Info</CardTitle></CardHeader>
        <CardContent>
          <form action={createHostelInfo} className="space-y-4">
            <Field label="Instructions" name="instructions" required />
            <Field label="Documents (JSON array)" name="documents" required />
            <Field label="Items To Bring (JSON array)" name="itemsToBring" required />
            <Field label="Rules" name="rules" required />
            <Field label="Contact Info" name="contactInfo" required />
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>

      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader><CardTitle className="text-base">Hostel Entry</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <form action={updateHostelInfo} className="space-y-3">
              <input type="hidden" name="id" value={item.id} />
              <Field label="Instructions" name="instructions" defaultValue={item.instructions} required />
              <Field label="Documents" name="documents" defaultValue={item.documents} required />
              <Field label="Items To Bring" name="itemsToBring" defaultValue={item.itemsToBring} required />
              <Field label="Rules" name="rules" defaultValue={item.rules} required />
              <Field label="Contact Info" name="contactInfo" defaultValue={item.contactInfo} required />
              <Button type="submit" size="sm">Update</Button>
            </form>
            <form action={deleteHostelInfo}>
              <input type="hidden" name="id" value={item.id} />
              <Button type="submit" variant="destructive" size="sm">Delete</Button>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Field({ label, name, required, defaultValue }: {
  label: string; name: string; required?: boolean; defaultValue?: string;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      <Textarea id={name} name={name} required={required} defaultValue={defaultValue} rows={4} />
    </div>
  );
}
