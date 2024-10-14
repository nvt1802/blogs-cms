"use client";

import { IPostFormInput } from "@/types/posts";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CMSTabs, { ITabItem } from "../share/tabs/CMSTabs";
import TabItem from "../share/tabs/TabItem";
import PostForm from "./OverviewForm";
import { Button } from "flowbite-react";
import SeoForm from "./SeoForm";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import('./Editor'), {
  ssr: false,
})

const PostTabs = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabs, setTabs] = useState<ITabItem[]>([
    {
      name: "Overview",
      status: "unknown",
    },
    {
      name: "Content",
      status: "unknown",
    },
    {
      name: "Seo",
      status: "unknown",
    },
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<IPostFormInput>();

  const onSubmit: SubmitHandler<IPostFormInput> = async (
    formData: IPostFormInput
  ) => {
    console.log(formData, errors);
  };

  const onNextTabs = async () => {
    let result: boolean = false;
    switch (activeTab) {
      case 0:
        result = await trigger([
          "overview.title",
          "overview.slug",
          "overview.featuredImage",
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CMSTabs
        activeTab={activeTab}
        onClickTab={(tab) => setActiveTab(tab)}
        tabs={tabs}
      >
        <TabItem active={activeTab === 0}>
          <PostForm register={register} setValue={setValue} errors={errors} />
        </TabItem>
        <TabItem active={activeTab === 1}>
          <Editor register={register} isShowEditor={activeTab === 1} />
        </TabItem>
        <TabItem active={activeTab === 2}>
          <SeoForm register={register} errors={errors} />
        </TabItem>
      </CMSTabs>

      <div className="px-4 pb-2 w-full flex justify-end gap-4 absolute bottom-0">
        <Button color="cyan" type="button" onClick={onNextTabs}>
          Next
        </Button>
        <Button color="cyan" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default PostTabs;
