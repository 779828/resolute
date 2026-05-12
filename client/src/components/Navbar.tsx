import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn: boolean;
  userName?: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, userName, onLogout }) => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const navLinkClasses = (path: string) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition-all ${
      location.pathname === path
        ? 'bg-primary text-primary-foreground shadow-sm'
        : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">R</span>
          </div>
          <span className="text-xl font-bold text-foreground">Resolute</span>
        </Link>

        {/* Center Nav Links (only when logged in) */}
        {isLoggedIn && (
          <div className="hidden items-center gap-1 sm:flex">
            <Link to="/students" className={navLinkClasses('/students')}>
              Students
            </Link>
            <Link to="/register" className={navLinkClasses('/register')}>
              Add Student
            </Link>
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                  <span className="text-sm font-semibold text-accent-foreground">
                    {userName?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">{userName}</span>
              </div>
              <button
                onClick={onLogout}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Single toggle button: on /register page show "Sign In", otherwise show "Register" */}
              {location.pathname === '/register' ? (
                <Link
                  to="/login"
                  className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:opacity-90"
                >
                  Sign In
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:opacity-90"
                >
                  Register
                </Link>
              )}
            </>
          )}

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-all hover:bg-secondary"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <svg
              className={`h-[18px] w-[18px] transition-all duration-300 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
              style={{ position: isDark ? 'absolute' : 'relative' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg
              className={`h-[18px] w-[18px] transition-all duration-300 ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}
              style={{ position: isDark ? 'relative' : 'absolute' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          {/* Mobile menu button (logged in only) */}
          {isLoggedIn && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground sm:hidden"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isLoggedIn && mobileMenuOpen && (
        <div className="border-t border-border bg-card px-6 py-3 sm:hidden">
          <div className="flex flex-col gap-2">
            <Link to="/students" onClick={() => setMobileMenuOpen(false)} className={navLinkClasses('/students')}>
              Students
            </Link>
            <Link to="/register" onClick={() => setMobileMenuOpen(false)} className={navLinkClasses('/register')}>
              Add Student
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
