import React from "react";

const AuthLayout: React.FC<
  Readonly<{
    children?: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <div className="h-screen w-screen flex">
      <div className="w-full h-full flex">{children}</div>
    </div>
  );
};

export default AuthLayout;
