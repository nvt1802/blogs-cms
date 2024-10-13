"use client";

import PostsTable from "@/components/posts/PostTable";
import { fetchPosts } from "@/utils/api/posts";
import { useQuery } from "@tanstack/react-query";
import { Button, Pagination, Spinner } from "flowbite-react";
import { useState } from "react";
import { HiDocumentAdd } from "react-icons/hi";
import { useRouter } from "next/navigation";

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

  return (
    <>
      <div className="flex flex-row justify-end p-2">
        <Button color="cyan" onClick={onCreateNewPost}>
          <div className="flex flex-row gap-2">
            <HiDocumentAdd size={20} />
            <p>Create New Post</p>
          </div>
        </Button>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      ) : (
        <>
          <PostsTable currentPage={currentPage} posts={data?.items || []} />
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

export default PostContainer;
