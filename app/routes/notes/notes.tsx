import { ReusableExample } from "~/components/ReusableExample";
import { NoteTitle } from "./components/NoteTitle";

export default function Notes() {
  return (
    <div>
      <NoteTitle title="Notes Page New Title component" />
      <p>This is the notes page.</p>
      <p>Check the console for notes data.</p>

      <ReusableExample />
    </div>
  );
}
