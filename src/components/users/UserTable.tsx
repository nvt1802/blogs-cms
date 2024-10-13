"use client";

import { fetchUsers } from "@/utils/api/users";
import { UserRole } from "@/utils/enum";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Avatar, Badge, Pagination, Spinner, Table } from "flowbite-react";
import { useState } from "react";

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: async () => fetchUsers(currentPage),
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
          <div className="overflow-y-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>STT</Table.HeadCell>
                <Table.HeadCell>Avatar</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Role</Table.HeadCell>
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
                    <Table.Cell>
                      <Avatar img={item.profile_picture} alt="avatar" />
                    </Table.Cell>
                    <Table.Cell>{item.username}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell className="capitalize">
                      <Badge
                        color={
                          UserRole.ADMIN === item.role
                            ? "success"
                            : UserRole.AUTHOR === item.role
                            ? "warning"
                            : "blue"
                        }
                        className="w-fit"
                      >
                        {item.role}
                      </Badge>
                    </Table.Cell>
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
            <Pagination
              currentPage={currentPage}
              totalPages={data?.totalPages || 0}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default UserTable;
