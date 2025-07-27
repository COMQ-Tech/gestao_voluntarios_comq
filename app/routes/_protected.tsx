import type { LoaderFunctionArgs } from "react-router";
import { Outlet, redirect, useLoaderData } from "react-router";
import { getUserSession } from "@/.server/session";
import { Header } from "@/components/Header";
import type { User } from "@/.server/repositories/users-repository";
export async function loader({ request }: LoaderFunctionArgs) {
  const sessionUser = await getUserSession(request);
  if (!sessionUser) return redirect("/login");

  const user: User = {
    id: sessionUser.id,
    email: sessionUser.email,
    displayName: "Teste",
    photoURL: undefined,
    createdAt: new Date().toISOString(),
    lastLoginAt: undefined,
    role: "volunteer",
  };

  return { user };
}

export default function ProtectedLayout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col h-screen">
      <Header user={user} />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar lateral */}
        <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4 hidden md:block">
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <a href="/home" className="hover:underline">
                Início
              </a>
            </li>
            <li>
              <a href="/notes" className="hover:underline">
                Notas
              </a>
            </li>
            <li>
              <a href="/voluntarios" className="hover:underline">
                Voluntários
              </a>
            </li>
          </ul>
        </aside>
        {/* Conteúdo principal das páginas */}
        <main className="flex-1 p-4 overflow-y-auto dark:text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
