import "../../styles/navbar.css";
import { DesktopMenu } from "./components/desktopMenu";
import { MobileMenu } from "./components/mobileMenu";
import { UserDropdown } from "./components/userDropdown";

export const Navbar = () => {
  return (
    <div className="flex flex-row md:flex-col items-center justify-around p-2 bg-white w-full ">
      <DesktopMenu />
      <MobileMenu />
      <UserDropdown />
    </div>
  );
};