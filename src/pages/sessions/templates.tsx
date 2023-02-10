import { type NextPage } from "next";
import BackTo from "../../components/styles/BackToLink.styled";
import Header from "../../components/Header";
import LoginOrRegisterModal from "../../components/LoginOrRegisterModal";
import Main from "../../components/styles/StyledMain.styled";
import TemplateListing from "../../components/TemplateListing";
import { useUserContext } from "../../context/user.context";
import { api } from "../../utils/api";

const Templates: NextPage = () => {
  const user = useUserContext();

  if (!user) {
    return <LoginOrRegisterModal displayClose={false} />;
  }

  const templates = api.templates.getAllTemplates.useQuery();

  return (
    <>
      <Header />
      <Main>
        <BackTo href="/sessions">Back to sessions</BackTo>
        {templates.data?.map((data) => {
          return <TemplateListing template={data} key={data.id} />;
        })}
      </Main>
    </>
  );
};

export default Templates;
