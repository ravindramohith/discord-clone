"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole, Server } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

const ServerHeader = (props: {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}) => {
  const { server, role } = props;
  const { onOpen } = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {(role === MemberRole.ADMIN || role === MemberRole.MODERATOR) && (
          <DropdownMenuItem
            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
            onClick={() => onOpen("invite", { server: server })}
          >
            Invite People
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {role === MemberRole.ADMIN && (
          <>
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
              Server Settings
              <Settings className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
              Manage Members
              <Users className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          </>
        )}
        {(role === MemberRole.ADMIN || role === MemberRole.MODERATOR) && (
          <>
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
              Create Channel
              <PlusCircle className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuSeparator></DropdownMenuSeparator>
          </>
        )}
        {role === MemberRole.ADMIN && (
          <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
            Delete Server
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {role !== MemberRole.ADMIN && (
          <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
            Leave Channel
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
