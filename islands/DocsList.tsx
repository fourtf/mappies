import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

async function new_() {
  const guid = crypto.randomUUID();

  await fetch(`api/doc/${guid}`, {
    method: "PUT",
    body: JSON.stringify({ value: "{}" }),
  });

  window.location.href = `/${guid}`;
}

export default function DocsList({ docs }: { docs: string[] }) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button
        disabled={loading}
        onClick={() => (setLoading(true), new_())}
      >
        new
      </Button>

      <div>
        {docs.map((id) => (
          <div key={id}>
            <a href={`/${id}`}>{id}</a>
          </div>
        ))}
      </div>
    </>
  );
}
