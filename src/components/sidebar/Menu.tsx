"use client";

import { DarkThemeToggle, Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiDocument,
  HiUser
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";

interface IProps {
  className?: string;
}

const Menu: React.FC<IProps> = ({ className }) => {
  return (
    <Sidebar
      aria-label="Default sidebar example"
      className={twMerge("cms-sibar", className)}
    >
      <Sidebar.Items className="h-[calc(100%-40px)]">
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/dashboard/users" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiDocument}>
            Posts
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <Sidebar.Items>
        <DarkThemeToggle />
      </Sidebar.Items>
    </Sidebar>
  );
};

export default Menu;
