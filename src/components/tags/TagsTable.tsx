"use client";

import { fetchTags } from "@/utils/api/tags";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Pagination, Spinner, Table } from "flowbite-react";
import { useState } from "react";

const TagsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["tags", currentPage],
    queryFn: async () => fetchTags(currentPage),
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>STT</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Created At</Table.HeadCell>
                <Table.HeadCell>Updated At</Table.HeadCell>
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
                      {dayjs(item.created_at).format("DD/MM/YYYY mm:ss")}
                    </Table.Cell>
                    <Table.Cell>
                      {dayjs(item.updated_at).format("DD/MM/YYYY mm:ss")}
                    </Table.Cell>
                    <Table.Cell>
                      <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Edit
                      </a>
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
      )}
    </>
  );
};

export default TagsTable;
