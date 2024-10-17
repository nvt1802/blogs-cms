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
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  Controller,
} from "react-hook-form";

interface IProps {
  post?: IPost;
  register: UseFormRegister<IPostFormInput>;
  setValue: UseFormSetValue<IPostFormInput>;
  errors: FieldErrors<IPostFormInput>;
  control: Control<IPostFormInput>;
}

const PostForm: React.FC<IProps> = ({
  register,
  setValue,
  errors,
  control,
}) => {
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

  return (
    <div className="p-4">
      <div className="flex flex-col xmd:flex-row xmd:grid xmd:grid-cols-2 gap-5">
        <div className="flex flex-col gap-6">
        <div className="space-y-2">
            <div className="mb-2 block">
              <Label htmlFor="overview.title" value="Title" />
            </div>
            <Controller
              name="overview.title"
              control={control}
              rules={{
                required: ErrorMessage.REQUIRED,
              }}
              render={({ field }) => (
                <TextInput
                  id="overview.title"
                  type="text"
                  sizing="md"
                  color={!!errors?.overview?.title ? "failure" : ""}
                  helperText={
                    <ErrorText
                      isError={!!errors?.overview?.title}
                      message={errors?.overview?.title?.message}
                    />
                  }
                  {...field}
                  onInput={onChangeTitle}
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <div className="mb-2 block">
              <Label htmlFor="overview.slug" value="Slug" />
            </div>
            <Controller
              name="overview.slug"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="overview.slug"
                  type="text"
                  sizing="md"
                  readOnly
                  {...field}
                />
              )}
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
                <Controller
                  name="overview.category_id"
                  control={control}
                  rules={{
                    required: ErrorMessage.REQUIRED,
                  }}
                  render={({ field: { value, onChange, ...restField } }) => (
                    <RadioList
                      options={categories}
                      value={value}
                      onChange={onChange}
                      {...restField}
                    />
                  )}
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
                <Controller
                  name="overview.tag_id"
                  control={control}
                  rules={{
                    required: ErrorMessage.REQUIRED,
                  }}
                  render={({ field: { value, onChange, ...restField } }) => (
                    <CheckboxList
                      options={tags}
                      value={value}
                      onChange={onChange}
                      {...restField}
                    />
                  )}
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
