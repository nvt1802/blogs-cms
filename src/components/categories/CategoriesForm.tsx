"use client";

import ErrorText from "@/components/share/ErrorText";
import { ICategoriesForm } from "@/types/categories";
import { ITags } from "@/types/tags";
import { ErrorMessage } from "@/utils/errorMessage";
import { generateSlug } from "@/utils/string-helper";
import { Button, Label, TextInput } from "flowbite-react";
import { useTranslations } from "next-intl";
import React, { ChangeEvent, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IProps {
  tag?: ITags;
  isCreateForm?: boolean;
  isLoading?: boolean;
  className?: string;
  onSubmit?: (tag: ICategoriesForm) => void;
  onCancel?: () => void;
}

const CategoriesForm: React.FC<IProps> = ({
  tag,
  isCreateForm,
  isLoading,
  className,
  onSubmit,
  onCancel,
}) => {
  const t = useTranslations("CategoriesPage");

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<ICategoriesForm>({
    values: tag,
  });

  const onSubmitForm: SubmitHandler<ICategoriesForm> = async (
    formData: ICategoriesForm
  ) => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const onChangeCategoryName = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("name", event.target.value);
    setValue("slug", generateSlug(event.target.value), {
      shouldDirty: true,
    });
  };

  useEffect(() => {
    window.addEventListener("beforeunload", (event) => {
      if (!!Object.keys(dirtyFields).length) {
        event.preventDefault();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirtyFields]);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className={className}>
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <div className="mb-2 block">
            <Label htmlFor="title" value={t("lbl-title")} />
          </div>
          <Controller
            name="name"
            control={control}
            rules={{
              required: ErrorMessage.REQUIRED,
            }}
            render={({ field }) => (
              <TextInput
                id="title"
                type="text"
                sizing="md"
                className="custom-input"
                color={!!errors?.name ? "failure" : ""}
                helperText={
                  <ErrorText
                    isError={!!errors?.name}
                    message={errors?.name?.message}
                  />
                }
                {...field}
                onChange={onChangeCategoryName}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <div className="mb-2 block">
            <Label htmlFor="slug" value="Slug" />
          </div>
          <Controller
            name="slug"
            control={control}
            rules={{
              required: ErrorMessage.REQUIRED,
            }}
            render={({ field }) => (
              <TextInput
                id="slug"
                type="text"
                sizing="md"
                className="custom-input"
                readOnly
                color={!!errors?.slug ? "failure" : ""}
                helperText={
                  <ErrorText
                    isError={!!errors?.slug}
                    message={errors?.slug?.message}
                  />
                }
                {...field}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <div className="mb-2 block">
            <Label htmlFor="description" value={t("lbl-description")} />
          </div>
          <Controller
            name="description"
            control={control}
            rules={{
              required: ErrorMessage.REQUIRED,
            }}
            render={({ field }) => (
              <TextInput
                id="description"
                type="text"
                sizing="md"
                className="custom-input"
                color={!!errors?.description ? "failure" : ""}
                helperText={
                  <ErrorText
                    isError={!!errors?.description}
                    message={errors?.description?.message}
                  />
                }
                {...field}
              />
            )}
          />
        </div>
      </div>

      <div className="flex flex-row gap-5 mt-5">
        <Button type="submit" isProcessing={isLoading}>
          {isCreateForm ? "Create" : "Save"}
        </Button>
        <Button color="gray" onClick={onCancel ? onCancel : undefined}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CategoriesForm;
