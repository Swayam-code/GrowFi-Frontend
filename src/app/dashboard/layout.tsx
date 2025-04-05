'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  
  // Extract the active page from pathname
  const getActivePage = () => {
    const path = pathname.split('/')[1]; // Get the first segment after the slash
    return path || 'dashboard';
  };
  
  const activePage = getActivePage();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activePage={activePage} />
      
      <div className="flex-1 lg:ml-64">
        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 