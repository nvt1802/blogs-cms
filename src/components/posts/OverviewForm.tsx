"use client";

import UploadThumnail from "@/components/posts/UploadThumnail";
import CheckboxList from "@/components/share/CheckboxList";
import ErrorText from "@/components/share/ErrorText";
import RadioList from "@/components/share/RadioList";
import { IOption } from "@/types";
import { IPost, IPostFormInput } from "@/types/posts";
import { fetchCategories } from "@/utils/api/categories";
import { checkSlugIsUsed } from "@/utils/api/posts";
import { fetchTags } from "@/utils/api/tags";
import { ErrorMessage } from "@/utils/errorMessage";
import { generateSlug } from "@/utils/string-helper";
import { useQuery } from "@tanstack/react-query";
import { Accordion, Label, TextInput } from "flowbite-react";
import React, { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

interface IProps {
  post?: IPost;
  isCreateForm?: boolean;
  register: UseFormRegister<IPostFormInput>;
  setValue: UseFormSetValue<IPostFormInput>;
  setError?: UseFormSetError<IPostFormInput>;
  clearErrors?: UseFormClearErrors<IPostFormInput>;
  errors: FieldErrors<IPostFormInput>;
  control: Control<IPostFormInput>;
  onChaneFileList?: (fileList: FileList | null) => void;
}

const PostForm: React.FC<IProps> = ({
  post,
  errors,
  control,
  isCreateForm,
  register,
  setValue,
  setError,
  clearErrors,
  onChaneFileList,
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

  const onCheckSlug = async (slug: string) => {
    try {
      const { isUsed } = await checkSlugIsUsed(slug);
      if (!setError || !clearErrors) return;
      const hasSlugConflict = isCreateForm
        ? isUsed
        : isUsed && slug !== post?.slug;

      if (hasSlugConflict) {
        setError("overview.slug", { message: "Slug is used" });
      } else {
        clearErrors("overview.slug");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const slug = generateSlug(event.target.value);
    setValue("overview.slug", generateSlug(event.target.value), {
      shouldDirty: true,
    });
    onCheckSlug(slug);
  };

  const onChangeSlug = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setValue("overview.slug", event.target.value, {
      shouldDirty: true,
    });
  };

  const onBlurSlug = async (event: FocusEvent<HTMLInputElement>) => {
    const slug = generateSlug(event.target.value);
    setValue("overview.slug", generateSlug(slug), {
      shouldDirty: true,
    });
    onCheckSlug(slug);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col xmd:flex-row xmd:grid xmd:grid-cols-2 gap-5 mb-12 lg:mb-0">
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
                  className="custom-input"
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
              rules={{
                required: ErrorMessage.REQUIRED,
              }}
              render={({ field }) => (
                <TextInput
                  id="overview.slug"
                  type="text"
                  sizing="md"
                  color={!!errors?.overview?.slug ? "failure" : ""}
                  helperText={
                    <ErrorText
                      isError={!!errors?.overview?.slug}
                      message={errors?.overview?.slug?.message}
                    />
                  }
                  {...field}
                  onChange={onChangeSlug}
                  onBlur={onBlurSlug}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">Categories & Tags</p>
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
        </div>
        <div>
          <UploadThumnail
            post={post}
            register={register}
            errors={errors}
            onChaneFileList={onChaneFileList}
          />
        </div>
      </div>
    </div>
  );
};

export default PostForm;
