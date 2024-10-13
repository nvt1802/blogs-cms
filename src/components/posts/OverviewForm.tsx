"use client";

import { IPostFormInput } from "@/types/posts";
import { generateSlug } from "@/utils/string-helper";
import { Label, TextInput } from "flowbite-react";
import React, { ChangeEvent } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import UploadThumnail from "./UploadThumnail";

interface IProps {
  register: UseFormRegister<IPostFormInput>;
  setValue: UseFormSetValue<IPostFormInput>;
  errors: FieldErrors<IPostFormInput>;
}

const PostForm: React.FC<IProps> = ({ register, setValue, errors }) => {
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("overview.slug", generateSlug(event.target.value));
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-6">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Slug" />
            </div>
            <TextInput
              id="small"
              type="text"
              sizing="md"
              readOnly
              {...register("overview.slug")}
            />
            {errors?.overview?.slug && (
              <p role="alert" className="text-red-600">
                {errors?.overview?.slug?.message}
              </p>
            )}
          </div>
          <div>
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
            {errors?.overview?.title && (
              <p role="alert" className="text-red-600">
                {errors?.overview?.title?.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <UploadThumnail register={register} />
        </div>
      </div>
    </div>
  );
};

export default PostForm;
