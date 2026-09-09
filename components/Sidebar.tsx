"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mic,
  Clock,
  Sparkles,
  BookOpen,
  Zap,
  Palette,
  Languages,
  Wand2,
  User,
  Settings as SettingsIcon,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  locked?: { progress: number; target: number };
};

type NavGroup = {
  title?: string;
  items: NavItem[];
};

const groups: NavGroup[] = [
  {
    items: [
      { href: "/", label: "record", icon: Mic },
      { href: "/history", label: "history", icon: Clock },
      {
        href: "/pattern",
        label: "pattern",
        icon: Sparkles,
        locked: { progress: 1240, target: 5000 },
      },
    ],
  },
  {
    title: "your space",
    items: [
      { href: "/dictionary", label: "dictionary", icon: BookOpen },
      { href: "/shortcuts", label: "shortcuts", icon: Zap },
      { href: "/styles", label: "styles", icon: Palette },
      { href: "/translate", label: "translate", icon: Languages },
      { href: "/improv", label: "improv", icon: Wand2 },
    ],
  },
];

const bottomItems: NavItem[] = [
  { href: "/profile", label: "profile", icon: User },
  { href: "/settings", label: "settings", icon: SettingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside
      className="flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Logo */}
      <div className="px-6 pt-7 pb-6">
        <Link href="/" className="inline-flex items-baseline gap-2">
          <span
            className="text-3xl leading-none"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
          >
            kivi
          </span>
          <span
            className="text-[11px] tracking-wider uppercase"
            style={{ color: "var(--color-ink-muted)" }}
          >
            by sarvam
          </span>
        </Link>
      </div>

      {/* Navigation groups */}
      <nav className="flex-1 px-3 overflow-y-auto">
        {groups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-6" : ""}>
            {group.title && (
              <div
                className="px-3 pb-2 text-[11px] tracking-wider"
                style={{ color: "var(--color-ink-faint)" }}
              >
                {group.title}
              </div>
            )}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <NavLink item={item} active={isActive(item.href)} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom account items */}
      <div
        className="px-3 py-3 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <ul className="flex flex-col gap-0.5">
          {bottomItems.map((item) => (
            <li key={item.href}>
              <NavLink item={item} active={isActive(item.href)} />
            </li>
          ))}
        </ul>
        <div className="mt-3 px-3 flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0"
            style={{
              backgroundColor: "var(--color-green)",
              color: "var(--color-cream)",
              fontWeight: 500,
            }}
          >
            P
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm truncate">Priyadarshi</div>
            <div
              className="text-[11px] truncate"
              style={{ color: "var(--color-ink-muted)" }}
            >
              me23b084...tm.ac.in
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  const isLocked = !!item.locked;
  const progressPct = isLocked
    ? Math.min(100, Math.round((item.locked!.progress / item.locked!.target) * 100))
    : 0;

  return (
    <Link
      href={item.href}
      className="group flex flex-col gap-1 px-3 py-2 rounded-md transition-colors"
      style={{
        backgroundColor: active ? "var(--color-green-light)" : "transparent",
        color: active ? "var(--color-green-deep)" : "var(--color-ink)",
      }}
    >
      <div className="flex items-center gap-3">
        <Icon
          size={16}
          strokeWidth={active ? 2.2 : 1.8}
          className="shrink-0"
        />
        <span
          className="text-sm"
          style={{ fontWeight: active ? 500 : 400 }}
        >
          {item.label}
        </span>
        {isLocked && (
          <span
            className="ml-auto text-[10px] tracking-wide"
            style={{ color: "var(--color-ink-faint)" }}
          >
            {progressPct}%
          </span>
        )}
      </div>
      {isLocked && (
        <div
          className="h-[3px] rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--color-border)" }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progressPct}%`,
              backgroundColor: "var(--color-green)",
            }}
          />
        </div>
      )}
    </Link>
  );
}
