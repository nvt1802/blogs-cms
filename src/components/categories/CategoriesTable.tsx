"use client";

import { ICategories, ICategoriesPaginationResponse } from "@/types/categories";
import dayjs from "dayjs";
import { Pagination, Table, Tooltip } from "flowbite-react";
import { useTranslations } from "next-intl";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

interface IProps {
  currentPage: number;
  data?: ICategoriesPaginationResponse;
  onChange?: (page: number) => void;
  onEditItem?: (post: ICategories) => void;
  onRemoveItem?: (post: ICategories) => void;
}

const CategoriesTable: React.FC<IProps> = ({
  currentPage,
  data,
  onChange,
  onEditItem,
  onRemoveItem,
}) => {
  const t = useTranslations("CategoriesPage");

  const onPageChange = (page: number) => {
    if (onChange) {
      onChange(page);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>STT</Table.HeadCell>
            <Table.HeadCell>{t("column-name")}</Table.HeadCell>
            <Table.HeadCell>{t("column-description")}</Table.HeadCell>
            <Table.HeadCell>{t("column-created-at")}</Table.HeadCell>
            <Table.HeadCell>{t("column-updated-at")}</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">{t("edit")}</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data?.items?.map((item, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {(currentPage - 1) * 10 + index + 1}
                </Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>
                  {dayjs(item.created_at).format("DD/MM/YYYY HH:mm")}
                </Table.Cell>
                <Table.Cell>
                  {dayjs(item.updated_at).format("DD/MM/YYYY HH:mm")}
                </Table.Cell>
                <Table.Cell className="flex flex-row gap-5">
                  <Tooltip
                    content={`${t("edit")} ${item?.name}`}
                    placement="left-start"
                  >
                    <button
                      onClick={() =>
                        onEditItem ? onEditItem(item) : undefined
                      }
                    >
                      <HiOutlinePencil />
                    </button>
                  </Tooltip>
                  <Tooltip
                    content={`${t("remove")} ${item?.name}`}
                    placement="left-start"
                  >
                    <button
                      onClick={() =>
                        onRemoveItem ? onRemoveItem(item) : undefined
                      }
                    >
                      <HiOutlineTrash />
                    </button>
                  </Tooltip>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="flex overflow-x-auto sm:justify-center">
        {data?.totalPages && data?.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 0}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </>
  );
};

export default CategoriesTable;
