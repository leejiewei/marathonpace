import { Outlet } from "@tanstack/react-router";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  hideNav?: boolean;
}

export function Layout({ hideNav = false }: LayoutProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <main className={`flex-1 ${hideNav ? "" : "pb-16"}`}>
        <Outlet />
      </main>
      {!hideNav && <BottomNav />}
      <footer className="border-t border-border bg-card px-4 py-3 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors duration-200"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
