import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const adminLinks = [
  { href: "/admin/events", label: "Events", description: "Manage induction and verification events" },
  { href: "/admin/proctors", label: "Proctors", description: "Manage proctor profiles and meetings" },
  { href: "/admin/course-registration", label: "Course Registration", description: "Manage registration steps and links" },
  { href: "/admin/transport", label: "Transport", description: "Manage bus and shuttle information" },
  { href: "/admin/hostel", label: "Hostel", description: "Manage hostel instructions and checklists" },
  { href: "/admin/contacts", label: "Contacts", description: "Manage office contact details" },
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hidden admin route — authentication will be added later. Manage portal content below.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {adminLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-base">{link.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <Link href="/" className="text-sm text-secondary hover:underline">
        ← Back to Portal
      </Link>
    </div>
  );
}
