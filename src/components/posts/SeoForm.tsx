"use client";

import { IPost, IPostFormInput } from "@/types/posts";
import { Label, TextInput, ToggleSwitch } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import ErrorText from "@/components/share/ErrorText";
import { ErrorMessage } from "@/utils/errorMessage";

interface IProps {
  post?: IPost;
  register: UseFormRegister<IPostFormInput>;
  errors: FieldErrors<IPostFormInput>;
  setValue: UseFormSetValue<IPostFormInput>;
}

const SeoForm: React.FC<IProps> = ({ register, errors, post, setValue }) => {
  const [isIndex, setIsIndex] = useState(false);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    setIsIndex(post?.is_index || false);
    setIsFollow(post?.is_follow || false);
  }, [post]);

  const onChangeIsIndex = () => {
    setIsIndex(!isIndex);
    setValue("seo.isIndex", !isIndex);
  };

  const onChangeIsFollow = () => {
    setIsFollow(!isFollow);
    setValue("seo.isFollow", !isFollow);
  };

  return (
    <div className="p-4 flex flex-col gap-5">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="small" value="Title" />
        </div>
        <TextInput
          id="small"
          type="text"
          sizing="md"
          {...register("seo.seoTitle", { required: "This is required." })}
        />
        <ErrorText
          isError={!!errors?.seo?.seoTitle}
          message={errors?.seo?.seoTitle?.message}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="small" value="Description" />
        </div>
        <TextInput
          id="small"
          type="text"
          sizing="md"
          {...register("seo.excerpt", { required: ErrorMessage.REQUIRED })}
        />
        <ErrorText
          isError={!!errors?.seo?.excerpt}
          message={errors?.seo?.excerpt?.message}
        />
      </div>
      <div className="flex flex-row gap-4">
        <ToggleSwitch
          label="Is Index"
          {...register("seo.isIndex")}
          name="seo.isIndex"
          checked={isIndex}
          onChange={onChangeIsIndex}
        />
        <ToggleSwitch
          label="Is Follow"
          {...register("seo.isFollow")}
          name="seo.isFollow"
          checked={isFollow}
          onChange={onChangeIsFollow}
        />
      </div>
    </div>
  );
};

export default SeoForm;
