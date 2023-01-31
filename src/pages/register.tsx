import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

import { api } from "../utils/api";
import Header from "../components/Header";
import StyledButton from "../components/styles/StyledButton.styled";
import StyledInput from "../components/styles/StyledInput.styled";
import StyledLabel from "../components/styles/StyledLabel.styled";
import StyledLink from "../components/styles/StyledLink.styled";
import Main from "../components/styles/StyledMain.styled";

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
    <Main>
      <Header />
      <Wrapper>
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
      </Wrapper>
    </Main>
  );
};

const Wrapper = styled.div`
  background-color: var(--nuetral-100);
  color: black;
  border-radius: 10px;
  padding: 1.5rem;
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
