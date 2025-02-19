import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      gcTime: 5 * 60 * 1000, // Cache is kept for 5 minutes even if unused
      refetchOnWindowFocus: false, // Prevents refetching when tab is focused
      refetchOnReconnect: false, // Prevents automatic refetching on reconnection
      refetchOnMount: false, // Prevents refetching when a component remounts
    },
  },
});

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
