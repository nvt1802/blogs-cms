"use client";

import { IToast } from "@/types";
import { ScreenBreakpoints } from "@/utils/enum";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface IUserInfo {
  email: string;
  profile_picture: string;
  role: string;
  username: string;
}

interface IAppState {
  innerWidth: number;
  isSticky: boolean;
  isOpenMenuDrawer: boolean;
  user?: IUserInfo;
  toasts: IToast[];
}

interface AppContextType {
  state: IAppState;
  updateState: (newState: Partial<IAppState>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<IAppState>({
    innerWidth: ScreenBreakpoints.LG,
    isSticky: true,
    isOpenMenuDrawer: false,
    toasts: [],
  });

  const updateState = (newState: Partial<IAppState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  return (
    <AppContext.Provider value={{ state, updateState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
