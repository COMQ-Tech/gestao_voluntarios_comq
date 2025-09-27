import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { User, ChevronDown, UserCog, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSubmit } from "react-router";

export type SidebarItem = {
  title: string;
  icon: React.ElementType;
  url: string;
};

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar: FC<SidebarProps> = ({ items }) => {
  const submit = useSubmit();

  const handleLogout = () => {
    submit(null, { action: "/logout", method: "post" });
  };

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4 hidden md:block">
      <div className="space-y-6">
        {/* Cabeçalho da Sidebar */}
        <div className="flex items-center space-x-4 pl-0">
          {/* Foto de perfil */}
          <div className="w-12 h-12 rounded-full bg-gray-400 dark:bg-gray-600 flex-shrink-0">
            <img
              src="https://example.com/photo.jpg"
              alt="Foto do usuário"
              className="w-full h-full rounded-full"
            />
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300">
            <p className="font-semibold">Bruna Silva</p>
            <p className="text-xs">test@mail.com</p>
          </div>
        </div>
        {/* Menu de navegação*/}
        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 pl-0">
          {items.map((item) => (
            <li key={item.title} className="w-full">
              <Button
                variant="link"
                className="w-full justify-start hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer pl-0 pr-4 py-2"
              >
                <item.icon className="mr-3 ml-1" />
                {item.title}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Rodapé da Sidebar */}
      <div className="mt-6 pl-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              className="w-full justify-start hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer pl-0 pr-4 py-2"
            >
              <User className="mr-3 ml-1" />
              Perfil
              <ChevronDown className="ml-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 ml-2" align="start">
            <DropdownMenuItem className="cursor-pointer">
              <UserCog className="mr-2 h-4 w-4" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export default Sidebar;
