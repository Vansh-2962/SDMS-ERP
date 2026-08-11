import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../store/appStore';
import {
  IconLayoutDashboard,
  IconUsers,
  IconPackage,
  IconShoppingCart,
  IconFileInvoice,
  IconCreditCard,
  IconMapPin,
  IconBuildingWarehouse,
  IconFlask,
  IconChartBar,
  IconChartPie,
  IconUserCheck,
  IconReceipt,
  IconMessageCircle,
  IconSettings,
  IconChevronLeft,
  IconChevronRight,
  IconBuildingStore,
  IconTruckDelivery,
  IconLeaf,
} from '@tabler/icons-react';

const navItems = [
  { label: 'Dashboard', icon: IconLayoutDashboard, path: '/' },
  { label: 'Customers', icon: IconUsers, path: '/customers' },
  { label: 'Products', icon: IconPackage, path: '/products' },
  { label: 'Sales Orders', icon: IconShoppingCart, path: '/orders' },
  { label: 'GST Billing', icon: IconFileInvoice, path: '/billing' },
  { label: 'Payments', icon: IconCreditCard, path: '/payments' },
  { label: 'Salesmen', icon: IconUserCheck, path: '/salesmen' },
  { label: 'GPS Tracking', icon: IconMapPin, path: '/gps' },
  { label: 'Retail Visits', icon: IconBuildingStore, path: '/visits' },
  { label: 'Inventory', icon: IconBuildingWarehouse, path: '/inventory' },
  { label: 'Manufacturing', icon: IconFlask, path: '/manufacturing' },
  { label: 'Dispatch', icon: IconTruckDelivery, path: '/dispatch' },
  { label: 'Ledger', icon: IconBuildingStore, path: '/ledger' },
  { label: 'Employees', icon: IconUserCheck, path: '/employees' },
  { label: 'Expenses', icon: IconReceipt, path: '/expenses' },
  { label: 'Complaints', icon: IconMessageCircle, path: '/complaints' },
  { label: 'Reports', icon: IconChartBar, path: '/reports' },
  { label: 'Analytics', icon: IconChartPie, path: '/analytics' },
  { label: 'Settings', icon: IconSettings, path: '/settings' },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-300 ease-in-out',
        'bg-[hsl(60_10%_8%)] border-r border-[hsl(60_8%_15%)]',
        sidebarCollapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center gap-3 px-4 py-4 border-b border-[hsl(60_8%_15%)]', sidebarCollapsed && 'justify-center px-2')}>
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[hsl(262_83%_65%)] flex items-center justify-center">
          <IconLeaf size={18} className="text-white" />
        </div>
        {!sidebarCollapsed && (
          <div>
            <p className="font-heading font-bold text-white text-sm leading-tight">GoldSpice</p>
            <p className="text-[10px] text-[hsl(82_28%_50%)] leading-tight">S&DMS Platform</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 space-y-0.5 px-2">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
          return (
            <NavLink
              key={path}
              to={path}
              title={sidebarCollapsed ? label : undefined}
              className={cn(
                'flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-150 group',
                sidebarCollapsed ? 'justify-center' : '',
                isActive
                  ? 'bg-[hsl(262_83%_58%)] text-white shadow-sm'
                  : 'text-[hsl(60_6%_70%)] hover:bg-[hsl(60_8%_14%)] hover:text-white'
              )}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!sidebarCollapsed && <span className="truncate">{label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-[hsl(60_8%_15%)]">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-lg text-[hsl(60_6%_60%)] hover:bg-[hsl(60_8%_14%)] hover:text-white transition-colors text-sm"
        >
          {sidebarCollapsed ? <IconChevronRight size={16} /> : (
            <>
              <IconChevronLeft size={16} />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
