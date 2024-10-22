"use client";

import CMsModalConfirm from "@/components/share/CMsModalConfirm";
import TagForm from "@/components/tags/TagsForm";
import TagsTable from "@/components/tags/TagsTable";
import { useAppContext } from "@/context/AppContext";
import { ITagForm, ITags } from "@/types/tags";
import { addNewTag, deleteTag, fetchTags, updateTag } from "@/utils/api/tags";
import { useQuery } from "@tanstack/react-query";
import { Button, Drawer, Spinner } from "flowbite-react";
import { useState } from "react";
import { HiTag } from "react-icons/hi";

const TagsContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowModal, setShowModal] = useState<boolean>(false);
  const [isCreateForm, setCreateForm] = useState<boolean>(false);
  const [tagSelected, setTagSelected] = useState<ITags | undefined>();
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [isShowModalConfirm, setModalConfirm] = useState<boolean>(false);
  const { state, updateState } = useAppContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tags", currentPage],
    queryFn: async () => fetchTags(currentPage),
  });

  const onChangePage = (page: number) => setCurrentPage(page);

  const onEditTag = (tag: ITags) => {
    setTagSelected(tag);
    setCreateForm(false);
    setShowModal(true);
  };

  const onRemoveTag = (tag: ITags) => {
    setTagSelected(tag);
    setModalConfirm(true);
  };

  const onCreateNewTags = () => {
    setTagSelected(undefined);
    setCreateForm(true);
    setShowModal(true);
  };

  const onCloseModalConfirm = () => {
    setModalConfirm(false);
    setTagSelected(undefined);
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

  const onSubmitForm = async (tagForm: ITagForm) => {
    try {
      setProcessing(true);
      if (isCreateForm) {
        const response = await addNewTag(tagForm);
        if (response) {
          refetch();
          addToast("Add new tag success", "success");
        }
      }
      if (tagSelected?.id) {
        const response = await updateTag(tagSelected?.id, tagForm);
        if (response) {
          setTagSelected(response);
          refetch();
          addToast("Update tag success", "success");
        }
      }
      setShowModal(false);
    } catch (error) {
      console.error(error);
      addToast("Update tag error", "error");
    } finally {
      setProcessing(false);
    }
  };

  const onDeleteTag = async () => {
    try {
      if (tagSelected?.id) {
        const { message } = await deleteTag(tagSelected?.id);
        if (message === "Cannot delete tag currently in use") {
          addToast(message, "error");
        } else {
          refetch();
          addToast("Delete tag success", "success");
        }
      }
    } catch (error) {
      console.error(error);
      addToast("Delete tag error", "error");
    } finally {
      setProcessing(false);
      setModalConfirm(false);
      setTagSelected(undefined);
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
            <Button color="success" onClick={onCreateNewTags}>
              <div className="flex flex-row gap-2">
                <HiTag size={20} />
                <p>Create New Tag</p>
              </div>
            </Button>
          </div>
          <TagsTable
            currentPage={currentPage}
            data={data}
            onChange={onChangePage}
            onEditItem={onEditTag}
            onRemoveItem={onRemoveTag}
          />
          <Drawer
            open={isShowModal}
            onClose={() => setShowModal(false)}
            position="right"
            className="w-full max-w-md"
          >
            <Drawer.Items className="h-[calc(100vh-32px)]">
              <TagForm
                className="flex flex-col justify-between h-full"
                tag={tagSelected}
                isCreateForm={isCreateForm}
                isLoading={isProcessing}
                onSubmit={onSubmitForm}
                onCancel={() => setShowModal(false)}
              />
            </Drawer.Items>
          </Drawer>
          <CMsModalConfirm
            isShow={isShowModalConfirm}
            title="Are you sure you want to delete this tag?"
            onClose={onCloseModalConfirm}
            onConfirm={onDeleteTag}
          />
        </>
      )}
    </>
  );
};

export default TagsContainer;
