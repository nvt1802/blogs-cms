"use client";

import { fetchPostsBySlug, updatePost } from "@/utils/api/posts";
import { useQuery } from "@tanstack/react-query";
import PostTabs from "./PostTabs";
import { IPostForm } from "@/types/posts";

interface IProps {
  slug: string;
}
const PostContainer: React.FC<IProps> = ({ slug }) => {
  const { data } = useQuery({
    queryKey: ["posts", slug],
    queryFn: async () => fetchPostsBySlug(slug),
  });

  const onUpdatePost = (post: IPostForm) => {
    updatePost(slug, post);
  };

  return (
    <>
      <PostTabs post={data} onSubmit={onUpdatePost} />
    </>
  );
};

export default PostContainer;
