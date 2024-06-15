import { BlitzPage } from "@blitzjs/next";
import Layout from "src/core/layouts/Layout";

const AboutPage: BlitzPage = () => {
  return (
    <Layout title="About">
      <div>This is the about page</div>
    </Layout>
  );
};

AboutPage.authenticate = true;

export default AboutPage;
