"use client";

import ErrorText from "@/components/share/ErrorText";
import RadioList from "@/components/share/RadioList";
import { IApiKeyForm } from "@/types/api-keys";
import { ExpiresUnit } from "@/utils/enum";
import { ErrorMessage } from "@/utils/errorMessage";
import { Button, Label, Select, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IProps {
  isCreateForm?: boolean;
  isLoading?: boolean;
  className?: string;
  onSubmit?: (data: IApiKeyForm) => void;
  onCancel?: () => void;
}

const ApiKeysForm: React.FC<IProps> = ({
  isCreateForm,
  isLoading,
  className,
  onSubmit,
  onCancel,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<IApiKeyForm>({
    values: {
      name: "",
      duration: "unlimited",
      secret_key: "",
      expiry_date: "",
    },
  });

  const onSubmitForm: SubmitHandler<IApiKeyForm> = async (
    formData: IApiKeyForm
  ) => {
    if (onSubmit) {
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
        <div className="space-y-2">
          <div className="mb-2 block">
            <Label htmlFor="title" value="Name" />
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
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <div className="mb-2 block">
            <Label htmlFor="secret_key" value="Secret Key" />
          </div>
          <Controller
            name="secret_key"
            control={control}
            rules={{
              required: ErrorMessage.REQUIRED,
            }}
            render={({ field }) => (
              <TextInput
                id="secret_key"
                type="text"
                sizing="md"
                className="custom-input"
                color={!!errors?.secret_key ? "failure" : ""}
                helperText={
                  <ErrorText
                    isError={!!errors?.secret_key}
                    message={errors?.secret_key?.message}
                  />
                }
                {...field}
              />
            )}
          />
        </div>

        <div className="flex flex-row gap-5 w-full">
          <Controller
            name="duration"
            control={control}
            rules={{
              required: ErrorMessage.REQUIRED,
            }}
            render={({ field: { value, onChange, ...restField } }) => (
              <RadioList
                options={[
                  { label: "Unlimited", value: "unlimited" },
                  { label: "Limited", value: "limited" },
                ]}
                value={value}
                onChange={onChange}
                {...restField}
              />
            )}
          />
          {control._formValues &&
            control._formValues["duration"] === "limited" && (
              <div className="flex flex-row gap-2">
                <Controller
                  name="unit"
                  control={control}
                  rules={{
                    required: ErrorMessage.REQUIRED,
                  }}
                  render={({ field }) => (
                    <Select id="unit" required {...field} className="w-full">
                      {Object.keys(ExpiresUnit).map((item, index) => (
                        <option
                          key={item}
                          value={Object.values(ExpiresUnit)[index]}
                        >
                          {item}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  name="value"
                  control={control}
                  rules={{
                    required: ErrorMessage.REQUIRED,
                  }}
                  render={({ field }) => (
                    <TextInput
                      id="title"
                      type="text"
                      sizing="md"
                      className="custom-input w-full"
                      color={!!errors?.name ? "failure" : ""}
                      helperText={
                        <ErrorText
                          isError={!!errors?.value}
                          message={errors?.value?.message}
                        />
                      }
                      {...field}
                    />
                  )}
                />
              </div>
            )}
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

export default ApiKeysForm;
