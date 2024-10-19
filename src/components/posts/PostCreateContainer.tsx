"use client";

import { useAppContext } from "@/context/AppContext";
import { IPost, IPostForm } from "@/types/posts";
import {
  updatePost,
  updateTagsOfPost
} from "@/utils/api/posts";
import { uploadSingeFile } from "@/utils/api/upload";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PostTabs from "./PostTabs";

interface IProps {
  slug: string;
}
const PostCreateContainer: React.FC<IProps> = ({ slug }) => {
  const router = useRouter();
  const [isUpdateProcessing, setIsUpdateProcessing] = useState<boolean>(false);

  const [post, setPost] = useState<IPost>();
  const { state, updateState } = useAppContext();

  const addToast = (
    message: string,
    type: "success" | "error" | "info",
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right",
    duration: number = 5000
  ) => {
    const id = new Date().toISOString();
    const newToast = { id, message, type, position, duration };
    updateState({ toasts: [...state.toasts, newToast] });
  };

  const onUpdatePost = async (post: IPostForm) => {
    try {
      setIsUpdateProcessing(true);
      const tagsId = post?.tags_id ?? [];
      if (post.featured_image_blob) {
        const { url } = await uploadSingeFile(post.featured_image_blob);
        post.featured_image = url;
      }
      delete post?.tags_id;
      delete post?.featured_image_blob;
      const response = await updatePost(slug, post);
      await updateTagsOfPost(slug, tagsId);
      if (response.slug !== slug) {
        router.push(`/dashboard/posts/${response.slug}`);
      } else {
        setPost(response);
        addToast("Update Post success", "success");
      }
    } catch (error) {
      console.error(error);
      addToast("Update Post error", "error");
    } finally {
      setIsUpdateProcessing(false);
    }
  };

  return (
    <>
      <PostTabs
        isCreateForm
        post={post}
        isUpdateProcessing={isUpdateProcessing}
        onSubmit={onUpdatePost}
      />
    </>
  );
};

export default PostCreateContainer;
