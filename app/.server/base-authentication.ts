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

type AuthenticationConstructor = new () => IAuthentication;
async function loadAuthenticationClass(): Promise<AuthenticationConstructor> {
  const currentEnv = process.env.ENV;

  if (currentEnv === "local") {
    console.log("Using LocalDB for authentication");
    const { LocalDBAuthenticationImpl } = await import("./libs/local.auth");
    return LocalDBAuthenticationImpl;
  }

  const { FirebaseAuthenticationImpl } = await import("./libs/firebase.auth");
  return FirebaseAuthenticationImpl;
}
export const Authentication = await loadAuthenticationClass();

export const authentication = new Authentication();
