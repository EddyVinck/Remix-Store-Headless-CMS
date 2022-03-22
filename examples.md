```tsx
import { Form, Link, useLoaderData, useTransition, json } from "remix";

// Load data (server)
export async function loader({ request }) {
  const items = await getItems();
  return json(items);
}

// Handle form inputs (server)
export async function action({ request }) {
  const form = await request.formData();
  const title = form.get("title");
  const result = await createItem({ title });
  return result;
}

// Your UI
export default function Projects() {
  const data = useLoaderData();
  const { state } = useTransition();
  const busy = state === "submitting";

  return (
    <div>
      {data.items.map((item) => (
        <Link to={item.slug}>{item.title}</Link>
      ))}

      <Form method="post">
        {/* Regular inputs... */}
        <input name="title" />
        <button type="submit" disabled={busy}>
          {busy ? "Creating..." : "Create New Item"}
        </button>
      </Form>
    </div>
  );
}

// Handle errors you have thrown
export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 401) {
    return <div>{/* UI */}</div>;
  }
}

// Handle unexpected exceptions (not server errors like 404 not found)
export function ErrorBoundary() {
  return (
    <div className="error-container">
      Something unexpected went wrong. Sorry!
    </div>
  );
}
```
