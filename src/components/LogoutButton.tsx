import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import styled from "styled-components";

import { api } from "../utils/api";
import StatusMessage from "./StatusMessage";

export default function LogoutButton() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = api.users.deleteUserToken.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries();
      router.push("/");
      return <StatusMessage message="Redirecting..." />;
    },
  });

  return <Logout onClick={() => mutate()}>Logout</Logout>;
}

const Logout = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    color: var(--accent-500);
  }
`;
