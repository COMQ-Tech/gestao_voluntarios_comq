import { createCookieSessionStorage, redirect } from "react-router";
import { Authentication } from "./authentication";

// Cookie configuration
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "comq_session",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1, // 1 hour
    path: "/",
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  const userId = session.get("userId");

  if (!userId) return null;

  return await Authentication.getUser();
}

export async function loginWithEmailAndPassword(
  email: string,
  password: string,
) {
  const result = await Authentication.login(email, password);

  if (!result.success) {
    return { error: result.error, email };
  }

  // Get user info after successful login
  const user = await Authentication.getUser();
  if (!user) {
    return { error: "Failed to get user information" };
  }

  // Create session and redirect
  return createUserSession(user.id, "/");
}

export async function logout(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  await Authentication.logout();

  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
