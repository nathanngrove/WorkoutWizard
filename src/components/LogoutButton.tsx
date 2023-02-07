import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

import { api } from "../utils/api";
import StatusMessage from "./StatusMessage";

export default function LogoutButton() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = api.users.deleteUserToken.useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries();
      void router.push("/");
      return <StatusMessage message="Redirecting..." />;
    },
  });

  function logout() {
    mutate();
  }

  return (
    <Logout onClick={logout}>
      <Image
        src={"/logoutIcon.svg"}
        width={24}
        height={24}
        alt="Logout"
      ></Image>
    </Logout>
  );
}

const Logout = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: right ease 1s;

  &:hover {
    color: var(--accent-500);
  }

  @media (width > 910px) {
    right: 15vw;
  }
`;
