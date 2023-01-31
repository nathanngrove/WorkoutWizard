import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <h1>
        Workout<Purple>Wizard</Purple>
      </h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  text-align: center;
  padding: 2rem;
`;

const Purple = styled.span`
  color: var(--accent-500);
`;
