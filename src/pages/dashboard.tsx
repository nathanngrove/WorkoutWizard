import { type NextPage } from "next";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useRouter } from "next/router";

import { api } from "../utils/api";
import { useUserContext } from "../context/user.context";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import StyledButton from "../components/styles/StyledButton.styled";
import StatusMessage from "../components/StatusMessage";
import styled from "styled-components";
import Main from "../components/styles/StyledMain.styled";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useUserContext();

  if (!user) {
    return <LoginForm />;
  }

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
        <FlexContainer>
          <h2>Start a new session</h2>
          <StyledButton color="black" background="white" onClick={addSession}>
            <StyledCross>+</StyledCross> Add session
          </StyledButton>
          <StyledButton color="black" background="white" onClick={addSession}>
            <StyledCross>+</StyledCross> Start from a template
          </StyledButton>
        </FlexContainer>
        <FlexContainer>
          <h2>Your sessions</h2>
          {queryAllSessions.data.map((session) => {
            return (
              <Link key={session.id} href={`/session/${session.id}`}>
                {session.id}
              </Link>
            );
          })}
          <br />
          {error && error.message}
        </FlexContainer>
      </Main>
    </>
  );
};

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  gap: 1rem;
`;

const StyledCross = styled.span`
  color: var(--accent-500);
`;

export default Dashboard;
