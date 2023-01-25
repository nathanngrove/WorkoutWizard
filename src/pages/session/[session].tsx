import { type NextPage } from "next";
import { useRouter } from "next/router";

import { api } from "../../utils/api";
import { useUserContext } from "../../context/user.context";
import LoginForm from "../../components/LoginForm";
import ExerciseListing from "../../components/ExerciseListing";
import AddExercise from "../../components/AddExercise";

const Session: NextPage = () => {
  const user = useUserContext();
  const router = useRouter();

  const sessionId = router.asPath.split("session/")[1] || "";

  if (!user) {
    return <LoginForm />;
  }

  const { data, error, isLoading } = api.exercises.getAllExercises.useQuery({
    sessionId,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
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
            {data.map((exercise) => (
              <ExerciseListing
                exercise={exercise.exercise}
                set={exercise.setsOnExercises}
                sessionId={sessionId}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <AddExercise sessionId={sessionId} />
            </tr>
          </tfoot>
        </table>
      </main>
    </>
  );
};

export default Session;
