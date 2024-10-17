"use client";

import { IPost, IPostForm, IPostFormInput } from "@/types/posts";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CMSTabs, { ITabItem } from "@/components/share/tabs/CMSTabs";
import TabItem from "@/components/share/tabs/TabItem";
import OverviewForm from "@/components/posts/OverviewForm";
import { Button } from "flowbite-react";
import SeoForm from "@/components/posts/SeoForm";
import dynamic from "next/dynamic";
import { OutputData } from "@editorjs/editorjs";
import { postTabs } from "@/utils/contants";
import { getCookie } from "@/utils/cookieUtils";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

interface IProps {
  post?: IPost;
  onSubmit?: (post: IPostForm) => void;
}

const PostTabs: React.FC<IProps> = ({ post, onSubmit }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabs, setTabs] = useState<ITabItem[]>(postTabs);
  const [defaultValue, setDefaultValue] = useState<IPostFormInput>();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isDirty },
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
        is_follow: formData.seo.isFollow,
        is_index: formData.seo.isIndex,
        seo_title: formData.seo.seoTitle,
        slug: formData.overview.slug,
        status: "draft",
        title: formData.overview.title,
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

  const handleEditorChange = (data: OutputData) => {
    setValue("content", JSON.stringify(data));
  };

  useEffect(() => {
    if (isDirty) {
      window.addEventListener("beforeunload", (event) => {
        event.preventDefault();
      });
    }
  }, [isDirty]);

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
        <TabItem active={activeTab === 0}>
          <OverviewForm
            register={register}
            setValue={setValue}
            post={post}
            errors={errors}
            control={control}
          />
        </TabItem>
        <TabItem active={activeTab === 1} className="bg-gray-200">
          <Editor
            register={register}
            isShowEditor={activeTab === 1}
            data={post?.content ? JSON?.parse(post?.content) : null}
            onChange={handleEditorChange}
          />
        </TabItem>
        <TabItem active={activeTab === 2}>
          <SeoForm control={control} errors={errors} setValue={setValue} />
        </TabItem>
        <div className="px-4 pt-1 w-full flex justify-between gap-4 absolute bottom-0 border-t">
          <Button color="purple" type="button">
            Publish
          </Button>
          <div className="flex gap-4">
            <Button color="info" type="button" onClick={onNextTabs}>
              Next
            </Button>
            <Button color="success" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </CMSTabs>
  );
};

export default PostTabs;
