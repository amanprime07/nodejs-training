import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getTodo, updateTodo } from "../data";
import { updateTodoSchema } from "../../drizzle/schema";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.todoId, "Missing todo Id");
  const formData = await request.formData();
  const updates = updateTodoSchema.parse(Object.fromEntries(formData));
  await updateTodo(parseInt(params.todoId), updates);
  return redirect(`/todos/${params.todoId}`);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.todoId, "Missing todoId param");
  const todo = await getTodo(parseInt(params.todoId));
  if (!todo) {
    throw new Response("Not Found", { status: 404 });
  }
  return { todo };
};

export default function EditTodo() {
  const { todo } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Form key={todo.id} id="todo-form" method="post">
      <p>
        <span>Title</span>
        <input
          aria-label="Title"
          defaultValue={todo.title}
          name="title"
          placeholder="Title"
          type="text"
        />
      </p>
      <label>
        <span>Description</span>
        <textarea
          defaultValue={todo.description || ""}
          name="description"
          rows={6}
        />
      </label>
      <label>
        <span>Priority</span>
        <input defaultValue={todo.priority || ""} name="priority" />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
