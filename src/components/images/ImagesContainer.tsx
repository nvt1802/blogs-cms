"use client";

import ImagesForm from "@/components/images/ImagesForm";
import ImagesTable from "@/components/images/ImagesTable";
import CMsModalConfirm from "@/components/share/CMsModalConfirm";
import { useAppContext } from "@/context/AppContext";
import { IImage, IImagesForm } from "@/types/images";
import { addNewImages, deleteImages, fetchImages } from "@/utils/api/images";
import { uploadSingeFile } from "@/utils/api/upload";
import { useQuery } from "@tanstack/react-query";
import { Button, Drawer, Spinner } from "flowbite-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { HiTag } from "react-icons/hi";

const ImagesContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowModal, setShowModal] = useState<boolean>(false);
  const [imageSelected, setImageSelected] = useState<IImage | undefined>();
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [isShowModalConfirm, setModalConfirm] = useState<boolean>(false);
  const { state, updateState } = useAppContext();
  const t = useTranslations("ImagesPage");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["images", currentPage],
    queryFn: async () => fetchImages(currentPage),
  });

  const onChangePage = (page: number) => setCurrentPage(page);

  const onRemoveImage = (image: IImage) => {
    setImageSelected(image);
    setModalConfirm(true);
  };

  const onUploadNewImage = () => {
    setImageSelected(undefined);
    setShowModal(true);
  };

  const onCloseModalConfirm = () => {
    setModalConfirm(false);
    setImageSelected(undefined);
  };

  const addToast = (
    message: string,
    type: "success" | "error" | "info",
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right",
    duration: number = 3000
  ) => {
    const id = new Date().toISOString();
    const newToast = { id, message, type, position, duration };
    updateState({ toasts: [...state.toasts, newToast] });
  };

  const onSumitUploadImage = async (formData: IImagesForm) => {
    try {
      setProcessing(true);
      if (formData.files) {
        const { public_id } = await uploadSingeFile(formData.files);
        formData.public_id = public_id;
        formData.name = formData.name;
        delete formData.files;
        const imagesResponse = await addNewImages(formData);
        if (imagesResponse) {
          addToast("Update image success", "success");
          refetch();
        }
      }
    } catch (error) {
      console.error(error);
      addToast("Upload image error", "error");
    } finally {
      setProcessing(false);
      setShowModal(false);
    }
  };

  const onDeleteImage = async () => {
    try {
      if (imageSelected?.id) {
        await deleteImages(imageSelected?.id);
        addToast("Delete images success", "success");
        refetch();
      }
    } catch (error) {
      console.error(error);
      addToast("Delete images error", "error");
    } finally {
      setProcessing(false);
      setModalConfirm(false);
      setImageSelected(undefined);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col text-center h-full">
          <div className="my-auto">
            <Spinner aria-label="spinner" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-row justify-end p-2">
            <Button color="success" onClick={onUploadNewImage}>
              <div className="flex flex-row gap-2">
                <HiTag size={20} />
                <p>{t("btn-upload-new-image")}</p>
              </div>
            </Button>
          </div>
          <ImagesTable
            currentPage={currentPage}
            data={data}
            onChange={onChangePage}
            onRemoveItem={onRemoveImage}
          />
          <Drawer
            open={isShowModal}
            onClose={() => setShowModal(false)}
            position="right"
            className="w-full max-w-md"
          >
            <Drawer.Items className="h-[calc(100vh-32px)]">
              <ImagesForm
                className="flex flex-col justify-between h-full"
                tag={imageSelected}
                isLoading={isProcessing}
                onCancel={() => setShowModal(false)}
                onSubmit={onSumitUploadImage}
              />
            </Drawer.Items>
          </Drawer>
          <CMsModalConfirm
            isShow={isShowModalConfirm}
            title="Are you sure you want to delete this tag?"
            onClose={onCloseModalConfirm}
            onConfirm={onDeleteImage}
          />
        </>
      )}
    </>
  );
};

export default ImagesContainer;
