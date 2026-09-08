import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  CalendarDays,
  ChevronsLeft,
  ChevronsRight,
  ClipboardList,
  CreditCard,
  FileBarChart,
  FolderOpen,
  LayoutGrid,
  LogOut,
  Settings2,
  Stethoscope,
  Users,
  UserCog,
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CURRENT_USERS, ROLE_LABEL, type Role } from "@/lib/mock-data";
import { useAppState } from "@/lib/app-state";
import { GlobalSearch } from "./global-search";
import { SyncIndicator } from "./sync-indicator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = { to: string; label: string; icon: LucideIcon; roles: Role[]; badge?: string };

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Operations",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutGrid, roles: ["admin", "receptionist", "doctor", "billing"] },
      { to: "/patients", label: "Patients", icon: Users, roles: ["admin", "receptionist", "doctor", "billing"] },
      { to: "/appointments", label: "Appointments", icon: CalendarDays, roles: ["admin", "receptionist", "doctor"], badge: "9" },
      { to: "/visits", label: "Visits & Queue", icon: Activity, roles: ["admin", "receptionist", "doctor", "billing"], badge: "5" },
    ],
  },
  {
    group: "Clinical",
    items: [
      { to: "/clinical", label: "Clinical Records", icon: Stethoscope, roles: ["admin", "doctor"] },
      { to: "/orders", label: "Orders & Investigations", icon: ClipboardList, roles: ["admin", "doctor", "billing"], badge: "3" },
      { to: "/documents", label: "Patient Documents", icon: FolderOpen, roles: ["admin", "doctor", "receptionist", "billing"] },
    ],
  },
  {
    group: "Finance & Insight",
    items: [
      { to: "/billing", label: "Billing & Rates", icon: CreditCard, roles: ["admin", "billing", "receptionist"] },
      { to: "/reports", label: "Reports", icon: FileBarChart, roles: ["admin", "billing", "doctor"] },
    ],
  },
  {
    group: "System",
    items: [
      { to: "/users", label: "Users & Access", icon: UserCog, roles: ["admin"] },
      { to: "/admin", label: "Administration", icon: Settings2, roles: ["admin"] },
    ],
  },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { role, setRole } = useAppState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = CURRENT_USERS[role];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside
        className={cn(
          "sticky top-0 flex h-screen shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200",
          collapsed ? "w-[68px]" : "w-64",
        )}
      >
        <div className="flex h-16 items-center gap-2.5 px-4">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-teal">
            <Activity className="size-5 text-teal-foreground" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-display truncate text-sm font-bold text-white">Atrium Health</p>
              <p className="truncate text-[11px] text-sidebar-foreground/60">Hospital Management</p>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-3">
          {NAV.map((g) => {
            const items = g.items.filter((i) => i.roles.includes(role));
            if (!items.length) return null;
            return (
              <div key={g.group}>
                {!collapsed && (
                  <p className="px-2 pb-1.5 text-[10px] font-semibold tracking-[0.12em] text-sidebar-foreground/45 uppercase">
                    {g.group}
                  </p>
                )}
                <ul className="space-y-0.5">
                  {items.map((item) => {
                    const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                    const Icon = item.icon;
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          title={collapsed ? item.label : undefined}
                          className={cn(
                            "group relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                            active
                              ? "bg-sidebar-accent font-semibold text-white"
                              : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-white",
                          )}
                        >
                          {active && (
                            <span className="absolute top-1.5 bottom-1.5 -left-3 w-1 rounded-r-full bg-teal" />
                          )}
                          <Icon className={cn("size-[18px] shrink-0", active ? "text-teal" : "opacity-80")} />
                          {!collapsed && <span className="truncate">{item.label}</span>}
                          {!collapsed && item.badge && (
                            <span className="num ml-auto rounded-full bg-teal/20 px-1.5 py-0.5 text-[10px] font-semibold text-teal">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-xs text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-white"
          >
            {collapsed ? <ChevronsRight className="size-4" /> : <ChevronsLeft className="size-4" />}
            {!collapsed && "Collapse menu"}
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 px-6 backdrop-blur">
          <GlobalSearch />
          <div className="ml-auto flex items-center gap-3">
            <SyncIndicator />
            <button className="relative grid size-9 place-items-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-muted">
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-danger" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2.5 rounded-md border border-border bg-card py-1.5 pr-3 pl-1.5 text-left transition-colors hover:bg-muted">
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-navy text-xs font-bold text-navy-foreground">
                    {user.initials}
                  </span>
                  <span className="hidden leading-tight sm:block">
                    <span className="block text-xs font-semibold">{user.name}</span>
                    <span className="block text-[11px] text-muted-foreground">{ROLE_LABEL[role]}</span>
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  {user.name} · {user.dept}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-[10px] tracking-wider uppercase">
                  Preview as role
                </DropdownMenuLabel>
                <DropdownMenuRadioGroup value={role} onValueChange={(v) => setRole(v as Role)}>
                  {(Object.keys(ROLE_LABEL) as Role[]).map((r) => (
                    <DropdownMenuRadioItem key={r} value={r} className="text-sm">
                      {ROLE_LABEL[r]}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-sm">
                  <LogOut className="size-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
