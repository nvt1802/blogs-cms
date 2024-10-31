"use client";

import CategoriesTable from "@/components/categories/CategoriesTable";
import CMsModalConfirm from "@/components/share/CMsModalConfirm";
import { useAppContext } from "@/context/AppContext";
import { ICategories, ICategoriesForm } from "@/types/categories";
import {
  addNewCategories,
  deleteCategories,
  fetchCategories,
  updateCategories,
} from "@/utils/api/categories";
import { useQuery } from "@tanstack/react-query";
import { Button, Drawer, Spinner } from "flowbite-react";
import { useState } from "react";
import { HiTag } from "react-icons/hi";
import CategoriesForm from "./CategoriesForm";
import { useTranslations } from "next-intl";
import { ScreenBreakpoints } from "@/utils/enum";
import CategoryListing from "./CategoryListing";

const CategoriesContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowModal, setShowModal] = useState<boolean>(false);
  const [isCreateForm, setCreateForm] = useState<boolean>(false);
  const [categorySelected, setCategorySelected] = useState<
    ICategories | undefined
  >();
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [isShowModalConfirm, setModalConfirm] = useState<boolean>(false);
  const { state, updateState } = useAppContext();
  const t = useTranslations("CategoriesPage");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tags", currentPage],
    queryFn: async () => fetchCategories(currentPage),
  });

  const onChangePage = (page: number) => setCurrentPage(page);

  const onEditTag = (tag: ICategories) => {
    setCategorySelected(tag);
    setCreateForm(false);
    setShowModal(true);
  };

  const onRemoveTag = (tag: ICategories) => {
    setCategorySelected(tag);
    setModalConfirm(true);
  };

  const onCreateNewCategory = () => {
    setCategorySelected(undefined);
    setCreateForm(true);
    setShowModal(true);
  };

  const onCloseModalConfirm = () => {
    setModalConfirm(false);
    setCategorySelected(undefined);
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

  const onSubmitForm = async (categoriesForm: ICategoriesForm) => {
    try {
      setProcessing(true);
      if (isCreateForm) {
        const response = await addNewCategories(categoriesForm);
        if (response) {
          refetch();
          addToast("Add new category success", "success");
        }
      }
      if (categorySelected?.id) {
        const response = await updateCategories(
          categorySelected?.id,
          categoriesForm
        );
        if (response) {
          setCategorySelected(response);
          refetch();
          addToast("Update category success", "success");
        }
      }
      setShowModal(false);
    } catch (error) {
      console.error(error);
      addToast("Update category error", "error");
    } finally {
      setProcessing(false);
    }
  };

  const onDeleteTag = async () => {
    try {
      if (categorySelected?.id) {
        const { message } = await deleteCategories(categorySelected?.id);
        if (message === "Cannot delete category currently in use") {
          addToast(message, "error");
        } else {
          refetch();
          addToast("Delete category success", "success");
        }
      }
    } catch (error) {
      console.error(error);
      addToast("Delete category error", "error");
    } finally {
      setProcessing(false);
      setModalConfirm(false);
      setCategorySelected(undefined);
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
            <Button color="success" onClick={onCreateNewCategory}>
              <div className="flex flex-row gap-2">
                <HiTag size={20} />
                <p>{t("btn-create-new-category")}</p>
              </div>
            </Button>
          </div>
          {state.innerWidth >= ScreenBreakpoints.MD ? (
            <CategoriesTable
              currentPage={currentPage}
              data={data}
              onChange={onChangePage}
              onEditItem={onEditTag}
              onRemoveItem={onRemoveTag}
            />
          ) : (
            <CategoryListing
              currentPage={currentPage}
              data={data}
              onChange={onChangePage}
              onEditItem={onEditTag}
              onRemoveItem={onRemoveTag}
            />
          )}

          <Drawer
            open={isShowModal}
            onClose={() => setShowModal(false)}
            position="right"
            className="w-full max-w-md"
          >
            <Drawer.Items className="h-[calc(100vh-32px)]">
              <CategoriesForm
                className="h-full flex flex-col justify-between"
                tag={categorySelected}
                isCreateForm={isCreateForm}
                isLoading={isProcessing}
                onSubmit={onSubmitForm}
                onCancel={() => setShowModal(false)}
              />
            </Drawer.Items>
          </Drawer>
          <CMsModalConfirm
            isShow={isShowModalConfirm}
            title="Are you sure you want to delete this category?"
            onClose={onCloseModalConfirm}
            onConfirm={onDeleteTag}
          />
        </>
      )}
    </>
  );
};

export default CategoriesContainer;
