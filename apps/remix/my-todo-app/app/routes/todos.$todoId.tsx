import { Form,useFetcher, useLoaderData } from "@remix-run/react";
import type { FunctionComponent } from "react";

import { getTodo, updateTodo } from "../data";
import invariant from "tiny-invariant";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Todo } from "../../drizzle/schema";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.todoId);
  const todo = await getTodo(parseInt(params.todoId));
  return { todo };
};


export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  invariant(params.todoId, "Missing todoId param");
  const formData = await request.formData();
  return updateTodo(parseInt(params.todoId), {
    completed: formData.get("complete") === "true",
  });
};

export default function TodoDetail() {
  const { todo } = useLoaderData<typeof loader>();
  if (!todo) {
    throw new Response("Not found", { status: 404 });
  }

  return (
    <div id="todo">
      <div>
        <h1>
          <Complete todo={todo} />
          {todo.title ? <>{todo.title}</> : <i>No Name</i>}{" "}
        </h1>

        {todo.description ? <p>{todo.description}</p> : null}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this record."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Complete: FunctionComponent<{
  todo: Todo;
}> = ({ todo }) => {
  const completed = todo.completed;
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post">
      <button
        aria-label={completed ? "Remove from completed" : "Add to Completed"}
        name="complete"
        value={completed ? "false" : "true"}
      >
        {completed ? "✔" : "✔"}
      </button>
    </fetcher.Form>
  );
};
