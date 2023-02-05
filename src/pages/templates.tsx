import { NextPage } from "next";
import Header from "../components/Header";
import Main from "../components/styles/StyledMain.styled";
import TemplateListing from "../components/TemplateListing";
import { useUserContext } from "../context/user.context";
import { api } from "../utils/api";

const Templates: NextPage = () => {
  const user = useUserContext();

  const templates = api.templates.getAllTemplates.useQuery();

  return (
    <>
      <Header />
      <Main>
        {templates.data?.map((data) => {
          return <TemplateListing template={data} key={data.id} />;
        })}
      </Main>
    </>
  );
};

export default Templates;
