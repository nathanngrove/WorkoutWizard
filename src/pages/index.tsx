import { type NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

import {
  GridContainer,
  LinkButton,
  Purple,
  TagLine,
} from "../components/styles/index.styled";
import StyledLink from "../components/styles/Link.styled";

const Home: NextPage = () => {
  return (
    <GridContainer>
      <h1>
        Workout<Purple>Wizard</Purple>
      </h1>
      <TagLine>
        Start <Purple>tracking</Purple> your <Purple>progress</Purple> today!
      </TagLine>
      <div className="grid-span-2">
        <Link href="/register">
          <LinkButton>Register now</LinkButton>
        </Link>
        <SignInLine>
          Already have an account?{" "}
          <Link href="/login" passHref>
            <StyledLink>Sign in</StyledLink>
          </Link>
        </SignInLine>
      </div>
    </GridContainer>
  );
};

const SignInLine = styled.p`
  text-align: center;
  margin-top: 1.5rem;
`;

export default Home;
