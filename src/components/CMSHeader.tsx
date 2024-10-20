"use client";

import { useAppContext } from "@/context/AppContext";
import { fetchUsersInfoById } from "@/utils/api/users";
import { getCookie } from "@/utils/cookieUtils";
import { Avatar, Navbar } from "flowbite-react";
import { useEffect } from "react";
import { HiChevronDoubleRight, HiMenu } from "react-icons/hi";

const CMSHeader = () => {
  const { state, updateState } = useAppContext();

  const onGetUserInfo = async () => {
    try {
      const userId = getCookie("userId");
      if (userId) {
        const data = await fetchUsersInfoById(userId);
        updateState({ user: data });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  };

  useEffect(() => {
    onGetUserInfo();
    updateState({
      isCollapse: localStorage.getItem("isCollapse") === "1" ? true : false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => updateState({ isOpenMenuDrawer: true });

  const onExpandMenu = () => {
    updateState({ isCollapse: false });
    localStorage.setItem("isCollapse", "0");
  };

  return (
    <Navbar fluid rounded className="w-full rounded-none bg-gray-200">
      {state.isCollapse && (
        <button
          className="rounded-full p-2 bg-white shadow-lg select-none"
          onClick={onExpandMenu}
        >
          <HiChevronDoubleRight />
        </button>
      )}

      <button onClick={() => onClick()} className="m-2 sm:hidden">
        <HiMenu className="h-6 w-6" />
      </button>

      <Navbar.Brand href="/dashboard" className="ml-5">
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
