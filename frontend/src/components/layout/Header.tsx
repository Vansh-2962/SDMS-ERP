import { useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { Badge } from '../ui/badge';
import {
  IconBell,
  IconSearch,
  IconMenu2,
  IconAlertTriangle,
} from '@tabler/icons-react';

const routeTitles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: 'Overview of your business today' },
  '/customers': { title: 'Customer Master', subtitle: 'Manage distributors, retailers & wholesalers' },
  '/products': { title: 'Product Master', subtitle: 'Products, pricing & stock details' },
  '/orders': { title: 'Sales Orders', subtitle: 'Create and track sales orders' },
  '/billing': { title: 'GST Billing', subtitle: 'Invoices, challans & GST documents' },
  '/payments': { title: 'Payment Collection', subtitle: 'Track collections and outstanding dues' },
  '/salesmen': { title: 'Salesman Module', subtitle: 'Manage field sales team' },
  '/gps': { title: 'GPS Tracking', subtitle: 'Live location of sales team' },
  '/visits': { title: 'Retail Visit Reports', subtitle: 'Daily visit logs and order booking' },
  '/inventory': { title: 'Inventory Management', subtitle: 'Raw materials, packaging & finished goods' },
  '/manufacturing': { title: 'Manufacturing', subtitle: 'Production batches and batch tracking' },
  '/dispatch': { title: 'Dispatch Management', subtitle: 'Track dispatches and deliveries' },
  '/employees': { title: 'Employee Management', subtitle: 'HR, attendance, salary & documents' },
  '/expenses': { title: 'Expense Module', subtitle: 'Track all business expenses' },
  '/complaints': { title: 'Complaints', subtitle: 'Customer complaints and resolutions' },
  '/reports': { title: 'Reports', subtitle: 'Sales, collection, GST & stock reports' },
  '/analytics': { title: 'Analytics', subtitle: 'Business intelligence and trends' },
  '/settings': { title: 'Settings & Admin', subtitle: 'User roles, permissions and configuration' },
};

export default function Header() {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const location = useLocation();

  const pathKey = Object.keys(routeTitles).find(
    (k) => k !== '/' && location.pathname.startsWith(k)
  ) || location.pathname;

  const { title, subtitle } = routeTitles[pathKey] || routeTitles['/'];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-background/95 backdrop-blur border-b border-border">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-1.5 rounded-md hover:bg-muted transition-colors"
        >
          <IconMenu2 size={20} className="text-muted-foreground" />
        </button>
        <div>
          <h1 className="font-heading font-semibold text-base text-foreground leading-tight">{title}</h1>
          <p className="text-xs text-muted-foreground hidden sm:block">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 w-52">
          <IconSearch size={14} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm outline-none placeholder:text-muted-foreground w-full"
          />
        </div>

        {/* Alerts */}
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <IconBell size={18} className="text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
        </button>

        {/* Low Stock alert badge */}
        <Badge variant="outline" className="hidden sm:flex gap-1 text-amber-600 border-amber-200 bg-amber-50 text-xs">
          <IconAlertTriangle size={12} />
          3 Low Stock
        </Badge>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold ml-1">
          RN
        </div>
      </div>
    </header>
  );
}
