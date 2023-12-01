import { BlitzPage } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Button, Input, List, Loader, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Vertical } from "mantine-layout-components";
import { Suspense, useState } from "react";
import Layout from "src/core/layouts/Layout";
import addTodo from "src/features/todos/mutations/addTodo";
import getTodos from "src/features/todos/queries/getTodos";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";

const Todos = () => {
  const user = useCurrentUser();
  const [todos] = useQuery(getTodos, {});
  const [todoTitle, setTodoTitle] = useState("");

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (todo) => {
      notifications.show({
        title: "Mutation Successful",
        message: `Created todo: ${todo.title}`,
      });
    },
  });

  return (
    <Vertical>
      {user && <Text>Hello {user.name}, here are you todos:</Text>}
      <Input
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.currentTarget.value)}
        placeholder="Enter todo title"
      />
      <Button
        onClick={async () => {
          await $addTodo({
            todoTitle: todoTitle,
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
