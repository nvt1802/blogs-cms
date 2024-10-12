"use client";

import axiosInstance from "@/utils/axiosInstance";
import { setCookie } from "@/utils/cookieUtils";
import { HttpStatusCode } from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  username: string;
  password: string;
}

const FormLogin = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    console.log(process.env.CMS_API_URL);    
    const { data, status } = await axiosInstance.post("/api/login", formData);
    if (status === HttpStatusCode.Ok) {
      setCookie("token", data?.data?.token);
      setCookie("userId", data?.data?.userId);
      router.push("/");
    }
  };

  return (
    <form
      className="flex max-w-md flex-col gap-4 m-auto justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Username" />
        </div>
        <TextInput
          id="username"
          type="text"
          placeholder="Username or email"
          {...register("username", {
            required: "This is required.",
            maxLength: 30,
          })}
        />
        {errors.username && (
          <p role="alert" className="text-red-600">
            {errors?.username?.message}
          </p>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="password" />
        </div>
        <TextInput
          id="password"
          type="password"
          {...register("password", {
            required: "This is required.",
            maxLength: 30,
          })}
        />
        {errors.password && (
          <p role="alert" className="text-red-600">
            {errors?.password?.message}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FormLogin;
