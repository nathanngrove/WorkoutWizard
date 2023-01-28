import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState } from "react";
import styled from "styled-components";
import {
  StyledButton,
  StyledInput,
  StyledLabel,
  StyledLink,
} from "../components/styles/StyledComponents.styled";
import { api } from "../utils/api";

const Register: NextPage = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate, error, isLoading } = api.users.addUser.useMutation({
    onSuccess: () => {
      router.push("/login");
    },
  });

  return (
    <Wrapper>
      <Main>
        <Heading>Register</Heading>
        <p>{error && error.message}</p>
        <FlexContainer
          onSubmit={(e) => {
            e.preventDefault();
            mutate({
              name: firstName + " " + lastName,
              email: email,
            });
          }}
        >
          <StyledLabel htmlFor="firstName">First Name: </StyledLabel>
          <StyledInput
            type="text"
            id="firstName"
            placeholder="John"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <br />
          <StyledLabel htmlFor="lastName">Last Name: </StyledLabel>
          <StyledInput
            type="text"
            id="lastName"
            placeholder="Doe"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <br />
          <StyledLabel htmlFor="email">Email: </StyledLabel>
          <StyledInput
            type="email"
            id="email"
            placeholder="johndoe@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <StyledButton type="submit" disabled={isLoading}>
            Register
          </StyledButton>
        </FlexContainer>
        <TextCenter>
          Already have an account?
          <br />
          <Link href="/login" passHref>
            <StyledLink>Log in here</StyledLink>
          </Link>
        </TextCenter>
      </Main>
    </Wrapper>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--nuetral-100);
  color: black;
  border-radius: 10px;
  width: 20rem;
  padding: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FlexContainer = styled.form`
  display: flex;
  flex-direction: column;
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

export default Register;
