"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Building,
  Bus,
  ClipboardList,
  FileCheck,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Phone,
  School,
  UserCircle,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

const iconMap = {
  LayoutDashboard,
  GraduationCap,
  School,
  BookOpen,
  ClipboardList,
  FileCheck,
  UserCircle,
  Bus,
  Building,
  Phone,
};

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-primary text-primary-foreground shadow-sm">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-secondary lg:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent font-bold text-accent-foreground">
            VIT
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider opacity-80">
              VIT Chennai
            </p>
            <h1 className="text-lg font-semibold leading-tight">Freshers Portal</h1>
          </div>
        </div>

        <div className="ml-auto hidden text-right text-sm md:block">
          <p className="font-medium">Academic Year 2026–27</p>
          <p className="text-xs opacity-80">Student Onboarding Information</p>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  label,
  icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: keyof typeof iconMap;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const Icon = iconMap[icon];
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-primary-foreground/80 hover:bg-secondary hover:text-primary-foreground"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 bg-primary lg:block">
      <nav className="flex flex-col gap-1 p-4">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
    </aside>
  );
}

export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <aside className="absolute left-0 top-0 h-full w-72 bg-primary shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <span className="font-semibold text-primary-foreground">Menu</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-secondary"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} {...item} onClick={onClose} />
          ))}
        </nav>
      </aside>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
