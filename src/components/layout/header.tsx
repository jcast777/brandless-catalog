'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useAuth } from '@/contexts/auth-context';
import { useMenu } from '@/hooks/useMenu';
import { Skeleton } from '../ui/skeleton';
import { Menu as MenuComponent } from '../Menu';
import { Menu as MenuIcon, X } from 'lucide-react';
import { Menu as MenuType } from '@/lib/api';

const MenuNavigation = ({ isMobile = false, onItemClick }: { isMobile?: boolean; onItemClick?: () => void }) => {
  const { menus, loading, error } = useMenu('header');
  
  // Default navigation items as fallback
  const defaultMenus: MenuType[] = [
    {
      id: 100,
      name: 'Home',
      slug: '/',
      location: 'header',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: []
    },
    {
      id: 200,
      name: 'Guitars',
      slug: 'guitars',
      location: 'header',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: []
    },
    {
      id: 300,
      name: 'Categories',
      slug: 'categories',
      location: 'header',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: []
    },
    {
      id: 400,
      name: 'Featured',
      slug: 'featured',
      location: 'header',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: []
    }
  ];
  
  // Merge API menus with default menus
  let navMenus: MenuType[] = [...defaultMenus];
  
  if (menus) {
    if (Array.isArray(menus) && menus.length > 0) {
      navMenus = [...defaultMenus, ...menus];
    } else if (!Array.isArray(menus)) {
      navMenus = [...defaultMenus, menus];
    }
  }
  
  if (loading) {
    return (
      <div className={`${isMobile ? 'space-y-2' : 'flex items-center space-x-6'}`}>
        {navMenus?.map((menu: MenuType, index) => (
          <Skeleton key={index} className={`${isMobile ? 'w-full h-10' : 'h-6 w-20'} bg-gray-200`} />
        ))}
      </div>
    );
  }
  
  if (error) {
    console.error('Error loading menu:', error);
  }
  
  return (
    <nav className={isMobile ? 'space-y-1' : 'hidden md:flex items-center space-x-1'}>
      {navMenus.map((menu: MenuType) => (
        <MenuComponent
          key={menu.id}
          menu={menu}
          className={isMobile ? 'w-full' : ''}
          onItemClick={onItemClick}
          isMobile={isMobile}
        />
      ))}
    </nav>
  );
};
export function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false);
    };

    window.addEventListener('routeChangeComplete', handleRouteChange);
    return () => {
      window.removeEventListener('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              🎸 Brandless Theme
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <MenuNavigation />
            
            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user.name}
                </span>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => router.push('/login')}
                  className="text-sm"
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => router.push('/register')}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1 px-4 bg-white border-t border-gray-200">
          <MenuNavigation isMobile onItemClick={() => setMobileMenuOpen(false)} />
          
          <div className="pt-4 pb-2 border-t border-gray-200">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-800">Welcome, {user.name}</div>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline"
                  size="sm" 
                  onClick={() => {
                    router.push('/login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => {
                    router.push('/register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
