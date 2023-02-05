import styled from "styled-components";
import { useUserContext } from "../context/user.context";
import LogoutButton from "./LogoutButton";
import StyledHeader from "./styles/StyledHeader.styled";
import { Purple } from "./styles/StyledText.styled";

export default function Header() {
  const user = useUserContext();

  return (
    <StyledHeader>
      <Title>
        Workout<Purple>Wizard</Purple>
      </Title>
      {user && <LogoutButton />}
    </StyledHeader>
  );
}

const Title = styled.a`
  font-size: 2rem;
  font-weight: bold;
`;
