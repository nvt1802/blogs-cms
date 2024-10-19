"use client";

import { DarkThemeToggle, Sidebar } from "flowbite-react";
import { usePathname } from "next/navigation";
import {
  HiChartPie,
  HiDocument,
  HiUser,
  HiTag,
  HiOutlineBookmark,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";

interface IProps {
  className?: string;
}

const Menu: React.FC<IProps> = ({ className }) => {
  const items = [
    { name: "Dashboard", href: "/dashboard", icon: HiChartPie },
    { name: "Users", href: "/dashboard/users", icon: HiUser },
    { name: "Posts", href: "/dashboard/posts", icon: HiDocument },
    {
      name: "Categories",
      href: "/dashboard/categories",
      icon: HiOutlineBookmark,
    },
    { name: "Tags", href: "/dashboard/tags", icon: HiTag },
  ];
  const pathname = usePathname();

  return (
    <Sidebar
      aria-label="sidebar"
      className={twMerge("cms-sibar", className)}
    >
      <Sidebar.Items className="h-[calc(100%-40px)]">
        <Sidebar.ItemGroup>
          {items.map((item) => (
            <Sidebar.Item
              key={item.name}
              href={item.href}
              icon={item.icon}
              active={item.href === pathname}
            >
              {item.name}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <Sidebar.Items>
        <DarkThemeToggle />
      </Sidebar.Items>
    </Sidebar>
  );
};

export default Menu;
