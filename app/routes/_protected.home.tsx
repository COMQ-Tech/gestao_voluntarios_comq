import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useLoaderData, type LoaderFunction } from "react-router";
import {
  NotesRepository,
  type Note,
} from "~/.server/repositories/notes-repository";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader: LoaderFunction = async () => {
  const notes: Note[] = await NotesRepository.getAll();

  return notes;
};

export default function Home() {
  const notes = useLoaderData<Note[]>();
  console.log("Notes from Firestore:", notes);
  return <div>Home</div>;
}
