import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";

export function AvatarMenu() {
  const handleLogout = async () => {
    try {
      console.log("Attempting to log out...");  // Debugging log
      await signOut(auth);  // Sign out the user
      console.log("Successfully logged out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border hover:shadow-lg">
          <AvatarImage src="/images/Logo Tinker f.svg" alt="avatar" />
          <AvatarFallback className="text-center">Tnker</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 me-5">
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
