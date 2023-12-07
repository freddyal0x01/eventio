import { BlitzPage } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Button, Checkbox, Input, List, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { PromiseReturnType } from "blitz";
import { Horizontal, Vertical } from "mantine-layout-components";
import { useState } from "react";
import Layout from "src/core/layouts/Layout";
import addTodo from "src/features/todos/mutations/addTodo";
import cleanCompleted from "src/features/todos/mutations/cleanCompleted";
import toggleTodo from "src/features/todos/mutations/toggleTodo";
import getTodos from "src/features/todos/queries/getTodos";
import { TodoFormType, TodoInput } from "src/features/todos/schemas";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import { ReactFC } from "types";

type Todos = PromiseReturnType<typeof getTodos>;
type TodoType = Todos[number];

const Todo: ReactFC<{
  todo: TodoType;
}> = ({ todo }) => {
  const [$toggleTodo, { isLoading }] = useMutation(toggleTodo);
  return (
    <Horizontal>
      <Checkbox
        disabled={isLoading}
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

  const [$addTodo, { isLoading }] = useMutation(addTodo, {});
  const [$cleanCompleted] = useMutation(cleanCompleted, {});

  const form = useForm<TodoFormType>({
    validate: zodResolver(TodoInput),
  });

  return (
    <Vertical>
      {user && <Text>Hello {user.name}, here are you todos:</Text>}
      <form
        onSubmit={form.onSubmit(async (values) => {
          await $addTodo({
            ...values,
          });
        })}
      >
        <Input
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.currentTarget.value)}
          placeholder="Enter todo title"
        />
        <Button type="submit" loading={isLoading}>
          Create a todo
        </Button>
      </form>
      <Button onClick={async () => $cleanCompleted({})}>Clean completed</Button>
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
      <Todos />
    </Layout>
  );
};

export default TodosPage;
