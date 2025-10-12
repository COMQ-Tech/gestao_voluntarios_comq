export const USER_ROLES = ["admin", "volunteer", "leader"] as const;

export type UserRole = (typeof USER_ROLES)[number];