import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourseRegistration } from "@/lib/data/portal";
import { parseJsonArray, parseJsonLinks } from "@/lib/utils";

export default async function CourseRegistrationPage() {
  const data = await getCourseRegistration();

  if (!data) {
    return (
      <p className="text-muted-foreground">Course registration details are not available yet.</p>
    );
  }

  const steps = parseJsonArray(data.steps);
  const links = parseJsonLinks(data.links);

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-3 font-semibold text-primary">Registration Steps</h3>
            <ol className="list-decimal space-y-3 pl-5">
              {steps.map((step, i) => (
                <li key={i} className="text-sm leading-relaxed text-muted-foreground">
                  {step}
                </li>
              ))}
            </ol>
          </div>
          {data.notes && (
            <div className="rounded-lg bg-muted p-4">
              <h3 className="mb-2 font-semibold text-primary">Important Notes</h3>
              <p className="text-sm text-muted-foreground">{data.notes}</p>
            </div>
          )}
          {links.length > 0 && (
            <div>
              <h3 className="mb-3 font-semibold text-primary">Useful Links</h3>
              <div className="flex flex-wrap gap-3">
                {links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-primary"
                  >
                    {link.label}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
