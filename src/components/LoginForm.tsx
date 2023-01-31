import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

import { api } from "../utils/api";
import Main from "./styles/StyledMain.styled";
import Header from "./Header";
import StyledLabel from "./styles/StyledLabel.styled";
import StyledInput from "./styles/StyledInput.styled";
import StyledLink from "./styles/StyledLink.styled";
import StyledButton from "./styles/StyledButton.styled";
import StatusMessage from "./StatusMessage";

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter();
  const { data, error, isLoading } = api.users.verifyOTP.useQuery({ hash });

  if (isLoading) return <StatusMessage message="Verifying..." />;

  if (error) return <StatusMessage message={error.message} />;

  router.push(
    data?.redirect.includes("login")
      ? "/dashboard"
      : data?.redirect || "/dashboard"
  );

  return <StatusMessage message="Redirecting..." />;
}

const LoginForm: NextPage = () => {
  const router = useRouter();

  const hash = router.asPath.split("#token=")[1];
  if (hash) return <VerifyToken hash={hash} />;

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const { mutate, error, isLoading } = api.users.requestOPT.useMutation({
    onSuccess: () => {
      setSuccess(true);
    },
  });

  return (
    <Main>
      <Header />
      <Wrapper>
        <Heading>Log in</Heading>
        <div>
          {error && error.message}
          {success && <p>Check your email!</p>}
        </div>
        <FormFlexContainer
          onSubmit={async (e) => {
            e.preventDefault();
            mutate({ email, redirect: router.asPath });
          }}
        >
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <StyledInput
            type="text"
            id="email"
            placeholder="johndoe@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <StyledButton type="submit" disabled={isLoading}>
            Log in
          </StyledButton>
        </FormFlexContainer>
        <TextCenter>
          Don't have an account yet?
          <br />
          <Link href="/register" passHref>
            <StyledLink>Create an account</StyledLink>
          </Link>
        </TextCenter>
      </Wrapper>
    </Main>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--nuetral-100);
  color: black;
  border-radius: 10px;
  padding: 1rem;
`;

const FormFlexContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TextCenter = styled.p`
  margin-top: 1rem;
  text-align: center;
  font-size: 1.25rem;
`;

const Heading = styled.h1`
  font-size: 2.25rem;
  margin-bottom: 1rem;
`;

export default LoginForm;
