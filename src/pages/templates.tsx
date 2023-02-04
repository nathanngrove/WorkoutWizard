import { NextPage } from "next";
import { useUserContext } from "../context/user.context";
import { api } from "../utils/api";

const Templates: NextPage = () => {
  const user = useUserContext();

  const templates = api.templates.getAllTemplates.useQuery();

  return (
    <>
      {templates.data?.map((data) => {
        return <p>{data.name}</p>;
      })}
    </>
  );
};

export default Templates;
