import type { Route } from "./+types/logout";
import { logout } from "~/.server/session";

export async function action({ request }: Route.ActionArgs) {
  return logout(request);
}
