import { Outlet } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { cn } from '../../lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div
        className={cn(
          'transition-all duration-300 ease-in-out min-h-screen flex flex-col',
          sidebarCollapsed ? 'ml-16' : 'ml-60'
        )}
      >
        <Header />
        <main className="flex-1 p-4 md:p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
