import styled from "styled-components";

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: hsl(0 0% 10% / 0.7);
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40ch;
  background-color: var(--nuetral-100);
  color: black;
  border-radius: 10px;
  padding: 1rem;
`;

const ModalFormFlexContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const ModalTextCenter = styled.p`
  margin-top: 1rem;
  text-align: center;
  font-size: 1.25rem;
`;

const ModalHeading = styled.h1`
  font-size: 2.25rem;
  margin-bottom: 0.5rem;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  background-color: transparent;
  font-size: 1.25rem;
  color: white;
`;

const ModalButton = styled.button`
  font-size: 1.75rem;
  padding: 1rem;
  color: var(--nuetral-100);
  background: var(--accent-500);
  border: none;
  border-radius: 10px;
  font-weight: bold;
  margin-top: 1rem;

  &:hover,
  &:focus-within {
    background-color: var(--accent-400);
  }

  &:disabled {
    background-color: darkgray;
    color: black;
  }
`;

const ModalMessage = styled.p`
  font-weight: bold;
  font-size: 1.125rem;
  margin-bottom: 1rem;
  height: 1rem;
`;

export {
  Modal,
  ModalFormFlexContainer,
  ModalHeading,
  ModalTextCenter,
  ModalWrapper,
  ModalCloseButton,
  ModalButton,
  ModalMessage,
};
