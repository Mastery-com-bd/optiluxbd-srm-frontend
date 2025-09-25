// Mock data for the SRM system based on the data model

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl?: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minimumStock: number;
  supplierId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Supply {
  id: string;
  supplierId: string;
  productId: string;
  quantity: number;
  costPrice: number;
  totalAmount: number;
  commissionRate: number;
  commissionAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  supplierId: string;
  supplyIds: string[];
  totalAmount: number;
  commissionAmount: number;
  dueAmount: number;
  paidAmount: number;
  status: 'pending' | 'completed' | 'partial';
  paymentDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReturnProduct {
  id: string;
  productId: string;
  staffId: string;
  quantity: number;
  reason: string;
  status: 'pending' | 'processed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Mock Users
export const mockUsers = [
  {
    _id: '1',
    email: 'admin@optiluxbd.com',
    role: 'admin' as const,
    status: 'active' as const,
    profile: { name: 'Admin User', phone: '+8801712345678' },
  },
  {
    _id: '2',
    email: 'supplier1@example.com',
    role: 'supplier' as const,
    status: 'active' as const,
    profile: { name: 'ABC Electronics', phone: '+8801812345678' },
  },
  {
    _id: '3',
    email: 'staff1@optiluxbd.com',
    role: 'staff' as const,
    status: 'active' as const,
    profile: { name: 'John Doe', phone: '+8801912345678', employeeId: 'STF001' },
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced features',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop',
    costPrice: 85000,
    sellingPrice: 102000,
    currentStock: 25,
    minimumStock: 10,
    supplierId: '2',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    description: 'Premium Android smartphone',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop',
    costPrice: 75000,
    sellingPrice: 90000,
    currentStock: 15,
    minimumStock: 8,
    supplierId: '2',
    createdAt: '2024-01-16T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z',
  },
  {
    id: '3',
    name: 'MacBook Air M3',
    description: 'Lightweight laptop with M3 chip',
    category: 'Computers',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
    costPrice: 120000,
    sellingPrice: 144000,
    currentStock: 8,
    minimumStock: 5,
    supplierId: '2',
    createdAt: '2024-01-17T00:00:00Z',
    updatedAt: '2024-01-17T00:00:00Z',
  },
];

// Mock Supplies
export const mockSupplies: Supply[] = [
  {
    id: '1',
    supplierId: '2',
    productId: '1',
    quantity: 50,
    costPrice: 85000,
    totalAmount: 4250000,
    commissionRate: 12,
    commissionAmount: 510000,
    status: 'completed',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    supplierId: '2',
    productId: '2',
    quantity: 30,
    costPrice: 75000,
    totalAmount: 2250000,
    commissionRate: 10,
    commissionAmount: 225000,
    status: 'completed',
    createdAt: '2024-01-16T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z',
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: '1',
    supplierId: '2',
    supplyIds: ['1', '2'],
    totalAmount: 6500000,
    commissionAmount: 735000,
    dueAmount: 200000,
    paidAmount: 535000,
    status: 'partial',
    paymentDate: '2024-01-20T00:00:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
];

// Mock Returns
export const mockReturns: ReturnProduct[] = [
  {
    id: '1',
    productId: '1',
    staffId: '3',
    quantity: 2,
    reason: 'Defective units',
    status: 'processed',
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z',
  },
];

// Mock Reports Data
export const mockReportsData = {
  todaySupply: {
    totalProducts: 15,
    totalAmount: 1250000,
    supplies: 3,
  },
  weeklySupply: {
    totalProducts: 85,
    totalAmount: 6750000,
    supplies: 12,
  },
  monthlySupply: {
    totalProducts: 320,
    totalAmount: 28500000,
    supplies: 45,
  },
  paymentsDue: {
    totalDue: 1250000,
    totalPaid: 4850000,
    pendingPayments: 8,
  },
  stockCount: {
    totalProducts: 48,
    lowStockProducts: 3,
    outOfStockProducts: 0,
  },
  returnsCount: {
    totalReturns: 5,
    processedReturns: 4,
    pendingReturns: 1,
  },
};

// Chart data for dashboard
export const chartData = {
  monthlySupply: [
    { month: 'Jan', amount: 2850000, products: 320 },
    { month: 'Feb', amount: 3200000, products: 380 },
    { month: 'Mar', amount: 2950000, products: 340 },
    { month: 'Apr', amount: 3450000, products: 420 },
    { month: 'May', amount: 3100000, products: 365 },
    { month: 'Jun', amount: 3650000, products: 445 },
  ],
  paymentTrends: [
    { month: 'Jan', paid: 285000, due: 125000 },
    { month: 'Feb', paid: 320000, due: 98000 },
    { month: 'Mar', paid: 295000, due: 135000 },
    { month: 'Apr', paid: 345000, due: 87000 },
    { month: 'May', paid: 310000, due: 156000 },
    { month: 'Jun', paid: 365000, due: 125000 },
  ],
};