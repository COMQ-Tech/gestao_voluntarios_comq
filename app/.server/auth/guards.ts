import { redirect } from "react-router";
import { getUserSession } from "../session";
import type { UserRole } from "../authentication";

export async function requireAuth(request: Request) {
  const user = await getUserSession(request);
  if (!user) {
    throw redirect("/login");
  }
  return user;
}

export async function requireRole(request: Request, allowedRoles: UserRole[]) {
  const user = await requireAuth(request);

  // TODO: For now, we'll use the hardcoded role from the user object
  // In a real app, this would come from your database
  const userRoles = user.roles || [];

  const userHasAllowedRole = userRoles.some((role) =>
    allowedRoles.includes(role),
  );

  if (!userHasAllowedRole) {
    throw redirect("/unauthorized");
  }

  return { ...user, roles: userRoles };
}
