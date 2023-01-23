import { type NextPage } from "next";
import { useRouter } from "next/router";

import { api } from "../utils/api";
import { useUserContext } from "../context/user.context";
import LoginForm from "../components/LoginForm";
import Link from "next/link";
import { useState } from "react";
import { Session } from "@prisma/client";

const Home: NextPage = () => {
  const user = useUserContext();
  const router = useRouter();

  if (!user) {
    return <LoginForm />;
  }

  const [sessionsList, setSessionsList] = useState(Array<Session>);

  const queryAllSessions = api.sessions.getAllSessions.useQuery(undefined, {
    onSuccess(data) {
      setSessionsList(data);
    },
  });
  const { mutate, error } = api.sessions.addSession.useMutation();

  function addSession() {
    mutate();
    queryAllSessions.refetch();
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
        {sessionsList.map((session) => {
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

export default Home;
