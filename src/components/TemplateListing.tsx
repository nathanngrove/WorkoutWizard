import { ExercisesOnTemplates, Template, Exercise } from "@prisma/client";
import { useState } from "react";
import styled from "styled-components";
import { api } from "../utils/api";
import { timeFormatter, dateFormatter } from "../utils/formatter";

const TemplateListing = ({
  template,
}: {
  template: Template & {
    exercises: (ExercisesOnTemplates & {
      exercise: Exercise | null;
    })[];
  };
}) => {
  const createSessionFromTemplate =
    api.sessions.createSessionFromTemplate.useMutation();

  const [isExpanded, setIsExpanded] = useState(false);

  const exercisesOnTemplate: Array<string> = [];

  template.exercises.forEach((exercise) => {
    exercisesOnTemplate.push(exercise.exerciseId!);
  });

  return (
    <TemplateListingWrapper>
      <TemplateListingContainer>
        <div>
          <TemplateListingTitle>{template.name}</TemplateListingTitle>
          <TemplateListingDate>
            Created on {dateFormatter.format(template.createdAt)} at{" "}
            {timeFormatter.format(template.createdAt)}
          </TemplateListingDate>
        </div>
        <TemplateListingButton onClick={() => setIsExpanded(!isExpanded)}>
          {!isExpanded && "╲╱"}
          {isExpanded && "╱╲"}
        </TemplateListingButton>
      </TemplateListingContainer>
      <ExercisesContainer>
        {isExpanded && (
          <>
            {template.exercises.map((exercise) => {
              return <p key={exercise.exerciseId}>{exercise.exercise?.name}</p>;
            })}
            <UseTemplateButton
              onClick={() =>
                createSessionFromTemplate.mutate({
                  exercises: exercisesOnTemplate,
                })
              }
            >
              Use template
            </UseTemplateButton>
          </>
        )}
      </ExercisesContainer>
    </TemplateListingWrapper>
  );
};

const TemplateListingWrapper = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const TemplateListingContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const TemplateListingTitle = styled.p`
  color: black;
  font-weight: bold;
  font-size: 1.75rem;
`;

const TemplateListingDate = styled.p`
  color: black;
  font-style: italic;
  font-size: 0.925rem;
`;

const TemplateListingButton = styled.button`
  background-color: transparent;
  border: none;
  margin-left: auto;
  cursor: pointer;
`;

const ExercisesContainer = styled.div`
  color: black;
`;

const UseTemplateButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  border: none;
  color: white;
  background-color: var(--accent-500);
  padding: 0.5rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;

  &:hover,
  focus-within {
    background-color: var(--accent-400);
  }
`;

export default TemplateListing;
