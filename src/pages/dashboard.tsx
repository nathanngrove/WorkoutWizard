import { type NextPage } from "next";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useRouter } from "next/router";

import { api } from "../utils/api";
import { useUserContext } from "../context/user.context";
import Header from "../components/Header";
import StyledButton from "../components/styles/StyledButton.styled";
import StatusMessage from "../components/StatusMessage";
import styled from "styled-components";
import Main from "../components/styles/StyledMain.styled";
import SessionTile from "../components/SessionTile";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const user = useUserContext();

  if (!user) {
    router.push("/login");
    return <StatusMessage message="Redirecting" />;
  }

  const queryClient = useQueryClient();

  const logout = api.users.deleteUserToken.useMutation();
  const queryAllSessions = api.sessions.getAllSessions.useQuery();
  const { mutate, error } = api.sessions.addSession.useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryAllSessions);
      router.push(`/session/${data?.id}`);
      return <StatusMessage message="Redirecting..." />;
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
      <Main>
        <Header />
        <button onClick={() => logout.mutate()}>Logout</button>
        <Section>
          <h2>Start a new session</h2>
          <StyledButton
            color="black"
            background="white"
            hover="hsl(0, 0%, 95%)"
            onClick={addSession}
          >
            <StyledCross>+</StyledCross> Add session
          </StyledButton>
          <StyledButton
            color="black"
            background="white"
            hover="hsl(0, 0%, 95%)"
            onClick={addSession}
          >
            <StyledCross>+</StyledCross> Start from a template
          </StyledButton>
        </Section>
        <Section>
          <h2>Your sessions</h2>
          {queryAllSessions.data.map((session) => {
            return <SessionTile key={session.id} session={session} />;
          })}
        </Section>
        {error && error.message}
      </Main>
    </>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  gap: 1rem;
`;

const StyledCross = styled.span`
  color: var(--accent-500);
`;

export default Dashboard;
