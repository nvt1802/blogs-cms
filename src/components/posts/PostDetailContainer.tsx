"use client";

import { fetchPostsBySlug } from "@/utils/api/posts";
import { useQuery } from "@tanstack/react-query";
import PostTabs from "./PostTabs";

interface IProps {
  slug: string;
}
const PostContainer: React.FC<IProps> = ({ slug }) => {
  const { data } = useQuery({
    queryKey: ["posts", slug],
    queryFn: async () => fetchPostsBySlug(slug),
  });

  return (
    <>
      <PostTabs post={data} />
    </>
  );
};

export default PostContainer;
