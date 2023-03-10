import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin: 0 1rem;
  transition: margin ease 1s;

  @media (width > 910px) {
    margin-left: 15vw;
    margin-right: 15vw;
  }
`;

export default Main;
