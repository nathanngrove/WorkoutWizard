import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { api } from "../utils/api";
import firstLetterToUpperCase from "../utils/uppercaseFirstLetter";
import StyledInput from "./styles/StyledInput.styled";
import { GridButton } from "./styles/StyledGrid.styled";

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
    if (exercise === "" || reps === "" || weight === "") return;

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
      <StyledInput
        id="exercise"
        type="text"
        placeholder="Exercise"
        onChange={(e) => {
          setExercise(e.target.value);
        }}
        value={exercise}
        gridPosition="1 / 2"
        size={1}
      />
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
      <GridButton onClick={addExercise}>+</GridButton>
    </>
  );
}
