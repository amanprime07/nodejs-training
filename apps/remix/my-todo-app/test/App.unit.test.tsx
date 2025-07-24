import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../app/root";

// Mock Remix hooks and components
vi.mock("@remix-run/react", () => ({
  useLoaderData: () => ({ todos: [], q: "" }),
  useNavigation: () => ({}),
  useSubmit: () => vi.fn(),
  ScrollRestoration: () => <div />,
  Scripts: () => <div />,
  Meta: () => <div />,
  Links: () => <div />,
  Form: (props: any) => <form {...props} />,
}));

describe.skip("App UI", () => {
  it("renders sidebar and add todo button", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Todo Title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("renders filter buttons", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: "Pending" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Complete" })
    ).toBeInTheDocument();
  });

  it("renders sidebar", () => {
    render(<App />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });
});
