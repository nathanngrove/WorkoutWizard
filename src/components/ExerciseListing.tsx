import type { Exercise, Set, SetsOnExercises } from "@prisma/client";
import React from "react";

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
      <FirstColumn>{exercise.name}</FirstColumn>
      {set.map((set) => {
        return (
          <React.Fragment key={set.id}>
            <SecondColumn>{set.set.reps}</SecondColumn>
            <ThirdColumn>{set.set.weight}</ThirdColumn>
          </React.Fragment>
        );
      })}
      <AddSet exerciseId={exercise.id} sessionId={sessionId} />
    </>
  );
}
