"use client";

import PostsTable from "@/components/posts/PostTable";
import { fetchPosts } from "@/utils/api/posts";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Spinner } from "flowbite-react";
import { useState } from "react";

const PostContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: async () => fetchPosts(currentPage),
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
