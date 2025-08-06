'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Characters', path: '/characters' },
    { name: 'Episodes', path: '/episodes' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
          >
            Rick & Morty
          </Link>
          
          <div className="flex space-x-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <Button 
                  variant={pathname === item.path ? "default" : "ghost"}
                  className={`relative transition-all duration-200 ${
                    pathname === item.path 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                  {pathname === item.path && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></span>
                  )}
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