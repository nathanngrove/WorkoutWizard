import React from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";

import { api } from "../utils/api";
import { useUserContext } from "../context/user.context";
import Header from "../components/Header";
import SessionTile from "../components/SessionTile";
import { StyledButton } from "../components/styles/StyledButton.styled";
import StatusMessage from "../components/StatusMessage";
import Main from "../components/styles/StyledMain.styled";
import { Purple } from "../components/styles/StyledText.styled";
import LoginOrRegisterModal from "../components/LoginOrRegisterModal";

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter();
  api.users.verifyOTP.useQuery(
    { hash },
    {
      onError: (error) => {
        return <StatusMessage message={error.message} />;
      },
      onSuccess: (data) => {
        void router.push(data.redirect === "/" ? "/dashboard" : data.redirect);
        return <StatusMessage message="Redirecting..." />;
      },
    }
  );

  return <StatusMessage message="Verifying..." />;
}

const Dashboard: NextPage = () => {
  const router = useRouter();
  const user = useUserContext();
  const queryClient = useQueryClient();

  const queryAllSessions = api.sessions.getAllSessions.useQuery();
  const { mutate, error, isLoading } = api.sessions.addSession.useMutation({
    onSuccess: (data) => {
      void queryClient.invalidateQueries(queryAllSessions);
      void router.push(`/session/${data?.id}`);
      return <StatusMessage message="Redirecting..." />;
    },
  });

  const hash = router.asPath.split("#token=")[1];
  if (hash) return <VerifyToken hash={hash} />;

  if (!user) {
    return <LoginOrRegisterModal displayClose={false} />;
  }

  function addSession() {
    mutate();
  }

  function startFromTemplate() {
    void router.push("/sessions/templates");
    return <StatusMessage message="Redirecting..." />;
  }

  if (queryAllSessions.isLoading) {
    return <p>Loading...</p>;
  }

  if (queryAllSessions.error) {
    return <p>{queryAllSessions.error.message}</p>;
  }

  return (
    <>
      <Header />
      <Main>
        <Section>
          <SectionHeading>Start a new session</SectionHeading>
          {error && error.message}
          <ActionsContainer>
            <StyledButton
              color="black"
              background="white"
              disabledColor="white"
              hover="hsl(0, 0%, 95%)"
              onClick={addSession}
              disabled={isLoading}
            >
              <Purple>+</Purple> Add session
            </StyledButton>
            <StyledButton
              color="black"
              background="white"
              disabledColor="white"
              hover="hsl(0, 0%, 95%)"
              onClick={startFromTemplate}
              disabled={isLoading}
            >
              <Purple>+</Purple> Start from a template
            </StyledButton>
          </ActionsContainer>
        </Section>
        <Section>
          <SectionHeading>Your sessions</SectionHeading>
          <SessionsContainer>
            {queryAllSessions.data.map((session) => {
              return <SessionTile key={session.id} session={session} />;
            })}
          </SessionsContainer>
        </Section>
      </Main>
    </>
  );
};

const SectionHeading = styled.h2`
  width: fit-content;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 2px;
    background-color: var(--accent-500);
  }
`;

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

export default Dashboard;
