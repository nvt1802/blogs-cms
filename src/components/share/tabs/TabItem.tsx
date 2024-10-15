"use client";

import { twMerge } from "tailwind-merge";

interface IProps {
  children?: React.ReactNode;
  active?: boolean;
  className?: string;
}

const TabItem: React.FC<IProps> = ({ children, active, className }) => {
  return (
    <div
      className={twMerge(
        "hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800",
        active ? "block" : "",
        className
      )}
      id="styled-profile"
      role="tabpanel"
      aria-labelledby="profile-tab"
    >
      {children}
    </div>
  );
};

export default TabItem;
