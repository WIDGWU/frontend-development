"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const CourseApproval = () => {
  return (
    <main className="m-4">
      {/* Tabs */}
      <Tabs defaultValue="cim" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cim" className="text-lg">
            CourseLeaf Course Inventory Management
          </TabsTrigger>
          <TabsTrigger value="approvals" className="text-lg">
            CourseLeaf Pages Pending Approval
          </TabsTrigger>
        </TabsList>

        {/* CIM Tab */}
        <TabsContent
          value="cim"
          className="rounded-lg border bg-white p-6 shadow-sm"
        >
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              CourseLeaf Course Inventory Management (CIM)
            </h3>

            <p className="text-md text-gray-700 leading-relaxed">
              New course proposals and course change requests are submitted
              through the CourseLeaf Course Inventory Management (CIM) system.
              This system serves as the primary platform for creating, editing,
              and tracking curriculum updates throughout the approval workflow.
            </p>

            <Link
              href="https://next.bulletin.gwu.edu/courseadmin/"
              target="_blank"
              className="py-4 px-12 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#e3dccc] bg-[#033c5a] rounded"
            >
              Access Course Inventory Management System
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </TabsContent>

        {/* Pending Approval Tab */}
        <TabsContent
          value="approvals"
          className="rounded-lg border bg-white p-6 shadow-sm"
        >
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              CourseLeaf Pages Pending Approval
            </h3>

            <p className="text-md text-gray-700 leading-relaxed">
              The “Pages Pending Approval” view displays all programs and
              courses currently awaiting review. Individuals designated as
              approvers for a specific step in the workflow will receive an
              email notification from the Bulletin Editor when action is
              required.
            </p>

            <p className="text-sm text-gray-700 leading-relaxed">
              Approvers should regularly monitor this page to ensure timely
              review and progression of proposals through the approval process.
            </p>

            <Link
              href="https://next.bulletin.gwu.edu/courseleaf/approve/?role=UW%20Director"
              target="_blank"
              className="py-4 px-12 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#e3dccc] bg-[#033c5a] rounded"
            >
              View Pages Pending Approval
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default CourseApproval;
