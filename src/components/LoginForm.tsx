import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../utils/api";

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter();
  const { data, error, isLoading } = api.users.verifyOTP.useQuery(
    { hash },
    {
      retry: 3,
    }
  );

  if (isLoading) {
    return <p>Verifying...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");

  return <p>Redirecting...</p>;
}

const LoginForm: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const { mutate, error } = api.users.requestOPT.useMutation({
    onSuccess: () => {
      setSuccess(true);
    },
  });

  const hash = router.asPath.split("#token=")[1];

  if (hash) {
    return (
      <>
        <VerifyToken hash={hash} />
      </>
    );
  }

  return (
    <>
      <main>
        <h1>Login</h1>
        {error && error.message}
        {success && <p>Check your email!</p>}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            mutate({ email, redirect: router.asPath });
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
          <button type="submit">Login</button>
        </form>
        <Link href="/create-account">Create account</Link>
      </main>
    </>
  );
};

export default LoginForm;
