import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu as MenuType } from '@/lib/api';

interface MenuProps {
  menu: MenuType;
  className?: string;
  onItemClick?: () => void;
  isMobile?: boolean;
}

export function Menu({ menu, className = '', onItemClick, isMobile = false }: MenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const hasItems = menu.items && menu.items.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    if (hasItems) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
    if (onItemClick) onItemClick();
  };

  // If the menu has items, we'll use the first item's URL as the main link
  const mainItem = hasItems ? menu.items[0] : null;
  const isActive = mainItem ? pathname === mainItem.url || pathname.startsWith(`${mainItem.url}/`) : false;

  return (
    <div className={`relative group ${className}`}>
      <Link
        href={menu.slug || '#'}
        target={mainItem?.target || '_self'}
        onClick={handleClick}
        className={`flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'text-blue-600 bg-blue-50 font-semibold'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <span>{menu.name}</span>
        {hasItems && (
          <svg
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </Link>

      {hasItems && (
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } mt-1 space-y-1 pl-4 md:absolute md:left-0 md:mt-0 md:pl-0 md:shadow-lg md:rounded-md md:bg-white md:ring-1 md:ring-black md:ring-opacity-5 py-1 min-w-[200px] z-10`}
        >
          {menu.items.map((item, index) => (
            <Link
              key={index}
              href={item.url || '#'}
              target={item.target || '_self'}
              onClick={onItemClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
