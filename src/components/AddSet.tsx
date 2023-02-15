import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { api } from "../utils/api";
import StyledInput from "./styles/StyledInput.styled";
import { ErrorMessage, GridButton } from "./styles/StyledGrid.styled";

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
  const [hasEmptyInputOnSubmit, setHasEmptyInputOnSubmit] = useState(false);
  const pattern = /^\d+$/;

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

  function updateReps(repsInputString: string) {
    if (pattern.test(repsInputString) || repsInputString === "")
      setReps(repsInputString);
  }

  function updateWeight(weightInputString: string) {
    if (pattern.test(weightInputString) || weightInputString === "")
      setWeight(weightInputString);
  }

  function addSet() {
    if (reps === "" || weight === "") {
      setHasEmptyInputOnSubmit(true);
    } else {
      mutate({
        reps: parseInt(reps),
        weight: parseInt(weight),
        exerciseId,
        sessionId,
      });
      setHasEmptyInputOnSubmit(false);
    }
  }

  return (
    <>
      <StyledInput
        id="reps"
        type="text"
        inputMode="numeric"
        placeholder="Reps"
        onChange={(e) => {
          updateReps(e.target.value);
        }}
        value={reps}
        gridPosition="2 / 3"
        size={1}
      />
      <StyledInput
        id="weight"
        type="text"
        inputMode="numeric"
        placeholder="Weight"
        onChange={(e) => {
          updateWeight(e.target.value);
        }}
        value={weight}
        gridPosition="3 / 4"
        size={1}
      />
      <GridButton onClick={addSet} gridPosition="4 / 5">
        +
      </GridButton>
      {error && <ErrorMessage>⚠️ {error.message}</ErrorMessage>}
      {hasEmptyInputOnSubmit && (
        <ErrorMessage>
          ⚠️ You must enter reps and weight to add the set
        </ErrorMessage>
      )}
    </>
  );
}
