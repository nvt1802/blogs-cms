"use client";

import CMsModalConfirm from "@/components/share/CMsModalConfirm";
import { useAppContext } from "@/context/AppContext";
import { IApiKeyForm, IApiKeys } from "@/types/api-keys";
import {
  createNewApiKey,
  deleteApiKey,
  fetchAllApiKeys,
} from "@/utils/api/api-keys";
import { useQuery } from "@tanstack/react-query";
import { Button, Drawer, Spinner } from "flowbite-react";
import { useState } from "react";
import { HiOutlineKey } from "react-icons/hi";
import ApiKeysForm from "./ApiKeysForm";
import ApikeysTable from "./ApikeysTable";
import { useTranslations } from "next-intl";

const ApiKeysContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowModal, setShowModal] = useState<boolean>(false);
  const [isCreateForm, setCreateForm] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<IApiKeys | undefined>();
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [isShowModalConfirm, setModalConfirm] = useState<boolean>(false);
  const { state, updateState } = useAppContext();
  const t = useTranslations("ApiKeysPage");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["api-keys", currentPage],
    queryFn: async () => fetchAllApiKeys(currentPage),
  });

  const onChangePage = (page: number) => setCurrentPage(page);

  const onRemoveApiKey = (data: IApiKeys) => {
    setItemSelected(data);
    setModalConfirm(true);
  };

  const onCreateNewApiKey = () => {
    setItemSelected(undefined);
    setCreateForm(true);
    setShowModal(true);
  };

  const onCloseModalConfirm = () => {
    setModalConfirm(false);
    setItemSelected(undefined);
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

  const onSubmitForm = async (apiKeyForm: IApiKeyForm) => {
    try {
      setProcessing(true);
      if (apiKeyForm.duration === "limited") {
        apiKeyForm.expiry_date = `${apiKeyForm.value}${apiKeyForm.unit}`;
        delete apiKeyForm.unit;
        delete apiKeyForm.value;
      }
      const response = await createNewApiKey(apiKeyForm);
      if (response) {
        refetch();
        addToast("Add new API Key success", "success");
      }
      setShowModal(false);
    } catch (error) {
      console.error(error);
      addToast("Create API Key error", "error");
    } finally {
      setProcessing(false);
    }
  };

  const onDeleteApiKey = async () => {
    try {
      if (itemSelected?.id) {
        const { message } = await deleteApiKey(itemSelected?.id);
        if (message === "Cannot delete API Key currently in use") {
          addToast(message, "error");
        } else {
          refetch();
          addToast("Delete API Key success", "success");
        }
      }
    } catch (error) {
      console.error(error);
      addToast("Delete API Key error", "error");
    } finally {
      setProcessing(false);
      setModalConfirm(false);
      setItemSelected(undefined);
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
            <Button color="success" onClick={onCreateNewApiKey}>
              <div className="flex flex-row gap-2">
                <HiOutlineKey size={20} />
                <p>{t("btn-create-new-key")}</p>
              </div>
            </Button>
          </div>
          <ApikeysTable
            currentPage={currentPage}
            data={data}
            onChange={onChangePage}
            onRemoveItem={onRemoveApiKey}
          />
          <Drawer
            open={isShowModal}
            onClose={() => setShowModal(false)}
            position="right"
            className="w-full max-w-md"
          >
            <Drawer.Items className="h-[calc(100vh-32px)]">
              <ApiKeysForm
                className="h-full flex flex-col justify-between"
                isCreateForm={isCreateForm}
                isLoading={isProcessing}
                onSubmit={onSubmitForm}
                onCancel={() => setShowModal(false)}
              />
            </Drawer.Items>
          </Drawer>
          <CMsModalConfirm
            isShow={isShowModalConfirm}
            title="Are you sure you want to delete this API Key?"
            onClose={onCloseModalConfirm}
            onConfirm={onDeleteApiKey}
          />
        </>
      )}
    </>
  );
};

export default ApiKeysContainer;
