"use client";

import { IPost, IPostResponse } from "@/types/posts";
import axiosInstance from "@/utils/axiosInstance";
import { HttpStatusCode } from "axios";
import dayjs from "dayjs";
import { Avatar, Pagination, Table } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PostsTable = () => {
  const [users, setUsers] = useState<IPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const onPageChange = async (page: number) => {
    const { data } = await axiosInstance.get(`/api/posts?page=${page}`);
    setUsers(data?.data.items || []);
    setTotalPages(data?.data?.totalPages);
    setCurrentPage(page);
  };

  const onGetUserInfo = async () => {
    try {
      const { data } = await axiosInstance.get<IPostResponse>(`/api/posts`);
      setUsers(data?.data.items || []);
      setTotalPages(data?.data?.totalPages);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.status === HttpStatusCode.Forbidden) {
        router.push("/login");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    onGetUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>STT</Table.HeadCell>
            <Table.HeadCell>Thumnail</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Create By</Table.HeadCell>
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
                  {(currentPage - 1) * 10 + index + 1}
                </Table.Cell>
                <Table.Cell>
                  <Avatar img={item.featured_image} alt="avatar" />
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.categories?.name}</Table.Cell>
                <Table.Cell className="capitalize">
                  {item.users?.username}
                </Table.Cell>
                <Table.Cell>
                  {dayjs(item.created_at).format("DD/MM/YYYY mm:ss")}
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
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default PostsTable;
