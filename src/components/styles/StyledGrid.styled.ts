import styled from "styled-components";

const ExercisesGrid = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  gap: 0.5rem;
  color: black;
  font-size: 1.25rem;
  margin-top: 1rem;
`;

const FirstColumn = styled.span`
  grid-column: 1 / 2;
`;

const SecondColumn = styled.span`
  grid-column: 2 / 3;
`;

const ThirdColumn = styled.span`
  grid-column: 3 / 4;
`;

const FourthColumn = styled.span`
  grid-column: 4 / 5;
`;

const GridButton = styled.button`
  border: 1px solid transparent;
  background-color: var(--accent-500);
  font-size: 1.25rem;
  color: white;
  font-weight: bold;
  grid-column: 4 / 5;
  cursor: pointer;
  border-radius: 10px;
  width: 3ch;
  height: 3ch;

  &:hover,
  focus-within {
    background-color: var(--accent-400);
  }
`;

export {
  ExercisesGrid,
  FirstColumn,
  SecondColumn,
  ThirdColumn,
  FourthColumn,
  GridButton,
};
