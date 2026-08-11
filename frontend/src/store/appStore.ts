import { create } from 'zustand';
import {
  customers as initialCustomers,
  products as initialProducts,
  salesOrders as initialSalesOrders,
  payments as initialPayments,
  salesmen as initialSalesmen,
  employees as initialEmployees,
  inventory as initialInventory,
  manufacturing as initialManufacturing,
  expenses as initialExpenses,
  complaints as initialComplaints,
} from '../lib/mock-data';

export type Customer = typeof initialCustomers[0];
export type Product = typeof initialProducts[0];
export type SalesOrder = typeof initialSalesOrders[0];
export type Payment = typeof initialPayments[0];
export type Salesman = typeof initialSalesmen[0];
export type Employee = typeof initialEmployees[0];
export type InventoryItem = typeof initialInventory[0];
export type ManufacturingBatch = typeof initialManufacturing[0];
export type Expense = typeof initialExpenses[0];
export type Complaint = typeof initialComplaints[0];

interface AppState {
  customers: Customer[];
  products: Product[];
  salesOrders: SalesOrder[];
  payments: Payment[];
  salesmen: Salesman[];
  employees: Employee[];
  inventory: InventoryItem[];
  manufacturing: ManufacturingBatch[];
  expenses: Expense[];
  complaints: Complaint[];

  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  addCustomer: (c: Customer) => void;
  updateCustomer: (id: string, c: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  addProduct: (p: Product) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  addOrder: (o: SalesOrder) => void;
  updateOrderStatus: (id: string, status: string) => void;

  addPayment: (p: Payment) => void;
  updatePayment: (id: string, p: Partial<Payment>) => void;

  addExpense: (e: Expense) => void;
  updateComplaintStatus: (id: string, status: string, resolution: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  customers: initialCustomers,
  products: initialProducts,
  salesOrders: initialSalesOrders,
  payments: initialPayments,
  salesmen: initialSalesmen,
  employees: initialEmployees,
  inventory: initialInventory,
  manufacturing: initialManufacturing,
  expenses: initialExpenses,
  complaints: initialComplaints,

  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  addCustomer: (c) => set((s) => ({ customers: [...s.customers, c] })),
  updateCustomer: (id, c) =>
    set((s) => ({ customers: s.customers.map((x) => (x.id === id ? { ...x, ...c } : x)) })),
  deleteCustomer: (id) =>
    set((s) => ({ customers: s.customers.filter((x) => x.id !== id) })),

  addProduct: (p) => set((s) => ({ products: [...s.products, p] })),
  updateProduct: (id, p) =>
    set((s) => ({ products: s.products.map((x) => (x.id === id ? { ...x, ...p } : x)) })),
  deleteProduct: (id) =>
    set((s) => ({ products: s.products.filter((x) => x.id !== id) })),

  addOrder: (o) => set((s) => ({ salesOrders: [...s.salesOrders, o] })),
  updateOrderStatus: (id, status) =>
    set((s) => ({ salesOrders: s.salesOrders.map((x) => (x.id === id ? { ...x, status } : x)) })),

  addPayment: (p) => set((s) => ({ payments: [...s.payments, p] })),
  updatePayment: (id, p) =>
    set((s) => ({ payments: s.payments.map((x) => (x.id === id ? { ...x, ...p } : x)) })),

  addExpense: (e) => set((s) => ({ expenses: [...s.expenses, e] })),
  updateComplaintStatus: (id, status, resolution) =>
    set((s) => ({
      complaints: s.complaints.map((x) => (x.id === id ? { ...x, status, resolution } : x)),
    })),
}));
