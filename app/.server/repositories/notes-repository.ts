import { BaseRepository } from "../base-repository";

export type Note = {
  id: string;
  title: string;
  content: string;
};
export type NoteCreate = Omit<Note, "id">;
export type NoteUpdate = Partial<Note>;
export type NoteDelete = Pick<Note, "id">;

// Abaixo, a classe BaseRepository é instanciada com o nome da coleção
// e o tipo de dado que ela irá manipular.
// Isso deve ser feito pra cada coleção que você deseja consumir ou manipular.
export const NotesRepository = new BaseRepository<Note>("notes");
