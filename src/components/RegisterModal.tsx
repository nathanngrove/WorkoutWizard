import { useRouter } from "next/router";
import { useState } from "react";

import { api } from "../utils/api";
import StyledInput from "./styles/StyledInput.styled";
import StyledLabel from "./styles/StyledLabel.styled";
import StatusMessage from "./StatusMessage";
import firstLetterToUpperCase from "../utils/uppercaseFirstLetter";
import { ButtonLink } from "./styles/StyledButton.styled";
import {
  Modal,
  ModalButton,
  ModalCloseButton,
  ModalFormFlexContainer,
  ModalHeading,
  ModalMessage,
  ModalTextCenter,
  ModalWrapper,
} from "./styles/StyledModal.styled";

export default function RegisterModal({
  setIsRegisterOpen,
  setIsLoginOpen,
  displayClose,
}: {
  setIsRegisterOpen: Function;
  setIsLoginOpen: Function;
  displayClose: boolean;
}) {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate, error, isLoading } = api.users.addUser.useMutation({
    onSuccess: () => {
      router.push("/login");
      return <StatusMessage message="Redirecting..." />;
    },
  });

  const closeModal = () => {
    setIsRegisterOpen(false);
  };

  return (
    <Modal>
      {displayClose && (
        <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
      )}
      <ModalWrapper>
        <ModalHeading>Register</ModalHeading>
        {error && <ModalMessage>⚠️ {error.message}</ModalMessage>}
        {!error && <ModalMessage></ModalMessage>}
        <ModalFormFlexContainer
          onSubmit={(e) => {
            e.preventDefault();
            mutate({
              name:
                firstLetterToUpperCase(firstName) +
                " " +
                firstLetterToUpperCase(lastName),
              email: email.toLowerCase(),
            });
          }}
        >
          <StyledLabel htmlFor="firstName">First Name: </StyledLabel>
          <StyledInput
            type="text"
            id="firstName"
            placeholder="John"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          />
          <br />
          <StyledLabel htmlFor="lastName">Last Name: </StyledLabel>
          <StyledInput
            type="text"
            id="lastName"
            placeholder="Doe"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          />
          <br />
          <StyledLabel htmlFor="email">Email: </StyledLabel>
          <StyledInput
            type="email"
            id="email"
            placeholder="johndoe@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <br />
          <ModalButton type="submit" disabled={isLoading}>
            Register
          </ModalButton>
        </ModalFormFlexContainer>
        <ModalTextCenter>
          Already have an account?
          <br />
          <ButtonLink
            onClick={() => {
              setIsRegisterOpen(false);
              setIsLoginOpen(true);
            }}
          >
            Sign in
          </ButtonLink>
        </ModalTextCenter>
      </ModalWrapper>
    </Modal>
  );
}
