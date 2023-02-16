import { type NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";

import { api } from "../../utils/api";
import { useUserContext } from "../../context/user.context";
import ExerciseListing from "../../components/ExerciseListing";
import AddExercise from "../../components/AddExercise";
import Main from "../../components/styles/StyledMain.styled";
import { dateFormatter, weekdayFormatter } from "../../utils/formatter";
import LoginOrRegisterModal from "../../components/LoginOrRegisterModal";

import { useState } from "react";
import Header from "../../components/Header";
import TemplateNameModal from "../../components/TemplateNameModal";
import {
  FirstColumn,
  ExercisesGrid,
  SecondColumn,
  ThirdColumn,
} from "../../components/styles/StyledGrid.styled";
import BackTo from "../../components/styles/BackToLink.styled";

const Session: NextPage = () => {
  const user = useUserContext();
  const router = useRouter();

  const sessionId = router.asPath.split("sessions/")[1] || "";

  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return <LoginOrRegisterModal displayClose={false} />;
  }

  const allExercisesOnSession = api.exercises.getAllExercisesOnSession.useQuery(
    {
      sessionId,
    }
  );

  const getSession = api.sessions.getSession.useQuery({ id: sessionId });

  function getExercisesArray() {
    const exerciseIds: Array<string> = [];

    allExercisesOnSession.data?.forEach((exercise) => {
      exerciseIds.push(exercise.exerciseId);
    });

    return exerciseIds;
  }

  if (allExercisesOnSession.isLoading) {
    return <p>Loading...</p>;
  }

  if (allExercisesOnSession.error) {
    return <p>{allExercisesOnSession.error.message}</p>;
  }

  return (
    <>
      <Header />
      <Main>
        <BackTo href="/sessions">Back to sessions</BackTo>
        <h1>{weekdayFormatter.format(getSession.data?.createdAt)}</h1>
        <h2>{dateFormatter.format(getSession.data?.createdAt)}</h2>
        <Button onClick={() => setIsOpen(true)}>Create Template</Button>
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
          {allExercisesOnSession.data.map((exercise) => (
            <ExerciseListing
              key={exercise.id}
              exercise={exercise.exercise}
              set={exercise.setsOnExercises}
              sessionId={sessionId}
            />
          ))}
          <AddExercise sessionId={sessionId} />
        </ExercisesGrid>
      </Main>
      {isOpen && (
        <TemplateNameModal
          exercises={getExercisesArray()}
          setOpen={setIsOpen}
        />
      )}
    </>
  );
};

const Button = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 1rem;
  border-radius: 50px;
  border: none;
  background-color: var(--accent-500);
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: var(--accent-400);
  }
`;

const TableHeading = styled.p`
  font-weight: bold;
`;

export default Session;
