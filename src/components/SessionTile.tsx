import { Exercise, ExercisesOnSessions, Session } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tile>
      <Link href={`/session/${session.id}`}>
        <Date>{weekdayFormatter.format(session.createdAt)}</Date>
        <Date>{dateFormatter.format(session.createdAt)}</Date>
      </Link>
      <Time>{timeFormatter.format(session.createdAt)}</Time>
      {session.exercises?.map((exercise, i) => {
        if (i > 3) return;
        if (i === 3) return <p>more...</p>;
        return <Exercise>{exercise.exercise.name}</Exercise>;
      })}
      <MenuButton
        type="button"
        onClick={(e) => {
          setIsOpen(!isOpen);
        }}
      >
        . . .
      </MenuButton>
      {isOpen && <SquareMenu />}
    </Tile>
  );
}

function SquareMenu() {
  return (
    <Square>
      <li>
        <button
          onClick={(e) => {
            console.log(e);
          }}
        >
          Delete session
        </button>
      </li>
    </Square>
  );
}

const Tile = styled.div`
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 1rem;
  position: relative;
  min-width: 250px;
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

const MenuButton = styled.button`
  border: none;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  background-color: transparent;
  cursor: pointer;
  font-weight: bold;
  border-radius: 3px;

  &:hover,
  focus-within {
    border: 1px solid black;
  }
`;

const Square = styled.ul`
  background-color: white;
  border-radius: 10px 0 10px 10px;
  position: absolute;
  z-index: 1;
  right: 1rem;
  padding: 1rem;
  border: 1px solid black;

  & li {
    list-style-type: none;
  }

  & li button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-weight: bold;
    color: red;
  }
`;
