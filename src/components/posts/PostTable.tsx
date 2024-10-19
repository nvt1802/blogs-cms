"use client";

import { IPost } from "@/types/posts";
import { PostStatus } from "@/utils/contants";
import dayjs from "dayjs";
import { Avatar, Badge, Table } from "flowbite-react";
import { useRouter } from "next/navigation";

interface IProps {
  currentPage: number;
  posts: IPost[];
}

const PostsTable: React.FC<IProps> = ({ currentPage = 1, posts }) => {
  const router = useRouter();

  const onEditPost = (slug: string) => {
    router.push(`/dashboard/posts/${slug}`);
  };

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>STT</Table.HeadCell>
          <Table.HeadCell>Thumnail</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Create By</Table.HeadCell>
          <Table.HeadCell>Updated At</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {posts?.map((item, index) => (
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
                {item.status === "published" ? (
                  <Badge color="success" className="w-fit py-1.5">{PostStatus.PUBLISHED}</Badge>
                ) : (
                  <Badge color="info" className="w-fit py-1.5">{PostStatus.DRAFT}</Badge>
                )}
              </Table.Cell>
              <Table.Cell className="capitalize">
                {item.users?.username}
              </Table.Cell>
              <Table.Cell>
                {dayjs(item.created_at).format("DD/MM/YYYY hh:mm")}
              </Table.Cell>
              <Table.Cell
                onClick={() => onEditPost(item?.slug)}
                className="cursor-pointer hover:underline"
              >
                Edit
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PostsTable;
