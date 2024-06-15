import { resolver } from "@blitzjs/rpc";

export default resolver.pipe(async () => {
  const todos = [{ title: "buy bread", id: 1 }];
  return todos;
});
