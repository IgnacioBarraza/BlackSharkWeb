import "../../styles/navbar.css";
import { DesktopMenu } from "./components/desktopMenu";
import { MobileMenu } from "./components/mobileMenu";
import { UserDropdown } from "./components/userDropdown";

export const Navbar = () => {
  return (
    <div className="flex flex-row md:flex-col items-center justify-around w-full bg-[#10243c]">
      <DesktopMenu />
      <UserDropdown />
      <MobileMenu />
    </div>
  );
};