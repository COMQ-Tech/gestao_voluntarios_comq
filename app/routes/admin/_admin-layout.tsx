import type { LoaderFunctionArgs } from "react-router";
import { Outlet, useLoaderData, NavLink } from "react-router";
import { requireRole } from "@/.server/auth/guards";
import Sidebar from "@/components/Sidebar";
import { LayoutDashboard, Users } from "lucide-react";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireRole(request, ["admin"]);
  return { user };
}

export default function AdminLayout() {
  const { user } = useLoaderData<typeof loader>();

  // TODO: Futuramente vamos passar os itens para o sidebar
  const items = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
    { title: "Voluntários", icon: Users, url: "/volunteer" },
    { title: "Usuários", icon: Users, url: "/users" },
  ];
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar user={{ ...user, displayName: "Admin" }} items={items} />

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
