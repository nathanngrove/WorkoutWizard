import { Exercise, Set, SetsOnExercises } from "@prisma/client";

import AddSet from "./AddSet";
import {
  FirstColumn,
  SecondColumn,
  ThirdColumn,
} from "./styles/StyledGrid.styled";

export default function ExerciseListing({
  exercise,
  set,
  sessionId,
}: {
  exercise: Exercise;
  set: (SetsOnExercises & {
    set: Set;
  })[];
  sessionId: string;
}) {
  return (
    <>
      {set.map((set, i) => {
        if (i === 0) {
          return (
            <>
              <FirstColumn>{exercise.name}</FirstColumn>
              <SecondColumn>{set.set.reps}</SecondColumn>
              <ThirdColumn>{set.set.weight}</ThirdColumn>
            </>
          );
        } else {
          return (
            <>
              <SecondColumn>{set.set.reps}</SecondColumn>
              <ThirdColumn>{set.set.weight}</ThirdColumn>
            </>
          );
        }
      })}
      <AddSet exerciseId={exercise.id} sessionId={sessionId} />
    </>
  );
}
