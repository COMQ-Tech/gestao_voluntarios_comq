import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Root route - redireciona baseado na role do usuário
  index("routes/main.tsx"),

  // Public routes
  route("login", "routes/login.tsx"),
  route("logout", "routes/logout.tsx"),
  route("unauthorized", "routes/unauthorized.tsx"),

  // Admin routes
  route("admin", "routes/admin/_admin-layout.tsx", [
    index("routes/admin/dashboard.tsx"),
  ]),

  // Volunteer routes (default protected area)
  route("volunteer", "routes/volunteer/_volunteer-layout.tsx", [
    index("routes/volunteer/dashboard.tsx"),
  ]),
] satisfies RouteConfig;
