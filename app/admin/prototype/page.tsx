import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <main className="m-4">
      <div className="flex items-center justify-between mb-4">
        <Tabs defaultValue="individual" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="individual" className="text-xl px-4 py-2">
              Individual View
            </TabsTrigger>
            <TabsTrigger value="aggregate" className="text-xl px-4 py-2">
              Aggregate View
            </TabsTrigger>
          </TabsList>
          <TabsContent value="individual">
            <div className="mx-4">Individual View</div>
          </TabsContent>
          <TabsContent value="aggregate">
            <div className="mx-4">Aggregate View</div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Page;
