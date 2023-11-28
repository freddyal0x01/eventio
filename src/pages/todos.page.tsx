import { BlitzPage } from "@blitzjs/next";
import { useQuery } from "@blitzjs/rpc";
import { List, Loader, Text } from "@mantine/core";
import { Suspense } from "react";
import Layout from "src/core/layouts/Layout";
import getTodos from "src/features/todos/queries/getTodos";

const Todos = () => {
  const [todos] = useQuery(getTodos, {
    search: "hello",
  });

  return (
    <List>
      {todos.map((todo) => (
        <List.Item key={todo.title}>
          <Text>{todo.title}</Text>
        </List.Item>
      ))}
    </List>
  );
};

export const TodosPage: BlitzPage = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Todos />
      </Suspense>
    </Layout>
  );
};

export default TodosPage;
