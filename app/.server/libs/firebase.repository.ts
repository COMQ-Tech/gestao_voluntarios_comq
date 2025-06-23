import type { IRepository } from "../base-repository";
import { Firestore } from "./firebase";

export class FirebaseRepositoryImpl<T extends { id: string }>
  implements IRepository<T>
{
  private collection: FirebaseFirestore.CollectionReference<T>;

  constructor(collectionName: string) {
    this.collection = Firestore.collection(
      collectionName
    ) as FirebaseFirestore.CollectionReference<T>;
  }

  async getAll(): Promise<T[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as T));
  }

  async getById(id: string): Promise<T | null> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? ({ id: doc.id, ...doc.data() } as T) : null;
  }

  async create(data: T): Promise<T> {
    const docRef = await this.collection.add(data);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as T;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const docRef = this.collection.doc(id);
    await docRef.update(data);
    const doc = await docRef.get();
    return doc.exists ? ({ id: doc.id, ...doc.data() } as T) : null;
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
