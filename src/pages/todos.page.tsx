import { BlitzPage } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Button, Checkbox, Input, List, Loader, Text } from "@mantine/core";
import { Horizontal, Vertical } from "mantine-layout-components";
import { Suspense, useState } from "react";
import Layout from "src/core/layouts/Layout";
import addTodo from "src/features/todos/mutations/addTodo";
import toggleTodo from "src/features/todos/mutations/toggleTodo";
import getTodos from "src/features/todos/queries/getTodos";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";

const Todo = ({ todo }) => {
  const [$toggleTodo] = useMutation(toggleTodo);
  return (
    <Horizontal>
      <Checkbox
        checked={todo.done}
        onClick={async () => {
          await $toggleTodo({
            id: todo.id,
          });
        }}
      />
      <Text>{todo.title}</Text>
    </Horizontal>
  );
};

const Todos = () => {
  const user = useCurrentUser();
  const [todos] = useQuery(getTodos, {});
  const [todoTitle, setTodoTitle] = useState("");

  const [$addTodo] = useMutation(addTodo, {});

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
          <Todo todo={todo} key={todo.id} />
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
