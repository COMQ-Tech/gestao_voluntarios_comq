import type { AuthUser, IAuthentication } from "../authentication";

export class LocalDBAuthenticationImpl implements IAuthentication {
  private users: Map<string, { id: string; email: string; password: string }>;

  constructor() {
    this.users = new Map();
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> {
    const user = Array.from(this.users.values()).find(
      (u) => u.email === email && u.password === password,
    );
    if (user) {
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  }

  async logout(): Promise<void> {
    // No-op for local authentication
  }

  async isAuthenticated(): Promise<boolean> {
    // Always returns false as this is a mock implementation
    return false;
  }

  getUser(): AuthUser | null {
    // No user management in this mock implementation
    return null;
  }

  async register(
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> {
    if (this.users.has(email)) {
      return { success: false, error: "User already exists" };
    }
    const id = crypto.randomUUID();
    this.users.set(email, { id, email, password });
    return { success: true };
  }

  async resetPassword(
    email: string,
  ): Promise<{ success: boolean; error?: string }> {
    if (!this.users.has(email)) {
      return { success: false, error: "User not found" };
    }
    // In a real implementation, you would send a reset link or code
    return { success: true };
  }
}
