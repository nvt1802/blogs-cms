import CMSHeader from "@/components/CMSHeader";
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
      <div className="w-full">
        <CMSHeader />
        <div className="w-full cms-main">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
