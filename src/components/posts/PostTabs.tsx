"use client";

import OverviewForm from "@/components/posts/OverviewForm";
import SeoForm from "@/components/posts/SeoForm";
import CMSTabs, { ITabItem } from "@/components/share/tabs/CMSTabs";
import TabItem from "@/components/share/tabs/TabItem";
import { IPost, IPostForm, IPostFormInput } from "@/types/posts";
import { PostStatus, postTabs } from "@/utils/contants";
import { getCookie } from "@/utils/cookieUtils";
import { OutputData } from "@editorjs/editorjs";
import { Button } from "flowbite-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

interface IProps {
  post?: IPost;
  isUpdateProcessing?: boolean;
  isPublishProcessing?: boolean;
  isCreateForm?: boolean;
  onSubmit?: (post: IPostForm) => void;
  onPublish?: (id: string, status: PostStatus) => void;
}

const PostTabs: React.FC<IProps> = ({
  post,
  isUpdateProcessing,
  isPublishProcessing,
  isCreateForm,
  onSubmit,
  onPublish,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabs, setTabs] = useState<ITabItem[]>(postTabs);
  const [defaultValue, setDefaultValue] = useState<IPostFormInput>();
  const [fileList, setFileList] = useState<FileList | null>();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, dirtyFields },
    trigger,
  } = useForm<IPostFormInput>({
    values: defaultValue,
  });

  useEffect(() => {
    setDefaultValue({
      content: post?.content ?? "",
      overview: {
        slug: post?.slug ?? "",
        category_id: post?.category_id,
        featuredImage: post?.featured_image,
        tag_id: post?.tags?.map((item) => item.id),
        title: post?.title ?? "",
      },
      seo: {
        excerpt: post?.excerpt ?? "",
        isFollow: post?.is_follow || false,
        isIndex: post?.is_index || false,
        seoTitle: post?.seo_title ?? "",
      },
    });
  }, [post]);

  const onSubmitForm: SubmitHandler<IPostFormInput> = async (
    formData: IPostFormInput
  ) => {
    if (onSubmit) {
      onSubmit({
        author_id: post?.author_id ?? getCookie("userId") ?? "",
        category_id: formData.overview.category_id ?? "",
        content: formData.content ?? "",
        excerpt: formData.seo.excerpt,
        featured_image: formData.overview.featuredImage ?? "",
        is_follow: formData.seo?.isFollow,
        is_index: formData.seo?.isIndex,
        seo_title: formData.seo.seoTitle,
        slug: formData.overview.slug,
        status: "draft",
        title: formData.overview.title,
        tags_id: formData.overview.tag_id ?? [],
        featured_image_blob: fileList,
      });
    }
  };

  const onNextTabs = async () => {
    let result: boolean = false;
    switch (activeTab) {
      case 0:
        result = await trigger([
          "overview.title",
          "overview.slug",
          "overview.featuredImage",
          "overview.category_id",
          "overview.tag_id",
        ]);
        break;
      case 1:
        result = await trigger(["content"]);
        break;
      case 2:
        result = await trigger(["seo.excerpt", "seo.seoTitle"]);
        break;
    }

    setTabs(
      tabs.map((item, index: number) => {
        if (activeTab === index) {
          return { ...item, status: result ? "success" : "error" };
        }
        return item;
      })
    );
    setActiveTab(activeTab < 2 ? activeTab + 1 : activeTab);
  };

  const onEditorChange = (data: OutputData) => {
    setValue("content", JSON.stringify(data), { shouldDirty: true });
  };

  const onChangeThumnailBlob = (fileList: FileList | null) => {
    setFileList(fileList);
  };

  const onChangeStatus = () => {
    if (onPublish) {
      onPublish(
        post?.id ?? "",
        post?.status === "draft" ? PostStatus.PUBLISHED : PostStatus.DRAFT
      );
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", (event) => {
      if (!!Object.keys(dirtyFields).length) {
        event.preventDefault();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirtyFields]);

  return (
    <CMSTabs
      activeTab={activeTab}
      onClickTab={(tab) => setActiveTab(tab)}
      tabs={tabs}
    >
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="max-h-[calc(100vh-270px)]"
      >
        <TabItem active={activeTab === 0} className="bg-white">
          <OverviewForm
            register={register}
            setValue={setValue}
            post={post}
            errors={errors}
            control={control}
            onChaneFileList={onChangeThumnailBlob}
          />
        </TabItem>
        <TabItem active={activeTab === 1} className="bg-gray-200 p-1">
          <Editor
            register={register}
            isShowEditor={activeTab === 1}
            data={post?.content ? JSON?.parse(post?.content) : null}
            onChange={onEditorChange}
          />
        </TabItem>
        <TabItem active={activeTab === 2} className="bg-white">
          <SeoForm control={control} errors={errors} setValue={setValue} />
        </TabItem>
        <div className="px-2 py-4 w-full absolute -bottom-4 border-t bg-gray-50 dark:bg-gray-700 z-30">
          <div className="flex gap-4 justify-between max-w-md">
            <div className="flex gap-4">
              <Button color="info" type="button" onClick={onNextTabs}>
                Next
              </Button>
              <Button
                color="success"
                type="submit"
                isProcessing={isUpdateProcessing}
                disabled={!Object.keys(dirtyFields).length}
              >
                Save
              </Button>
            </div>
            {!isCreateForm && (
              <Button
                color="purple"
                type="button"
                className="capitalize"
                isProcessing={isPublishProcessing}
                onClick={onChangeStatus}
              >
                {post?.status === "published" ? "Draft" : "Publish"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </CMSTabs>
  );
};

export default PostTabs;
