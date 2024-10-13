import React from "react";

const AuthLayout: React.FC<
  Readonly<{
    children?: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <div className="h-screen w-screen flex bg-gray-50 dark:bg-gray-700">
      <div className="w-full h-full flex">{children}</div>
    </div>
  );
};

export default AuthLayout;
