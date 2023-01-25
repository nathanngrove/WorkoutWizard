import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useUserContext } from "../context/user.context";

const LoginForm = dynamic(() => import("../components/LoginForm"), {
  ssr: false,
});

function LoginPage() {
  const router = useRouter();
  const user = useUserContext();

  if (user) {
    router.push("/dashboard");
    return <p>Redirecting...</p>;
  }

  return (
    <>
      <LoginForm />
    </>
  );
}

export default LoginPage;
