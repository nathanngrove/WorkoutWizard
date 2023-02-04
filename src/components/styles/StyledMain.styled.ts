import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 420px;
  position: relative;

  @media (width > 910px) {
    margin-left: 15vw;
    margin-right: 15vw;
  }
`;

export default Main;
