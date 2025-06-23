import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("login", "routes/login.tsx"),
  route("logout", "routes/logout.tsx"),
  route("", "routes/_protected.tsx", [
    index("routes/_protected.home.tsx"),
    // exemplo: route("voluntarios", "routes/_protected.voluntarios.tsx")
  ]),
] satisfies RouteConfig;
