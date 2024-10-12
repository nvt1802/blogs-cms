"use client";

import { useAppContext } from "@/context/AppContext";
import axiosInstance from "@/utils/axiosInstance";
import { getCookie } from "@/utils/cookieUtils";
import { Avatar, Navbar } from "flowbite-react";
import { useEffect } from "react";
import { HiMenu } from "react-icons/hi";

const CMSHeader = () => {
  const { state, updateState } = useAppContext();

  const onGetUserInfo = async () => {
    try {
      const userId = getCookie("userId");
      const { data } = await axiosInstance.get(`/api/userinfo/${userId}`);
      updateState({ user: data?.data });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  };

  useEffect(() => {
    onGetUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => updateState({ isOpenMenuDrawer: true });

  return (
    <Navbar fluid rounded className="w-full rounded-none">
      <button onClick={() => onClick()} className="m-2 sm:hidden">
        <HiMenu className="h-6 w-6" />
      </button>

      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          CMS
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Avatar alt="User settings" img={state.user?.profile_picture} rounded />
      </div>
    </Navbar>
  );
};

export default CMSHeader;
