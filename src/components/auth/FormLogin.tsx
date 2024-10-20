"use client";

import axiosInstance from "@/utils/axiosInstance";
import { setCookie } from "@/utils/cookieUtils";
import { HttpStatusCode } from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiMail, HiOutlineKey } from "react-icons/hi";
import ErrorText from "@/components/share/ErrorText";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

interface IFormInput {
  username: string;
  password: string;
}

const FormLogin = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { state, updateState } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

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

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    try {
      setLoading(true);
      const { data, status } = await axiosInstance.post("/api/login", formData);
      if (status === HttpStatusCode.Ok) {
        setCookie("token", data?.data?.token);
        setCookie("userId", data?.data?.userId);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      addToast("Incorrect username or password", "error");
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 mx-auto xmd:m-auto justify-center w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput
          id="username"
          type="text"
          icon={HiMail}
          placeholder="Username or email"
          {...register("username", {
            required: "This is required.",
            maxLength: 30,
          })}
          color={!!errors?.username ? "failure" : ""}
          helperText={
            <ErrorText
              isError={!!errors?.username}
              message={errors?.username?.message}
            />
          }
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          type="password"
          placeholder="********"
          icon={HiOutlineKey}
          {...register("password", {
            required: "This is required.",
            maxLength: 30,
          })}
          color={!!errors?.password ? "failure" : ""}
          helperText={
            <ErrorText
              isError={!!errors?.password}
              message={errors?.password?.message}
            />
          }
        />
      </div>
      <Button type="submit" isProcessing={isLoading}>
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
