"use client";

import { IImage, IImagesPaginationResponse } from "@/types/images";
import { cloudinaryUrl, pageLimit } from "@/utils/contants";
import dayjs from "dayjs";
import { Clipboard, Pagination, Table, Tooltip } from "flowbite-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { HiOutlineTrash } from "react-icons/hi";

interface IProps {
  currentPage: number;
  data?: IImagesPaginationResponse;
  onChange?: (page: number) => void;
  onRemoveItem?: (post: IImage) => void;
}

const ImagesTable: React.FC<IProps> = ({
  data,
  currentPage,
  onChange,
  onRemoveItem,
}) => {
  const t = useTranslations("ImagesPage");

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
            <Table.HeadCell>{t("column-image")}</Table.HeadCell>
            <Table.HeadCell>{t("column-name")}</Table.HeadCell>
            <Table.HeadCell>{t("column-created-at")}</Table.HeadCell>
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
                  {(currentPage - 1) * pageLimit + index + 1}
                </Table.Cell>
                <Table.Cell>
                  <div className="relative flex flex-row gap-2">
                    <div>
                      <Image
                        src={`${cloudinaryUrl}/c_fill,h_60,w_60/${item.public_id}`}
                        alt={item.name}
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className="ml-8 relative">
                      <Clipboard.WithIcon
                        valueToCopy={`${cloudinaryUrl}/${item.public_id}`}
                        key={item.id}
                      />
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="max-w-60 truncate">
                  {item.name}
                </Table.Cell>
                <Table.Cell>
                  {dayjs(item.created_at).format("DD/MM/YYYY HH:mm")}
                </Table.Cell>
                <Table.Cell className="flex flex-row gap-5 my-auto h-full">
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

export default ImagesTable;
