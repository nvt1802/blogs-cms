"use client";

import { useAppContext } from "@/context/AppContext";
import { fetchUsersInfoById } from "@/utils/api/users";
import { cloudinaryUrl } from "@/utils/contants";
import { clearCookie, getCookie } from "@/utils/cookieUtils";
import { UserRole } from "@/utils/enum";
import { Avatar, Badge, Navbar, Popover } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { HiChevronDoubleRight, HiMenu } from "react-icons/hi";
import { HiLogout } from "react-icons/hi";

const CMSHeader = () => {
  const { state, updateState } = useAppContext();
  const router = useRouter();

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

  const onClickLogout = () => {
    clearCookie("token");
    router.push("/login");
  };

  return (
    <Navbar fluid rounded className="w-full rounded-none bg-gray-200">
      {state.isCollapse && (
        <button
          className="rounded-full p-2 bg-white shadow-lg select-none hidden sm:block"
          onClick={onExpandMenu}
        >
          <HiChevronDoubleRight />
        </button>
      )}

      <button onClick={() => onClick()} className="m-2 sm:hidden">
        <HiMenu className="h-6 w-6 dark:fill-white" />
      </button>

      <Navbar.Brand href="/dashboard" className="ml-5">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          CMS
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Popover
          aria-labelledby="profile-popover"
          placement="bottom-end"
          content={
            <div className="w-72 p-2">
              <div className="flex flex-row gap-3">
                <Avatar
                  alt={state?.user?.username ?? ""}
                  img={state.user?.profile_picture}
                  size="lg"
                  className="min-w-20 min-h-20"
                  rounded
                />
                <div className="w-full text-sm flex flex-col gap-1">
                  <p className="font-semibold">
                    {state?.user?.first_name} {state.user?.last_name}
                  </p>
                  <Badge
                    color={
                      UserRole.ADMIN === state.user?.role
                        ? "success"
                        : UserRole.AUTHOR === state.user?.role
                        ? "warning"
                        : "blue"
                    }
                    className="w-fit"
                  >
                    {state.user?.role}
                  </Badge>
                  <p>{state.user?.email}</p>
                  <div className="flex flex-row justify-end">
                    <button
                      className="inline-flex gap-2"
                      onClick={onClickLogout}
                    >
                      Logout
                      <HiLogout className="my-auto" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <button>
            <Avatar
              alt="User settings"
              img={state.user?.profile_picture ? `${cloudinaryUrl}/c_fill,h_40,w_40/${state.user?.profile_picture}` : ""}
              rounded
            />
          </button>
        </Popover>
      </div>
    </Navbar>
  );
};

export default CMSHeader;
