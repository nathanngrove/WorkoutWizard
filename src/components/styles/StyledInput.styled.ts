import styled from "styled-components";

interface InputOptions {
  gridPosition?: string;
}

const StyledInput = styled.input<InputOptions>`
  border: none;
  outline: transparent;
  background-color: transparent;
  border-bottom: 2px solid var(--accent-500);
  color: black;
  padding: 0 0.375rem;
  font-size: 1.25rem;
  ${({ gridPosition }) =>
    gridPosition ? `grid-column: ${gridPosition}` : null};
  position: relative;
  margin-right: 0.5rem;
`;

export default StyledInput;
