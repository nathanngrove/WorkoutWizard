import styled from "styled-components";
import StyledHeader from "./styles/StyledHeader.styled";
import { Purple } from "./styles/StyledText.styled";

export default function Header() {
  return (
    <StyledHeader>
      <h1>
        Workout<Purple>Wizard</Purple>
      </h1>
    </StyledHeader>
  );
}
