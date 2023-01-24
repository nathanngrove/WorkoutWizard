import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Exercise,
  ExercisesOnSessions,
  Set,
  SetsOnExercises,
} from "@prisma/client";

import { api } from "../../utils/api";
import { useUserContext } from "../../context/user.context";
import LoginForm from "../../components/LoginForm";
import ExerciseListing from "../../components/ExerciseListing";
import AddExercise from "../../components/AddExercise";

const Session: NextPage = () => {
  const user = useUserContext();
  const router = useRouter();

  const sessionId = router.asPath.split("session/")[1] || "";

  const [exercises, setExercises] = useState(
    Array<
      ExercisesOnSessions & {
        exercise: Exercise & {
          sets: (SetsOnExercises & {
            set: Set;
          })[];
        };
      }
    >
  );

  if (!user) {
    return <LoginForm />;
  }

  const queryAllExercises = api.exercises.getAllExercises.useQuery(
    {
      sessionId,
    },
    {
      onSuccess(data) {
        console.log(data);
        setExercises(data);
      },
    }
  );

  if (queryAllExercises.error) {
    return <p>{queryAllExercises.error.message}</p>;
  }

  return (
    <>
      <main>
        <table>
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <ExerciseListing
                exercise={exercise.exercise}
                set={exercise.exercise.sets}
              />
            ))}
          </tbody>
          <tfoot>
            <AddExercise
              sessionId={sessionId}
              updateExercises={() => queryAllExercises.refetch()}
            />
          </tfoot>
        </table>
      </main>
    </>
  );
};

export default Session;
