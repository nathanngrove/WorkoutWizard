import { useState } from "react";
import { api } from "../utils/api";

export default function AddExercise({
  sessionId,
  updateExercises,
}: {
  sessionId: string;
  updateExercises: Function;
}) {
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const { mutate, error } = api.exercises.addExerciseToSession.useMutation();

  function addExercise() {
    mutate({
      name: exercise,
      sessionId,
      reps: parseInt(reps),
      weight: parseInt(weight),
    });
    setExercise("");
    setReps("");
    setWeight("");
    updateExercises({ sessionId });
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <td>
        <input
          id="exercise"
          type="text"
          placeholder="Exercise"
          onChange={(e) => {
            setExercise(e.target.value);
          }}
          value={exercise}
        />
      </td>
      <td>
        <input
          id="reps"
          type="text"
          placeholder="Reps"
          onChange={(e) => {
            setReps(e.target.value);
          }}
          value={reps}
        />
      </td>
      <td>
        <input
          id="weight"
          type="text"
          placeholder="Weight"
          onChange={(e) => {
            setWeight(e.target.value);
          }}
          value={weight}
        />
      </td>
      <td>
        <button onClick={addExercise}>Add Exercise</button>
      </td>
    </>
  );
}
