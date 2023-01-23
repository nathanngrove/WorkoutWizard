import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState } from "react";
import { api } from "../utils/api";

const CreateAccount: NextPage = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate, error, isLoading } = api.users.addUser.useMutation({
    onSuccess: () => {
      router.push("/login");
    },
  });

  return (
    <>
      <main>
        <h1>Create Account</h1>
        <p>{error && error.message}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({
              name: firstName + " " + lastName,
              email: email,
            });
          }}
        >
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            id="lastName"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <button type="submit" disabled={isLoading}>
            Create Account
          </button>
        </form>
        Already have an account? <Link href="/login">Login here</Link>
      </main>
    </>
  );
};

export default CreateAccount;
