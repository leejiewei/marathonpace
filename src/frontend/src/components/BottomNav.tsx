import { Link, useRouterState } from "@tanstack/react-router";
import { History, Home } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, ocid: "nav.home_link" },
  { to: "/history", label: "History", icon: History, ocid: "nav.history_link" },
] as const;

export function BottomNav() {
  const { location } = useRouterState();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex bg-card border-t border-border"
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map(({ to, label, icon: Icon, ocid }) => {
        const isActive =
          to === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            data-ocid={ocid}
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs font-semibold uppercase tracking-widest transition-smooth ${
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon
              size={22}
              className={isActive ? "text-primary" : ""}
              strokeWidth={isActive ? 2.5 : 1.5}
            />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
