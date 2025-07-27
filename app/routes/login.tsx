import { Form, redirect, useActionData, useNavigation } from "react-router";
import { getUserSession, loginWithEmailAndPassword } from "@/.server/session";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - COMQ Voluntários" },
    {
      name: "description",
      content: "Faça login no sistema de gestão de voluntários da COMQ",
    },
  ];
}

// Redirect if already logged in
export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUserSession(request);

  if (user) {
    console.log("user already logged in, redirecting to /");
    return redirect("/");
  }

  return { user: null };
}

// Handle login form submission
export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    return await loginWithEmailAndPassword(email, password);
  } catch (error) {
    return { error: "Erro ao fazer login" };
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl md:max-w-3x">
        <div className={"flex flex-col gap-6"}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <Form method="post" className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">
                      Sistema de Gestão de Voluntários
                    </h1>
                    <p className="text-muted-foreground text-balance">
                      Faça login na sua conta
                    </p>
                  </div>
                  {actionData?.error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md text-sm">
                      {actionData.error}
                    </div>
                  )}
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Senha</Label>
                      {/* TODO: implementar link para recuperação de senha */}
                      {/* <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                    </div>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      minLength={6}
                      maxLength={64}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      A senha deve ter pelo menos 6 caracteres
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processando...
                      </div>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </div>
              </Form>
              <div className="bg-muted relative hidden md:block">
                <img
                  src="/logo-bg-login.png"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            Construído com ❤️ para a COMQ
          </div>
        </div>
      </div>
    </div>
  );
}
