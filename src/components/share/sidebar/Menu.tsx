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
import Link from "next/link";

interface IProps {
  className?: string;
}

const Menu: React.FC<IProps> = ({ className }) => {
  const iconClass =
    "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white";
  const items = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <HiChartPie className={iconClass} />,
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: <HiUser className={iconClass} />,
    },
    {
      name: "Posts",
      href: "/dashboard/posts",
      icon: <HiDocument className={iconClass} />,
    },
    {
      name: "Categories",
      href: "/dashboard/categories",
      icon: <HiOutlineBookmark className={iconClass} />,
    },
    {
      name: "Tags",
      href: "/dashboard/tags",
      icon: <HiTag className={iconClass} />,
    },
  ];
  const pathname = usePathname();

  return (
    <Sidebar aria-label="sidebar" className={twMerge("cms-sibar", className)}>
      <Sidebar.Items className="h-[calc(100%-40px)]">
        <Sidebar.ItemGroup>
          {items.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={twMerge(
                  "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
                  item.href === pathname ? "bg-gray-100 dark:bg-gray-700" : ""
                )}
              >
                {item.icon}
                <span className="flex-1 whitespace-nowrap px-3">
                  {item?.name}
                </span>
              </Link>
            </li>
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
