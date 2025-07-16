import type { LoaderFunctionArgs } from "react-router";
import { Form, Outlet, redirect, useLoaderData } from "react-router";
import { getUserSession } from "~/.server/session";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserSession(request);

  if (!user) {
    return redirect("/login");
  }

  return { user };
}

export default function ProtectedLayout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div>
      <nav>
        <span>Logged in as: {user?.email}</span>
        <Form action="/logout" method="post">
          <button type="submit">Logout</button>
        </Form>
      </nav>
      <main>
        <div>sidebar</div>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
