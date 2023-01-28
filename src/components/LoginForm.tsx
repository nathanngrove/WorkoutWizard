import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

import { api } from "../utils/api";
import StatusMessage from "./StatusMessage";
import StyledButton from "./styles/Button.styled";
import StyledLink from "./styles/Link.styled";
import Input from "./styles/StyledInput";

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter();
  const { data, error, isLoading } = api.users.verifyOTP.useQuery({ hash });

  if (isLoading) return <StatusMessage message="Verifying..." />;

  if (error) return <StatusMessage message={error.message} />;

  router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");

  return <StatusMessage message="Redirecting..." />;
}

const LoginForm: NextPage = () => {
  const router = useRouter();

  const hash = router.asPath.split("#token=")[1];
  if (hash) return <VerifyToken hash={hash} />;

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const { mutate, error } = api.users.requestOPT.useMutation({
    onSuccess: () => {
      setSuccess(true);
    },
  });

  return (
    <>
      <h1>Login</h1>
      {error && error.message}
      {success && <p>Check your email!</p>}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          mutate({ email, redirect: router.asPath });
        }}
      >
        <FlexContainer>
          <label htmlFor="email">Email</label>
          <Input
            type="text"
            id="email"
            placeholder="johndoe@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FlexContainer>
        <StyledButton type="submit">Login</StyledButton>
      </form>
      <p>
        Don't have an account yet?{" "}
        <Link href="/create-account" passHref>
          <StyledLink>Create an account</StyledLink>
        </Link>
      </p>
    </>
  );
};

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default LoginForm;
