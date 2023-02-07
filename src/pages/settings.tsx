import { type NextPage } from "next";
import Link from "next/link";

import { api } from "../utils/api";
import { useState } from "react";
import { useRouter } from "next/router";

const Settings: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const { mutate, error, isLoading } = api.users.deleteUser.useMutation({
    onSuccess: () => {
      void router.push("/create-account");
    },
  });

  return (
    <>
      <main>
        <h1>Settings</h1>
        {error && error.message}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ email });
          }}
        >
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />{" "}
          <br />
          <button type="submit" disabled={isLoading}>
            Delete account
          </button>
        </form>
        <Link href="/dashboard">Back to dashboard</Link>
      </main>
    </>
  );
};

export default Settings;
