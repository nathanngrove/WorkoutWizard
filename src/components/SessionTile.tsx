import { Exercise, ExercisesOnSessions, Session } from "@prisma/client";
import Link from "next/link";
import styled from "styled-components";
import {
  dateFormatter,
  timeFormatter,
  weekdayFormatter,
} from "../utils/formatter";

export default function SessionTile({
  session,
}: {
  session: Session & {
    exercises: (ExercisesOnSessions & {
      exercise: Exercise;
    })[];
  };
}) {
  return (
    <Tile>
      <Link href={`/session/${session.id}`}>
        <Date>{weekdayFormatter.format(session.createdAt)}</Date>
        <Date>{dateFormatter.format(session.createdAt)}</Date>
        <Time>{timeFormatter.format(session.createdAt)}</Time>
      </Link>
      {session.exercises?.map((exercise, i) => {
        if (i > 3) return;
        if (i === 3) return <p>...</p>;
        return <Exercise>{exercise.exercise.name}</Exercise>;
      })}
    </Tile>
  );
}

const Tile = styled.div`
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 1rem;
  position: relative;
`;

const Time = styled.p`
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1.25rem;
`;

const Date = styled.p`
  font-size: 1.25rem;
`;

const Exercise = styled.p`
  &:first-of-type {
    margin-top: 1rem;
  }
`;
