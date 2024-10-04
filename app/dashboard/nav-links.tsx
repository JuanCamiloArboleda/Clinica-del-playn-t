'use client';
import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
  } from '@heroicons/react/24/outline';
  import Link from 'next/link';
  import { usePathname } from 'next/navigation';
  // Define the links array with proper types
  const links: { name: string; href: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Users', href: '/users', icon: UserGroupIcon },
    { name: 'Documents', href: '/documents', icon: DocumentDuplicateIcon }]
   
  export default function NavLinks() {
    const pathname = usePathname();
    return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </>
    );
  }