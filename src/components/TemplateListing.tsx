import { ExercisesOnTemplates, Template, Exercise } from "@prisma/client";
import { useState } from "react";
import styled from "styled-components";

const TemplateListing = ({
  template,
}: {
  template: Template & {
    exercises: (ExercisesOnTemplates & {
      exercise: Exercise | null;
    })[];
  };
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TemplateListingWrapper>
      <TemplateListingContainer>
        <TemplateListingTitle>{template.name}</TemplateListingTitle>
        <TemplateListingButton onClick={() => setIsExpanded(!isExpanded)}>
          {!isExpanded && "╲╱"}
          {isExpanded && "╱╲"}
        </TemplateListingButton>
      </TemplateListingContainer>
      <ExercisesContainer>
        {isExpanded &&
          template.exercises.map((exercise) => {
            return <p key={exercise.exerciseId}>{exercise.exercise?.name}</p>;
          })}
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
`;

const TemplateListingTitle = styled.p`
  color: black;
  font-weight: bold;
  font-size: 1.75rem;
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

export default TemplateListing;
