import { createRepository } from "../repository-factory";

export type Note = {
  id: string;
  title: string;
  content: string;
};
export type NoteCreate = Omit<Note, "id">;
export type NoteUpdate = Partial<Note>;
export type NoteDelete = Pick<Note, "id">;

export const NotesRepository = createRepository<Note>("notes");
