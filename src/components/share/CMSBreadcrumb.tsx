"use client";

import { Breadcrumb } from "flowbite-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi";

interface IBreakcrumb {
  href: string;
  name: string;
}

const CMSBreadcrumb = () => {
  const pathname = usePathname();
  const [breakcrumbData, setBreakcrumbData] = useState<IBreakcrumb[]>([]);

  useEffect(() => {
    const fullPath: string[] = [];
    const data: IBreakcrumb[] = [];
    pathname.split("/").forEach((path: string) => {
      fullPath.push(path);
      data.push({
        href: fullPath?.join("/"),
        name: path,
      });      
    });
    setBreakcrumbData(data);
  }, [pathname]);

  return (
    <Breadcrumb
      aria-label="Default breadcrumb example"
      className="bg-gray-50 px-5 py-3 dark:bg-gray-700"
    >
      {breakcrumbData.map((item, index: number) => (
        <Breadcrumb.Item
          href={item?.href || "/"}
          key={index}
          icon={item?.href ? undefined : HiHome}
          className="capitalize"
        >
          {item?.name || "Home"}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
export default CMSBreadcrumb;
