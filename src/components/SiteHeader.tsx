import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { NAV_LINKS } from '@/data/content';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-settle ${
        scrolled || menuOpen
          ? 'border-b border-ivory-300/70 bg-ivory-100/95 shadow-sm shadow-forest-900/5 backdrop-blur-md'
          : 'border-b border-transparent bg-ivory-100/0'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-800 transition-colors duration-300 hover:text-terracotta-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#get-involved" className="btn-primary hidden !min-h-[44px] !px-5 !py-2.5 text-sm sm:inline-flex">
            Get involved
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-forest-700/20 text-forest-700 transition-colors duration-300 hover:bg-forest-700 hover:text-ivory-100 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-ivory-300/70 bg-ivory-100 px-5 pb-8 pt-4 shadow-lg shadow-forest-900/10 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="border-b border-ivory-300/80 py-4 font-serif text-2xl text-forest-700"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#get-involved" onClick={closeMenu} className="btn-primary mt-6 w-full">
          Get involved
        </a>
      </div>
    </header>
  );
}
