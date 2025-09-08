import type { LoaderFunctionArgs } from "react-router";
import { Outlet, useLoaderData } from "react-router";
import { requireRole } from "@/.server/auth/guards";
import type { User } from "@/.server/repositories/users-repository";

import Sidebar from "@/components/ui/sidebar";

export async function loader({ request }: LoaderFunctionArgs) {
  // Requer que o usuário tenha role volunteer, coordinator ou viewer
  const sessionUser = await requireRole(request, ["volunteer", "coordinator", "viewer"]);
  
  const user: User = {
    id: sessionUser.id,
    email: sessionUser.email,
    displayName: "Usuário Voluntário", // TODO: Pegar do banco de dados
    photoURL: undefined,
    createdAt: new Date().toISOString(),
    lastLoginAt: undefined,
    role: sessionUser.role,
  };

  return { user };
}

export default function VolunteerLayout() {
  const { user } = useLoaderData<typeof loader>();
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 border-b border-muted">
          <h1 className="text-lg font-semibold">Área do Voluntário</h1>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
