import invariant from "tiny-invariant";
import { deleteTodo } from "../data";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.todoId, "Missing todo id to delete");
  await deleteTodo(parseInt(params.todoId));
  return redirect(`/`);
};
