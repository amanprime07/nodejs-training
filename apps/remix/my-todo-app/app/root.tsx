import type { ActionFunctionArgs, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  Links,
  Meta,
  NavLink,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import appStylesHref from "./app.css?url";
import { createTodo, getTodos } from "./data";
import { useEffect } from "react";
import { todoSchema } from "../drizzle/schema";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const status = url.searchParams.get("status");
  const todos = await getTodos(q, status);
  return { todos, q };
};

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const newTodo = todoSchema.parse(Object.fromEntries(formData));
  const todo = await createTodo(newTodo);
  return redirect(`/todos/${todo.id}/edit`);
}

export default function App() {
  const { todos, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Todos</h1>
          <div>
            <Form
              id="search-form"
              onChange={(event) => submit(event.currentTarget)}
              role="search"
            >
              <input
                id="q"
                aria-label="Search todos"
                placeholder="Search"
                defaultValue={q || ""}
                type="search"
                name="q"
                className={searching ? "loading" : ""}
              />
              <div id="search-spinner" aria-hidden hidden={!searching} />
            </Form>
          </div>
          <div>
              <Form method="post">
                <input id="title"
                name="title"
                placeholder="Todo Title"></input>
                 <span style={{ margin: "0 8px" }}></span>
                <button type="submit">Add</button>
              </Form>
            </div>
          <div>
            <Form id="filter-form" method="get">
              <button type="submit" name="status" value="pending">
                Pending
              </button>
              <span style={{ margin: "0 8px" }}></span>
              <button type="submit" name="status" value="complete">
                Complete
              </button>
            </Form>
          </div>
          <nav>
            {todos.length ? (
              <ul>
                {todos.map((todo) => (
                  <li key={todo.id}>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                      to={`todos/${todo.id}`}
                    >
                      <>{todo.title}</>{" "}
                      {todo.completed ? <span>✔</span> : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No Todos</i>
              </p>
            )}
          </nav>
        </div>
        <div
          className={
            navigation.state === "loading" && !searching ? "loading" : ""
          }
          id="detail"
        >
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
