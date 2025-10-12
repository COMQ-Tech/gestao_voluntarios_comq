import { LocalDBAuthenticationImpl } from "./libs/local.auth";
import { FirebaseAuthenticationImpl } from "./libs/firebase.auth";
import type { UserRole } from "@/types/user";



export type AuthUser = {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt?: string;
  roles?: UserRole[];
};

export interface IAuthentication {
  login(
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }>;
  logout(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
  getUser(): AuthUser | null;
  register(
    email: string,
    password: string,
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
