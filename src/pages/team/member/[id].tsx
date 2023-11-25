import React from "react";
import { useStringParam } from "src/utils/utils";

const TeamPage = () => {
  const id = useStringParam("id");
  return <div>{id} is the test team member</div>;
};

export default TeamPage;
