import { Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContacts } from "@/lib/data/portal";

export default async function ContactsPage() {
  const contacts = await getContacts();

  if (contacts.length === 0) {
    return <p className="text-muted-foreground">Contact details are not available yet.</p>;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 text-2xl font-bold text-primary">Contact Details</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {contacts.map((contact) => (
          <Card key={contact.id} className="border-t-4 border-t-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{contact.department}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold text-primary">{contact.name}</p>
              <p className="text-sm text-muted-foreground">{contact.designation}</p>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-sm text-secondary hover:underline"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 text-sm text-secondary hover:underline"
              >
                <Phone className="h-4 w-4" />
                {contact.phone}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
