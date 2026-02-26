"use client";
import AggregateView from "@/app/local-components/GAPage/AggregateView";
import IndividualView from "@/app/local-components/GAPage/IndividualView";
import GAAssignmentRecordView from "@/app/local-components/GAPage/GAAssignmentRecordView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <div className="m-4">
      <div className="flex items-center justify-between mb-4">
        <Tabs defaultValue="individual" className="w-full">
          <TabsList>
            <TabsTrigger value="individual" className="text-xl px-4 py-2">
              Individual Courses With GA
            </TabsTrigger>
            <TabsTrigger value="aggregate" className="text-xl px-4 py-2">
              GA Teaching Record
            </TabsTrigger>
            <TabsTrigger value="assignment-record" className="text-xl px-4 py-2">
              GA Assignment record
            </TabsTrigger>
          </TabsList>
          <TabsContent value="individual">
            <IndividualView />
          </TabsContent>
          <TabsContent value="aggregate">
            <AggregateView />
          </TabsContent>
          <TabsContent value="assignment-record">
            <GAAssignmentRecordView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;

