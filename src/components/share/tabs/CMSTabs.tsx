"use client";

import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export interface ITabItem {
  name: string;
  status?: "unknown" | "success" | "error";
}

interface IProps {
  children?: React.ReactNode;
  activeTab?: number;
  tabs: ITabItem[];
  onClickTab?: (tabIndex: number) => void;
}

const CMSTabs: React.FC<IProps> = ({
  children,
  activeTab = 0,
  tabs = [],
  onClickTab,
}) => {
  return (
    <>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-600">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          role="tablist"
        >
          {tabs?.map((item, index) => (
            <li className="me-2" role="presentation" key={item?.name}>
              <button
                className={twMerge(
                  "inline-flex p-4 border-b-2 rounded-t-lg gap-2 dark:text-white",
                  activeTab === index
                    ? "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
                    : "hover:text-gray-600 hover:border-gray-500 dark:hover:text-gray-300"
                )}
                type="button"
                role="tab"
                aria-controls={item?.name}
                aria-selected="false"
                onClick={() => {
                  if (typeof onClickTab !== "undefined") onClickTab(index);
                }}
              >
                <p className="font-semibold">{item?.name}</p>
                {item.status === "error" && (
                  <HiXCircle className="my-auto" color="red" size={18} />
                )}
                {item.status === "success" && (
                  <HiCheckCircle className="my-auto" color="green" size={18} />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="overflow-y-auto">{children}</div>
    </>
  );
};

export default CMSTabs;
