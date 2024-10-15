"use client";

import UploadThumnail from "@/components/posts/UploadThumnail";
import ErrorText from "@/components/share/ErrorText";
import SelectDropdown from "@/components/share/SelectDropdown";
import TagsSelect from "@/components/share/TagsSelect";
import { IOption } from "@/types";
import { IPostFormInput } from "@/types/posts";
import { fetchCategories } from "@/utils/api/categories";
import { fetchTags } from "@/utils/api/tags";
import { generateSlug } from "@/utils/string-helper";
import { useQuery } from "@tanstack/react-query";
import { Label, TextInput } from "flowbite-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface IProps {
  register: UseFormRegister<IPostFormInput>;
  setValue: UseFormSetValue<IPostFormInput>;
  errors: FieldErrors<IPostFormInput>;
}

const PostForm: React.FC<IProps> = ({ register, setValue, errors }) => {
  const [categories, setCategories] = useState<IOption[]>([]);

  const [tagsDefault, setTagsDefault] = useState<IOption[]>([]);
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
    setTagsDefault(options);
  }, [tagsData]);

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("overview.slug", generateSlug(event.target.value));
  };

  const handleChangeTags = (selectedCategories: IOption[]) => {
    setValue(
      "overview.tag_id",
      selectedCategories?.map((item) =>
        item?.value ? String(item?.value) : ""
      ) ?? []
    );
    setTags(tagsDefault?.filter((item) => !selectedCategories?.includes(item)));
  };

  const handleSelect = (selectedOption: IOption) => {
    if (selectedOption?.value) {
      setValue("overview.category_id", `${selectedOption?.value}`);
    }
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
              {...register("overview.slug", { required: "This is required." })}
            />
            <ErrorText
              isError={!!errors?.overview?.slug}
              message={errors?.overview?.slug?.message}
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
              {...register("overview.title", {
                required: "This is required.",
                maxLength: {
                  value: 100,
                  message: "maxlength 100",
                },
              })}
              onChange={onChangeTitle}
            />
            <ErrorText
              isError={!!errors?.overview?.title}
              message={errors?.overview?.title?.message}
            />
          </div>

          <div className="space-y-2">
            <div className="inline-flex gap-3">
              <p className="my-auto dark:text-white">Category</p>
              <SelectDropdown
                options={categories}
                placeholder="Select a category"
                onSelect={handleSelect}
              />
              <input
                type="text"
                className="hidden"
                {...register("overview.category_id", {
                  required: "This is required.",
                })}
              />
            </div>
            <ErrorText
              isError={!!errors?.overview?.category_id}
              message={errors?.overview?.category_id?.message}
            />
          </div>

          <div className="space-y-2">
            <TagsSelect
              label="Tags"
              options={tags}
              onChange={handleChangeTags}
            />
            <input
              type="text"
              className="hidden"
              {...register("overview.tag_id", {
                required: "This is required.",
              })}
            />
            <ErrorText
              isError={!!errors?.overview?.tag_id}
              message={errors?.overview?.tag_id?.message}
            />
          </div>
        </div>
        <div>
          <UploadThumnail register={register} errors={errors} />
        </div>
      </div>
    </div>
  );
};

export default PostForm;
