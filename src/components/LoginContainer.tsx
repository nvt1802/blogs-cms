"use client";

import FormLogin from "@/components/auth/FormLogin";
import Image from "next/image";

const LoginContainer = () => {
  return (
    <div className="w-full xmd:grid xmd:grid-cols-2 flex">
      <div className="col-span-1 hidden bg-green-900 xmd:flex">
        <Image
          src="/logo.png"
          alt=""
          className="m-auto logo"
          width={400}
          height={400}
        />
      </div>
      <div className="col-span-1 flex flex-col xmd:block xmd:my-auto gap-4 mxd:px-10 w-full">
        <div className="bg-green-900 w-full xmd:hidden xmd:my-auto">
          <Image
            src="/logo.png"
            alt=""
            className="mx-auto logo"
            width={200}
            height={200}
          />
        </div>

        <div className="px-4 xmd:px-10">
          <FormLogin />
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
