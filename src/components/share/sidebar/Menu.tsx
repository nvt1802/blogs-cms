"use client";

import { useAppContext } from "@/context/AppContext";
import { DarkThemeToggle, Sidebar, Tooltip } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiChartPie,
  HiChevronDoubleLeft,
  HiDocument,
  HiOutlineBookmark,
  HiTag,
  HiOutlineKey,
  HiUser,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";

interface IProps {
  className?: string;
}

const Menu: React.FC<IProps> = ({ className }) => {
  const pathname = usePathname();
  const { state, updateState } = useAppContext();
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
    {
      name: "API Keys",
      href: "/dashboard/api-key",
      icon: <HiOutlineKey className={iconClass} />,
    },
  ];

  const onCollapseMenu = () => {
    updateState({ isCollapse: true });
    localStorage.setItem("isCollapse", "1");
  };

  return (
    <Sidebar
      aria-label="sidebar"
      className={twMerge(
        "cms-sibar relative duration-300",
        state.isCollapse ? "w-16" : "",
        className
      )}
    >
      <Sidebar.Items className="h-[calc(100%-40px)]">
        <Sidebar.ItemGroup>
          {items.map((item) => (
            <li key={item.name} className="w-full">
              <Link
                href={item.href}
                className={twMerge(
                  "flex items-center justify-start rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 w-full",
                  item.href === pathname ? "bg-white dark:bg-gray-700" : ""
                )}
              >
                <Tooltip content={item.name} placement="left-start">
                  <div className="flex flex-row">
                    {item.icon}
                    <span
                      className={twMerge(
                        "flex-1 whitespace-nowrap px-3 duration-300",
                        state.isCollapse ? "hidden" : ""
                      )}
                    >
                      {item?.name}
                    </span>
                  </div>
                </Tooltip>
              </Link>
            </li>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <Sidebar.Items>
        <DarkThemeToggle />
      </Sidebar.Items>
      {!state.isCollapse && (
        <button
          className="absolute top-4 -right-2 rounded-full p-2 bg-white shadow-lg select-none hidden sm:block"
          onClick={onCollapseMenu}
        >
          <HiChevronDoubleLeft />
        </button>
      )}
    </Sidebar>
  );
};

export default Menu;
