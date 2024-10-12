"use client";

import Menu from "@/components/sidebar/Menu";
import { useAppContext } from "@/context/AppContext";
import { ScreenBreakpoints } from "@/utils/enum";
import { Drawer } from "flowbite-react";

const CMSSidebar = () => {
  const { state, updateState } = useAppContext();

  const handleClose = () => updateState({ isOpenMenuDrawer: false });
  return (
    <>
      {state.innerWidth > ScreenBreakpoints.SM && (
        <Menu className="h-screen hidden sm:block" />
      )}
      <Drawer open={state.isOpenMenuDrawer} onClose={handleClose} className="bg-gray-50">
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Menu className="h-[calc(100vh-72px)] w-[unset]"/>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default CMSSidebar;
