import React, { useEffect, useState } from "react";
import { Form } from "react-router";
import { UserDropdown } from "./Dropdown";

interface HeaderProps {
  user: {
    email?: string;
    displayName?: string;
    role?: string;
  } | null;
}

export const Header = ({ user }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (
      savedMode === "true" ||
      (!savedMode && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
      setIsDarkMode(true);
    }
  };

  if (!user) return null;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <img src={isDarkMode ? "/logo-dark.png" : "/logo-full.png"} alt="Logo COMQ" className="h-10 w-auto cursor-pointer" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              COMQ - Gestão de Voluntários
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              aria-label="Alternar modo escuro"
              className="p-2 cursor-pointer rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              title={isDarkMode ? "Desativar modo escuro" : "Ativar modo escuro"}
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m8.66-11h-1M4.34 12h-1m14.14 5.66l-.71-.71M6.34 6.34l-.71-.71m14.14 14.14l-.71-.71M6.34 17.66l-.71-.71M12 5a7 7 0 100 14 7 7 0 000-14z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                  />
                </svg>
              )}
            </button>

            {/* <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user.displayName || user.email}
                </span>
                {user.role && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {user.role}
                  </span>
                )}
              </div>

            </div> */}
            <UserDropdown user={user}/>
            <Form method="post" action="/logout">
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sair
              </button>
            </Form>
          </div>
        </div>
      </div>
    </header>
  );
};
