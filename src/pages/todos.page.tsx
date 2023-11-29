import { BlitzPage } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Button, List, Loader, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Vertical } from "mantine-layout-components";
import { Suspense } from "react";
import Layout from "src/core/layouts/Layout";
import addTodo from "src/features/todos/mutations/addTodo";
import getTodos from "src/features/todos/queries/getTodos";

const Todos = () => {
  const [todos] = useQuery(getTodos, {});

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (result) => {
      notifications.show({
        title: "Mutation Successful",
        message: result,
      });
    },
  });

  return (
    <Vertical>
      <Button
        onClick={async () => {
          const result = await $addTodo({
            todoTitle: "Buy some bread",
          });
        }}
      >
        Create a todo
      </Button>
      <List>
        {todos.map((todo) => (
          <List.Item key={todo.title}>
            <Text>{todo.title}</Text>
          </List.Item>
        ))}
      </List>
    </Vertical>
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
