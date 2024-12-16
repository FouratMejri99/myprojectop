import { AvatarMenu } from "./AvatarMenu";
import { ModeToggle } from "./ModeToggle";
import NotificationMenu from "./NotificationMenu";
import SheetNav from "./SheetNav";

const Topbar = () => {
  return (
    <nav className="h-16 flex items-center px-5 shadow-lg dark:shadow-border/10">
      {/* Hamburger menu for smaller screens */}
      <div className="xl:hidden">
        <SheetNav />
      </div>

      {/* Right-aligned menu options */}
      <div className="ml-auto flex items-center space-x-5">
        {/* Dark mode toggle */}
        <ModeToggle />

        {/* Notifications */}
        <NotificationMenu />

        {/* User avatar dropdown */}
        <AvatarMenu />
      </div>
    </nav>
  );
};

export default Topbar;
