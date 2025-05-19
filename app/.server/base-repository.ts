const useFakeDB = process.env.USE_FAKE_DB === "true";

if (useFakeDB) {
  console.log("Using FakeDB");
}

export interface IRepository<T extends { id: string }> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: T): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<void>;
}

export type CollectionName = "notes" | "users";

type BaseRepositoryClass = new <T extends { id: string }>(
  collectionName: CollectionName
) => IRepository<T>;

async function loadBaseRepositoryClass(): Promise<BaseRepositoryClass> {
  if (useFakeDB) {
    const { FakeDBDataAccessor } = await import("./libs/fake-db-acessor");
    return FakeDBDataAccessor;
  }

  const { FirebaseDataAccessor } = await import("./libs/firebase");
  return FirebaseDataAccessor;
}

export const BaseRepository = await loadBaseRepositoryClass();
