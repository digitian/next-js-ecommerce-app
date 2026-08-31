import { DesktopMegaMenu } from "./desktop-mega-menu";

export function BottomNavigationBar() {
  return (
    <div className="hidden lg:block w-full border-b border-border bg-background py-2">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <DesktopMegaMenu />
      </div>
    </div>
  );
}
