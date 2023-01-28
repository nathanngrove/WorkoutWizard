import styled from "styled-components";

const StyledLink = styled.a`
  font-weight: bold;
  color: var(--accent-500);

  &:hover,
  &:focus-within {
    color: var(--accent-400);
  }
`;

export default StyledLink;
