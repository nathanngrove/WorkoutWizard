import { Exercise, Set, SetsOnExercises } from "@prisma/client";

export default function ExerciseListing({
  exercise,
  set,
}: {
  exercise: Exercise;
  set: (SetsOnExercises & {
    set: Set;
  })[];
}) {
  return (
    <>
      <tr>
        <td>{exercise.name}</td>
        {set.map((set) => {
          return (
            <>
              <td>{set.set.reps}</td>
              <td>{set.set.weight}</td>
            </>
          );
        })}
      </tr>
      {/* {sets.map((set, i) => {
        if (i === 0) {
          return (
            <>
              <tr>
                <td>{exercise.name}</td>
                <td>{set.reps}</td>
                <td>{set.weight}</td>
                <td></td>
              </tr>
            </>
          );
        } else {
          return (
            <tr>
              <td></td>
              <td>{set.reps}</td>
              <td>{set.weight}</td>
              <td></td>
            </tr>
          );
        }
      })}
      <tr>
        <AddSet exerciseId={exercise.id} />
      </tr> */}
    </>
  );
}
