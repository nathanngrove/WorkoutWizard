import { useState } from "react";
import { api } from "../utils/api";
import StyledInput from "./styles/StyledInput.styled";
import StyledLabel from "./styles/StyledLabel.styled";
import {
  Modal,
  ModalButton,
  ModalCloseButton,
  ModalFormFlexContainer,
  ModalHeading,
  ModalMessage,
  ModalWrapper,
} from "./styles/StyledModal.styled";

const TemplateNameModal = ({
  exercises,
  setOpen,
}: {
  exercises: Array<string>;
  setOpen: (arg1: boolean) => void;
}) => {
  const [templateName, setTemplateName] = useState("");

  const { mutate, error, isLoading } =
    api.templates.createTemplate.useMutation();

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Modal>
      <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
      <ModalWrapper>
        <ModalHeading>Create a template</ModalHeading>
        {error && <ModalMessage>⚠️ {error.message}</ModalMessage>}
        {!error && <ModalMessage></ModalMessage>}
        <ModalFormFlexContainer
          onSubmit={() => {
            mutate({ name: templateName, exercises });
          }}
        >
          <StyledLabel htmlFor="nameOfTemplate">Name of template </StyledLabel>
          <StyledInput
            type="text"
            id="nameOfTemplate"
            placeholder="Upper body day"
            onChange={(e) => {
              setTemplateName(e.target.value);
            }}
            required
          />
          <br />
          <ModalButton type="submit" disabled={isLoading}>
            Create template
          </ModalButton>
        </ModalFormFlexContainer>
      </ModalWrapper>
    </Modal>
  );
};

export default TemplateNameModal;
