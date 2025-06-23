import { createCookieSessionStorage, redirect } from "react-router";
import { authentication } from "./base-authentication";

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

export async function getUser(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");

  if (!userId) return null;

  return await authentication.getUser();
}

export async function loginWithEmailAndPassword(
  email: string,
  password: string
) {
  const result = await authentication.login(email, password);

  if (!result.success) {
    return { error: result.error, email };
  }

  // Get user info after successful login
  const user = await authentication.getUser();
  if (!user) {
    return { error: "Failed to get user information" };
  }

  // Create session and redirect
  return createUserSession(user.id, "/");
}

export async function logout(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  await authentication.logout();

  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
