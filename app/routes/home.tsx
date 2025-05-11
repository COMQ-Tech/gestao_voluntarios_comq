import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useLoaderData, type LoaderFunction } from "react-router";
import { firestore } from "~/libs/firebase.server";

type Note = {
  id: string;
  title: string;
  content: string;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader: LoaderFunction = async () => {
  const snapshot = await firestore.collection("notes").get();
  const notes: Note[] = snapshot.docs.map(
    (doc: { id: string; data: () => {} }) => ({
      id: doc.id,
      ...(doc.data() as Omit<Note, "id">),
    })
  );

  return notes;
};

export default function Home() {
  const notes = useLoaderData<Note[]>();
  console.log("Notes from Firestore:", notes);
  return <Welcome />;
}
