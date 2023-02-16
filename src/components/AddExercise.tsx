import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { api } from "../utils/api";
import firstLetterToUpperCase from "../utils/uppercaseFirstLetter";
import StyledInput from "./styles/StyledInput.styled";
import { GridButton, ErrorMessage } from "./styles/StyledGrid.styled";
import styled from "styled-components";

export default function AddExercise({ sessionId }: { sessionId: string }) {
  const queryClient = useQueryClient();

  const [exercise, setExercise] = useState("");

  const allExercises = api.exercises.getAllExercises.useQuery();

  const allExercisesOnSession = api.exercises.getAllExercisesOnSession.useQuery(
    {
      sessionId,
    },
    { enabled: false }
  );

  const { mutate, error } = api.exercises.addExerciseToSession.useMutation({
    onSuccess: () => {
      setExercise("");
      void queryClient.invalidateQueries(allExercisesOnSession);
    },
  });

  function addExercise() {
    if (exercise === "") return;

    mutate({
      name: firstLetterToUpperCase(exercise),
      sessionId,
    });
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
        size={1}
        gridPosition="1 / 2"
      />
      <GridButton onClick={addExercise}>+</GridButton>

      {error && <ErrorMessage>⚠️ {error.message}</ErrorMessage>}
    </>
  );
}
