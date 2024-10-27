"use client";

import { IImage, IImagesForm } from "@/types/images";
import { ErrorMessage } from "@/utils/errorMessage";
import { Button, FileInput, Label } from "flowbite-react";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorText from "../share/ErrorText";

interface IProps {
  tag?: IImage;
  isLoading?: boolean;
  className?: string;
  onSubmit?: (tag: IImagesForm) => void;
  onCancel?: () => void;
}

const ImagesForm: React.FC<IProps> = ({
  tag,
  isLoading,
  className,
  onSubmit,
  onCancel,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, dirtyFields },
  } = useForm<IImagesForm>({
    values: tag,
  });

  const onSubmitForm: SubmitHandler<IImagesForm> = async (
    formData: IImagesForm
  ) => {
    if (onSubmit) {
      if (!!formData.files?.length) {
        formData.name = formData.files[0]?.name ?? "";
      }
      onSubmit(formData);
    }
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
        <div>
          <div className="mb-2 block">
            <Label htmlFor="file-upload" value="Upload file" />
          </div>
          <FileInput
            id="file-upload"
            {...register("files", { required: ErrorMessage.REQUIRED })}
            color={!!errors?.files ? "failure" : ""}
            helperText={
              <ErrorText
                isError={!!errors?.files}
                message={errors?.files?.message}
              />
            }
          />
        </div>
      </div>
      <div className="flex flex-row gap-5 mt-5">
        <Button type="submit" isProcessing={isLoading}>
          Upload
        </Button>
        <Button color="gray" onClick={onCancel ? onCancel : undefined}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ImagesForm;
