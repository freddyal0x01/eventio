import { BlitzPage } from "@blitzjs/next";
import { MainAuthenticationForm } from "src/core/components/MainAuthenticationForm";
import Layout from "src/core/layouts/Layout";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";

const Home: BlitzPage = () => {
  const user = useCurrentUser();

  return <Layout title="Home">{!user && <MainAuthenticationForm />}</Layout>;
};

export default Home;
