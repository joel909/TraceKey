"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, LogOut } from "lucide-react";


interface NavBarProps {
    userName: string;
    userEmail: string;
}
export default function NavBar({ userName, userEmail }: NavBarProps){
    return (
        <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                    variant="ghost"
                    className="relative h-10 w-auto flex items-center gap-3 text-[#647FBC] hover:bg-white/50"
                    >
                    <span className="font-medium">{userName}</span>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                            <AvatarFallback className="bg-gray-200 text-[#647FBC] font-bold">{(userName ?? "").substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                    className="w-56 bg-white border-2 border-gray-300 shadow-xl" 
                    align="end"
                >
                    <DropdownMenuLabel className="font-normal bg-gray-50">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none text-gray-900">{userName}</p>
                        <p className="text-xs leading-none text-gray-700">{userEmail}</p>
                    </div>
                    </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-300" />
                        <DropdownMenuItem className="text-gray-800 hover:bg-gray-100 font-medium focus:bg-gray-100">
                        <Settings className="mr-2 h-4 w-4 text-gray-700" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-300" />
                    <DropdownMenuItem className="text-gray-800 hover:bg-gray-100 font-medium focus:bg-gray-100">
                        <LogOut className="mr-2 h-4 w-4 text-gray-700" />
                        <span>Log out</span>
                    </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}