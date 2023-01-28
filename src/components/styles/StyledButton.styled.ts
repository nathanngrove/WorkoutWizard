import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 1.75rem;
  padding: 1rem;
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

export default StyledButton;
