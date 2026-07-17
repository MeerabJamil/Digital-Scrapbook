import { NavLink, useNavigate } from "react-router-dom";
import { Home, BookOpen, Sparkles, BarChart3, Bell, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const LINKS = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/albums", label: "Albums", icon: BookOpen },
  { to: "/ai-reflection", label: "AI Journal", icon: Sparkles },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/notifications", label: "Notices", icon: Bell },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-sm border-b-2 border-dashed border-cocoa/15">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <NavLink to="/dashboard" className="font-hand text-3xl text-cocoa-deep flex items-center gap-1.5">
          <span>📔</span> Petal & Page
        </NavLink>

        <ul className="hidden md:flex items-center gap-1">
          {LINKS.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 font-tape text-base px-3.5 py-1.5 rounded-full transition-colors ${
                    isActive ? "bg-blush text-cocoa-deep" : "text-cocoa/70 hover:bg-sand"
                  }`
                }
              >
                <Icon size={16} /> {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <NavLink
            to="/settings"
            className="btn-squish w-9 h-9 rounded-full bg-sand flex items-center justify-center text-cocoa/70 hover:text-cocoa"
            aria-label="Settings"
          >
            <Settings size={17} />
          </NavLink>
          <NavLink
            to="/profile"
            className="btn-squish w-10 h-10 rounded-full bg-lavender flex items-center justify-center text-xl shadow-[var(--shadow-paper)]"
            title={user?.name}
          >
            {user?.name ? user.name[0].toUpperCase() : "🦊"}
          </NavLink>
          <button
            onClick={handleLogout}
            aria-label="Log out"
            className="btn-squish w-9 h-9 rounded-full bg-sand flex items-center justify-center text-cocoa/70 hover:text-terracotta"
          >
            <LogOut size={16} />
          </button>
        </div>
      </nav>

      {/* mobile tab bar */}
      <ul className="flex md:hidden justify-around border-t border-cocoa/10 bg-cream-deep py-1.5">
        {LINKS.map(({ to, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center text-[10px] font-tape px-2 py-1 rounded-lg ${
                  isActive ? "text-terracotta" : "text-cocoa/60"
                }`
              }
            >
              <Icon size={18} />
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
}
