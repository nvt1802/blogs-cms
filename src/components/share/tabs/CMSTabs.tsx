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
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-styled-tab"
          data-tabs-toggle="#default-styled-tab-content"
          data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500"
          data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
          role="tablist"
        >
          {tabs?.map((item, index) => (
            <li className="me-2" role="presentation" key={item?.name}>
              <button
                className={twMerge(
                  "inline-flex p-4 border-b-2 rounded-t-lg gap-2",
                  activeTab === index
                    ? "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
                    : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                )}
                type="button"
                role="tab"
                aria-controls={item?.name}
                aria-selected="false"
                onClick={() => {
                  if (typeof onClickTab !== "undefined") onClickTab(index);
                }}
              >
                <p>{item?.name}</p>
                {item.status === "error" && <HiXCircle className="my-auto" color="red" />}
                {item.status === "success" && <HiCheckCircle className="my-auto" color="green" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div id="default-styled-tab-content">{children}</div>
    </>
  );
};

export default CMSTabs;
