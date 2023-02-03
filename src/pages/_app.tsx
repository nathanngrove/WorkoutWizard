import { type AppType } from "next/app";

import "../styles/globals.css";
import { UserContextProvider } from "../context/user.context";
import { api } from "../utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { data, isLoading } = api.users.me.useQuery();

  if (isLoading) {
    return <p>Loading User...</p>;
  }

  return (
    <UserContextProvider value={data}>
      <Component {...pageProps} />
    </UserContextProvider>
  );
};

export default api.withTRPC(MyApp);
