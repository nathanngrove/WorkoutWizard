import { type AppType } from "next/app";

import "../styles/globals.css";
import { UserContextProvider } from "../context/user.context";
import { api } from "../utils/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();
  const { data, isLoading } = api.users.me.useQuery();

  if (isLoading) {
    return <p>Loading User...</p>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider value={data}>
        <Component {...pageProps} />
      </UserContextProvider>
    </QueryClientProvider>
  );
};

export default api.withTRPC(MyApp);
