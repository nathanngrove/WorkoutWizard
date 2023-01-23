import { useState } from "react";
import { api } from "../utils/api";

export default function AddSet({ exerciseId }: { exerciseId: string }) {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const { mutate, error } = api.exercises.addSetToExercise.useMutation();

  function addSet() {
    mutate({ reps: parseInt(reps), weight: parseInt(weight), exerciseId });
    setReps("");
    setWeight("");
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
