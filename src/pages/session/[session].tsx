import { type NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";

import { api } from "../../utils/api";
import { useUserContext } from "../../context/user.context";
import LoginForm from "../../components/LoginModal";
import ExerciseListing from "../../components/ExerciseListing";
import AddExercise from "../../components/AddExercise";
import Main from "../../components/styles/StyledMain.styled";
import { dateFormatter, weekdayFormatter } from "../../utils/formatter";
import {
  FirstColumn,
  ExercisesGrid,
  SecondColumn,
  ThirdColumn,
} from "../../components/styles/StyledGrid.styled";

const Session: NextPage = () => {
  const user = useUserContext();
  const router = useRouter();

  const sessionId = router.asPath.split("session/")[1] || "";

  if (!user) {
    return <LoginForm />;
  }

  const getAllExercises = api.exercises.getAllExercises.useQuery({
    sessionId,
  });

  const getSession = api.sessions.getSession.useQuery({ id: sessionId });

  if (getAllExercises.isLoading) {
    return <p>Loading...</p>;
  }

  if (getAllExercises.error) {
    return <p>{getAllExercises.error.message}</p>;
  }

  return (
    <Main>
      <h1>{weekdayFormatter.format(getSession.data?.createdAt)}</h1>
      <h2>{dateFormatter.format(getSession.data?.createdAt)}</h2>
      <ExercisesGrid>
        <FirstColumn>
          <TableHeading>Exercise</TableHeading>
        </FirstColumn>
        <SecondColumn>
          <TableHeading>Reps</TableHeading>
        </SecondColumn>
        <ThirdColumn>
          <TableHeading>Weight</TableHeading>
        </ThirdColumn>
        {getAllExercises.data.map((exercise) => (
          <ExerciseListing
            exercise={exercise.exercise}
            set={exercise.setsOnExercises}
            sessionId={sessionId}
          />
        ))}
        <AddExercise sessionId={sessionId} />
      </ExercisesGrid>
    </Main>
  );
};

const TableHeading = styled.p`
  font-weight: bold;
`;

export default Session;
