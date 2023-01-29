import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import Header from "../components/Header";
import StatusMessage from "../components/StatusMessage";
import StyledLink from "../components/styles/StyledLink.styled";
import { useUserContext } from "../context/user.context";

const Home: NextPage = () => {
  const router = useRouter();
  const user = useUserContext();

  if (user) {
    router.push("/dashboard");
    return <StatusMessage message="Redirecting..." />;
  }

  return (
    <GridContainer>
      <Header />
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

const LinkButton = styled.a`
  font-size: 1.75rem;
  padding: 1rem 3rem;
  color: var(--nuetral-100);
  background-color: var(--accent-500);
  border: none;
  border-radius: 10px;
  font-weight: bold;

  &:hover,
  &:focus-within {
    background-color: var(--accent-400);
  }
`;

const GridContainer = styled.main`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  place-items: center;
  padding: 1.25rem;
`;

const Purple = styled.span`
  color: var(--accent-500);
`;

const TagLine = styled.p`
  font-size: 2.5rem;
  text-align: center;
`;

const SignInLine = styled.p`
  text-align: center;
  margin-top: 1.5rem;
`;

export default Home;
