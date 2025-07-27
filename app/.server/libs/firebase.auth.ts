import {
  getAuth,
  signInWithEmailAndPassword,
  type Auth as FirebaseAuth,
  type AuthError,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getApp } from "firebase/app";
import type { IAuthentication } from "../authentication";
import { FirebaseApplication } from "./firebase";

export class FirebaseAuthenticationImpl implements IAuthentication {
  private auth: FirebaseAuth;

  constructor() {
    this.auth = getAuth(FirebaseApplication);
  }

  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      console.log("login success", response);
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

  async getUser(): Promise<{ id: string; email: string } | null> {
    const user = this.auth.currentUser;
    return user ? { id: user.uid, email: user.email || "" } : null;
  }

  async register(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      return { success: true };
    } catch (error: unknown | AuthError) {
      return { success: false, error: (error as AuthError).message };
    }
  }

  async resetPassword(
    email: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return { success: true };
    } catch (error: unknown | AuthError) {
      return { success: false, error: (error as AuthError).message };
    }
  }
}
