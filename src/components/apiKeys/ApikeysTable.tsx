"use client";

import { IApiKeys, IApiKeysPaginationResponse } from "@/types/api-keys";
import dayjs from "dayjs";
import { Clipboard, Pagination, Table, Tooltip } from "flowbite-react";
import { HiOutlineTrash } from "react-icons/hi";

interface IProps {
  currentPage: number;
  data?: IApiKeysPaginationResponse;
  onChange?: (page: number) => void;
  onRemoveItem?: (apiKey: IApiKeys) => void;
}

const ApikeysTable: React.FC<IProps> = ({
  data,
  currentPage,
  onChange,
  onRemoveItem,
}) => {
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
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Token</Table.HeadCell>
            <Table.HeadCell>Duration</Table.HeadCell>
            <Table.HeadCell>Expiry Date</Table.HeadCell>
            <Table.HeadCell>Created At</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
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
                <Table.Cell>
                  <div className="relative flex flex-row gap-2">
                    <div>{item.token.slice(0,8)}{"*****"}</div>
                    <div className="ml-8 relative">
                      <Clipboard.WithIcon valueToCopy={item.token} key={item.token} />
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>{item.duration}</Table.Cell>
                <Table.Cell>{item.expiry_date}</Table.Cell>
                <Table.Cell>
                  {dayjs(item.created_at).format("DD/MM/YYYY HH:mm")}
                </Table.Cell>
                <Table.Cell className="flex flex-row gap-5">
                  <Tooltip
                    content={`Remove ${item?.name}`}
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

export default ApikeysTable;
