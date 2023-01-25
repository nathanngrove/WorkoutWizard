import { type NextPage } from "next";

import { api } from "../utils/api";
import { useUserContext } from "../context/user.context";
import LoginForm from "../components/LoginForm";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const Dashboard: NextPage = () => {
  const queryClient = useQueryClient();
  const user = useUserContext();

  if (!user) {
    return <LoginForm />;
  }

  const queryAllSessions = api.sessions.getAllSessions.useQuery();
  const { mutate, error } = api.sessions.addSession.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  function addSession() {
    mutate();
  }

  if (queryAllSessions.isLoading) {
    return <p>Loading...</p>;
  }

  if (queryAllSessions.error) {
    return <p>{queryAllSessions.error.message}</p>;
  }

  return (
    <>
      <main>
        <h1>Dashboard</h1>
        {queryAllSessions.data.map((session, i) => {
          return (
            <Link key={session.id} href={`/session/${session.id}`}>
              {session.id}
            </Link>
          );
        })}
        <button onClick={addSession}>Add session</button>
        <br />
        {error && error.message}
      </main>
    </>
  );
};

export default Dashboard;
