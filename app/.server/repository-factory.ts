import { FirebaseRepositoryImpl } from "./libs/firebase";
import { LocalDBRepositoryImpl } from "./libs/localdb";

export interface IRepository<T extends { id: string }> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: T): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<void>;
}

const currentEnv = process.env.ENV;

export type CollectionName = "notes" | "users";

export function createRepository<T extends { id: string }>(
  collection: CollectionName
) {
  if (currentEnv === "local") {
    console.log("Using LocalDB");
    return new LocalDBRepositoryImpl<T>(collection);
  }

  return new FirebaseRepositoryImpl<T>(collection);
}
