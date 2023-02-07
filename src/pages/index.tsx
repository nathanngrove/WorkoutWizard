import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

import Header from "../components/Header";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import StatusMessage from "../components/StatusMessage";
import { Purple } from "../components/styles/StyledText.styled";
import { useUserContext } from "../context/user.context";
import {
  StyledButton,
  ButtonLink,
} from "../components/styles/StyledButton.styled";

const Home: NextPage = () => {
  const router = useRouter();
  const user = useUserContext();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  if (user) {
    void router.push("/dashboard");
    return <StatusMessage message="Redirecting..." />;
  }

  return (
    <>
      {isLoginOpen && (
        <LoginModal
          setIsRegisterOpen={setIsRegisterOpen}
          setIsLoginOpen={setIsLoginOpen}
          displayClose={true}
        />
      )}
      {isRegisterOpen && (
        <RegisterModal
          setIsRegisterOpen={setIsRegisterOpen}
          setIsLoginOpen={setIsLoginOpen}
          displayClose={true}
        />
      )}
      <GridContainer>
        <Header />
        <TagLine>
          Start <Purple>tracking</Purple> your <Purple>progress</Purple> today!
        </TagLine>
        <CenteredDiv className="grid-span-2">
          <StyledButton
            padding="1rem 4rem"
            fontSize="2.25rem"
            onClick={() => {
              setIsLoginOpen(false);
              setIsRegisterOpen(true);
            }}
          >
            Register Now
          </StyledButton>
          <SignInLine>
            Already have an account?{" "}
            <ButtonLink
              onClick={() => {
                setIsRegisterOpen(false);
                setIsLoginOpen(true);
              }}
            >
              Sign in
            </ButtonLink>
          </SignInLine>
        </CenteredDiv>
      </GridContainer>
    </>
  );
};

const GridContainer = styled.main`
  display: grid;
  height: 100vh;
  grid-template-rows: repeat(3, 1fr);
  place-items: center;
`;

const TagLine = styled.p`
  font-size: 2.5rem;
  text-align: center;
  width: 23rem;
`;

const SignInLine = styled.p`
  font-size: 1.25rem;
  text-align: center;
  margin-top: 1.5rem;
`;

const CenteredDiv = styled.div`
  display: grid;
  place-items: center;
`;

export default Home;
