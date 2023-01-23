import { type NextPage } from "next";
import Link from "next/link";
import LoginForm from "../components/LoginForm";
import { useUserContext } from "../context/user.context";

const Dashboard: NextPage = () => {
  const user = useUserContext();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <>
      <main>
        <h1>Dashboard</h1>
        <button>Add session</button>
        <br />
        <Link href="/login">Logout</Link>
      </main>
    </>
  );
};

export default Dashboard;
