"use client";

import { IPostFormInput } from "@/types/posts";
import { Label, TextInput } from "flowbite-react";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Toggle from "../share/Toggle";

interface IProps {
  register: UseFormRegister<IPostFormInput>;
  errors: FieldErrors<IPostFormInput>;
}

const SeoForm: React.FC<IProps> = ({ register, errors }) => {
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
          readOnly
          {...register("seo.seoTitle")}
        />
        {errors?.overview?.slug && (
          <p role="alert" className="text-red-600">
            {errors?.overview?.slug?.message}
          </p>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="small" value="Description" />
        </div>
        <TextInput
          id="small"
          type="text"
          sizing="md"
          readOnly
          {...register("seo.excerpt")}
        />
        {errors?.overview?.slug && (
          <p role="alert" className="text-red-600">
            {errors?.overview?.slug?.message}
          </p>
        )}
      </div>
      <div className="flex flex-row gap-4">
        <Toggle label="Is Index" {...register("seo.isIndex")} />
        <Toggle label="Is Follow" {...register("seo.isFollow")} />
      </div>
    </div>
  );
};

export default SeoForm;
