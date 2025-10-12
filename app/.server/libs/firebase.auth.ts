import {
  getAuth,
  signInWithEmailAndPassword,
  type Auth as FirebaseAuth,
  type AuthError,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import type { AuthUser, IAuthentication } from "../authentication";
import { FirebaseApplication } from "./firebase";
import type { UserRole } from "@/types/user";

export class FirebaseAuthenticationImpl implements IAuthentication {
  private auth: FirebaseAuth;
  private currentUser: AuthUser | null = null;

  constructor() {
    this.auth = getAuth(FirebaseApplication);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await signInWithEmailAndPassword(
        this.auth,
        email,
        password,
      );

      const user = this.auth.currentUser;

      console.log("=== current user === ", user?.uid);

      if (!user) {
        throw new Error("User not found");
      }

      // Get the ID token to access custom claims
      const idTokenResult = await user.getIdTokenResult();

      console.log("=== idTokenResult === ", idTokenResult);

      this.currentUser = {
        id: response.user.uid,
        email: response.user.email || "",
        emailVerified: response.user.emailVerified,
        createdAt: response.user.metadata.creationTime || "",
        lastLoginAt: response.user.metadata.lastSignInTime || "",
        roles: (idTokenResult.claims.roles as UserRole[]) || [],
      };

      console.log("login success", response.user.uid);
      return { success: true };
    } catch (error: unknown | AuthError) {
      console.error("Login error:", error);

      if ((error as AuthError)?.code === "auth/invalid-credential") {
        return { success: false, error: "Email ou senha inválidos" };
      }

      return { success: false, error: "Erro ao processar login" };
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async isAuthenticated(): Promise<boolean> {
    return !!this.auth.currentUser;
  }

  getUser(): AuthUser | null {
    return this.currentUser;
  }

  async register(
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      return { success: true };
    } catch (error: unknown | AuthError) {
      return { success: false, error: (error as AuthError).message };
    }
  }

  async resetPassword(
    email: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return { success: true };
    } catch (error: unknown | AuthError) {
      return { success: false, error: (error as AuthError).message };
    }
  }
}
