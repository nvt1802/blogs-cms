"use client";

import ErrorText from "@/components/share/ErrorText";
import { IPostFormInput } from "@/types/posts";
import { ErrorMessage } from "@/utils/errorMessage";
import { Label, TextInput, ToggleSwitch } from "flowbite-react";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue
} from "react-hook-form";

interface IProps {
  errors: FieldErrors<IPostFormInput>;
  setValue: UseFormSetValue<IPostFormInput>;
  control: Control<IPostFormInput>;
}

const SeoForm: React.FC<IProps> = ({ errors, control }) => {
  return (
    <div className="p-4 flex flex-col gap-5">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="small" value="Title" />
        </div>
        <Controller
          name="seo.seoTitle"
          control={control}
          rules={{
            required: ErrorMessage.REQUIRED,
          }}
          render={({ field }) => (
            <TextInput
              id="small"
              type="text"
              sizing="md"
              color={!!errors?.seo?.seoTitle ? "failure" : ""}
              helperText={
                <ErrorText
                  isError={!!errors?.seo?.seoTitle}
                  message={errors?.seo?.seoTitle?.message}
                />
              }
              {...field}
            />
          )}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="small" value="Description" />
        </div>
        <Controller
          name="seo.excerpt"
          control={control}
          rules={{
            required: ErrorMessage.REQUIRED,
          }}
          render={({ field }) => (
            <TextInput
              id="small"
              type="text"
              sizing="md"
              color={!!errors?.seo?.excerpt ? "failure" : ""}
              helperText={
                <ErrorText
                  isError={!!errors?.seo?.excerpt}
                  message={errors?.seo?.excerpt?.message}
                />
              }
              {...field}
            />
          )}
        />
      </div>
      <div className="flex flex-row gap-8">
        <Controller
          name="seo.isIndex"
          control={control}
          rules={{
            required: ErrorMessage.REQUIRED,
          }}
          render={({ field: { onChange, value, ...restField } }) => (
            <ToggleSwitch
              label="Is isIndex"
              checked={value}
              onChange={(e) => onChange(e)}
              {...restField}
            />
          )}
        />

        <Controller
          name="seo.isFollow"
          control={control}
          rules={{
            required: ErrorMessage.REQUIRED,
          }}
          render={({ field: { onChange, value, ...restField } }) => (
            <ToggleSwitch
              label="Is Follow"
              checked={value}
              onChange={(e) => onChange(e)}
              {...restField}
            />
          )}
        />
      </div>
    </div>
  );
};

export default SeoForm;
