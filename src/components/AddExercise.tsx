import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { api } from "../utils/api";
import firstLetterToUpperCase from "../utils/uppercaseFirstLetter";
import StyledInput from "./styles/StyledInput.styled";
import { GridButton, ErrorMessage } from "./styles/StyledGrid.styled";

export default function AddExercise({ sessionId }: { sessionId: string }) {
  const queryClient = useQueryClient();

  const [exercise, setExercise] = useState("");

  const getAllExercises = api.exercises.getAllExercises.useQuery(
    {
      sessionId,
    },
    { enabled: false }
  );

  const { mutate, error } = api.exercises.addExerciseToSession.useMutation({
    onSuccess: () => {
      setExercise("");
      void queryClient.invalidateQueries(getAllExercises);
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
        onChange={(e) => setExercise(e.target.value)}
        value={exercise}
        gridPosition="1 / 2"
        size={1}
      />
      <GridButton onClick={addExercise} gridPosition="2 / 3">
        +
      </GridButton>
      {error && <ErrorMessage>⚠️ {error.message}</ErrorMessage>}
    </>
  );
}
