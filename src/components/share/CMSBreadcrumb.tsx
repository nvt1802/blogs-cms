"use client";

import { Breadcrumb } from "flowbite-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface IBreakcrumb {
  href: string;
  name: string;
}

const CMSBreadcrumb = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Common");
  const [breakcrumbData, setBreakcrumbData] = useState<IBreakcrumb[]>([]);

  useEffect(() => {
    const fullPath: string[] = [];
    const data: IBreakcrumb[] = [];

    pathname
      .split("/")
      .filter((path) => !["en", "vi"].includes(path))
      .forEach((path: string) => {
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
      aria-label="breadcrumb"
      className="bg-white px-5 py-3 dark:bg-gray-700 hidden sm:block"
    >
      {breakcrumbData.map((item, index: number) => (
        <li key={index} className="group flex items-center capitalize">
          {index === 0 ? (
            <Link href={`/${locale}`} className="inline-flex">
              <HiHome className="mr-2 h-4 w-4 my-auto dark:fill-gray-400 hover:fill-white" />
              <p className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                {t("home")}
              </p>
            </Link>
          ) : (
            <HiOutlineChevronRight className="mx-1 h-4 w-4 text-gray-400 group-first:hidden md:mx-2" />
          )}
          {index !== 0 &&
            (index < breakcrumbData.length - 1 ? (
              <Link
                href={`/${locale}${item.href}`}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {t(item?.name?.toLowerCase())}
              </Link>
            ) : (
              <p className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                {item?.name?.includes("-")
                  ? item?.name
                  : t(item?.name?.toLowerCase())}
              </p>
            ))}
        </li>
      ))}
    </Breadcrumb>
  );
};
export default CMSBreadcrumb;
