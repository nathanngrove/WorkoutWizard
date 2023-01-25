import { useState } from "react";
import { api } from "../utils/api";
import { useQueryClient } from "@tanstack/react-query";

export default function AddSet({
  exerciseId,
  sessionId,
}: {
  exerciseId: string;
  sessionId: string;
}) {
  const queryClient = useQueryClient();

  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const { mutate, error } = api.exercises.addSetToExercise.useMutation({
    onSuccess: () => {
      setReps("");
      setWeight("");
      queryClient.invalidateQueries();
    },
  });

  function addSet() {
    mutate({
      reps: parseInt(reps),
      weight: parseInt(weight),
      exerciseId,
      sessionId,
    });
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <td></td>
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
        <button onClick={addSet}>Add Set</button>
      </td>
    </>
  );
}
