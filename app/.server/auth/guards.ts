import { redirect } from "react-router";
import { getUserSession } from "../session";

export type UserRole = "admin" | "volunteer" | "coordinator" | "viewer";

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
  const userRole = (user as any).role || "volunteer";

  if (!allowedRoles.includes(userRole)) {
    throw redirect("/unauthorized");
  }

  return { ...user, role: userRole };
}
