import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { api } from "../utils/api";
import StyledInput from "./styles/StyledInput.styled";
import { GridButton } from "./styles/StyledGrid.styled";

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

  const getAllExercises = api.exercises.getAllExercises.useQuery(
    {
      sessionId,
    },
    { enabled: false }
  );

  const { mutate, error } = api.exercises.addSetToExercise.useMutation({
    onSuccess: () => {
      setReps("");
      setWeight("");
      void queryClient.invalidateQueries(getAllExercises);
    },
  });

  function addSet() {
    if (reps === "" || weight === "") return;

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
      <StyledInput
        id="reps"
        type="text"
        placeholder="Reps"
        onChange={(e) => {
          setReps(e.target.value);
        }}
        value={reps}
        gridPosition="2 / 3"
        size={1}
      />
      <StyledInput
        id="weight"
        type="text"
        placeholder="Weight"
        onChange={(e) => {
          setWeight(e.target.value);
        }}
        value={weight}
        gridPosition="3 / 4"
        size={1}
      />
      <GridButton onClick={addSet}>+</GridButton>
    </>
  );
}
