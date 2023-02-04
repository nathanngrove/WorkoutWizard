import styled from "styled-components";

interface ButtonProps {
  fontSize?: string;
  background?: string;
  hover?: string;
  disabledBackground?: string;
  disabledColor?: string;
  padding?: string;
}

const StyledButton = styled.button<ButtonProps>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.75rem")};
  padding: ${({ padding }) => (padding ? padding : "1rem")};
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

  &:disabled {
    background-color: ${({ disabledBackground }) =>
      disabledBackground ? disabledBackground : "darkgray"};
    color: ${({ disabledColor }) => (disabledColor ? disabledColor : "black")};
  }
`;

const ButtonLink = styled.button`
  border: none;
  background-color: transparent;
  color: var(--accent-500);
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
`;

export { StyledButton, ButtonLink };
