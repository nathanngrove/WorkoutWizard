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
  const { mutate, error, isLoading } = api.sessions.addSession.useMutation({
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
          <ActionsContainer>
            <StyledButton
              color="black"
              background="white"
              disabledColor="white"
              hover="hsl(0, 0%, 95%)"
              onClick={addSession}
              disabled={isLoading}
            >
              <StyledCross>+</StyledCross> Add session
            </StyledButton>
            <StyledButton
              color="black"
              background="white"
              disabledColor="white"
              hover="hsl(0, 0%, 95%)"
              onClick={addSession}
              disabled={isLoading}
            >
              <StyledCross>+</StyledCross> Start from a template
            </StyledButton>
          </ActionsContainer>
        </Section>
        <Section>
          <h2>Your sessions</h2>
          <SessionsContainer>
            {queryAllSessions.data.map((session) => {
              return <SessionTile key={session.id} session={session} />;
            })}
          </SessionsContainer>
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

const ActionsContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-rows: repeat(2, 1fr);
  @media (width > 1100px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: none;
  }
`;

const SessionsContainer = styled.div`
  display: grid;
  gap: 1rem;

  @media (width > 650px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (width > 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledCross = styled.span`
  color: var(--accent-500);
`;

export default Dashboard;
