"use client";

import TagsTable from "@/components/tags/TagsTable";
import { fetchTags } from "@/utils/api/tags";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import { useState } from "react";

const TagsContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["tags", currentPage],
    queryFn: async () => fetchTags(currentPage),
  });

  const onChangePage = (page: number) => setCurrentPage(page);

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
          <TagsTable
            currentPage={currentPage}
            data={data}
            onChange={onChangePage}
          />
        </>
      )}
    </>
  );
};

export default TagsContainer;
