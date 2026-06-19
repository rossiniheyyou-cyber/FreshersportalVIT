import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getHostelInfo } from "@/lib/data/portal";
import { parseJsonArray } from "@/lib/utils";

export default async function HostelPage() {
  const data = await getHostelInfo();

  if (!data) {
    return <p className="text-muted-foreground">Hostel information is not available yet.</p>;
  }

  const documents = parseJsonArray(data.documents);
  const items = parseJsonArray(data.itemsToBring);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Hosteller Information</CardTitle>
          <CardDescription>{data.instructions}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h3 className="mb-4 font-semibold text-primary">Documents Required</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {documents.map((doc) => (
                <div
                  key={doc}
                  className="flex items-start gap-3 rounded-lg border border-border p-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 className="mb-4 font-semibold text-primary">Items To Bring</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-border p-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 className="mb-2 font-semibold text-primary">Hostel Rules</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{data.rules}</p>
          </section>
          <section className="rounded-lg bg-muted p-4">
            <h3 className="mb-2 font-semibold text-primary">Contact Information</h3>
            <p className="text-sm">{data.contactInfo}</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
