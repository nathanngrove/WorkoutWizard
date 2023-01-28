import React from "react";
import styled from "styled-components";

function StatusMessage({ message }: { message: string }) {
  return (
    <Container>
      <P>{message}</P>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const P = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

export default StatusMessage;
