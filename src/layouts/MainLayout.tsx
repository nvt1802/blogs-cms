import CMSHeader from "@/components/CMSHeader";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import CMSBreadcrumb from "@/components/share/CMSBreadcrumb";
import CMSSidebar from "@/components/share/sidebar/CMSSidebar";
import React from "react";

const MainLayout: React.FC<
  Readonly<{
    children?: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <div className="h-full w-full flex flex-row">
      <div className="min-w-[256px]">
        <CMSSidebar />
      </div>
      <div className="w-full bg-gray-50 dark:bg-gray-700">
        <CMSHeader />
        <div className="w-full cms-main p-4 flex flex-col gap-4">
          <CMSBreadcrumb />
          <QueryClientWrapper>
            <div className="overflow-y-auto h-full relative">{children}</div>
          </QueryClientWrapper>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
