import styled from "styled-components";

interface ButtonProps {
  background?: string;
  hover?: string;
}

const StyledButton = styled.button<ButtonProps>`
  font-size: 1.75rem;
  padding: 1rem;
  color: ${({ color }) => (color ? color : "var(--nuetral-100)")};
  background: ${({ background }) =>
    background ? background : "var(--accent-500)"};
  border: none;
  border-radius: 10px;
  font-weight: bold;

  &:hover,
  &:focus-within {
    background-color: ${({ hover }) => (hover ? hover : "var(--accent-400)")};
  }
`;

export default StyledButton;
