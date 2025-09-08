import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { getUserSession } from "@/.server/session";
import type { UserRole } from "@/.server/auth/guards";

export async function loader({ request }: LoaderFunctionArgs) {
  const sessionUser = await getUserSession(request);
  
  // Se o usuário não estiver logado, redirecione para /login
  if (!sessionUser) {
    return redirect("/login");
  }

  // TODO: Por enquanto, estamos usando role hardcoded
  const userRole: UserRole = (sessionUser as any).role || "volunteer";

  // Se o usuário estiver logado e tiver role admin, redirecione para /admin
  if (userRole === "admin") {
    return redirect("/admin");
  }

  // Se o usuário estiver logado e tiver role volunteer, redirecione para /volunteer
  if (userRole === "volunteer") {
    return redirect("/volunteer");
  }

  // Para outros roles (coordinator, viewer), redirecione para volunteer por padrão
  // Você pode ajustar essa lógica conforme necessário
  return redirect("/volunteer");
}

// Este componente nunca será renderizado, pois sempre redirecionamos
export default function Main() {
  return null;
}
