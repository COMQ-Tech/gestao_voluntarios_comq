import { LocalDBAuthenticationImpl } from "./libs/local.auth";
import { FirebaseAuthenticationImpl } from "./libs/firebase.auth";

export interface IAuthentication {
  login(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }>;
  logout(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
  getUser(): Promise<{ id: string; email: string } | null>;
  register(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }>;
  resetPassword(email: string): Promise<{ success: boolean; error?: string }>;
}

const currentEnv = process.env.ENV;

export function createAuthenticator() {
  if (currentEnv === "local") {
    console.log("Using LocalDB for authentication");
    return new LocalDBAuthenticationImpl();
  }

  return new FirebaseAuthenticationImpl();
}

export const Authentication = createAuthenticator();
