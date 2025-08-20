'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smart active state detection
  const isActiveRoute = (itemPath) => {
    if (itemPath === '/') {
      return pathname === '/';
    }
    // Check if current path starts with the nav item path
    return pathname.startsWith(itemPath);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Characters', path: '/characters' },
    { name: 'Episodes', path: '/episodes' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'glass border-b border-white/20 shadow-2xl' 
        : 'glass-dark border-b border-white/10 shadow-lg'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="group relative"
          >
            <span className="text-4xl font-bold font-display text-sci-fi-animated hover:scale-110 transition-all duration-300">
              RICK & MORTY
            </span>
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
          </Link>
          
          <div className="flex space-x-3">
            {navItems.map((item, index) => (
              <Link key={item.name} href={item.path}>
                <Button 
                  variant={isActiveRoute(item.path) ? "default" : "ghost"}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 animate-slideInRight text-lg px-6 py-3 font-medium ${
                    isActiveRoute(item.path)
                      ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg border-0' 
                      : 'glass-dark border-2 border-white/20 text-white hover:bg-white/10 hover:border-emerald-400/50'
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <span className="relative z-10 font-body">
                    {item.name}
                  </span>
                  {isActiveRoute(item.path) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 animate-pulse opacity-20"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-20"></div>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
