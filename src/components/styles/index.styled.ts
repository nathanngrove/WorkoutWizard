import styled from "styled-components";

const LinkButton = styled.a`
  font-size: 2rem;
  padding: 1rem 3rem;
  color: var(--nuetral-100);
  background-color: var(--accent-500);
  border: none;
  border-radius: 10px;
  font-weight: bold;

  &:hover,
  &:focus-within {
    background-color: var(--accent-400);
  }
`;

const GridContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  place-items: center;
  padding: 1.25rem;
`;

const Purple = styled.span`
  color: var(--accent-500);
`;

const TagLine = styled.p`
  font-size: 2.5rem;
  text-align: center;
`;

export { LinkButton, GridContainer, Purple, TagLine };
