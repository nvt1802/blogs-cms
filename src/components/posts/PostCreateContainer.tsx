"use client";

import { useAppContext } from "@/context/AppContext";
import { IPostForm } from "@/types/posts";
import { addNewPost, addTagsForPost } from "@/utils/api/posts";
import { uploadSingeFile } from "@/utils/api/upload";
import { useState } from "react";
import PostTabs from "./PostTabs";

const PostCreateContainer: React.FC = () => {
  const [isUpdateProcessing, setIsUpdateProcessing] = useState<boolean>(false);
  const { state, updateState } = useAppContext();

  const addToast = (
    message: string,
    type: "success" | "error" | "info",
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right",
    duration: number = 3000
  ) => {
    const id = new Date().toISOString();
    const newToast = { id, message, type, position, duration };
    updateState({ toasts: [...state.toasts, newToast] });
  };

  const onCreateNewPost = async (post: IPostForm) => {
    try {
      setIsUpdateProcessing(true);
      const tagsId = post?.tags_id ?? [];
      console.log(post.featured_image_blob);
      if (post.featured_image_blob) {
        const { url } = await uploadSingeFile(post.featured_image_blob);
        post.featured_image = url;
      } else {
        post.featured_image = "";
      }
      delete post?.tags_id;
      delete post?.featured_image_blob;
      const { slug } = await addNewPost(post);
      const { message } = await addTagsForPost(slug, tagsId);
      addToast(message, "success");
      addToast("Update Post success", "success");
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
        isUpdateProcessing={isUpdateProcessing}
        onSubmit={onCreateNewPost}
      />
    </>
  );
};

export default PostCreateContainer;
