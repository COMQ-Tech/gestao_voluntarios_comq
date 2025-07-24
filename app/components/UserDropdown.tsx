import { useState } from "react";
import { Form } from "react-router";
import type { User } from "~/.server/repositories/users-repository";
interface UserDropdownProps {
  user: User;
}
export function UserDropdown({ user }: UserDropdownProps) {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center focus:outline-none cursor-pointer"
      >
        <span className="text-white text-sm font-medium">
          {user.email?.charAt(0).toUpperCase()}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 ring-1 ring-black ring-opacity-5 z-50">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.displayName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Profile
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Settings
          </a>
        </div>
      )}
    </div>
  );
}
