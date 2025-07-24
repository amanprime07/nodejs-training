import invariant from "tiny-invariant";
import { deleteTodo } from "../data";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { isStrictlyNumber } from "../utils/numberUtils";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(isStrictlyNumber(params.todoId), "Missing todo id to delete");
  await deleteTodo(params.todoId);
  return redirect(`/`);
};
