import type { LoaderFunctionArgs } from "react-router";
import { Outlet, redirect, useLoaderData } from "react-router";
import { getUserSession } from "@/.server/session";

import type { User } from "@/.server/repositories/users-repository";

import Sidebar from "@/components/ui/sidebar";

export async function loader({ request }: LoaderFunctionArgs) {
  const sessionUser = await getUserSession(request);
  if (!sessionUser) return redirect("/login");

  const user: User = {
    id: sessionUser.id,
    email: sessionUser.email,
    displayName: "Bruna Silva",
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
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 border-b border-muted">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
