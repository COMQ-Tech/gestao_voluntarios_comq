import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { firestore } from "~/lib/firebase.server";

type Note = {
  id: string;
  title: string;
  content: string;
};

export const loader: LoaderFunction = async () => {
  const snapshot = await firestore.collection("notes").get();
  const notes: Note[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Note, "id">),
  }));

  return notes;
};

export default function Notes() {
  const notes = useLoaderData<Note[]>();

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <strong>{note.title}</strong>: {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
