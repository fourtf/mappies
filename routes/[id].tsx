import { signal } from "@preact/signals";
import { PageProps } from "$fresh/server.ts";
import { IS_BROWSER } from "https://deno.land/x/fresh@1.1.1/src/runtime/utils.ts";
import { defaultStorage, isValidId } from "../misc/storage.ts";

const document = signal<"loading" | "error" | Record<string, unknown>>(
  "loading",
);

function save() {
  fetch(`api/doc/${crypto.randomUUID()}`, {
    method: "PUT",
    body: JSON.stringify({ value: document.value }),
  });
}

export default function Greet(props: PageProps) {
  const { id } = props.params;
  if (!isValidId(id)) return <h1>Invalid ID</h1>;

  return <div>Hello {props.params.name}</div>;
}
