import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LoggedFooterProps } from "@/utils/interfaces";
import UserDropdownMenu from "./dropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faUser } from "@fortawesome/free-solid-svg-icons";

export default function LoggedFooter({
  userName,
  userType,
}: LoggedFooterProps) {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <FontAwesomeIcon icon={faUser} /> {userName}
                <FontAwesomeIcon icon={faChevronUp} className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <UserDropdownMenu userType={userType} />
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
