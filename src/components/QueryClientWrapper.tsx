"use client";

import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

const QueryClientWrapper: React.FC<
  Readonly<{
    children?: React.ReactNode;
  }>
> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryClientWrapper