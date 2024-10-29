"use client";

import { useAppContext } from "@/context/AppContext";
import { IPost, IPostForm } from "@/types/posts";
import { IUserInfo } from "@/types/users";
import {
  fetchPostsBySlug,
  updatePost,
  updateStatusOfPost,
  updateTagsOfPost,
} from "@/utils/api/posts";
import { uploadSingeFile } from "@/utils/api/upload";
import { fetchUsersInfoById } from "@/utils/api/users";
import { cloudinaryUrl, PostStatus } from "@/utils/contants";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Avatar, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PostTabs from "./PostTabs";
import { useTranslations } from "next-intl";
import { addNewImages } from "@/utils/api/images";

interface IProps {
  slug: string;
}
const PostContainer: React.FC<IProps> = ({ slug }) => {
  const router = useRouter();
  const t = useTranslations("PostForm");
  const [isUpdateProcessing, setIsUpdateProcessing] = useState<boolean>(false);
  const [isPublishProcessing, setIsPublishProcessing] =
    useState<boolean>(false);

  const [post, setPost] = useState<IPost>();
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const { state, updateState } = useAppContext();

  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", slug],
    retryOnMount: false,
    queryFn: async () => fetchPostsBySlug(slug),
  });

  const onGetUserInfo = async (userId: string) => {
    try {
      if (userId) {
        const data = await fetchUsersInfoById(userId);
        setUserInfo(data);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
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

  const onUpdatePost = async (postFormData: IPostForm) => {
    try {
      setIsUpdateProcessing(true);
      const tagsId = postFormData?.tags_id ?? [];
      if (postFormData.featured_image_blob) {
        const { public_id } = await uploadSingeFile(
          postFormData.featured_image_blob
        );
        postFormData.featured_image = public_id;
        await addNewImages({
          name: postFormData.featured_image_blob[0]?.name ?? "",
          public_id,
        });
      }
      delete postFormData?.tags_id;
      delete postFormData?.featured_image_blob;
      postFormData.status = post?.status || "draft";
      const response = await updatePost(slug, postFormData);
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

  const onPublish = async (id: string, status: PostStatus) => {
    try {
      setIsPublishProcessing(true);
      const response = await updateStatusOfPost(id, status);
      setPost(response);
      addToast("Update Post success", "success");
    } catch (error) {
      console.error(error);
      addToast("Update Post error", "error");
    } finally {
      setIsPublishProcessing(false);
    }
  };

  useEffect(() => {
    setPost(data);
    onGetUserInfo(data?.author_id ?? "");
  }, [data]);

  useEffect(() => {
    if (error) {
      router.push(`/404`);
    }
  }, [router, error]);

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
          <div className="flex flex-row gap-5">
            <Avatar
              img={
                userInfo?.profile_picture
                  ? `${cloudinaryUrl}/c_fill,h_80,w_80/${userInfo?.profile_picture}`
                  : ""
              }
              alt="avatar"
              placeholderInitials={`${
                userInfo?.first_name?.charAt(0).toUpperCase() ?? ""
              }${userInfo?.last_name?.charAt(0).toUpperCase() ?? ""}`}
              size="lg"
              rounded
            />
            <div className="grid grid-cols-3 gap-5 text-sm leading-7 dark:text-white">
              <div className="col-span-1 flex flex-col gap-1 justify-between font-semibold text-xs">
                <div>{t("author")}</div>
                <div>{t("published-at")}</div>
                <div>{t("status")}</div>
              </div>
              <div className="col-span-2 flex flex-col gap-1 justify-between text-xs">
                <div className="capitalize">{`${userInfo?.first_name} ${userInfo?.last_name}`}</div>
                <div>
                  {dayjs(post?.published_at).format("DD/MM/YYYY HH:mm")}
                </div>
                <div className="capitalize">
                  {post?.status === "published" ? (
                    <p className="bg-green-500 text-white w-fit px-1 py-0.5 rounded">
                      {PostStatus.PUBLISHED}
                    </p>
                  ) : (
                    <p className="bg-gray-500 text-white w-fit px-1 py-0.5 rounded">
                      {PostStatus.DRAFT}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <PostTabs
            post={post}
            isUpdateProcessing={isUpdateProcessing}
            isPublishProcessing={isPublishProcessing}
            onSubmit={onUpdatePost}
            onPublish={onPublish}
          />
        </>
      )}
    </>
  );
};

export default PostContainer;
