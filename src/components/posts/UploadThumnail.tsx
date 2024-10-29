"use client";

import { IPost, IPostFormInput } from "@/types/posts";
import { FileInput, Label } from "flowbite-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import ErrorText from "../share/ErrorText";
import { cloudinaryUrl } from "@/utils/contants";
import { useTranslations } from "next-intl";
import ImageGallery from "./ImageGallery";

interface IProps {
  post?: IPost;
  register: UseFormRegister<IPostFormInput>;
  errors?: FieldErrors<IPostFormInput>;
  onChaneFileList?: (fileList: FileList | null) => void;
  setValue: UseFormSetValue<IPostFormInput>;
}

const UploadThumnail: React.FC<IProps> = ({
  post,
  register,
  errors,
  setValue,
  onChaneFileList,
}) => {
  const t = useTranslations("PostForm");
  const [fileList, setFileList] = useState<FileList | null>();
  const [isShowBlob, setIsShowBlob] = useState<boolean>(false);
  const [featuredImage, setFeaturedImage] = useState<string>();

  const onChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    setFileList(event?.target.files);
    if (onChaneFileList) onChaneFileList(event?.target.files);
    if (!!event?.target.files?.length) {
      setIsShowBlob(true);
    } else {
      setIsShowBlob(false);
    }
  };

  useEffect(() => {
    setFeaturedImage(post?.featured_image);
  }, [post?.featured_image]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-4">
        <p className="text-sm dark:text-white">{t("lbl-featured-image")}</p>
        <ImageGallery
          onApplyImage={(image) => {
            setValue("overview.featuredImage", image?.public_id);
            setFeaturedImage(image?.public_id);
            setFileList(null);
          }}
        />
        <ErrorText
          isError={!!errors?.overview?.featuredImage}
          message={errors?.overview?.featuredImage?.message}
        />
      </div>

      <div className="flex w-full items-center justify-center">
        <Label
          htmlFor="dropzone-file"
          className={twMerge(
            "flex h-96 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600",
            errors?.overview?.featuredImage ? "ring-2 ring-red-600" : ""
          )}
        >
          {isShowBlob && fileList ? (
            <div className="w-full bg-gray-100 dark:bg-gray-800 flex p-1 max-h-[380px]">
              <Image
                src={URL.createObjectURL(fileList[0])}
                alt="Featured Image"
                width={460}
                height={380}
                className="max-w-[500px] max-h-96 object-contain mx-auto"
              />
            </div>
          ) : (
            featuredImage && (
              <div className="w-full bg-gray-100 dark:bg-gray-800 flex p-1 max-h-[380px]">
                <Image
                  src={`${cloudinaryUrl}/c_fill,h_380,w_460/${
                    featuredImage ?? ""
                  }`}
                  alt="Featured Image"
                  width={460}
                  height={380}
                  className="max-w-[500px] max-h-96 object-contain mx-auto"
                />
              </div>
            )
          )}
          {!featuredImage && !fileList && (
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
          )}
          <FileInput
            id="dropzone-file"
            className="hidden"
            {...register("overview.featuredImage")}
            onChange={onChangeImage}
          />
        </Label>
      </div>
    </div>
  );
};

export default UploadThumnail;
