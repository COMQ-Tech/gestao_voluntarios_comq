import { createRepository } from "../repository-factory";

export type User = {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: string;
  lastLoginAt?: string;
  role?: "admin" | "volunteer" | "leader";
};

export type UserCreate = Omit<User, "id" | "createdAt">;
export type UserUpdate = Partial<Omit<User, "id">>;

// Repository for managing user data in the database
// This is separate from Firebase Auth - it stores additional user profile information
export const UsersRepository = createRepository<User>("users");
