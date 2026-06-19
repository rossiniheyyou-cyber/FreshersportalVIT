"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ContactsSection,
  CourseRegistrationSection,
  DocumentVerificationSection,
  EPTSection,
  HostelSection,
  MainInductionSection,
  ProctorSection,
  SchoolInductionSection,
  TransportSection,
} from "@/components/sections/section-panels";
import type {
  Contact,
  CourseRegistration,
  Event,
  HostelInfo,
  Proctor,
  TransportInfo,
} from "@/lib/types";
import { EventType } from "@/lib/types";

type DashboardTabsProps = {
  events: Event[];
  proctor: Proctor | null;
  courseRegistration: CourseRegistration | null;
  transport: TransportInfo | null;
  hostel: HostelInfo | null;
  contacts: Contact[];
};

function findEvent(events: Event[], type: EventType) {
  return events.find((e) => e.type === type) ?? null;
}

export function DashboardTabs({
  events,
  proctor,
  courseRegistration,
  transport,
  hostel,
  contacts,
}: DashboardTabsProps) {
  return (
    <Tabs defaultValue="main-induction" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="main-induction">Main Induction</TabsTrigger>
        <TabsTrigger value="school-induction">School Induction</TabsTrigger>
        <TabsTrigger value="ept">EPT</TabsTrigger>
        <TabsTrigger value="course-registration">Course Registration</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="proctor">Proctor</TabsTrigger>
        <TabsTrigger value="transport">Transport</TabsTrigger>
        <TabsTrigger value="hostel">Hostel</TabsTrigger>
        <TabsTrigger value="contacts">Contacts</TabsTrigger>
      </TabsList>

      <TabsContent value="main-induction">
        <MainInductionSection event={findEvent(events, EventType.MAIN_INDUCTION)} />
      </TabsContent>
      <TabsContent value="school-induction">
        <SchoolInductionSection event={findEvent(events, EventType.SCHOOL_INDUCTION)} />
      </TabsContent>
      <TabsContent value="ept">
        <EPTSection event={findEvent(events, EventType.EPT)} />
      </TabsContent>
      <TabsContent value="course-registration">
        <CourseRegistrationSection data={courseRegistration} />
      </TabsContent>
      <TabsContent value="documents">
        <DocumentVerificationSection
          event={findEvent(events, EventType.DOCUMENT_VERIFICATION)}
        />
      </TabsContent>
      <TabsContent value="proctor">
        <ProctorSection proctor={proctor} />
      </TabsContent>
      <TabsContent value="transport">
        <TransportSection data={transport} />
      </TabsContent>
      <TabsContent value="hostel">
        <HostelSection data={hostel} />
      </TabsContent>
      <TabsContent value="contacts">
        <ContactsSection contacts={contacts} />
      </TabsContent>
    </Tabs>
  );
}
