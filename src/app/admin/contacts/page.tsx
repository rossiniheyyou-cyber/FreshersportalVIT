import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createContact, deleteContact, updateContact } from "@/actions/admin";
import { getAllContacts } from "@/lib/data/portal";

export default async function AdminContactsPage() {
  const contacts = await getAllContacts();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">Manage Contacts</h1>
        <Link href="/admin" className="text-sm text-secondary hover:underline">← Admin</Link>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Create Contact</CardTitle></CardHeader>
        <CardContent>
          <form action={createContact} className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Designation" name="designation" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" required />
            <div className="sm:col-span-2"><Field label="Department" name="department" required /></div>
            <Button type="submit" className="w-fit">Create Contact</Button>
          </form>
        </CardContent>
      </Card>

      {contacts.map((contact) => (
        <Card key={contact.id}>
          <CardHeader><CardTitle className="text-base">{contact.department}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <form action={updateContact} className="grid gap-3 sm:grid-cols-2">
              <input type="hidden" name="id" value={contact.id} />
              <Field label="Name" name="name" defaultValue={contact.name} required />
              <Field label="Designation" name="designation" defaultValue={contact.designation} required />
              <Field label="Email" name="email" type="email" defaultValue={contact.email} required />
              <Field label="Phone" name="phone" defaultValue={contact.phone} required />
              <div className="sm:col-span-2"><Field label="Department" name="department" defaultValue={contact.department} required /></div>
              <Button type="submit" size="sm">Update</Button>
            </form>
            <form action={deleteContact}>
              <input type="hidden" name="id" value={contact.id} />
              <Button type="submit" variant="destructive" size="sm">Delete</Button>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Field({ label, name, type = "text", required, defaultValue }: {
  label: string; name: string; type?: string; required?: boolean; defaultValue?: string;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={`${name}-${defaultValue ?? "new"}`}>{label}</Label>
      <Input id={`${name}-${defaultValue ?? "new"}`} name={name} type={type} required={required} defaultValue={defaultValue} />
    </div>
  );
}
