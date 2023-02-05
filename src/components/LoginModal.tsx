import { useRouter } from "next/router";
import { useState } from "react";

import { api } from "../utils/api";
import StyledLabel from "./styles/StyledLabel.styled";
import StyledInput from "./styles/StyledInput.styled";
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

export default function LoginModal({
  setIsLoginOpen,
  setIsRegisterOpen,
  displayClose,
}: {
  setIsLoginOpen: (arg1: boolean) => void;
  setIsRegisterOpen: (arg1: boolean) => void;
  displayClose: boolean;
}) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const { mutate, error, isLoading } = api.users.requestOPT.useMutation({
    onSuccess: () => {
      setSuccess(true);
    },
  });

  const closeModal = () => {
    setIsLoginOpen(false);
  };

  return (
    <>
      <Modal>
        {displayClose && (
          <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
        )}
        <ModalWrapper>
          <ModalHeading>Log in</ModalHeading>
          <div>
            {error && <ModalMessage>⚠️ {error.message}</ModalMessage>}
            {success && <ModalMessage>✅ Check your email!</ModalMessage>}
            {!error && !success && <ModalMessage></ModalMessage>}
          </div>
          <ModalFormFlexContainer
            onSubmit={(e) => {
              e.preventDefault();
              mutate({ email, redirect: router.asPath });
            }}
          >
            <StyledLabel htmlFor="email">Email</StyledLabel>
            <StyledInput
              type="text"
              id="email"
              placeholder="johndoe@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <ModalButton type="submit" disabled={isLoading}>
              Log in
            </ModalButton>
          </ModalFormFlexContainer>
          <ModalTextCenter>
            Don't have an account yet?
            <br />
            <ButtonLink
              onClick={() => {
                setIsLoginOpen(false);
                setIsRegisterOpen(true);
              }}
            >
              Create Account
            </ButtonLink>
          </ModalTextCenter>
        </ModalWrapper>
      </Modal>
    </>
  );
}
