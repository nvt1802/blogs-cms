"use client";

import { IUser } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs"

const UserTable = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const onGetUserInfo = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/users`);
      setUsers(data?.data || []);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  };

  useEffect(() => {
    onGetUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>STT</Table.HeadCell>
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
          {users?.map((item, index) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={index}
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell>{item.username}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.role}</Table.Cell>
              <Table.Cell>{dayjs( item.created_at).format("DD/MM/YYYY mm:ss")}</Table.Cell>
              <Table.Cell>{dayjs( item.updated_at).format("DD/MM/YYYY mm:ss")}</Table.Cell>
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
  );
};

export default UserTable;
