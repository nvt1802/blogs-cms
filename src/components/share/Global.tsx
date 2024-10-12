"use client";

import { useAppContext } from "@/context/AppContext";
import { useEffect, Fragment } from "react";

const Global = () => {
  const { updateState } = useAppContext();
  let lastScrollY: number = 0;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    updateState({ isSticky: currentScrollY > lastScrollY });
    lastScrollY = currentScrollY;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => updateState({ innerWidth: window.innerWidth });
      handleResize();
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Fragment />;
};

export default Global;
