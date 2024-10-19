"use client";

import { useAppContext } from "@/context/AppContext";
import Notifi from "./Notifi";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

const ToastContainer: React.FC = () => {
  const { state, updateState } = useAppContext();
  const [positionClass, setPositionClass] = useState<string>("bottom-10");

  const removeToast = (id: string) => {
    updateState({ toasts: state.toasts.filter((toast) => toast.id !== id) });
  };

  useEffect(() => {
    if (!!state.toasts.length && state.toasts[0]?.position) {
      const position = state.toasts[0]?.position;
      switch (position) {
        case "bottom-left":
          setPositionClass("bottom-10 left-5");
          break;
        case "bottom-right":
          setPositionClass("bottom-10 right-5");
          break;
        case "top-left":
          setPositionClass("top-10 left-5");
          break;
        case "top-right":
          setPositionClass("top-10 right-5");
          break;
        default:
          setPositionClass("bottom-10 right-5");
          break;
      }
    }
  }, [state.toasts]);

  return (
    <div className={twMerge("fixed right-5 z-50 space-y-2", positionClass)}>
      {state.toasts.map((toast) => (
        <Notifi
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
