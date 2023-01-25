import { Exercise, Set, SetsOnExercises } from "@prisma/client";
import AddSet from "./AddSet";

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
            <tr>
              <td>{exercise.name}</td>
              <td>{set.set.reps}</td>
              <td>{set.set.weight}</td>
              <td></td>
            </tr>
          );
        } else {
          return (
            <tr>
              <td></td>
              <td>{set.set.reps}</td>
              <td>{set.set.weight}</td>
              <td></td>
            </tr>
          );
        }
      })}
      <tr>
        <AddSet exerciseId={exercise.id} sessionId={sessionId} />
      </tr>
    </>
  );
}
