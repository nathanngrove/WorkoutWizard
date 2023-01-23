import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import { UserContextProvider } from "../context/user.context";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { data, error, isLoading } = api.users.me.useQuery();

  if (isLoading) {
    return <p>Loading User...</p>;
  }

  return (
    <UserContextProvider value={data}>
      <main>
        <Component {...pageProps} />
      </main>
    </UserContextProvider>
  );
};

export default api.withTRPC(MyApp);
