"use client";

import { IPost, IPostPaginationResponse } from "@/types/posts";
import { cloudinaryUrl, PostStatus } from "@/utils/contants";
import dayjs from "dayjs";
import { Badge, Pagination, Table, Tooltip } from "flowbite-react";
import Image from "next/image";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

interface IProps {
  currentPage: number;
  posts?: IPostPaginationResponse;
  onChange?: (page: number) => void;
  onEditItem?: (post: IPost) => void;
  onRemoveItem?: (post: IPost) => void;
}

const PostsTable: React.FC<IProps> = ({
  currentPage = 1,
  posts,
  onChange,
  onEditItem,
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
            {posts?.items?.map((item, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {(currentPage - 1) * 10 + index + 1}
                </Table.Cell>
                <Table.Cell>
                  <Image
                    src={`${cloudinaryUrl}/${item.featured_image ?? ""}`}
                    alt="thumnail"
                    width={60}
                    height={30}
                  />
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.categories?.name}</Table.Cell>
                <Table.Cell className="capitalize">
                  {item.status === "published" ? (
                    <Badge color="success" className="w-fit py-1.5">
                      {PostStatus.PUBLISHED}
                    </Badge>
                  ) : (
                    <Badge color="info" className="w-fit py-1.5">
                      {PostStatus.DRAFT}
                    </Badge>
                  )}
                </Table.Cell>
                <Table.Cell>{item.users?.username}</Table.Cell>
                <Table.Cell>
                  {dayjs(item.created_at).format("DD/MM/YYYY HH:mm")}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex flex-row gap-5">
                    <Tooltip
                      content={`Edit ${item?.title}`}
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
                      content={`Remove ${item?.title}`}
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
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="flex overflow-x-auto sm:justify-center">
        {posts?.totalPages && posts?.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={posts?.totalPages || 0}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </>
  );
};

export default PostsTable;
