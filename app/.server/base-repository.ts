export interface IRepository<T extends { id: string }> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: T): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<void>;
}

const currentEnv = process.env.ENV;

export type CollectionName = "notes" | "users";

type BaseRepositoryClass = new <T extends { id: string }>(
  collectionName: CollectionName
) => IRepository<T>;

async function loadBaseRepositoryClass(): Promise<BaseRepositoryClass> {
  if (currentEnv === "local") {
    console.log("Using LocalDB");
    const { LocalDBRepositoryImpl } = await import("./libs/localdb");
    return LocalDBRepositoryImpl;
  }

  const { FirebaseRepositoryImpl } = await import("./libs/firebase.repository");
  return FirebaseRepositoryImpl;
}

export const BaseRepository = await loadBaseRepositoryClass();
