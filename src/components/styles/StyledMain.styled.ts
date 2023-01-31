import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  min-width: 420px;

  @media (width > 910px) {
    margin-left: 15vw;
    margin-right: 15vw;
  }
`;

export default Main;
