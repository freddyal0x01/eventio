import Layout from "src/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import { UserInfo } from "src/core/components/UserInfo";
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm";

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <UserInfo />
      <AuthenticationForm />
    </Layout>
  );
};

export default Home;
