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
		{ title: "Dashboard", icon: LayoutDashboard, url: "/admin" },
		{ title: "Voluntários", icon: Users, url: "/volunteer" },
		{ title: "Usuários", icon: Users, url: "/admin/users" },
	];
	return (
		<div className="flex h-screen bg-background">
			{/* Sidebar */}
			<Sidebar user={{ ...user, displayName: "Admin" }} items={items} />

			<Outlet />
		</div>
	);
}
