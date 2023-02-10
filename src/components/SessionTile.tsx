import type { Exercise, ExercisesOnSessions, Session } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { api } from "../utils/api";
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
      <Link href={`/sessions/${session.id}`}>
        <Date>{weekdayFormatter.format(session.createdAt)}</Date>
        <Date>{dateFormatter.format(session.createdAt)}</Date>
      </Link>
      <Time>{timeFormatter.format(session.createdAt)}</Time>
      {session.exercises.length === 0 && (
        <Exercise>No exercises added yet.</Exercise>
      )}
      {session.exercises?.map((exercise, i) => {
        if (i > 1) return;
        if (i === 1) return <Exercise key={session.id}>more...</Exercise>;
        return <Exercise key={exercise.id}>{exercise.exercise.name}</Exercise>;
      })}
      <MenuButton
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        . . .
      </MenuButton>
      {isOpen && <SquareMenu id={session.id} />}
    </Tile>
  );
}

function SquareMenu({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const deleteSession = api.sessions.deleteSession.useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries();
    },
  });

  return (
    <Square>
      <li>
        <button
          onClick={() => {
            deleteSession.mutate({ id });
          }}
        >
          🗑️ Delete session
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
  height: 7.5rem;
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
  bottom: -3.5rem;
  right: 1rem;
  padding: 1rem 0rem;
  border: 1px solid black;

  & li {
    list-style-type: none;
    padding: 0.5rem 1rem;
  }

  & li button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-weight: bold;
    color: red;
  }

  & li:hover {
    background-color: hsl(0 0% 0% / 0.1);
  }
`;
