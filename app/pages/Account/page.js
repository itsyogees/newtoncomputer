"use client";
import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaShoppingCart, 
  FaTools, 
  FaEdit,
  FaCheck,
  FaClock,
  FaCheckCircle,
  FaEye,
  FaPlus,
  FaUsers,
  FaFileInvoice,
  FaBox,
  FaTachometerAlt,
  FaTrash,
  FaSave,
  FaTimes,
  FaSearch,
  FaFilter,
  FaDownload,
  FaPrint,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaIdCard,
  FaRupeeSign,
  FaCalendarAlt,
  FaStickyNote,
  FaArrowLeft,
  FaArrowRight,
  FaExclamationTriangle,
  FaPercent,
  FaReceipt,
  FaBars,
  FaTimesCircle,
  FaStore,
  FaUserShield,
  FaUserTie,
  FaUserCog,
  FaLaptopCode,
  FaNetworkWired
} from 'react-icons/fa';
// Add these imports at the top of your Account.jsx file
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Account.scss';
import Image from 'next/image';

const Account = () => {
  const [userRole, setUserRole] = useState('super admin');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  // Modal states
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isAddQuotationModalOpen, setIsAddQuotationModalOpen] = useState(false);
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false);
  // const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Branch states
  const [branches, setBranches] = useState([]);
  const [userBranch, setUserBranch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [quickBranch, setQuickBranch] = useState('all');

  // User data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: 'No. 8/683 A, Srividya Avenue, Rajiv Gandhi Salai, Thoraipakkam, Chennai - 600097',
    branch: '',
    branchName: ''
  });

  // Form states
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    specifications: '',
    warranty: '1 year',
    status: 'active'
  });

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'individual',
    companyName: '',
    gstNumber: '',
    billingAddress: '',
    shippingAddress: '',
    notes: ''
  });

  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    phone: '',
    manager: '',
    status: 'active'
  });

  // const [newProject, setNewProject] = useState({
  //   name: '',
  //   description: '',
  //   customerId: '',
  //   customerName: '',
  //   startDate: '',
  //   endDate: '',
  //   status: 'planning',
  //   budget: '',
  //   assignedTo: '',
  //   priority: 'medium',
  //   notes: ''
  // });

  const [newQuotation, setNewQuotation] = useState({
    customerId: '',
    customerName: '',
    branchId: '',
    items: [],
    subtotal: 0,
    discount: 0,
    discountAmount: 0,
    taxRate: 18,
    taxAmount: 0,
    total: 0,
    validUntil: '',
    notes: '',
    terms: 'Payment due within 30 days. Warranty as per product terms.',
    status: 'draft'
  });

  const [newQuotationItem, setNewQuotationItem] = useState({
    productId: '',
    productName: '',
    quantity: 1,
    price: 0,
    total: 0
  });

  // Sample data
  const [serviceBookings, setServiceBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [users, setUsers] = useState([]);
  // const [projects, setProjects] = useState([]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Dashboard stats
  const [dashboardStats, setDashboardStats] = useState({
    totalServices: 0,
    pendingServices: 0,
    completedServices: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalQuotations: 0,
    totalBranches: 0,
    totalUsers: 0,
    totalRevenue: 0,
    // totalProjects: 0,
    // activeProjects: 0
  });

  // Quick branch stats
  const [quickBranchStats, setQuickBranchStats] = useState({
    all: { services: 0, orders: 0, revenue: 0 },
    BR001: { services: 0, orders: 0, revenue: 0 },
    BR002: { services: 0, orders: 0, revenue: 0 },
    BR003: { services: 0, orders: 0, revenue: 0 }
  });

  // Role configurations
const roleConfig = {
  'super admin': {
    name: 'Super Admin',
    icon: FaUserShield,
    color: '#8B5CF6',
    permissions: ['all'],
    tabs: ['dashboard', 'services', 'orders', 'products', 'customers', 'quotations', 'branches', 'users', 'profile']
  },
  'admin': {
    name: 'Admin',
    icon: FaUserCog,
    color: '#3B82F6',
    permissions: ['manage_branches', 'manage_products', 'manage_customers', 'view_reports'],
    tabs: ['dashboard', 'services', 'orders', 'products', 'customers', 'quotations', 'branches', 'profile']
  },
  'manager': {
    name: 'Manager',
    icon: FaUserTie,
    color: '#059669',
    permissions: ['manage_team', 'view_reports', 'approve_quotations'],
    tabs: ['dashboard', 'services', 'orders', 'quotations', 'profile']
  },
  'branch': {
    name: 'Branch Manager',
    icon: FaBuilding,
    color: '#F59E0B',
    permissions: ['manage_branch_operations', 'view_reports', 'view_branch_reports'],
    tabs: ['dashboard', 'services', 'orders', 'quotations', 'profile']
  },
  'engineer': {
    name: 'Engineer',
    icon: FaTools,
    color: '#DC2626',
    permissions: ['manage_services', 'update_service_status', 'view_reports'],
    tabs: ['dashboard', 'services', 'profile']
  },
  'user': {
    name: 'Customer',
    icon: FaUser,
    color: '#6B7280',
    permissions: ['view_services', 'view_orders'],
    tabs: ['services', 'orders', 'profile']
  }
};

  // Calculate quotation totals
  const calculateQuotationTotals = (items, discount = 0, taxRate = 18) => {
    const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
    const discountAmount = (subtotal * discount) / 100;
    const taxAmount = ((subtotal - discountAmount) * taxRate) / 100;
    const total = subtotal - discountAmount + taxAmount;
    
    return { 
      subtotal: Math.round(subtotal * 100) / 100, 
      discountAmount: Math.round(discountAmount * 100) / 100, 
      taxAmount: Math.round(taxAmount * 100) / 100, 
      total: Math.round(total * 100) / 100 
    };
  };

  // Update quotation field
  const handleQuotationFieldChange = (field, value) => {
    if (field === 'discount' || field === 'taxRate') {
      const { subtotal, discountAmount, taxAmount, total } = calculateQuotationTotals(
        newQuotation.items,
        field === 'discount' ? parseFloat(value) || 0 : newQuotation.discount,
        field === 'taxRate' ? parseFloat(value) || 0 : newQuotation.taxRate
      );
      
      setNewQuotation(prev => ({
        ...prev,
        [field]: parseFloat(value) || 0,
        subtotal,
        discountAmount,
        taxAmount,
        total
      }));
    } else {
      setNewQuotation(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Quotation item handlers
  const handleAddQuotationItem = () => {
    if (newQuotationItem.productName && newQuotationItem.price > 0) {
      const itemTotal = newQuotationItem.quantity * newQuotationItem.price;
      const updatedItem = {
        ...newQuotationItem,
        total: itemTotal
      };

      const updatedItems = [...newQuotation.items, updatedItem];
      const { subtotal, discountAmount, taxAmount, total } = calculateQuotationTotals(
        updatedItems,
        newQuotation.discount,
        newQuotation.taxRate
      );

      setNewQuotation(prev => ({
        ...prev,
        items: updatedItems,
        subtotal,
        discountAmount,
        taxAmount,
        total
      }));

      // Reset item form
      setNewQuotationItem({
        productId: '',
        productName: '',
        quantity: 1,
        price: 0,
        total: 0
      });
    }
  };

  const handleRemoveQuotationItem = (index) => {
    const updatedItems = newQuotation.items.filter((_, i) => i !== index);
    const { subtotal, discountAmount, taxAmount, total } = calculateQuotationTotals(
      updatedItems,
      newQuotation.discount,
      newQuotation.taxRate
    );

    setNewQuotation(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      discountAmount,
      taxAmount,
      total
    }));
  };

const updateDashboardStats = () => {
  // Use the actual data instead of filtered data for calculations
  let totalServices = serviceBookings.length;
  let pendingServices = serviceBookings.filter(s => s.status === 'pending').length;
  let completedServices = serviceBookings.filter(s => s.status === 'completed').length;
  
  let totalOrders = orders.length;
  let pendingOrders = orders.filter(o => o.status === 'pending').length;
  let completedOrders = orders.filter(o => o.status === 'delivered').length;
  
  let totalProducts = products.length;
  let totalCustomers = customers.length;
  let totalQuotations = quotations.length;
  let totalBranches = branches.length;

  // Calculate revenue properly
  const totalRevenue = orders.reduce((sum, order) => {
    if (order.price && typeof order.price === 'string') {
      const priceValue = parseFloat(order.price.replace('₹', '').replace(/,/g, '') || 0);
      return sum + priceValue;
    }
    return sum;
  }, 0);

  // For branch manager, show data only for their branch
  if (userRole === 'branch') {
    const branchId = userBranch;
    
    totalServices = serviceBookings.filter(s => s.branchId === branchId).length;
    pendingServices = serviceBookings.filter(s => s.status === 'pending' && s.branchId === branchId).length;
    completedServices = serviceBookings.filter(s => s.status === 'completed' && s.branchId === branchId).length;
    
    totalOrders = orders.filter(o => o.branchId === branchId).length;
    pendingOrders = orders.filter(o => o.status === 'pending' && o.branchId === branchId).length;
    completedOrders = orders.filter(o => o.status === 'delivered' && o.branchId === branchId).length;
    
    totalProducts = products.filter(p => p.branchId === branchId).length;
    totalCustomers = customers.filter(c => c.branchId === branchId).length;
    totalQuotations = quotations.filter(q => q.branchId === branchId).length;
    totalBranches = 1; // Only their branch
  }

  // For engineer, only show their assigned services
  if (userRole === 'engineer') {
    const branchId = userBranch;
    
    totalServices = serviceBookings.filter(s => s.branchId === branchId && s.technician === userData.name).length;
    pendingServices = serviceBookings.filter(s => s.status === 'pending' && s.branchId === branchId && s.technician === userData.name).length;
    completedServices = serviceBookings.filter(s => s.status === 'completed' && s.branchId === branchId && s.technician === userData.name).length;
    
    // Engineer doesn't see orders, products, customers, quotations stats
    totalOrders = 0;
    pendingOrders = 0;
    completedOrders = 0;
    totalProducts = 0;
    totalCustomers = 0;
    totalQuotations = 0;
    totalBranches = 1;
  }

  // For customer role, show only their data
  if (userRole === 'user') {
    totalServices = serviceBookings.filter(s => s.userId === 'user123').length;
    pendingServices = serviceBookings.filter(s => s.status === 'pending' && s.userId === 'user123').length;
    completedServices = serviceBookings.filter(s => s.status === 'completed' && s.userId === 'user123').length;
    
    totalOrders = orders.filter(o => o.userId === 'user123').length;
    pendingOrders = orders.filter(o => o.status === 'pending' && o.userId === 'user123').length;
    completedOrders = orders.filter(o => o.status === 'delivered' && o.userId === 'user123').length;
    
    // Customer doesn't see these stats
    totalProducts = 0;
    totalCustomers = 0;
    totalQuotations = 0;
    totalBranches = 0;
  }

  const stats = {
    totalServices,
    pendingServices,
    completedServices,
    totalOrders,
    pendingOrders,
    completedOrders,
    totalProducts,
    totalCustomers,
    totalQuotations,
    totalBranches,
    totalUsers: userRole === 'super admin' ? users.length : 0,
    totalRevenue: totalRevenue
  };
  
  setDashboardStats(stats);
};

  // Update quick branch stats
  const updateQuickBranchStats = () => {
    const stats = {
      all: { services: 0, orders: 0, revenue: 0 },
      BR001: { services: 0, orders: 0, revenue: 0 },
      BR002: { services: 0, orders: 0, revenue: 0 },
      BR003: { services: 0, orders: 0, revenue: 0 }
    };

    serviceBookings.forEach(service => {
      stats.all.services++;
      if (stats[service.branchId]) {
        stats[service.branchId].services++;
      }
    });

    orders.forEach(order => {
      const priceValue = parseFloat(order.price.replace('₹', '').replace(/,/g, '') || 0);
      stats.all.orders++;
      stats.all.revenue += priceValue;
      
      if (stats[order.branchId]) {
        stats[order.branchId].orders++;
        stats[order.branchId].revenue += priceValue;
      }
    });

    setQuickBranchStats(stats);
  };

  // Update stats whenever data changes
  useEffect(() => {
    updateDashboardStats();
    updateQuickBranchStats();
  }, [serviceBookings, orders, products, customers, quotations, branches, selectedBranch, userRole, userBranch, userData.name]);

  // Handle quick branch selection
  const handleQuickBranchSelect = (branchId) => {
    setQuickBranch(branchId);
    setSelectedBranch(branchId);
    
    // Auto-switch to relevant tab based on role
    if (['super admin', 'admin', 'manager', 'branch', 'engineer'].includes(userRole)) {
      setActiveTab('dashboard');
    } else {
      setActiveTab('services');
    }
  };

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      switch (userRole) {
        case 'user':
          loadUserData();
          setActiveTab('services');
          break;
        case 'engineer':
          loadEngineerData();
          setActiveTab('dashboard');
          break;
        case 'branch':
          loadBranchData();
          setActiveTab('dashboard');
          break;
        case 'manager':
          loadManagerData();
          setActiveTab('dashboard');
          break;
        case 'admin':
          loadAdminData();
          setActiveTab('dashboard');
          break;
        case 'super admin':
          loadSuperAdminData();
          setActiveTab('dashboard');
          break;
        default:
          loadUserData();
          setActiveTab('services');
      }
      
      setLoading(false);
    };

    loadData();
  }, [userRole]);

  const loadUserData = () => {
    const userServiceBookings = [
      {
        id: 'SRV001',
        laptopModel: 'Dell Inspiron 15',
        serviceType: 'Screen Replacement',
        bookingDate: '2024-01-15',
        status: 'completed',
        estimatedCost: '₹3,500',
        finalCost: '₹3,200',
        technician: 'Raj Kumar',
        completionDate: '2024-01-18',
        userId: 'user123',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      }
    ];

    const userOrders = [
      {
        id: 'ORD001',
        product: 'Refurbished Dell Latitude E7440',
        orderDate: '2024-01-10',
        status: 'delivered',
        price: '₹24,999',
        quantity: 1,
        deliveryDate: '2024-01-15',
        userId: 'user123',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      }
    ];

    setServiceBookings(userServiceBookings);
    setOrders(userOrders);
    setUserData(prev => ({
      ...prev,
      branch: 'BR001',
      branchName: 'T.Nagar Branch'
    }));
    setUserBranch('BR001');
    setSelectedBranch('BR001');
    setQuickBranch('BR001');
  };

  const loadEngineerData = () => {
    const engineerServiceBookings = [
      {
        id: 'SRV001',
        laptopModel: 'Dell Inspiron 15',
        serviceType: 'Screen Replacement',
        bookingDate: '2024-01-15',
        status: 'completed',
        estimatedCost: '₹3,500',
        finalCost: '₹3,200',
        technician: 'Raj Kumar',
        completionDate: '2024-01-18',
        userId: 'user123',
        customerName: 'John Doe',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      },
      {
        id: 'SRV002',
        laptopModel: 'Lenovo ThinkPad T480',
        serviceType: 'Motherboard Repair',
        bookingDate: '2024-01-20',
        status: 'in-progress',
        estimatedCost: '₹8,000',
        finalCost: null,
        technician: 'Raj Kumar',
        completionDate: null,
        userId: 'user456',
        customerName: 'Jane Smith',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      },
      {
        id: 'SRV003',
        laptopModel: 'HP Pavilion',
        serviceType: 'Keyboard Replacement',
        bookingDate: '2024-01-22',
        status: 'pending',
        estimatedCost: '₹2,500',
        finalCost: null,
        technician: 'Raj Kumar',
        completionDate: null,
        userId: 'user789',
        customerName: 'Robert Brown',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      }
    ];

    const engineerOrders = [
      {
        id: 'ORD001',
        product: 'Laptop Repair Tools Kit',
        orderDate: '2024-01-10',
        status: 'delivered',
        price: '₹5,999',
        quantity: 1,
        deliveryDate: '2024-01-15',
        userId: 'engineer001',
        customerName: 'Raj Kumar',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      }
    ];

    // const engineerProjects = [
    //   {
    //     id: 'PROJ001',
    //     name: 'Corporate Laptop Maintenance',
    //     description: 'Quarterly maintenance for corporate client laptops',
    //     customerName: 'ABC Corporation',
    //     startDate: '2024-01-15',
    //     endDate: '2024-03-15',
    //     status: 'in-progress',
    //     budget: '₹75,000',
    //     assignedTo: 'Raj Kumar',
    //     priority: 'high'
    //   }
    // ];

    setServiceBookings(engineerServiceBookings);
    setOrders(engineerOrders);
    // setProjects(engineerProjects);
    
    setUserData(prev => ({
      ...prev,
      branch: 'BR001',
      branchName: 'T.Nagar Branch'
    }));
    setUserBranch('BR001');
    setSelectedBranch('BR001');
    setQuickBranch('BR001');
  };

  const loadBranchData = () => {
    const branchServiceBookings = [
      {
        id: 'SRV001',
        laptopModel: 'Dell Inspiron 15',
        serviceType: 'Screen Replacement',
        bookingDate: '2024-01-15',
        status: 'completed',
        estimatedCost: '₹3,500',
        finalCost: '₹3,200',
        technician: 'Raj Kumar',
        completionDate: '2024-01-18',
        userId: 'user123',
        customerName: 'John Doe',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      },
      {
        id: 'SRV002',
        laptopModel: 'Lenovo ThinkPad T480',
        serviceType: 'Motherboard Repair',
        bookingDate: '2024-01-20',
        status: 'in-progress',
        estimatedCost: '₹8,000',
        finalCost: null,
        technician: 'Suresh Patel',
        completionDate: null,
        userId: 'user456',
        customerName: 'Jane Smith',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      },
      {
        id: 'SRV003',
        laptopModel: 'HP Pavilion',
        serviceType: 'Keyboard Replacement',
        bookingDate: '2024-01-22',
        status: 'pending',
        estimatedCost: '₹2,500',
        finalCost: null,
        technician: 'Anita Desai',
        completionDate: null,
        userId: 'user789',
        customerName: 'Robert Brown',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      }
    ];

    const branchOrders = [
      {
        id: 'ORD001',
        product: 'Refurbished Dell Latitude E7440',
        orderDate: '2024-01-10',
        status: 'delivered',
        price: '₹24,999',
        quantity: 1,
        deliveryDate: '2024-01-15',
        userId: 'user123',
        customerName: 'John Doe',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      },
      {
        id: 'ORD002',
        product: 'Laptop Bag & Accessories Kit',
        orderDate: '2024-01-18',
        status: 'shipped',
        price: '₹2,499',
        quantity: 1,
        deliveryDate: '2024-01-22',
        userId: 'user456',
        customerName: 'Jane Smith',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      }
    ];

    const branchProducts = [
      {
        id: 'PROD001',
        name: 'Refurbished Dell Latitude E7440',
        category: 'Business Laptop',
        price: '₹24,999',
        stock: 8,
        status: 'active',
        branchId: 'BR001'
      }
    ];

    const branchCustomers = [
      {
        id: 'CUST001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
        type: 'individual',
        branchId: 'BR001'
      }
    ];

    const branchQuotations = [
      {
        id: 'QUOTE001',
        customerName: 'John Doe',
        branchId: 'BR001',
        total: '₹32,447',
        status: 'sent'
      }
    ];

    // const branchProjects = [
    //   {
    //     id: 'PROJ001',
    //     name: 'Office IT Setup',
    //     description: 'Complete IT infrastructure setup for new office',
    //     customerName: 'Tech Solutions Inc.',
    //     startDate: '2024-01-10',
    //     endDate: '2024-02-28',
    //     status: 'in-progress',
    //     budget: '₹2,50,000',
    //     assignedTo: 'Team A',
    //     priority: 'high',
    //     branchId: 'BR001'
    //   }
    // ];

    setServiceBookings(branchServiceBookings);
    setOrders(branchOrders);
    setProducts(branchProducts);
    setCustomers(branchCustomers);
    setQuotations(branchQuotations);
    // setProjects(branchProjects);
    
    setUserData(prev => ({
      ...prev,
      branch: 'BR001',
      branchName: 'T.Nagar Branch'
    }));
    setUserBranch('BR001');
    setSelectedBranch('BR001');
    setQuickBranch('BR001');
  };

  const loadManagerData = () => {
    const managerServiceBookings = [
      {
        id: 'SRV001',
        laptopModel: 'Dell Inspiron 15',
        serviceType: 'Screen Replacement',
        bookingDate: '2024-01-15',
        status: 'completed',
        estimatedCost: '₹3,500',
        finalCost: '₹3,200',
        technician: 'Raj Kumar',
        completionDate: '2024-01-18',
        userId: 'user123',
        customerName: 'John Doe',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      }
    ];

    const managerOrders = [
      {
        id: 'ORD001',
        product: 'Refurbished Dell Latitude E7440',
        orderDate: '2024-01-10',
        status: 'delivered',
        price: '₹24,999',
        quantity: 1,
        deliveryDate: '2024-01-15',
        userId: 'user123',
        customerName: 'John Doe',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      }
    ];

    const managerQuotations = [
      {
        id: 'QUOTE001',
        customerId: 'CUST001',
        customerName: 'John Doe',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch',
        items: [],
        subtotal: '₹27,498',
        discount: 5,
        discountAmount: '₹1,375',
        taxRate: 18,
        taxAmount: '₹4,949',
        total: '₹32,447',
        status: 'sent',
        createdDate: '2024-01-20',
        validUntil: '2024-02-20'
      }
    ];

    // const managerProjects = [
    //   {
    //     id: 'PROJ001',
    //     name: 'Client Infrastructure Upgrade',
    //     description: 'Upgrade IT infrastructure for major client',
    //     customerName: 'Global Solutions Ltd.',
    //     startDate: '2024-01-01',
    //     endDate: '2024-06-30',
    //     status: 'planning',
    //     budget: '₹15,00,000',
    //     assignedTo: 'Multiple Teams',
    //     priority: 'high'
    //   }
    // ];

    setServiceBookings(managerServiceBookings);
    setOrders(managerOrders);
    setQuotations(managerQuotations);
    // setProjects(managerProjects);
    setUserData(prev => ({
      ...prev,
      branch: 'all',
      branchName: 'All Branches'
    }));
    setUserBranch('all');
    setSelectedBranch('all');
    setQuickBranch('all');
  };

  const loadAdminData = () => {
    const adminBranches = [
      {
        id: 'BR001',
        name: 'T.Nagar Branch',
        address: '28-B/16, Murugesan Street, North Usman Road, T.Nagar, Chennai-600017',
        phone: '+91 98406 04073',
        manager: 'Raj Kumar',
        status: 'active'
      },
      {
        id: 'BR002',
        name: 'Thoraipakkam Branch',
        address: 'No. 8/683 A, Srividya Avenue, Rajiv Gandhi Salai, Thoraipakkam, Chennai - 600097',
        phone: '+91 99401 85417',
        manager: 'Suresh Patel',
        status: 'active'
      }
    ];

    const adminServiceBookings = [
      {
        id: 'SRV001',
        laptopModel: 'Dell Inspiron 15',
        serviceType: 'Screen Replacement',
        bookingDate: '2024-01-15',
        status: 'completed',
        estimatedCost: '₹3,500',
        finalCost: '₹3,200',
        technician: 'Raj Kumar',
        completionDate: '2024-01-18',
        userId: 'user123',
        customerName: 'John Doe',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      }
    ];

    const adminOrders = [
      {
        id: 'ORD001',
        product: 'Refurbished Dell Latitude E7440',
        orderDate: '2024-01-10',
        status: 'delivered',
        price: '₹24,999',
        quantity: 1,
        deliveryDate: '2024-01-15',
        userId: 'user123',
        customerName: 'John Doe',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      }
    ];

    const adminProducts = [
      {
        id: 'PROD001',
        name: 'Refurbished Dell Latitude E7440',
        category: 'Business Laptop',
        price: '₹24,999',
        stock: 15,
        status: 'active',
        description: 'Professional business laptop with excellent performance, perfect for corporate use.',
        specifications: 'Intel Core i5-6300U, 8GB RAM, 256GB SSD, 14" HD Display, Windows 10 Pro',
        warranty: '1 year',
        createdAt: '2024-01-01'
      }
    ];

    const adminCustomers = [
      {
        id: 'CUST001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
        type: 'individual',
        companyName: '',
        gstNumber: '',
        billingAddress: 'No. 8/683 A, Srividya Avenue, Rajiv Gandhi Salai, Thoraipakkam, Chennai - 600097',
        shippingAddress: 'No. 8/683 A, Srividya Avenue, Rajiv Gandhi Salai, Thoraipakkam, Chennai - 600097',
        notes: 'Regular customer, prefers email communication',
        createdAt: '2024-01-01'
      }
    ];

    const adminQuotations = [
      {
        id: 'QUOTE001',
        customerId: 'CUST001',
        customerName: 'John Doe',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch',
        items: [
          { productId: 'PROD001', productName: 'Refurbished Dell Latitude E7440', quantity: 1, price: '₹24,999', total: '₹24,999' }
        ],
        subtotal: '₹27,498',
        discount: 5,
        discountAmount: '₹1,375',
        taxRate: 18,
        taxAmount: '₹4,949',
        total: '₹32,447',
        status: 'sent',
        createdDate: '2024-01-20',
        validUntil: '2024-02-20',
        notes: 'Includes 1-year warranty and free shipping'
      }
    ];

    // const adminProjects = [
    //   {
    //     id: 'PROJ001',
    //     name: 'System Wide Implementation',
    //     description: 'Implement new CRM system across all branches',
    //     customerName: 'Internal',
    //     startDate: '2024-02-01',
    //     endDate: '2024-08-31',
    //     status: 'planning',
    //     budget: '₹25,00,000',
    //     assignedTo: 'IT Department',
    //     priority: 'medium'
    //   }
    // ];

    setServiceBookings(adminServiceBookings);
    setOrders(adminOrders);
    setProducts(adminProducts);
    setCustomers(adminCustomers);
    setQuotations(adminQuotations);
    setBranches(adminBranches);
    // setProjects(adminProjects);
    setUserData(prev => ({
      ...prev,
      branch: 'all',
      branchName: 'All Branches'
    }));
    setUserBranch('all');
    setSelectedBranch('all');
    setQuickBranch('all');
  };

  const loadSuperAdminData = () => {
    const superAdminBranches = [
      {
        id: 'BR001',
        name: 'T.Nagar Branch',
        address: '28-B/16, Murugesan Street, North Usman Road, T.Nagar, Chennai-600017',
        phone: '+91 98406 04073',
        manager: 'Raj Kumar',
        status: 'active'
      },
      {
        id: 'BR002',
        name: 'Thoraipakkam Branch',
        address: 'No. 8/683 A, Srividya Avenue, Rajiv Gandhi Salai, Thoraipakkam, Chennai - 600097',
        phone: '+91 99401 85417',
        manager: 'Suresh Patel',
        status: 'active'
      }
    ];

    const superAdminUsers = [
      {
        id: 'USR001',
        name: 'Super Admin',
        email: 'superadmin@company.com',
        role: 'super admin',
        branch: 'all',
        status: 'active',
        createdAt: '2024-01-01'
      },
      {
        id: 'USR002',
        name: 'Admin User',
        email: 'admin@company.com',
        role: 'admin',
        branch: 'all',
        status: 'active',
        createdAt: '2024-01-02'
      }
    ];

    const superAdminServiceBookings = [
      {
        id: 'SRV001',
        laptopModel: 'Dell Inspiron 15',
        serviceType: 'Screen Replacement',
        bookingDate: '2024-01-15',
        status: 'completed',
        estimatedCost: '₹3,500',
        finalCost: '₹3,200',
        technician: 'Raj Kumar',
        completionDate: '2024-01-18',
        userId: 'user123',
        customerName: 'John Doe',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      },
      {
        id: 'SRV002',
        laptopModel: 'Lenovo ThinkPad T480',
        serviceType: 'Motherboard Repair',
        bookingDate: '2024-01-20',
        status: 'in-progress',
        estimatedCost: '₹8,000',
        finalCost: null,
        technician: 'Suresh Patel',
        completionDate: null,
        userId: 'user456',
        customerName: 'Jane Smith',
        branchId: 'BR002',
        branchName: 'Thoraipakkam Branch'
      }
    ];

    const superAdminOrders = [
      {
        id: 'ORD001',
        product: 'Refurbished Dell Latitude E7440',
        orderDate: '2024-01-10',
        status: 'delivered',
        price: '₹24,999',
        quantity: 1,
        deliveryDate: '2024-01-15',
        userId: 'user123',
        customerName: 'John Doe',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch'
      },
      {
        id: 'ORD002',
        product: 'Laptop Bag & Accessories Kit',
        orderDate: '2024-01-18',
        status: 'shipped',
        price: '₹2,499',
        quantity: 1,
        deliveryDate: '2024-01-22',
        userId: 'user456',
        customerName: 'Jane Smith',
        branchId: 'BR002',
        branchName: 'Thoraipakkam Branch'
      }
    ];

    const superAdminProducts = [
      {
        id: 'PROD001',
        name: 'Refurbished Dell Latitude E7440',
        category: 'Business Laptop',
        price: '₹24,999',
        stock: 15,
        status: 'active',
        description: 'Professional business laptop with excellent performance, perfect for corporate use.',
        specifications: 'Intel Core i5-6300U, 8GB RAM, 256GB SSD, 14" HD Display, Windows 10 Pro',
        warranty: '1 year',
        createdAt: '2024-01-01'
      }
    ];

    const superAdminCustomers = [
      {
        id: 'CUST001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
        type: 'individual',
        companyName: '',
        gstNumber: '',
        billingAddress: 'No. 8/683 A, Srividya Avenue, Rajiv Gandhi Salai, Thoraipakkam, Chennai - 600097',
        shippingAddress: 'No. 8/683 A, Srividya Avenue, Rajiv Gandhi Salai, Thoraipakkam, Chennai - 600097',
        notes: 'Regular customer, prefers email communication',
        createdAt: '2024-01-01'
      }
    ];

    const superAdminQuotations = [
      {
        id: 'QUOTE001',
        customerId: 'CUST001',
        customerName: 'John Doe',
        branchId: 'BR001',
        branchName: 'T.Nagar Branch',
        items: [
          { productId: 'PROD001', productName: 'Refurbished Dell Latitude E7440', quantity: 1, price: '₹24,999', total: '₹24,999' }
        ],
        subtotal: '₹27,498',
        discount: 5,
        discountAmount: '₹1,375',
        taxRate: 18,
        taxAmount: '₹4,949',
        total: '₹32,447',
        status: 'sent',
        createdDate: '2024-01-20',
        validUntil: '2024-02-20',
        notes: 'Includes 1-year warranty and free shipping'
      }
    ];

    // const superAdminProjects = [
    //   {
    //     id: 'PROJ001',
    //     name: 'Digital Transformation Initiative',
    //     description: 'Complete digital transformation across all business units',
    //     customerName: 'Internal',
    //     startDate: '2024-01-01',
    //     endDate: '2024-12-31',
    //     status: 'in-progress',
    //     budget: '₹50,00,000',
    //     assignedTo: 'All Teams',
    //     priority: 'high'
    //   }
    // ];

    setServiceBookings(superAdminServiceBookings);
    setOrders(superAdminOrders);
    setProducts(superAdminProducts);
    setCustomers(superAdminCustomers);
    setQuotations(superAdminQuotations);
    setBranches(superAdminBranches);
    setUsers(superAdminUsers);
    // setProjects(superAdminProjects);
    setUserData(prev => ({
      ...prev,
      branch: 'all',
      branchName: 'All Branches'
    }));
    setUserBranch('all');
    setSelectedBranch('all');
    setQuickBranch('all');
  };

  // CRUD operations
  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: `PROD00${products.length + 1}`,
      ...newProduct,
      price: `₹${newProduct.price}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [...prev, product]);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      specifications: '',
      warranty: '1 year',
      status: 'active'
    });
    setIsAddProductModalOpen(false);
  };

  const handleEditProduct = (product) => {
    setEditingItem(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price.replace('₹', ''),
      stock: product.stock,
      description: product.description,
      specifications: product.specifications,
      warranty: product.warranty,
      status: product.status
    });
    setIsAddProductModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const customer = {
      id: `CUST00${customers.length + 1}`,
      ...newCustomer,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCustomers(prev => [...prev, customer]);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      type: 'individual',
      companyName: '',
      gstNumber: '',
      billingAddress: '',
      shippingAddress: '',
      notes: ''
    });
    setIsAddCustomerModalOpen(false);
  };

  const handleEditCustomer = (customer) => {
    setEditingItem(customer);
    setNewCustomer({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      type: customer.type,
      companyName: customer.companyName,
      gstNumber: customer.gstNumber,
      billingAddress: customer.billingAddress,
      shippingAddress: customer.shippingAddress,
      notes: customer.notes
    });
    setIsAddCustomerModalOpen(true);
  };

  const handleDeleteCustomer = (customerId) => {
    setCustomers(prev => prev.filter(customer => customer.id !== customerId));
  };

  const handleAddBranch = (e) => {
    e.preventDefault();
    const branch = {
      id: `BR00${branches.length + 1}`,
      ...newBranch
    };
    setBranches(prev => [...prev, branch]);
    setNewBranch({
      name: '',
      address: '',
      phone: '',
      manager: '',
      status: 'active'
    });
    setIsAddBranchModalOpen(false);
  };

  const handleEditBranch = (branch) => {
    setEditingItem(branch);
    setNewBranch({
      name: branch.name,
      address: branch.address,
      phone: branch.phone,
      manager: branch.manager,
      status: branch.status
    });
    setIsAddBranchModalOpen(true);
  };

  const handleDeleteBranch = (branchId) => {
    setBranches(prev => prev.filter(branch => branch.id !== branchId));
  };

  // const handleAddProject = (e) => {
  //   e.preventDefault();
  //   const project = {
  //     id: `PROJ00${projects.length + 1}`,
  //     ...newProject,
  //     createdAt: new Date().toISOString().split('T')[0]
  //   };
  //   setProjects(prev => [...prev, project]);
  //   setNewProject({
  //     name: '',
  //     description: '',
  //     customerId: '',
  //     customerName: '',
  //     startDate: '',
  //     endDate: '',
  //     status: 'planning',
  //     budget: '',
  //     assignedTo: '',
  //     priority: 'medium',
  //     notes: ''
  //   });
  //   setIsAddProjectModalOpen(false);
  // };

  // const handleEditProject = (project) => {
  //   setEditingItem(project);
  //   setNewProject({
  //     name: project.name,
  //     description: project.description,
  //     customerId: project.customerId,
  //     customerName: project.customerName,
  //     startDate: project.startDate,
  //     endDate: project.endDate,
  //     status: project.status,
  //     budget: project.budget,
  //     assignedTo: project.assignedTo,
  //     priority: project.priority,
  //     notes: project.notes
  //   });
  //   setIsAddProjectModalOpen(true);
  // };

  // const handleDeleteProject = (projectId) => {
  //   setProjects(prev => prev.filter(project => project.id !== projectId));
  // };

  const handleDeleteQuotation = (quotationId) => {
    setQuotations(prev => prev.filter(quotation => quotation.id !== quotationId));
  };

  // Other handlers
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUserDataChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveUserData = () => {
    setIsEditing(false);
    console.log('Saving user data:', userData);
  };

  const handleRoleChange = (role) => {
    setUserRole(role);
    setActiveTab('dashboard');
    setMobileMenuOpen(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return <FaCheckCircle className="status-icon completed" />;
      case 'in-progress':
      case 'shipped':
        return <FaClock className="status-icon in-progress" />;
      case 'pending':
        return <FaClock className="status-icon pending" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'Completed';
      case 'in-progress':
      case 'shipped':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return 'Pending';
    }
  };

  // Filter data by branch
  const filterDataByBranch = (data) => {
    if (selectedBranch === 'all' || userRole === 'user') {
      return data;
    }
    return data.filter(item => item.branchId === selectedBranch);
  };

  // Filtered data
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const filteredQuotations = filterDataByBranch(quotations).filter(quotation =>
    quotation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quotation.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const filteredProjects = projects.filter(project =>
  //   project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   project.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   project.status.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredServices = filterDataByBranch(serviceBookings);
  const filteredOrders = filterDataByBranch(orders);

// Role-based access check - Add this if missing
const hasAccess = (permission) => {
  const role = roleConfig[userRole];
  if (!role) return false;
  
  return role.permissions.includes('all') || role.permissions.includes(permission);
};

  // Modal Components
  const AddProductModal = () => {
    if (!isAddProductModalOpen) return null;
    
    return (
      <div className="modal active">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{editingItem ? 'Edit Product' : 'Add New Product'}</h3>
            <button className="close-btn" onClick={() => setIsAddProductModalOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleAddProduct}>
            <div className="form-grid">
              <div className="form-field">
                <label>Product Name *</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({...prev, name: e.target.value}))}
                  required
                />
              </div>
              <div className="form-field">
                <label>Category *</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct(prev => ({...prev, category: e.target.value}))}
                  required
                />
              </div>
              <div className="form-field">
                <label>Price (₹) *</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct(prev => ({...prev, price: e.target.value}))}
                  required
                />
              </div>
              <div className="form-field">
                <label>Stock Quantity *</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct(prev => ({...prev, stock: e.target.value}))}
                  required
                />
              </div>
              <div className="form-field full-width">
                <label>Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({...prev, description: e.target.value}))}
                  rows="3"
                />
              </div>
              <div className="form-field full-width">
                <label>Specifications</label>
                <textarea
                  value={newProduct.specifications}
                  onChange={(e) => setNewProduct(prev => ({...prev, specifications: e.target.value}))}
                  rows="3"
                />
              </div>
              <div className="form-field">
                <label>Warranty</label>
                <select
                  value={newProduct.warranty}
                  onChange={(e) => setNewProduct(prev => ({...prev, warranty: e.target.value}))}
                >
                  <option value="1 year">1 Year</option>
                  <option value="2 years">2 Years</option>
                  <option value="3 years">3 Years</option>
                  <option value="No warranty">No Warranty</option>
                </select>
              </div>
              <div className="form-field">
                <label>Status</label>
                <select
                  value={newProduct.status}
                  onChange={(e) => setNewProduct(prev => ({...prev, status: e.target.value}))}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="secondary-button" onClick={() => setIsAddProductModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="primary-button">
                {editingItem ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const AddCustomerModal = () => {
    if (!isAddCustomerModalOpen) return null;
    
    return (
      <div className="modal active">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{editingItem ? 'Edit Customer' : 'Add New Customer'}</h3>
            <button className="close-btn" onClick={() => setIsAddCustomerModalOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleAddCustomer}>
            <div className="form-grid">
              <div className="form-field">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer(prev => ({...prev, name: e.target.value}))}
                  required
                />
              </div>
              <div className="form-field">
                <label>Email *</label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer(prev => ({...prev, email: e.target.value}))}
                  required
                />
              </div>
              <div className="form-field">
                <label>Phone *</label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer(prev => ({...prev, phone: e.target.value}))}
                  required
                />
              </div>
              <div className="form-field">
                <label>Customer Type</label>
                <select
                  value={newCustomer.type}
                  onChange={(e) => setNewCustomer(prev => ({...prev, type: e.target.value}))}
                >
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </select>
              </div>
              {newCustomer.type === 'business' && (
                <>
                  <div className="form-field">
                    <label>Company Name</label>
                    <input
                      type="text"
                      value={newCustomer.companyName}
                      onChange={(e) => setNewCustomer(prev => ({...prev, companyName: e.target.value}))}
                    />
                  </div>
                  <div className="form-field">
                    <label>GST Number</label>
                    <input
                      type="text"
                      value={newCustomer.gstNumber}
                      onChange={(e) => setNewCustomer(prev => ({...prev, gstNumber: e.target.value}))}
                    />
                  </div>
                </>
              )}
              <div className="form-field full-width">
                <label>Billing Address</label>
                <textarea
                  value={newCustomer.billingAddress}
                  onChange={(e) => setNewCustomer(prev => ({...prev, billingAddress: e.target.value}))}
                  rows="3"
                />
              </div>
              <div className="form-field full-width">
                <label>Shipping Address</label>
                <textarea
                  value={newCustomer.shippingAddress}
                  onChange={(e) => setNewCustomer(prev => ({...prev, shippingAddress: e.target.value}))}
                  rows="3"
                />
              </div>
              <div className="form-field full-width">
                <label>Notes</label>
                <textarea
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer(prev => ({...prev, notes: e.target.value}))}
                  rows="2"
                />
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="secondary-button" onClick={() => setIsAddCustomerModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="primary-button">
                {editingItem ? 'Update Customer' : 'Add Customer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const AddBranchModal = () => {
    if (!isAddBranchModalOpen) return null;
    
    return (
      <div className="modal active">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{editingItem ? 'Edit Branch' : 'Add New Branch'}</h3>
            <button className="close-btn" onClick={() => setIsAddBranchModalOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleAddBranch}>
            <div className="form-grid">
              <div className="form-field">
                <label>Branch Name *</label>
                <input
                  type="text"
                  value={newBranch.name}
                  onChange={(e) => setNewBranch(prev => ({...prev, name: e.target.value}))}
                  required
                />
              </div>
              <div className="form-field">
                <label>Phone *</label>
                <input
                  type="tel"
                  value={newBranch.phone}
                  onChange={(e) => setNewBranch(prev => ({...prev, phone: e.target.value}))}
                  required
                />
              </div>
              <div className="form-field">
                <label>Manager *</label>
                <input
                  type="text"
                  value={newBranch.manager}
                  onChange={(e) => setNewBranch(prev => ({...prev, manager: e.target.value}))}
                  required
                />
              </div>
              <div className="form-field full-width">
                <label>Address *</label>
                <textarea
                  value={newBranch.address}
                  onChange={(e) => setNewBranch(prev => ({...prev, address: e.target.value}))}
                  rows="3"
                  required
                />
              </div>
              <div className="form-field">
                <label>Status</label>
                <select
                  value={newBranch.status}
                  onChange={(e) => setNewBranch(prev => ({...prev, status: e.target.value}))}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="secondary-button" onClick={() => setIsAddBranchModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="primary-button">
                {editingItem ? 'Update Branch' : 'Add Branch'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // const AddProjectModal = () => {
  //   if (!isAddProjectModalOpen) return null;
    
  //   return (
  //     <div className="modal active">
  //       <div className="modal-content">
  //         <div className="modal-header">
  //           <h3>{editingItem ? 'Edit Project' : 'Add New Project'}</h3>
  //           <button className="close-btn" onClick={() => setIsAddProjectModalOpen(false)}>
  //             <FaTimes />
  //           </button>
  //         </div>
  //         <form onSubmit={handleAddProject}>
  //           <div className="form-grid">
  //             <div className="form-field">
  //               <label>Project Name *</label>
  //               <input
  //                 type="text"
  //                 value={newProject.name}
  //                 onChange={(e) => setNewProject(prev => ({...prev, name: e.target.value}))}
  //                 required
  //               />
  //             </div>
  //             <div className="form-field">
  //               <label>Customer Name *</label>
  //               <input
  //                 type="text"
  //                 value={newProject.customerName}
  //                 onChange={(e) => setNewProject(prev => ({...prev, customerName: e.target.value}))}
  //                 required
  //               />
  //             </div>
  //             <div className="form-field full-width">
  //               <label>Description</label>
  //               <textarea
  //                 value={newProject.description}
  //                 onChange={(e) => setNewProject(prev => ({...prev, description: e.target.value}))}
  //                 rows="3"
  //               />
  //             </div>
  //             <div className="form-field">
  //               <label>Start Date *</label>
  //               <input
  //                 type="date"
  //                 value={newProject.startDate}
  //                 onChange={(e) => setNewProject(prev => ({...prev, startDate: e.target.value}))}
  //                 required
  //               />
  //             </div>
  //             <div className="form-field">
  //               <label>End Date *</label>
  //               <input
  //                 type="date"
  //                 value={newProject.endDate}
  //                 onChange={(e) => setNewProject(prev => ({...prev, endDate: e.target.value}))}
  //                 required
  //               />
  //             </div>
  //             <div className="form-field">
  //               <label>Budget (₹)</label>
  //               <input
  //                 type="text"
  //                 value={newProject.budget}
  //                 onChange={(e) => setNewProject(prev => ({...prev, budget: e.target.value}))}
  //                 placeholder="₹0.00"
  //               />
  //             </div>
  //             <div className="form-field">
  //               <label>Assigned To</label>
  //               <input
  //                 type="text"
  //                 value={newProject.assignedTo}
  //                 onChange={(e) => setNewProject(prev => ({...prev, assignedTo: e.target.value}))}
  //               />
  //             </div>
  //             <div className="form-field">
  //               <label>Status</label>
  //               <select
  //                 value={newProject.status}
  //                 onChange={(e) => setNewProject(prev => ({...prev, status: e.target.value}))}
  //               >
  //                 <option value="planning">Planning</option>
  //                 <option value="in-progress">In Progress</option>
  //                 <option value="on-hold">On Hold</option>
  //                 <option value="completed">Completed</option>
  //                 <option value="cancelled">Cancelled</option>
  //               </select>
  //             </div>
  //             <div className="form-field">
  //               <label>Priority</label>
  //               <select
  //                 value={newProject.priority}
  //                 onChange={(e) => setNewProject(prev => ({...prev, priority: e.target.value}))}
  //               >
  //                 <option value="low">Low</option>
  //                 <option value="medium">Medium</option>
  //                 <option value="high">High</option>
  //                 <option value="urgent">Urgent</option>
  //               </select>
  //             </div>
  //             <div className="form-field full-width">
  //               <label>Notes</label>
  //               <textarea
  //                 value={newProject.notes}
  //                 onChange={(e) => setNewProject(prev => ({...prev, notes: e.target.value}))}
  //                 rows="2"
  //               />
  //             </div>
  //           </div>
  //           <div className="modal-actions">
  //             <button type="button" className="secondary-button" onClick={() => setIsAddProjectModalOpen(false)}>
  //               Cancel
  //             </button>
  //             <button type="submit" className="primary-button">
  //               {editingItem ? 'Update Project' : 'Add Project'}
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // };

  const AddQuotationModal = () => {
    if (!isAddQuotationModalOpen) return null;
    
    return (
      <div className="modal active large">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{editingItem ? 'Edit Quotation' : 'Create New Quotation'}</h3>
            <button className="close-btn" onClick={() => setIsAddQuotationModalOpen(false)}>
              <FaTimes />
            </button>
          </div>
          
          <div className="quotation-form">
            <div className="form-section">
              <h4>Customer Details</h4>
              <div className="form-grid">
                <div className="form-field">
                  <label>Customer Name *</label>
                  <input
                    type="text"
                    value={newQuotation.customerName}
                    onChange={(e) => handleQuotationFieldChange('customerName', e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Valid Until *</label>
                  <input
                    type="date"
                    value={newQuotation.validUntil}
                    onChange={(e) => handleQuotationFieldChange('validUntil', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Items</h4>
              <div className="item-form">
                <div className="form-grid compact">
                  <div className="form-field">
                    <label>Product Name</label>
                    <input
                      type="text"
                      value={newQuotationItem.productName}
                      onChange={(e) => setNewQuotationItem(prev => ({...prev, productName: e.target.value}))}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="form-field">
                    <label>Quantity</label>
                    <input
                      type="number"
                      value={newQuotationItem.quantity}
                      onChange={(e) => setNewQuotationItem(prev => ({...prev, quantity: parseInt(e.target.value) || 1}))}
                      min="1"
                    />
                  </div>
                  <div className="form-field">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      value={newQuotationItem.price}
                      onChange={(e) => setNewQuotationItem(prev => ({...prev, price: parseFloat(e.target.value) || 0}))}
                      step="0.01"
                    />
                  </div>
                  <div className="form-field">
                    <label>Total</label>
                    <input
                      type="text"
                      value={`₹${(newQuotationItem.quantity * newQuotationItem.price).toLocaleString()}`}
                      disabled
                    />
                  </div>
                  <div className="form-field">
                    <button type="button" className="outline-button" onClick={handleAddQuotationItem}>
                      <FaPlus /> Add Item
                    </button>
                  </div>
                </div>
              </div>

              {newQuotation.items.length > 0 && (
                <div className="items-list">
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newQuotation.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price.toLocaleString()}</td>
                          <td>₹{item.total.toLocaleString()}</td>
                          <td>
                            <button
                              type="button"
                              className="icon-btn delete"
                              onClick={() => handleRemoveQuotationItem(index)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="form-section">
              <h4>Pricing</h4>
              <div className="pricing-summary">
                <div className="price-row">
                  <span>Subtotal:</span>
                  <span>₹{newQuotation.subtotal.toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span>
                    Discount ({newQuotation.discount}%):
                    <input
                      type="number"
                      value={newQuotation.discount}
                      onChange={(e) => handleQuotationFieldChange('discount', e.target.value)}
                      className="discount-input"
                      min="0"
                      max="100"
                    />
                  </span>
                  <span>- ₹{newQuotation.discountAmount.toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span>
                    Tax ({newQuotation.taxRate}%):
                    <input
                      type="number"
                      value={newQuotation.taxRate}
                      onChange={(e) => handleQuotationFieldChange('taxRate', e.target.value)}
                      className="tax-input"
                      min="0"
                      max="30"
                    />
                  </span>
                  <span>₹{newQuotation.taxAmount.toLocaleString()}</span>
                </div>
                <div className="price-row total">
                  <span>Total:</span>
                  <span>₹{newQuotation.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* <div className="form-section">
              <h4>Additional Information</h4>
              <div className="form-field full-width">
                <label>Notes</label>
                <textarea
                  value={newQuotation.notes}
                  onChange={(e) => handleQuotationFieldChange('notes', e.target.value)}
                  rows="3"
                />
              </div>
              <div className="form-field full-width">
                <label>Terms & Conditions</label>
                <textarea
                  value={newQuotation.terms}
                  onChange={(e) => handleQuotationFieldChange('terms', e.target.value)}
                  rows="3"
                />
              </div>
            </div> */}
          </div>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={() => setIsAddQuotationModalOpen(false)}>
              Cancel
            </button>
            <button type="button" className="primary-button">
              {editingItem ? 'Update Quotation' : 'Create Quotation'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Role Selector Component
  const RoleSelector = () => (
    <div className="role-selector">
      <div className="role-section">
        <h3>Switch Role View</h3>
        <div className="role-buttons-grid">
          {Object.entries(roleConfig).map(([roleKey, role]) => {
            const IconComponent = role.icon;
            return (
              <button
                key={roleKey}
                className={`role-btn ${userRole === roleKey ? 'active' : ''}`}
                onClick={() => handleRoleChange(roleKey)}
                style={{ '--role-color': role.color }}
              >
              
                <div className="role-info">
                  <span className="role-name">{role.name}</span>
                </div>
               
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Dashboard Component
const Dashboard = () => {
  // First, check if user has access to view dashboard
  const canViewDashboard = userRole !== 'user' && hasAccess('view_reports');

  if (userRole === 'user') {
    return (
      <div className="tab-content">
        <div className="section-header-account">
          <h2>My Dashboard</h2>
        </div>
        {/* ... user dashboard content ... */}
      </div>
    );
  }

  // If no access and not user role, don't show anything
  if (!canViewDashboard) {
    return (
      <div className="tab-content">
        <div className="empty-state">
          <FaExclamationTriangle className="empty-icon" />
          <h3>Access Denied</h3>
          <p>You don't have permission to view the dashboard.</p>
        </div>
      </div>
    );
  }

  // Show loading only when there's no data
  if (loading && serviceBookings.length === 0 && orders.length === 0) {
    return (
      <div className="tab-content">
        <div className="loading-section">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      <div className="section-header-account">
        <h2>Dashboard Overview - {roleConfig[userRole]?.name || userRole}</h2>
        <div className="header-actions">
          {(userRole === 'branch' || userRole === 'engineer') && (
            <div className="branch-selector">
              <label>Branch: </label>
              <select 
                value={selectedBranch} 
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="branch-filter"
              >
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-stats">
        {/* Services Card - For ALL professional roles */}
        <div className="stat-card">
          <div className="stat-icon services">
            <FaTools />
          </div>
          <div className="stat-content">
            <h3>Total Services</h3>
            <div className="stat-number">{dashboardStats.totalServices}</div>
            <div className="stat-details">
              <span className="stat-detail pending">
                {dashboardStats.pendingServices} Pending
              </span>
              <span className="stat-detail completed">
                {dashboardStats.completedServices} Completed
              </span>
            </div>
          </div>
        </div>

        {/* Orders Card - For roles that can see orders */}
        {(userRole === 'super admin' || userRole === 'admin' || userRole === 'branch') && (
          <div className="stat-card">
            <div className="stat-icon orders">
              <FaShoppingCart />
            </div>
            <div className="stat-content">
              <h3>Total Orders</h3>
              <div className="stat-number">{dashboardStats.totalOrders}</div>
              <div className="stat-details">
                <span className="stat-detail pending">
                  {dashboardStats.pendingOrders} Pending
                </span>
                <span className="stat-detail completed">
                  {dashboardStats.completedOrders} Delivered
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Products Card - For admin and branch manager */}
        {(userRole === 'super admin' || userRole === 'admin' || userRole === 'branch') && (
          <div className="stat-card">
            <div className="stat-icon products">
              <FaBox />
            </div>
            <div className="stat-content">
              <h3>Total Products</h3>
              <div className="stat-number">{dashboardStats.totalProducts}</div>
              <div className="stat-details">
                <span className="stat-detail">Active Products</span>
              </div>
            </div>
          </div>
        )}

        {/* Customers Card - For admin and branch manager */}
        {(userRole === 'super admin' || userRole === 'admin' || userRole === 'branch') && (
          <div className="stat-card">
            <div className="stat-icon customers">
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3>Total Customers</h3>
              <div className="stat-number">{dashboardStats.totalCustomers}</div>
              <div className="stat-details">
                <span className="stat-detail">Registered Customers</span>
              </div>
            </div>
          </div>
        )}

        {/* Revenue Card - For admin and branch manager */}
        {(userRole === 'super admin' || userRole === 'admin' || userRole === 'branch') && (
          <div className="stat-card revenue">
            <div className="stat-icon revenue">
              <FaRupeeSign />
            </div>
            <div className="stat-content">
              <h3>Total Revenue</h3>
              <div className="stat-number">₹{dashboardStats.totalRevenue.toLocaleString()}</div>
              <div className="stat-details">
                <span className="stat-detail positive">This Month</span>
              </div>
            </div>
          </div>
        )}

        {/* Engineer Specific Stats */}
        {userRole === 'engineer' && (
          <>
            <div className="stat-card">
              <div className="stat-icon completed">
                <FaCheckCircle />
              </div>
              <div className="stat-content">
                <h3>Completion Rate</h3>
                <div className="stat-number">
                  {dashboardStats.totalServices > 0 
                    ? Math.round((dashboardStats.completedServices / dashboardStats.totalServices) * 100) 
                    : 0}%
                </div>
                <div className="stat-details">
                  <span className="stat-detail">Services Completed</span>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon in-progress">
                <FaClock />
              </div>
              <div className="stat-content">
                <h3>In Progress</h3>
                <div className="stat-number">
                  {dashboardStats.totalServices - dashboardStats.completedServices - dashboardStats.pendingServices}
                </div>
                <div className="stat-details">
                  <span className="stat-detail">Active Services</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Quotations Card - For admin and branch manager */}
        {(userRole === 'super admin' || userRole === 'admin' || userRole === 'branch') && (
          <div className="stat-card">
            <div className="stat-icon quotations">
              <FaFileInvoice />
            </div>
            <div className="stat-content">
              <h3>Total Quotations</h3>
              <div className="stat-number">{dashboardStats.totalQuotations}</div>
              <div className="stat-details">
                <span className="stat-detail">Active Quotes</span>
              </div>
            </div>
          </div>
        )}

        {/* Branches Card - For super admin and admin */}
        {(userRole === 'super admin' || userRole === 'admin') && (
          <div className="stat-card">
            <div className="stat-icon branches">
              <FaBuilding />
            </div>
            <div className="stat-content">
              <h3>Total Branches</h3>
              <div className="stat-number">{dashboardStats.totalBranches}</div>
              <div className="stat-details">
                <span className="stat-detail">Active Branches</span>
              </div>
            </div>
          </div>
        )}

        {/* Users Card - For super admin only */}
        {userRole === 'super admin' && (
          <div className="stat-card">
            <div className="stat-icon users">
              <FaUserShield />
            </div>
            <div className="stat-content">
              <h3>Total Users</h3>
              <div className="stat-number">{dashboardStats.totalUsers}</div>
              <div className="stat-details">
                <span className="stat-detail">System Users</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activities Section */}
      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <div className="activities-grid">
          {/* Recent Services - For all professional roles */}
          <div className="activity-section">
            <h4>Recent Services</h4>
            <div className="activity-list">
              {serviceBookings.slice(0, 5).map(service => (
                <div key={service.id} className="activity-item">
                  <div className="activity-icon">
                    <FaTools />
                  </div>
                  <div className="activity-details">
                    <div className="activity-title">{service.laptopModel}</div>
                    <div className="activity-subtitle">{service.serviceType}</div>
                    <div className="activity-meta">
                      <span className={`status ${service.status}`}>{service.status}</span>
                      <span className="date">{service.bookingDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders - For roles that can see orders */}
          {(userRole === 'super admin' || userRole === 'admin' || userRole === 'branch') && (
            <div className="activity-section">
              <h4>Recent Orders</h4>
              <div className="activity-list">
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} className="activity-item">
                    <div className="activity-icon">
                      <FaShoppingCart />
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">{order.product}</div>
                      <div className="activity-subtitle">{order.customerName}</div>
                      <div className="activity-meta">
                        <span className={`status ${order.status}`}>{order.status}</span>
                        <span className="date">{order.orderDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Engineer's Assigned Services */}
          {userRole === 'engineer' && (
            <div className="activity-section">
              <h4>My Assigned Services</h4>
              <div className="activity-list">
                {serviceBookings
                  .filter(service => service.technician === userData.name)
                  .slice(0, 5)
                  .map(service => (
                    <div key={service.id} className="activity-item">
                      <div className="activity-icon">
                        <FaTools />
                      </div>
                      <div className="activity-details">
                        <div className="activity-title">{service.laptopModel}</div>
                        <div className="activity-subtitle">{service.customerName}</div>
                        <div className="activity-meta">
                          <span className={`status ${service.status}`}>{service.status}</span>
                          <span className="priority">High</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

  // Users Component (Super Admin only)
  const Users = () => {
    if (userRole !== 'super admin') return null;

    return (
      <div className="tab-content">
        <div className="section-header-account">
          <h2>User </h2>
          <div className="header-actions">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button className="primary-button">
              <FaPlus />
              Add User
            </button>
          </div>
        </div>

        <div className="houseState-content" style={{ overflowX: "auto" }}>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th className="w-5">S.NO</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Branch</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td className="text-center w-5">{index + 1}</td>
                    <td className="text-left">{user.id}</td>
                    <td className="text-left">{user.name}</td>
                    <td className="text-left">{user.email}</td>
                    <td className="text-center">
                      <span className={`role-badge ${user.role}`}>
                        {roleConfig[user.role]?.name || user.role}
                      </span>
                    </td>
                    <td className="text-left">{user.branch}</td>
                    <td className="text-center">
                      <span className={`status-badge ${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="action-buttons">
                        <button className="icon-btn edit" title="Edit">
                          <FaEdit />
                        </button>
                        <button className="icon-btn view" title="View">
                          <FaEye />
                        </button>
                        <button className="icon-btn delete" title="Delete">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Projects Component
  // const Projects = () => {
  //   if (!hasAccess('manage_projects') && userRole !== 'engineer') return null;

  //   return (
  //     <div className="tab-content">
  //       <div className="section-header">
  //         <h2>Project </h2>
  //         <div className="header-actions">
  //           <div className="search-box">
  //             <FaSearch className="search-icon" />
  //             <input
  //               type="text"
  //               placeholder="Search projects..."
  //               value={searchTerm}
  //               onChange={(e) => setSearchTerm(e.target.value)}
  //               className="search-input"
  //             />
  //           </div>
  //           <button 
  //             className="primary-button"
  //             onClick={() => {
  //               setEditingItem(null);
  //               setNewProject({
  //                 name: '',
  //                 description: '',
  //                 customerId: '',
  //                 customerName: '',
  //                 startDate: '',
  //                 endDate: '',
  //                 status: 'planning',
  //                 budget: '',
  //                 assignedTo: '',
  //                 priority: 'medium',
  //                 notes: ''
  //               });
  //               setIsAddProjectModalOpen(true);
  //             }}
  //           >
  //             <FaPlus />
  //             Add Project
  //           </button>
  //         </div>
  //       </div>

  //       <div className="houseState-content" style={{ overflowX: "auto" }}>
  //         <div className="table-container">
  //           <table className="custom-table">
  //             <thead>
  //               <tr>
  //                 <th className="w-5">S.NO</th>
  //                 <th>Project ID</th>
  //                 <th>Project Name</th>
  //                 <th>Customer</th>
  //                 <th>Start Date</th>
  //                 <th>End Date</th>
  //                 <th>Status</th>
  //                 <th>Priority</th>
  //                 <th>Budget</th>
  //                 <th>Actions</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {filteredProjects.length > 0 ? (
  //                 filteredProjects.map((project, index) => (
  //                   <tr key={project.id}>
  //                     <td className="text-center w-5">{index + 1}</td>
  //                     <td className="text-left">{project.id}</td>
  //                     <td className="text-left">{project.name}</td>
  //                     <td className="text-left">{project.customerName}</td>
  //                     <td className="text-left">{project.startDate}</td>
  //                     <td className="text-left">{project.endDate}</td>
  //                     <td className="text-center">
  //                       <span className={`status-badge ${project.status}`}>
  //                         {project.status}
  //                       </span>
  //                     </td>
  //                     <td className="text-center">
  //                       <span className={`priority-badge ${project.priority}`}>
  //                         {project.priority}
  //                       </span>
  //                     </td>
  //                     <td className="text-left">{project.budget}</td>
  //                     <td className="text-center">
  //                       <div className="action-buttons">
  //                         <button 
  //                           className="icon-btn edit"
  //                           onClick={() => handleEditProject(project)}
  //                           title="Edit"
  //                         >
  //                           <FaEdit />
  //                         </button>
  //                         <button className="icon-btn view" title="View">
  //                           <FaEye />
  //                         </button>
  //                         <button 
  //                           className="icon-btn delete"
  //                           onClick={() => handleDeleteProject(project.id)}
  //                           title="Delete"
  //                         >
  //                           <FaTrash />
  //                         </button>
  //                       </div>
  //                     </td>
  //                   </tr>
  //                 ))
  //               ) : (
  //                 <tr>
  //                   <td colSpan="10" className="text-center">
  //                     No projects found
  //                   </td>
  //                 </tr>
  //               )}
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // Services Component
  const Services = () => {
    const serviceStats = {
      total: filteredServices.length,
      pending: filteredServices.filter(s => s.status === 'pending').length,
      inProgress: filteredServices.filter(s => s.status === 'in-progress').length,
      completed: filteredServices.filter(s => s.status === 'completed').length
    };

    return (
      <div className="tab-content">
        <div className="section-header-account">
          <h2>Service Bookings</h2>
          {(userRole === 'admin' || userRole === 'engineer') && (
            <div className="branch-selector">
              <label>Branch: </label>
              <select 
                value={selectedBranch} 
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="branch-filter"
              >
                <option value="all">All Branches</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Service Statistics */}
        <div className="service-stats">
          <div className="stat-item">
            <div className="stat-number">{serviceStats.total}</div>
            <div className="stat-label">Total Services</div>
          </div>
          <div className="stat-item">
            <div className="stat-number pending">{serviceStats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-item">
            <div className="stat-number in-progress">{serviceStats.inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-item">
            <div className="stat-number completed">{serviceStats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        <div className="services-container">
          <div className="services-grid">
            {filteredServices.map(service => (
              <div key={service.id} className="service-item">
                <div className="service-header">
                  <div className="service-id">{service.id}</div>
                  <div className={`service-status ${service.status}`}>
                    {getStatusIcon(service.status)}
                    {getStatusText(service.status)}
                  </div>
                </div>
                
                {(userRole === 'engineer' || userRole === 'admin') && service.customerName && (
                  <div className="detail-item">
                    <span className="detail-label">Customer:</span>
                    <span className="detail-value">{service.customerName}</span>
                  </div>
                )}
                
                {(userRole === 'engineer' || userRole === 'admin') && service.branchName && (
                  <div className="detail-item">
                    <span className="detail-label">Branch:</span>
                    <span className="detail-value">{service.branchName}</span>
                  </div>
                )}
                
                <div className="service-details-content">
                  <div className="detail-item">
                    <span className="detail-label">Laptop Model:</span>
                    <span className="detail-value">{service.laptopModel}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Service Type:</span>
                    <span className="detail-value">{service.serviceType}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Booking Date:</span>
                    <span className="detail-value">{service.bookingDate}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Estimated Cost:</span>
                    <span className="detail-value">{service.estimatedCost}</span>
                  </div>
                  
                  {service.technician && (
                    <div className="detail-item">
                      <span className="detail-label">Technician:</span>
                      <span className="detail-value">{service.technician}</span>
                    </div>
                  )}
                  
                  {service.finalCost && (
                    <div className="detail-item">
                      <span className="detail-label">Final Cost:</span>
                      <span className="detail-value highlight">{service.finalCost}</span>
                    </div>
                  )}
                  
                  {service.completionDate && (
                    <div className="detail-item">
                      <span className="detail-label">Completed On:</span>
                      <span className="detail-value">{service.completionDate}</span>
                    </div>
                  )}
                </div>
                
                {service.status === 'in-progress' && userRole === 'user' && (
                  <div className="service-actions">
                    <button className="outline-button">Track Service</button>
                    <button className="outline-button">Contact Technician</button>
                  </div>
                )}

                {(userRole === 'engineer' || userRole === 'admin') && (
                  <div className="service-actions">
                    <button className="outline-button">Update Status</button>
                    <button className="outline-button">View Details</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {filteredServices.length === 0 && (
          <div className="empty-state">
            <FaTools className="empty-icon" />
            <h3>No Service Bookings</h3>
            <p>Your service bookings will appear here once you book a service.</p>
          </div>
        )}
      </div>
    );
  };

  // Orders Component
  const Orders = () => {
    const orderStats = {
      total: filteredOrders.length,
      pending: filteredOrders.filter(o => o.status === 'pending').length,
      shipped: filteredOrders.filter(o => o.status === 'shipped').length,
      delivered: filteredOrders.filter(o => o.status === 'delivered').length
    };

    return (
      <div className="tab-content">
        <div className="section-header-account">
          <h2>Order History</h2>
          {(userRole === 'admin' || userRole === 'engineer') && (
            <div className="branch-selector">
              <label>Branch: </label>
              <select 
                value={selectedBranch} 
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="branch-filter"
              >
                <option value="all">All Branches</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Order Statistics */}
        <div className="order-stats">
          <div className="stat-item">
            <div className="stat-number">{orderStats.total}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-item">
            <div className="stat-number pending">{orderStats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-item">
            <div className="stat-number shipped">{orderStats.shipped}</div>
            <div className="stat-label">Shipped</div>
          </div>
          <div className="stat-item">
            <div className="stat-number delivered">{orderStats.delivered}</div>
            <div className="stat-label">Delivered</div>
          </div>
        </div>
        <div className="houseState-content" style={{ overflowX: "auto" }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th className="w-5">S.NO</th>
                <th>Order ID</th>
                {(userRole === 'engineer' || userRole === 'admin') && <th>Customer</th>}
                {(userRole === 'engineer' || userRole === 'admin') && <th>Branch</th>}
                <th>Product</th>
                <th>Order Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={order.id}>
                    <td className="text-center w-5">{index + 1}</td>
                    <td className="text-left">{order.id}</td>
                    {(userRole === 'engineer' || userRole === 'admin') && (
                      <td className="text-left">{order.customerName}</td>
                    )}
                    {(userRole === 'engineer' || userRole === 'admin') && (
                      <td className="text-left">{order.branchName}</td>
                    )}
                    <td className="text-left">{order.product}</td>
                    <td className="text-left">{order.orderDate}</td>
                    <td className="text-left">{order.price}</td>
                    <td className="text-center">
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="action-buttons">
                        <button className="icon-btn view" title="View Details">
                          <FaEye />
                        </button>
                        {userRole === 'admin' && (
                          <button className="icon-btn edit" title="Edit Order">
                            <FaEdit />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
</div>
        {filteredOrders.length === 0 && (
          <div className="empty-state">
            <FaShoppingCart className="empty-icon" />
            <h3>No Orders Yet</h3>
            <p>Your order history will appear here once you make a purchase.</p>
          </div>
        )}
      </div>
    );
  };

  // Products Component - Table Version
  const Products = () => {
    return (
      <div className="tab-content">
        <div className="section-header-account">
          <h2>Products</h2>
          <div className="header-actions">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button 
              className="primary-button"
              onClick={() => {
                setEditingItem(null);
                setNewProduct({
                  name: '',
                  category: '',
                  price: '',
                  stock: '',
                  description: '',
                  specifications: '',
                  warranty: '1 year',
                  status: 'active'
                });
                setIsAddProductModalOpen(true);
              }}
            >
              <FaPlus />
              Add Product
            </button>
          </div>
        </div>
        <div className="houseState-content" style={{ overflowX: "auto" }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th className="w-5">S.NO</th>
                <th>Product ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Warranty</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td className="text-center w-5">{index + 1}</td>
                    <td className="text-left">{product.id}</td>
                    <td className="text-left">{product.name}</td>
                    <td className="text-left">{product.category}</td>
                    <td className="text-left">{product.price}</td>
                    <td className="text-center">{product.stock}</td>
                    <td className="text-left">{product.warranty}</td>
                    <td className="text-center">
                      <span className={`status-badge ${product.status}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="action-buttons">
                        <button 
                          className="icon-btn edit"
                          onClick={() => handleEditProduct(product)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button className="icon-btn view" title="View">
                          <FaEye />
                        </button>
                        <button 
                          className="icon-btn delete"
                          onClick={() => handleDeleteProduct(product.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div></div>
      </div>
    );
  };

  // Customers Component - Table Version
  const Customers = () => {
    return (
      <div className="tab-content">
        <div className="section-header-account">
          <h2>Customers</h2>
          <div className="header-actions">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button 
              className="primary-button"
              onClick={() => {
                setEditingItem(null);
                setNewCustomer({
                  name: '',
                  email: '',
                  phone: '',
                  type: 'individual',
                  companyName: '',
                  gstNumber: '',
                  billingAddress: '',
                  shippingAddress: '',
                  notes: ''
                });
                setIsAddCustomerModalOpen(true);
              }}
            >
              <FaPlus />
              Add Customer
            </button>
          </div>
        </div>
        <div className="houseState-content" style={{ overflowX: "auto" }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th className="w-5">S.NO</th>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Type</th>
                <th>Since</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, index) => (
                  <tr key={customer.id}>
                    <td className="text-center w-5">{index + 1}</td>
                    <td className="text-left">{customer.id}</td>
                    <td className="text-left">{customer.name}</td>
                    <td className="text-left">{customer.email}</td>
                    <td className="text-left">{customer.phone}</td>
                    <td className="text-center">
                      <span className={`status-badge ${customer.type}`}>
                        {customer.type}
                      </span>
                    </td>
                    <td className="text-left">{customer.createdAt}</td>
                    <td className="text-center">
                      <div className="action-buttons">
                        <button 
                          className="icon-btn edit"
                          onClick={() => handleEditCustomer(customer)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button className="icon-btn view" title="View">
                          <FaEye />
                        </button>
                        <button 
                          className="icon-btn delete"
                          onClick={() => handleDeleteCustomer(customer.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    );
  };

  // Quotations Component - Table Version
const Quotations = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  // Function to open view modal
  const handleViewQuotation = (quote) => {
    setSelectedQuotation(quote);
    setViewModalOpen(true);
  };

  // Function to format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch (error) {
    return 'Invalid Date';
  }
};
const loadImageAsBase64 = async (imagePath) => {
  try {
    // For production, use the actual image path
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error loading image:', error);
    // Fallback to a simple logo
    return null;
  }
};
const downloadQuotationPDF = async (quotation) => {
  try {
    setGeneratingPDF(true);
    
    // Load company logo
    const logoBase64 = await loadImageAsBase64('/assets/logo-newton.png');
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    
    // Set default font
    pdf.setFont('helvetica');
    
    // Add Header - MODIFIED: Only logo, no text
    const addHeader = (currentY) => {
      // Try to add logo if available
      if (logoBase64) {
        try {
          // Add logo in left corner
          pdf.addImage(logoBase64, 'PNG', margin, 15, 30, 30);
        } catch (error) {
          console.log('Error adding logo:', error);
        }
      }
      
      // Quotation title on right side
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(59, 130, 246);
      pdf.text('QUOTATION', pageWidth - margin, 30, { align: 'right' });
      
      return currentY + 40;
    };
    
    // Add Company and Customer Info
    const addInfoSection = (currentY) => {
      const sectionHeight = 40;
      
      // Company info box
      pdf.setFillColor(249, 250, 251);
      pdf.rect(margin, currentY, pageWidth/2 - margin - 5, sectionHeight, 'F');
      pdf.setDrawColor(229, 231, 235);
      pdf.rect(margin, currentY, pageWidth/2 - margin - 5, sectionHeight);
      
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(107, 114, 128);
      pdf.text('FROM:', margin + 5, currentY + 8);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(31, 41, 55);
      
      const companyInfo = [
        'Laptop Service Hub',
        'Chennai, Tamil Nadu',
        'Phone: +91 98406 04073',
        'Email: info@laptopservicehub.com',
        'GSTIN: 33ABCDE1234F1Z5'
      ];
      
      companyInfo.forEach((line, index) => {
        pdf.text(line, margin + 5, currentY + 15 + (index * 4));
      });
      
      // Customer info box
      pdf.setFillColor(249, 250, 251);
      pdf.rect(pageWidth/2 + 5, currentY, pageWidth/2 - margin - 5, sectionHeight, 'F');
      pdf.setDrawColor(229, 231, 235);
      pdf.rect(pageWidth/2 + 5, currentY, pageWidth/2 - margin - 5, sectionHeight);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(107, 114, 128);
      pdf.text('BILL TO:', pageWidth/2 + 10, currentY + 8);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(31, 41, 55);
      
      pdf.text(quotation.customerName, pageWidth/2 + 10, currentY + 15);
      if (quotation.customerId) {
        pdf.setFontSize(8);
        pdf.text(`ID: ${quotation.customerId}`, pageWidth/2 + 10, currentY + 19);
      }
      
      return currentY + sectionHeight + 10;
    };
    
    // Add Quotation Details
    const addQuotationDetails = (currentY) => {
      const details = [
        { label: 'Quotation #', value: quotation.id },
        { label: 'Date', value: formatDate(quotation.createdDate || new Date().toISOString()) },
        { label: 'Valid Until', value: formatDate(quotation.validUntil) },
        { label: 'Branch', value: quotation.branchName || 'N/A' },
        { label: 'Status', value: quotation.status.toUpperCase() }
      ];
      
      pdf.setFontSize(9);
      pdf.setTextColor(75, 85, 99);
      
      details.forEach((detail, index) => {
        const yPos = currentY + (index * 5);
        pdf.text(`${detail.label}:`, margin, yPos);
        pdf.text(detail.value, pageWidth - margin, yPos, { align: 'right' });
      });
      
      return currentY + 30;
    };
    
    // Add Items Table
    const addItemsTable = (currentY) => {
      const tableTop = currentY + 5;
      const colWidths = [10, 70, 20, 25, 25]; // Widths in mm
      const colPositions = [margin];
      
      // Calculate column positions
      for (let i = 1; i < colWidths.length; i++) {
        colPositions[i] = colPositions[i - 1] + colWidths[i - 1];
      }
      
      // Table header
      pdf.setFillColor(243, 244, 246);
      pdf.rect(margin, tableTop, pageWidth - (2 * margin), 8, 'F');
      
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(55, 65, 81);
      
      const headers = ['#', 'Description', 'Qty', 'Price', 'Amount'];
      headers.forEach((header, index) => {
        const align = index >= 3 ? 'right' : 'left';
        pdf.text(header, colPositions[index], tableTop + 5, { align });
      });
      
      // Table rows
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(31, 41, 55);
      let rowY = tableTop + 14;
      
      quotation.items.forEach((item, index) => {
        // Check for page break
        if (rowY > pageHeight - 40) {
          pdf.addPage();
          rowY = margin + 15;
        }
        
        // Row background (alternating)
        if (index % 2 === 0) {
          pdf.setFillColor(249, 250, 251);
          pdf.rect(margin, rowY - 4, pageWidth - (2 * margin), 8, 'F');
        }
        
        // Row data
        pdf.text((index + 1).toString(), colPositions[0], rowY);
        
        // Product name (with word wrap)
        const maxWidth = colWidths[1] - 2;
        const productLines = pdf.splitTextToSize(item.productName, maxWidth);
        productLines.forEach((line, lineIndex) => {
          pdf.text(line, colPositions[1], rowY + (lineIndex * 4));
        });
        
        pdf.text(item.quantity.toString(), colPositions[2], rowY, { align: 'center' });
        pdf.text(`₹${parseFloat(item.price).toFixed(2)}`, colPositions[3], rowY, { align: 'right' });
        pdf.text(`₹${(item.quantity * item.price).toFixed(2)}`, colPositions[4], rowY, { align: 'right' });
        
        // Move Y position based on product description height
        rowY += Math.max(8, productLines.length * 4);
      });
      
      return rowY + 10;
    };
    
    // Add Totals
    const addTotals = (currentY) => {
      const subtotal = parseFloat(quotation.subtotal?.replace('₹', '').replace(/,/g, '') || 0);
      const discountAmount = parseFloat(quotation.discountAmount?.replace('₹', '').replace(/,/g, '') || 0);
      const taxAmount = parseFloat(quotation.taxAmount?.replace('₹', '').replace(/,/g, '') || 0);
      const total = parseFloat(quotation.total?.replace('₹', '').replace(/,/g, '') || 0);
      
      const totalsX = pageWidth - margin - 80;
      
      const totals = [
        { label: 'Subtotal:', value: subtotal },
        { label: `Discount (${quotation.discount || 0}%):`, value: -discountAmount },
        { label: `Tax (${quotation.taxRate || 18}%):`, value: taxAmount },
        { label: 'Total:', value: total, isTotal: true }
      ];
      
      let totalY = currentY;
      
      totals.forEach((item, index) => {
        pdf.setFontSize(item.isTotal ? 11 : 10);
        pdf.setFont('helvetica', item.isTotal ? 'bold' : 'normal');
        
        if (item.isTotal) {
          pdf.setTextColor(5, 150, 105);
          // Add separator line
          pdf.setDrawColor(229, 231, 235);
          pdf.line(totalsX, totalY - 2, pageWidth - margin, totalY - 2);
          totalY += 2;
        } else if (item.value < 0) {
          pdf.setTextColor(220, 38, 38);
        } else {
          pdf.setTextColor(75, 85, 99);
        }
        
        pdf.text(item.label, totalsX, totalY);
        pdf.text(`₹${item.value.toFixed(2)}`, pageWidth - margin, totalY, { align: 'right' });
        
        totalY += item.isTotal ? 8 : 6;
      });
      
      return totalY + 10;
    };
    
    // Add Notes and Terms
    const addNotesAndTerms = (currentY) => {
      const sectionWidth = (pageWidth - (3 * margin)) / 2;
      
      // Notes section
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(107, 114, 128);
      pdf.text('NOTES:', margin, currentY);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(75, 85, 99);
      
      const notes = quotation.notes || 'No notes provided.';
      const notesLines = pdf.splitTextToSize(notes, sectionWidth);
      notesLines.forEach((line, index) => {
        pdf.text(line, margin, currentY + 7 + (index * 4));
      });
      
      // Terms section
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(107, 114, 128);
      pdf.text('TERMS & CONDITIONS:', margin + sectionWidth + margin, currentY);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(75, 85, 99);
      
      const terms = quotation.terms || 
        '1. Prices are valid for 30 days from date of quotation\n' +
        '2. Payment due within 15 days of invoice date\n' +
        '3. Warranty as per individual product terms\n' +
        '4. Delivery charges may apply\n' +
        '5. Taxes extra as applicable';
      
      const termsLines = pdf.splitTextToSize(terms, sectionWidth);
      termsLines.forEach((line, index) => {
        pdf.text(line, margin + sectionWidth + margin, currentY + 7 + (index * 4));
      });
      
      return currentY + Math.max(notesLines.length, termsLines.length) * 4 + 15;
    };
    
    // Add Footer
    const addFooter = (currentY) => {
      // Signature line
      pdf.setDrawColor(55, 65, 81);
      pdf.line(margin, currentY, margin + 80, currentY);
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(107, 114, 128);
      pdf.text('Authorized Signature', margin, currentY + 5);
      
      // Thank you message
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(31, 41, 55);
      pdf.text('Thank you for your business!', pageWidth / 2, currentY, { align: 'center' });
      
      // Contact info
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(107, 114, 128);
      
      const contactInfo = [
        'Laptop Service Hub | Chennai, Tamil Nadu',
        'Phone: +91 98406 04073 | Email: info@laptopservicehub.com'
      ];
      
      contactInfo.forEach((line, index) => {
        pdf.text(line, pageWidth / 2, currentY + 10 + (index * 4), { align: 'center' });
      });
      
      // Page number
      pdf.text(`Page 1 of 1 | Generated on ${formatDate(new Date().toISOString())}`, 
               pageWidth / 2, pageHeight - 10, { align: 'center' });
    };
    
    // Build the PDF
    let currentY = margin;
    
    currentY = addHeader(currentY);
    currentY = addInfoSection(currentY);
    currentY = addQuotationDetails(currentY);
    currentY = addItemsTable(currentY);
    currentY = addTotals(currentY);
    
    // Check if we need a new page for notes
    if (currentY > pageHeight - 80) {
      pdf.addPage();
      currentY = margin;
    }
    
    currentY = addNotesAndTerms(currentY);
    addFooter(currentY);
    
    // Save the PDF
    pdf.save(`Quotation-${quotation.id}.pdf`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  } finally {
    setGeneratingPDF(false);
  }
};

// Alternative method using html2canvas for exact UI representation
const downloadQuotationAsHTML2PDF = async (quotation) => {
  try {
    setGeneratingPDF(true);
    
    // Create a temporary container
    const tempDiv = document.createElement('div');
    tempDiv.id = 'quotation-pdf-print';
    tempDiv.style.cssText = `
      position: fixed;
      left: -10000px;
      top: -10000px;
      width: 210mm;
      min-height: 297mm;
      padding: 15mm;
      background: white;
      font-family: 'Arial', sans-serif;
      color: #333;
    `;
    
    // Build HTML content - MODIFIED: Only logo, no text
    tempDiv.innerHTML = `
      <div style="width: 100%;">
        <!-- Header - MODIFIED: Only logo -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #3b82f6;">
          <div style="display: flex; align-items: center; gap: 15px;">
            <div style="width: 120px; height: 120px; display: flex; align-items: center; justify-content: center;">
              <img src="/assets/logo-newton.png" alt="Logo" style="width: 120px; height: auto; object-fit: contain;">
            </div>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 28px; font-weight: 800; color: #3b82f6; letter-spacing: 1px;">QUOTATION</h2>
          </div>
        </div>
        
        <!-- Quotation Details -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
          <div style="flex: 1;">
            <h3 style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Bill To</h3>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${quotation.customerName}</p>
              ${quotation.customerId ? `<p style="margin: 0; color: #6b7280; font-size: 12px;">Customer ID: ${quotation.customerId}</p>` : ''}
            </div>
          </div>
          
          <div style="flex: 1; padding-left: 30px;">
            <h3 style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Quotation Details</h3>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #6b7280;">Quotation #:</span>
                <span style="font-weight: 600; color: #1f2937;">${quotation.id}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #6b7280;">Date:</span>
                <span style="font-weight: 600; color: #1f2937;">${formatDate(quotation.createdDate || new Date().toISOString())}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #6b7280;">Valid Until:</span>
                <span style="font-weight: 600; color: #1f2937;">${formatDate(quotation.validUntil)}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280;">Status:</span>
                <span style="font-weight: 600; color: ${
                  quotation.status === 'sent' ? '#059669' : 
                  quotation.status === 'pending' ? '#f59e0b' : '#6b7280'
                };">${quotation.status.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Items Table -->
        <div style="margin-bottom: 30px;">
          <h3 style="margin: 0 0 15px 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Items</h3>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb;">
            <thead>
              <tr style="background: #f3f4f6;">
                <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb; font-size: 11px; color: #374151;">#</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb; font-size: 11px; color: #374151;">Description</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #e5e7eb; font-size: 11px; color: #374151;">Qty</th>
                <th style="padding: 12px; text-align: right; border: 1px solid #e5e7eb; font-size: 11px; color: #374151;">Unit Price</th>
                <th style="padding: 12px; text-align: right; border: 1px solid #e5e7eb; font-size: 11px; color: #374151;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${quotation.items.map((item, index) => `
                <tr style="${index % 2 === 0 ? 'background: #f9fafb;' : ''}">
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-size: 11px;">${index + 1}</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">
                    <div style="font-weight: 600; font-size: 11px; color: #1f2937;">${item.productName}</div>
                    ${item.productId ? `<div style="font-size: 10px; color: #6b7280;">SKU: ${item.productId}</div>` : ''}
                  </td>
                  <td style="padding: 10px; text-align: center; border: 1px solid #e5e7eb; font-size: 11px;">${item.quantity}</td>
                  <td style="padding: 10px; text-align: right; border: 1px solid #e5e7eb; font-size: 11px;">₹${parseFloat(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td style="padding: 10px; text-align: right; border: 1px solid #e5e7eb; font-size: 11px; font-weight: 600;">₹${(item.quantity * item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <!-- Totals -->
        <div style="margin-left: auto; width: 300px; margin-bottom: 40px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;">
            <span style="color: #6b7280; font-size: 13px;">Subtotal:</span>
            <span style="font-weight: 600; color: #1f2937; font-size: 13px;">₹${parseFloat(quotation.subtotal?.replace('₹', '').replace(/,/g, '') || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;">
            <span style="color: #6b7280; font-size: 13px;">Discount (${quotation.discount || 0}%):</span>
            <span style="font-weight: 600; color: #dc2626; font-size: 13px;">- ₹${parseFloat(quotation.discountAmount?.replace('₹', '').replace(/,/g, '') || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;">
            <span style="color: #6b7280; font-size: 13px;">Tax (${quotation.taxRate || 18}%):</span>
            <span style="font-weight: 600; color: #1f2937; font-size: 13px;">₹${parseFloat(quotation.taxAmount?.replace('₹', '').replace(/,/g, '') || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 2px solid #3b82f6;">
            <span style="font-weight: 700; color: #1f2937; font-size: 16px;">Total Amount:</span>
            <span style="font-weight: 800; color: #059669; font-size: 18px;">₹${parseFloat(quotation.total?.replace('₹', '').replace(/,/g, '') || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        
        <!-- Notes & Terms -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px; padding-top: 30px; border-top: 2px solid #e5e7eb;">
          <div>
            <h4 style="margin: 0 0 10px 0; color: #6b7280; font-size: 11px; text-transform: uppercase;">Notes</h4>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; font-size: 11px; color: #4b5563; min-height: 80px;">
              ${quotation.notes || 'No additional notes.'}
            </div>
          </div>
          <div>
            <h4 style="margin: 0 0 10px 0; color: #6b7280; font-size: 11px; text-transform: uppercase;">Terms & Conditions</h4>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; font-size: 11px; color: #4b5563; min-height: 80px; white-space: pre-line;">
              ${quotation.terms || '1. Prices are valid for 30 days\n2. Payment due within 15 days\n3. Warranty as per product terms\n4. Delivery charges may apply\n5. Taxes extra as applicable'}
            </div>
          </div>
        </div>
        
        <!-- Footer - MODIFIED: Remove company name references -->
        <div style="display: flex; justify-content: space-between; padding-top: 30px; border-top: 2px solid #3b82f6; font-size: 11px; color: #6b7280;">
          <div>
            <div style="width: 150px; height: 1px; background: #374151; margin-bottom: 10px;"></div>
            <p style="margin: 0;">Authorized Signature</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0 0 10px 0; font-weight: 600; color: #1f2937;">Thank you for your business!</p>
            <p style="margin: 5px 0;">Phone: +91 98406 04073</p>
            <p style="margin: 5px 0;">Email: info@laptopservicehub.com</p>
          </div>
        </div>
        
        <!-- Generation Info -->
        <div style="margin-top: 30px; text-align: center; font-size: 9px; color: #9ca3af;">
          <p style="margin: 0;">Generated on ${formatDate(new Date().toISOString())} | Quotation ID: ${quotation.id}</p>
        </div>
      </div>
    `;
   
    
    document.body.appendChild(tempDiv);
    
    // Wait for images to load
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Convert to canvas and PDF
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 190; // A4 width - margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`Quotation-${quotation.id}.pdf`);
    
    // Clean up
    document.body.removeChild(tempDiv);
    
  } catch (error) {
    console.error('Error generating PDF via html2canvas:', error);
    // Fallback to jsPDF method
    downloadQuotationPDF(quotation);
  } finally {
    setGeneratingPDF(false);
  }
};
const handleDownloadQuotation = async (quotation) => {
  try {
    setGeneratingPDF(true); // Show loading overlay
    await downloadQuotationAsHTML2PDF(quotation);
  } catch (error) {
    console.error('Download error:', error);
    alert('Failed to generate PDF');
  } finally {
    setGeneratingPDF(false); // Hide loading overlay
  }
};
  // View Quotation Modal Component
  const ViewQuotationModal = () => {
    if (!viewModalOpen || !selectedQuotation) return null;

    return (
      <div className="modal active large">
        <div className="modal-content quotation-view">
          <div className="modal-header">
          <h3>Quotation #{selectedQuotation.id}</h3>
          <div className="modal-header-actions">
            <button className="icon-btn print" title="Print" onClick={() => window.print()}>
              <FaPrint />
            </button>
            <button 
              className="icon-btn download" 
              title="Download"
              onClick={() => handleDownloadQuotation(selectedQuotation)}
              disabled={generatingPDF}
            >
              <FaDownload />
            </button>
            <button className="close-btn" onClick={() => setViewModalOpen(false)}>
              <FaTimes />
            </button>
          </div>
        </div>
          
          <div className="quotation-document">
            {/* Company Header */}
            <div className="quotation-header">
            <div className="company-info">
              <div className="company-logo">
                <Image
                width={200}
                height={200}
              src="/assets/logo-newton.png" 
  alt="Logo" 
  style={{ width: '100px', height: 'auto' }}
  onError={(e) => {
    e.target.style.display = 'none';
    // Show a simple text alternative if image fails to load
    e.target.parentElement.innerHTML = `
      <div style="width: 100px; height: 100px; background: #3b82f6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
        <span style="color: white; font-weight: bold; font-size: 14px;">QUOTE</span>
      </div>
    `;
  }}
                />
              </div>
            </div>
            <div className="quotation-title">
              <h1>QUOTATION</h1>
              <div className="quotation-status">
                <span className={`status-badge ${selectedQuotation.status}`}>
                  {selectedQuotation.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

            {/* Quotation Details */}
            <div className="quotation-details-grid">
              <div className="detail-section">
                <h4>BILL TO</h4>
                <div className="detail-content">
                  <p className="customer-name">{selectedQuotation.customerName}</p>
                  {selectedQuotation.customerId && (
                    <p className="customer-id">Customer ID: {selectedQuotation.customerId}</p>
                  )}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>QUOTATION DETAILS</h4>
                <div className="detail-content">
                  <div className="detail-row">
                    <span className="label">Quotation #:</span>
                    <span className="value">{selectedQuotation.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Date:</span>
                    <span className="value">{formatDate(selectedQuotation.createdDate)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Valid Until:</span>
                    <span className="value">{formatDate(selectedQuotation.validUntil)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Branch:</span>
                    <span className="value">{selectedQuotation.branchName || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="items-table-section">
              <h4>ITEMS</h4>
              <table className="quotation-items-table">
                <thead>
                  <tr>
                    <th className="item-no">#</th>
                    <th className="item-description">Description</th>
                    <th className="item-qty">Qty</th>
                    <th className="item-price">Unit Price</th>
                    <th className="item-total">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedQuotation.items && selectedQuotation.items.length > 0 ? (
                    selectedQuotation.items.map((item, index) => (
                      <tr key={index}>
                        <td className="item-no">{index + 1}</td>
                        <td className="item-description">
                          <div className="item-name">{item.productName}</div>
                          {item.productId && (
                            <div className="item-id">SKU: {item.productId}</div>
                          )}
                        </td>
                        <td className="item-qty">{item.quantity}</td>
                        <td className="item-price">₹{parseFloat(item.price).toLocaleString()}</td>
                        <td className="item-total">₹{parseFloat(item.total).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-items">
                        No items in this quotation
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Totals Section */}
            <div className="totals-section">
              <div className="totals-wrapper">
                <div className="totals-grid">
                  <div className="total-row">
                    <span className="label">Subtotal:</span>
                    <span className="value">₹{parseFloat(selectedQuotation.subtotal?.replace('₹', '') || 0).toLocaleString()}</span>
                  </div>
                  <div className="total-row">
                    <span className="label">
                      Discount ({selectedQuotation.discount || 0}%):
                    </span>
                    <span className="value discount">
                      - ₹{parseFloat(selectedQuotation.discountAmount?.replace('₹', '') || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="total-row">
                    <span className="label">
                      GST ({selectedQuotation.taxRate || 18}%):
                    </span>
                    <span className="value">₹{parseFloat(selectedQuotation.taxAmount?.replace('₹', '') || 0).toLocaleString()}</span>
                  </div>
                  <div className="total-row grand-total">
                    <span className="label">Total Amount:</span>
                    <span className="value">₹{parseFloat(selectedQuotation.total?.replace('₹', '') || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes and Terms */}
            <div className="notes-section">
              <div className="notes-column">
                <h4>NOTES</h4>
                <div className="notes-content">
                  {selectedQuotation.notes || 'No notes provided.'}
                </div>
              </div>
              <div className="terms-column">
                <h4>TERMS & CONDITIONS</h4>
                <div className="terms-content">
                  {selectedQuotation.terms || '1. Prices are valid for 30 days\n2. Payment due upon delivery\n3. Warranty as per product terms\n4. Taxes extra as applicable'}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="quotation-footer">
              <div className="authorized-sign">
                <div className="signature-line"></div>
                <p>Authorized Signature</p>
              </div>
              <div className="company-contact">
                <p>Thank you for your business!</p>
                <div className="contact-info">
                  <p><FaPhone /> +91 98406 04073</p>
                  <p><FaEnvelope /> info@laptopservicehub.com</p>
                  <p><FaMapMarkerAlt /> Chennai, Tamil Nadu</p>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button 
              className="secondary-button" 
              onClick={() => setViewModalOpen(false)}
            >
              Close
            </button>
            <button 
              className="primary-button"
              onClick={() => {
                // Convert to order or send email logic
                console.log('Convert to order:', selectedQuotation.id);
              }}
            >
              <FaCheck /> Convert to Order
            </button>
            <button 
              className="outline-button"
              onClick={() => {
                // Send email logic
                console.log('Send email for:', selectedQuotation.id);
              }}
            >
              <FaEnvelope /> Send Email
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="tab-content">
      <div className="section-header-account">
        <h2>Quotations</h2>
        <div className="header-actions">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search quotations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          {(userRole === 'admin' || userRole === 'engineer') && (
            <div className="branch-selector">
              <label>Branch: </label>
              <select 
                value={selectedBranch} 
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="branch-filter"
              >
                <option value="all">All Branches</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button 
            className="primary-button"
            onClick={() => {
              setEditingItem(null);
              setNewQuotation({
                customerId: '',
                customerName: '',
                branchId: userBranch === 'all' ? '' : userBranch,
                items: [],
                subtotal: 0,
                discount: 0,
                discountAmount: 0,
                taxRate: 18,
                taxAmount: 0,
                total: 0,
                validUntil: '',
                notes: '',
                terms: 'Payment due within 30 days. Warranty as per product terms.',
                status: 'draft'
              });
              setIsAddQuotationModalOpen(true);
            }}
          >
            <FaPlus />
            Create Quotation
          </button>
        </div>
      </div>
      <div className="houseState-content" style={{ overflowX: "auto" }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th className="w-5">S.NO</th>
                <th>Quote ID</th>
                <th>Customer</th>
                {(userRole === 'admin' || userRole === 'engineer') && <th>Branch</th>}
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotations.length > 0 ? (
                filteredQuotations.map((quote, index) => (
                  <tr key={quote.id}>
                    <td className="text-center w-5">{index + 1}</td>
                    <td className="text-left">{quote.id}</td>
                    <td className="text-left">{quote.customerName}</td>
                    {(userRole === 'admin' || userRole === 'engineer') && (
                      <td className="text-left">{quote.branchName}</td>
                    )}
                    <td className="text-left">{quote.total}</td>
                    <td className="text-center">
                      <span className={`status-badge ${quote.status}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="action-buttons">
                        <button 
                          className="icon-btn edit" 
                          title="Edit"
                          onClick={() => {
                            setEditingItem(quote);
                            setIsAddQuotationModalOpen(true);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="icon-btn view" 
                          title="View"
                          onClick={() => handleViewQuotation(quote)}
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="icon-btn print" 
                          title="Print"
                          onClick={() => window.print()}
                        >
                          <FaPrint />
                        </button>
                      <button 
  className="icon-btn download" 
  title="Download"
  onClick={() => handleDownloadQuotation(quote)}
  disabled={generatingPDF}
>
  <FaDownload />
</button>
                        <button 
                          className="icon-btn delete"
                          onClick={() => handleDeleteQuotation(quote.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    No quotations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* View Quotation Modal */}
      <ViewQuotationModal />
    </div>
  );
};

  // Branch Component - Fixed Table Version
  const Branch = () => {
    return (
      <div className="tab-content">
        <div className="section-header-account">
          <h2>Branch </h2>
          <div className="header-actions">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search branches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button 
              className="primary-button"
              onClick={() => {
                setEditingItem(null);
                setNewBranch({
                  name: '',
                  address: '',
                  phone: '',
                  manager: '',
                  status: 'active'
                });
                setIsAddBranchModalOpen(true);
              }}
            >
              <FaPlus />
              Add Branch
            </button>
          </div>
        </div>
        <div className="houseState-content" style={{ overflowX: "auto" }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th className="w-5">S.NO</th>
                <th>Branch Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Manager</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches.length > 0 ? (
                branches.map((branch, index) => (
                  <tr key={branch.id}>
                    <td className="text-center w-5">{index + 1}</td>
                    <td className="text-left">{branch.name}</td>
                    <td className="text-left">{branch.address}</td>
                    <td className="text-left">{branch.phone}</td>
                    <td className="text-left">{branch.manager}</td>
                    <td className="text-center">
                      <span className={`status-badge ${branch.status}`}>
                        {branch.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="action-buttons">
                        <button 
                          className="icon-btn edit"
                          onClick={() => handleEditBranch(branch)}
                          title="Edit Branch"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="icon-btn delete"
                          onClick={() => handleDeleteBranch(branch.id)}
                          title="Delete Branch"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    {searchTerm ? 'No branches found matching your search' : 'No branches available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div></div>
      </div>
    );
  };

  // Profile Component
  const Profile = () => {
    return (
      <div className="tab-content">
        <div className="section-header-account">
          <h2>Profile Details</h2>
          <button 
            className={isEditing ? 'secondary-button' : 'primary-button'}
            onClick={isEditing ? handleSaveUserData : handleEditToggle}
          >
            {isEditing ? <><FaCheck /> Save</> : <><FaEdit /> Edit</>}
          </button>
        </div>

        <div className="profile-form-container">
          <div className="form-field">
            <label>Full Name</label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => handleUserDataChange('name', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="form-field">
            <label>Email Address</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => handleUserDataChange('email', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="form-field">
            <label>Phone Number</label>
            <input
              type="tel"
              value={userData.phone}
              onChange={(e) => handleUserDataChange('phone', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="form-field">
            <label>Address</label>
            <textarea
              value={userData.address}
              onChange={(e) => handleUserDataChange('address', e.target.value)}
              disabled={!isEditing}
              rows="3"
            />
          </div>

          {(userRole === 'engineer' || userRole === 'admin') && (
            <div className="form-field">
              <label>Assigned Branch</label>
              <input
                type="text"
                value={userData.branchName}
                disabled
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="account-dashboard">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div className="user-greeting">
              <h1>Welcome!</h1>
            </div>
            <div className="user-avatar">
              <FaUser className="avatar-icon" />
            </div>
          </div>
          <div className="loading-section">
            <div className="loading-spinner"></div>
            <p>Loading your account...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentRole = roleConfig[userRole];

  return (
    <div className="account-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="user-greeting">
            <h1>Welcome back, {userData.name}!</h1>
            <p>Manage your {currentRole.name} account and activities</p>
            {(userRole === 'super admin' || userRole === 'admin' || userRole === 'manager' || userRole === 'branch') && (
              <p className="branch-info">
                Currently Viewing: {quickBranch === 'all' ? 'All Branches' : 
                  branches.find(b => b.id === quickBranch)?.name || 'Selected Branch'}
              </p>
            )}
          </div>
          <div className="user-avatar" >
            <FaUser className="avatar-icon" />
          </div>
        </div>

        {/* Role Selector */}
        <RoleSelector />  

        <div className="dashboard-layout">
          {/* Desktop Sidebar */}
          <div className="dashboard-sidebar desktop-only">
            <div className="sidebar-section">
              <h3>Navigation</h3>
              <ul className="sidebar-nav">
                {currentRole.tabs.includes('dashboard') && (
                  <li 
                    className={activeTab === 'dashboard' ? 'active' : ''}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <FaTachometerAlt className="nav-icon" />
                    Dashboard
                  </li>
                )}

                {currentRole.tabs.includes('services') && (
                  <li 
                    className={activeTab === 'services' ? 'active' : ''}
                    onClick={() => setActiveTab('services')}
                  >
                    <FaTools className="nav-icon" />
                    Service Bookings
                  </li>
                )}

                {currentRole.tabs.includes('orders') && (
                  <li 
                    className={activeTab === 'orders' ? 'active' : ''}
                    onClick={() => setActiveTab('orders')}
                  >
                    <FaShoppingCart className="nav-icon" />
                    Order History
                  </li>
                )}

                {currentRole.tabs.includes('products') && (
                  <li 
                    className={activeTab === 'products' ? 'active' : ''}
                    onClick={() => setActiveTab('products')}
                  >
                    <FaBox className="nav-icon" />
                    Products
                  </li>
                )}

                {currentRole.tabs.includes('customers') && (
                  <li 
                    className={activeTab === 'customers' ? 'active' : ''}
                    onClick={() => setActiveTab('customers')}
                  >
                    <FaUsers className="nav-icon" />
                    Customers
                  </li>
                )}

                {currentRole.tabs.includes('quotations') && (
                  <li 
                    className={activeTab === 'quotations' ? 'active' : ''}
                    onClick={() => setActiveTab('quotations')}
                  >
                    <FaFileInvoice className="nav-icon" />
                    Quotations
                  </li>
                )}

                {currentRole.tabs.includes('branches') && (
                  <li 
                    className={activeTab === 'branches' ? 'active' : ''}
                    onClick={() => setActiveTab('branches')}
                  >
                    <FaBuilding className="nav-icon" />
                    Branch 
                  </li>
                )}

                {currentRole.tabs.includes('users') && (
                  <li 
                    className={activeTab === 'users' ? 'active' : ''}
                    onClick={() => setActiveTab('users')}
                  >
                    <FaUserShield className="nav-icon" />
                    User 
                  </li>
                )}

                {/* {currentRole.tabs.includes('projects') && (
                  <li 
                    className={activeTab === 'projects' ? 'active' : ''}
                    onClick={() => setActiveTab('projects')}
                  >
                    <FaLaptopCode className="nav-icon" />
                    Projects
                  </li>
                )} */}

                {currentRole.tabs.includes('profile') && (
                  <li 
                    className={activeTab === 'profile' ? 'active' : ''}
                    onClick={() => setActiveTab('profile')}
                  >
                    <FaUser className="nav-icon" />
                    Profile Details
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="mobile-header mobile-only">
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <FaBars />
            </button>
            <h2>
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'services' && 'Services'}
              {activeTab === 'orders' && 'Orders'}
              {activeTab === 'products' && 'Products'}
              {activeTab === 'customers' && 'Customers'}
              {activeTab === 'quotations' && 'Quotations'}
              {activeTab === 'branches' && 'Branches'}
              {activeTab === 'users' && 'Users'}
              {/* {activeTab === 'projects' && 'Projects'} */}
              {activeTab === 'profile' && 'Profile'}
            </h2>
          </div>

          {/* Mobile Sidebar */}
          {mobileMenuOpen && (
            <div className="mobile-sidebar-overlay">
              <div className="mobile-sidebar">
                <div className="mobile-sidebar-header">
                  <h3>Navigation</h3>
                  <button 
                    className="close-btn"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaTimes />
                  </button>
                </div>
                <ul className="mobile-sidebar-nav">
                  {currentRole.tabs.map(tab => (
                    <li 
                      key={tab}
                      className={activeTab === tab ? 'active' : ''}
                      onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
                    >
                      {getTabIcon(tab)}
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="dashboard-main">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'services' && <Services />}
            {activeTab === 'orders' && <Orders />}
            {activeTab === 'products' && <Products />}
            {activeTab === 'customers' && <Customers />}
            {activeTab === 'quotations' && <Quotations />}
            {activeTab === 'branches' && <Branch />}
            {activeTab === 'users' && <Users />}
            {/* {activeTab === 'projects' && <Projects />} */}
            {activeTab === 'profile' && <Profile />}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="mobile-bottom-nav mobile-only">
          {currentRole.tabs.slice(0, 4).map(tab => (
            <div 
              key={tab}
              className={`nav-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {getTabIcon(tab)}
              <span className="nav-label">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AddProductModal />
      <AddCustomerModal />
      <AddBranchModal />
      {/* <AddProjectModal /> */}
      <AddQuotationModal />
       {generatingPDF && (
      <div className="pdf-generating-overlay">
        <div className="pdf-generating-modal">
          <div className="spinner"></div>
          <h3>Generating PDF</h3>
          <p>Please wait while we prepare your quotation...</p>
        </div>
      </div>
    )}
    </div>
  );
};

// Helper function to get tab icons
const getTabIcon = (tab) => {
  switch (tab) {
    case 'dashboard': return <FaTachometerAlt className="nav-icon" />;
    case 'services': return <FaTools className="nav-icon" />;
    case 'orders': return <FaShoppingCart className="nav-icon" />;
    case 'products': return <FaBox className="nav-icon" />;
    case 'customers': return <FaUsers className="nav-icon" />;
    case 'quotations': return <FaFileInvoice className="nav-icon" />;
    case 'branches': return <FaBuilding className="nav-icon" />;
    case 'users': return <FaUserShield className="nav-icon" />;
    // case 'projects': return <FaLaptopCode className="nav-icon" />;
    case 'profile': return <FaUser className="nav-icon" />;
    default: return <FaTachometerAlt className="nav-icon" />;
  }
};

export default Account;