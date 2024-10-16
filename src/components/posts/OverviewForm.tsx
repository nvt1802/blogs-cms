"use client";

import UploadThumnail from "@/components/posts/UploadThumnail";
import CheckboxList from "@/components/share/CheckboxList";
import ErrorText from "@/components/share/ErrorText";
import RadioList from "@/components/share/RadioList";
import { IOption } from "@/types";
import { IPost, IPostFormInput } from "@/types/posts";
import { fetchCategories } from "@/utils/api/categories";
import { fetchTags } from "@/utils/api/tags";
import { ErrorMessage } from "@/utils/errorMessage";
import { generateSlug } from "@/utils/string-helper";
import { useQuery } from "@tanstack/react-query";
import { Accordion, Label, TextInput } from "flowbite-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface IProps {
  post?: IPost;
  register: UseFormRegister<IPostFormInput>;
  setValue: UseFormSetValue<IPostFormInput>;
  errors: FieldErrors<IPostFormInput>;
}

const PostForm: React.FC<IProps> = ({ post, register, setValue, errors }) => {
  const [categories, setCategories] = useState<IOption[]>([]);
  const [tags, setTags] = useState<IOption[]>([]);

  const { data: categoriesData } = useQuery({
    queryKey: ["category", 1],
    queryFn: async () => fetchCategories(1),
  });

  const { data: tagsData } = useQuery({
    queryKey: ["tags", 1],
    queryFn: async () => fetchTags(1),
  });

  useEffect(() => {
    const options: IOption[] =
      categoriesData?.items?.map((item) => ({
        label: item?.name,
        value: item?.id,
      })) ?? [];
    setCategories(options);
  }, [categoriesData]);

  useEffect(() => {
    const options: IOption[] =
      tagsData?.items?.map((item) => ({
        label: item?.name,
        value: item?.id,
      })) ?? [];
    setTags(options);
  }, [tagsData]);

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("overview.slug", generateSlug(event.target.value));
  };

  const handleChangeTags = (options: string[]) => {
    setValue("overview.tag_id", options);
  };

  const handleSelect = (options: string) => {
    setValue("overview.category_id", options);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col xmd:flex-row xmd:grid xmd:grid-cols-2 gap-5">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <div className="mb-2 block">
              <Label htmlFor="small" value="Slug" />
            </div>
            <TextInput
              id="small"
              type="text"
              sizing="md"
              readOnly
              {...register("overview.slug", {
                required: ErrorMessage.REQUIRED,
              })}
              color={!!errors?.overview?.slug ? "failure" : ""}
              helperText={
                <ErrorText
                  isError={!!errors?.overview?.slug}
                  message={errors?.overview?.slug?.message}
                />
              }
            />
          </div>

          <div className="space-y-2">
            <div className="mb-2 block">
              <Label htmlFor="small" value="Title" />
            </div>
            <TextInput
              id="small"
              type="text"
              sizing="md"
              required
              {...register("overview.title", {
                required: ErrorMessage.REQUIRED,
                maxLength: {
                  value: 100,
                  message: "maxlength 100",
                },
              })}
              color={!!errors?.overview?.title ? "failure" : ""}
              helperText={
                <ErrorText
                  isError={!!errors?.overview?.title}
                  message={errors?.overview?.title?.message}
                />
              }
              onChange={onChangeTitle}
            />
          </div>

          <Accordion className="border-gray-300" collapseAll>
            <Accordion.Panel>
              <Accordion.Title className="p-2.5 text-sm">
                <div className="flex flex-row gap-4">
                  <p>Category</p>
                  <ErrorText
                    isError={!!errors?.overview?.category_id}
                    message={errors?.overview?.category_id?.message}
                  />
                </div>
              </Accordion.Title>
              <Accordion.Content className="p-2.5 max-h-96 overflow-y-auto">
                <RadioList
                  name="overview.category_id"
                  options={categories}
                  selected={post?.category_id}
                  onChange={handleSelect}
                  register={{
                    ...register("overview.category_id", {
                      required: ErrorMessage.REQUIRED,
                    }),
                  }}
                />
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="p-2.5 text-sm">
                <div className="flex flex-row gap-4">
                  <p>Tags</p>
                  <ErrorText
                    isError={!!errors?.overview?.tag_id}
                    message={errors?.overview?.tag_id?.message}
                  />
                </div>
              </Accordion.Title>
              <Accordion.Content className="p-2.5 max-h-96 overflow-y-auto">
                <CheckboxList
                  name="overview.tag_id"
                  options={tags}
                  selected={post?.tags?.map((tag) => tag?.id)}
                  onChange={handleChangeTags}
                  register={{
                    ...register("overview.tag_id", {
                      required: ErrorMessage.REQUIRED,
                    }),
                  }}
                />
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
        <div>
          <UploadThumnail register={register} errors={errors} />
        </div>
      </div>
    </div>
  );
};

export default PostForm;
