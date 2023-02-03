import { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function LoginOrRegisterModal({
  displayClose,
}: {
  displayClose: boolean;
}) {
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      {isLoginOpen && (
        <LoginModal
          setIsRegisterOpen={setIsRegisterOpen}
          setIsLoginOpen={setIsLoginOpen}
          displayClose={displayClose}
        />
      )}
      {isRegisterOpen && (
        <RegisterModal
          setIsRegisterOpen={setIsRegisterOpen}
          setIsLoginOpen={setIsLoginOpen}
          displayClose={displayClose}
        />
      )}
    </>
  );
}
