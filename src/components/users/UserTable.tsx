"use client";

import { fetchUsers } from "@/utils/api/users";
import { cloudinaryUrl, pageLimit } from "@/utils/contants";
import { UserRole } from "@/utils/enum";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Avatar, Badge, Pagination, Spinner, Table } from "flowbite-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const t = useTranslations("UsersPage");

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
        <div className="flex flex-col text-center h-full">
          <div className="my-auto">
            <Spinner aria-label="spinner" />
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-y-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>STT</Table.HeadCell>
                <Table.HeadCell>Avatar</Table.HeadCell>
                <Table.HeadCell>{t("column-username")}</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>{t("column-role")}</Table.HeadCell>
                <Table.HeadCell>{t("column-created-at")}</Table.HeadCell>
                <Table.HeadCell>{t("column-updated-at")}</Table.HeadCell>
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
                      {(currentPage - 1) * pageLimit + index + 1}
                    </Table.Cell>
                    <Table.Cell>
                      <Avatar
                        img={`${cloudinaryUrl}/c_fill,h_50,w_50/${
                          item?.profile_picture ?? ""
                        }`}
                        rounded
                        alt="avatar"
                      />
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
                        {t(`${item.role.toLowerCase()}`)}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      {dayjs(item.created_at).format("DD/MM/YYYY HH:mm")}
                    </Table.Cell>
                    <Table.Cell>
                      {dayjs(item.updated_at).format("DD/MM/YYYY HH:mm")}
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

export default UserTable;
