import type { LoaderFunctionArgs } from "react-router";
import { Outlet, useLoaderData } from "react-router";
import { requireRole } from "@/.server/auth/guards";
import type { User } from "@/.server/repositories/users-repository";
import Sidebar, { type SidebarItem } from "@/components/Sidebar";
import { LayoutDashboard, Clock, FileBadge } from "lucide-react";

export async function loader({ request }: LoaderFunctionArgs) {
  // Requer que o usuário tenha role volunteer
  const user = await requireRole(request, ["volunteer"]);
  return { user };
}

export default function VolunteerLayout() {
  const { user } = useLoaderData<typeof loader>();
  const items: SidebarItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/voluntario/dashboard" },
    { title: "Banco de Horas", icon: Clock, url: "/voluntario/horas" },
    { title: "Certificados", icon: FileBadge, url: "/voluntario/certificados" },
  ];
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar user={user} items={items} />

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
