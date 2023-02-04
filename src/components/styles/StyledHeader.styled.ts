import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-width: 420px;

  @media (width > 910px) {
    margin-left: 15vw;
    margin-right: 15vw;
  }
`;

export default StyledHeader;
