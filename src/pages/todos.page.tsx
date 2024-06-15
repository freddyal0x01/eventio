import { BlitzPage } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Button, Checkbox, Input, List, Text } from "@mantine/core";
import { PromiseReturnType } from "blitz";
import { Horizontal, Vertical } from "mantine-layout-components";
import { useInput } from "react-hanger";
import Layout from "src/core/layouts/Layout";
import addTodo from "src/features/todos/mutations/addTodo";
import cleanCompleted from "src/features/todos/mutations/cleanCompleted";
import toggleTodo from "src/features/todos/mutations/toggleTodo";
import getTodos from "src/features/todos/queries/getTodos";
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
  const [$addTodo, { isLoading }] = useMutation(addTodo, {});
  const [$cleanCompleted] = useMutation(cleanCompleted, {});

  const todoTitle = useInput("");

  return (
    <Vertical>
      {user && <Text>Hello {user.name}, here are you todos:</Text>}

      <Input {...todoTitle.eventBind} placeholder="Enter todo title" />
      <Button
        onClick={() => {
          $addTodo({
            todoTitle: todoTitle.value,
          });
        }}
        type="submit"
        loading={isLoading}
      >
        Create a todo
      </Button>

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
