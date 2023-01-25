import { type NextPage } from "next";
import Link from "next/link";
import { useUserContext } from "../context/user.context";

const Home: NextPage = () => {
  return (
    <>
      <h1>Homepage</h1>
      <Link href="/login">Login</Link>
    </>
  );
};

export default Home;
