import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTransportInfo } from "@/lib/data/portal";

export default async function TransportPage() {
  const data = await getTransportInfo();

  if (!data) {
    return <p className="text-muted-foreground">Transport information is not available yet.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h3 className="mb-2 font-semibold text-primary">Bus Information</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {data.busInformation}
            </p>
          </section>
          <section>
            <h3 className="mb-2 font-semibold text-primary">Shuttle Information</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {data.shuttleInformation}
            </p>
          </section>
          <section>
            <h3 className="mb-2 font-semibold text-primary">Arrival Instructions</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {data.arrivalInstructions}
            </p>
          </section>
          {data.mapLink && (
            <a
              href={data.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-primary"
            >
              Open Campus Map
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
