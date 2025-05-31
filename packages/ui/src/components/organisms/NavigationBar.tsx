import React from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

export interface NavigationItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
}

export interface NavigationBarProps {
  onNavigate?: (href: string) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ onNavigate }) => {
  const navigationItems: NavigationItem[] = [
    {
      label: 'Home',
      icon: <HomeIcon className="h-6 w-6" />,
      href: '/',
    },
    {
      label: 'Communities',
      icon: <UserGroupIcon className="h-6 w-6" />,
      href: '/communities',
    },
    {
      label: 'Messages',
      icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
      href: '/messages',
    },
    {
      label: 'Notifications',
      icon: <BellIcon className="h-6 w-6" />,
      href: '/notifications',
    },
    {
      label: 'Profile',
      icon: <UserCircleIcon className="h-6 w-6" />,
      href: '/profile',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white px-4 py-2 md:relative md:border-t-0">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        {navigationItems.map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center space-y-1 p-2 text-sm ${
              item.isActive
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => onNavigate?.(item.href)}
          >
            {item.icon}
            <span className="hidden md:inline">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}; 