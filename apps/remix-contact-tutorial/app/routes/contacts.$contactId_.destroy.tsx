import invariant from "tiny-invariant";
import { deleteContact } from "../data";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contact id to delete");
  await deleteContact(params.contactId);
  return redirect(`/`);
};
