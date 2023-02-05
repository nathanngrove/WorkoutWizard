import { type inferProcedureOutput } from "@trpc/server";
import React, { createContext, useContext } from "react";

import { type AppRouter } from "../server/api/root";

type TQuery = keyof AppRouter["_def"];

type InferQueryOutput<TRouteKey extends TQuery> =
  inferProcedureOutput<AppRouter>["_def"]["queries"][TRouteKey];

const UserContext =
  createContext<inferProcedureOutput<AppRouter["users"]["me"]>>(null);

function UserContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: inferProcedureOutput<AppRouter["users"]["me"]> | undefined;
}) {
  return (
    <UserContext.Provider value={value || null}>
      {children}
    </UserContext.Provider>
  );
}

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserContextProvider };
