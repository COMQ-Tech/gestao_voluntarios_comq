export function NoteTitle({ title }: { title: string }) {
  return (
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
      {title}
    </h1>
  );
}
