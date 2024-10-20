"use client";

import PostsTable from "@/components/posts/PostTable";
import { deletePost, fetchPosts } from "@/utils/api/posts";
import { useQuery } from "@tanstack/react-query";
import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { HiDocumentAdd } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { IPost } from "@/types/posts";
import CMsModalConfirm from "../share/CMsModalConfirm";
import { useAppContext } from "@/context/AppContext";

const PostContainer = () => {
  const router = useRouter();
  const { state, updateState } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [postSelected, setPostSelected] = useState<IPost | undefined>();
  const [isShowModalConfirm, setModalConfirm] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery({
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

  const onRemovePost = (post: IPost) => {
    setPostSelected(post);
    setModalConfirm(true);
  };

  const onCloseModalConfirm = () => {
    setModalConfirm(false);
    setPostSelected(undefined);
  };

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

  const onDeletePost = async () => {
    console.log(postSelected);
    try {
      if (postSelected?.id) {
        const { message } = await deletePost(postSelected?.id);
        if (message === "Delete post success") {
          addToast("Delete post success", "success");
          refetch();
        } else {
          addToast("Delete post error", "error");
        }
      }
    } catch (error) {
      console.error(error);
      addToast("Delete post error", "error");
    } finally {
      setModalConfirm(false);
      setPostSelected(undefined);
    }
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
            onEditItem={onEditPost}
            onRemoveItem={onRemovePost}
          />
          <CMsModalConfirm
            isShow={isShowModalConfirm}
            title={`Are you sure you want to delete "${postSelected?.title}" ?`}
            onClose={onCloseModalConfirm}
            onConfirm={onDeletePost}
          />
        </>
      )}
    </>
  );
};

export default PostContainer;
