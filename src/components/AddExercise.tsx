import { useState } from "react";
import { api } from "../utils/api";
import { useQueryClient } from "@tanstack/react-query";
import firstLetterToUpperCase from "../utils/uppercaseFirstLetter";

export default function AddExercise({ sessionId }: { sessionId: string }) {
  const queryClient = useQueryClient();

  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const getAllExercises = api.exercises.getAllExercises.useQuery(
    {
      sessionId,
    },
    { enabled: false }
  );

  const { mutate, error } = api.exercises.addExerciseToSession.useMutation({
    onSuccess: () => {
      setExercise("");
      setReps("");
      setWeight("");
      queryClient.invalidateQueries(getAllExercises);
    },
  });

  function addExercise() {
    mutate({
      name: firstLetterToUpperCase(exercise),
      sessionId,
      reps: parseInt(reps),
      weight: parseInt(weight),
    });
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
