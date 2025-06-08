import type { Route } from "./+types/logout";

export async function action({ request }: Route.ActionArgs) {
  // const { logout } = await import("~/utils/session.server");
  // return logout(request);
  return null;
}

export async function loader() {
  // Redirect to login if someone tries to access /logout directly
  // const { logout } = await import("~/utils/session.server");
  // return logout(new Request(""));
  return null;
}
