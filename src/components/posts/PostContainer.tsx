"use client";

import PostsTable from "@/components/posts/PostTable";
import { fetchPosts } from "@/utils/api/posts";
import { useQuery } from "@tanstack/react-query";
import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { HiDocumentAdd } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { IPost } from "@/types/posts";

const PostContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: async () => fetchPosts(currentPage),
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onCreateNewPost = () => {
    router.push("/dashboard/posts/create");
  };

  const onEditPost = (post: IPost) => {
    router.push(`/dashboard/posts/${post?.slug}`);
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
          <div className="flex flex-row justify-end p-2">
            <Button color="success" onClick={onCreateNewPost}>
              <div className="flex flex-row gap-2">
                <HiDocumentAdd size={20} />
                <p>Create New Post</p>
              </div>
            </Button>
          </div>
          <PostsTable
            currentPage={currentPage}
            posts={data}
            onChange={onPageChange}
            onClickItem={onEditPost}
          />
        </>
      )}
    </>
  );
};

export default PostContainer;
