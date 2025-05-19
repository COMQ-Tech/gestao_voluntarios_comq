import data from "../db/db.json";
import type { CollectionName, IRepository } from "../base-repository";

type Data = typeof data;
type FakeDBCollectionName = keyof Data;

export class FakeDBDataAccessor<T extends { id: string }>
  implements IRepository<T>
{
  private collection: T[];

  constructor(collectionName: CollectionName) {
    const DB = data as Data;
    this.collection =
      (DB[collectionName as FakeDBCollectionName] as unknown as T[]) || [];
  }

  async getAll(): Promise<T[]> {
    return this.collection;
  }
  async getById(id: string): Promise<T | null> {
    const item = this.collection.find((item) => item.id === id);
    return item ? ({ ...item } as T) : null;
  }
  async create(data: T): Promise<T> {
    this.collection.push(data);
    return data;
  }
  async update(id: string, data: Partial<T>): Promise<T | null> {
    const index = this.collection.findIndex((item) => item.id === id);
    if (index === -1) return null;
    this.collection[index] = { ...this.collection[index], ...data };
    return this.collection[index];
  }
  async delete(id: string): Promise<void> {
    const index = this.collection.findIndex((item) => item.id === id);
    if (index === -1) return;
    this.collection.splice(index, 1);
  }
}
