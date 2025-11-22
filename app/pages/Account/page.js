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
  FaStore
} from 'react-icons/fa';
import './Account.scss'

const Account = () => {
  const [userRole, setUserRole] = useState('user');
  const [activeTab, setActiveTab] = useState('services');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Modal states
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isAddQuotationModalOpen, setIsAddQuotationModalOpen] = useState(false);
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false);
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
    totalBranches: 0
  });

  // Quick branch stats
  const [quickBranchStats, setQuickBranchStats] = useState({
    all: { services: 0, orders: 0 },
    BR001: { services: 0, orders: 0 },
    BR002: { services: 0, orders: 0 }
  });

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

  // Update dashboard stats function
  const updateDashboardStats = () => {
    const filteredServices = selectedBranch === 'all' ? serviceBookings : serviceBookings.filter(s => s.branchId === selectedBranch);
    const filteredOrders = selectedBranch === 'all' ? orders : orders.filter(o => o.branchId === selectedBranch);
    
    const stats = {
      totalServices: filteredServices.length,
      pendingServices: filteredServices.filter(s => s.status === 'pending').length,
      completedServices: filteredServices.filter(s => s.status === 'completed').length,
      totalOrders: filteredOrders.length,
      pendingOrders: filteredOrders.filter(o => o.status === 'pending').length,
      completedOrders: filteredOrders.filter(o => o.status === 'delivered').length,
      totalProducts: products.length,
      totalCustomers: customers.length,
      totalQuotations: quotations.length,
      totalBranches: branches.length
    };
    setDashboardStats(stats);
  };

  // Update quick branch stats
  const updateQuickBranchStats = () => {
    const allServices = serviceBookings.length;
    const allOrders = orders.length;
    
    const br001Services = serviceBookings.filter(s => s.branchId === 'BR001').length;
    const br001Orders = orders.filter(o => o.branchId === 'BR001').length;
    
    const br002Services = serviceBookings.filter(s => s.branchId === 'BR002').length;
    const br002Orders = orders.filter(o => o.branchId === 'BR002').length;

    setQuickBranchStats({
      all: { services: allServices, orders: allOrders },
      BR001: { services: br001Services, orders: br001Orders },
      BR002: { services: br002Services, orders: br002Orders }
    });
  };

  // Update stats whenever data changes
  useEffect(() => {
    updateDashboardStats();
    updateQuickBranchStats();
  }, [serviceBookings, orders, products, customers, quotations, branches, selectedBranch]);

  // Handle quick branch selection
  const handleQuickBranchSelect = (branchId) => {
    setQuickBranch(branchId);
    setSelectedBranch(branchId);
    
    // Auto-switch to relevant tab based on branch selection
    if (userRole === 'admin' || userRole === 'engineer') {
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
      
      if (userRole === 'user') {
        loadUserData();
        setActiveTab('services');
      } else if (userRole === 'engineer') {
        loadEngineerData();
        setActiveTab('dashboard');
      } else if (userRole === 'admin') {
        loadAdminData();
        setActiveTab('dashboard');
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
        technician: 'Anita Desai',
        completionDate: null,
        userId: 'user789',
        customerName: 'Robert Brown',
        branchId: 'BR002',
        branchName: 'Thoraipakkam Branch'
      }
    ];

    const engineerOrders = [
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

    const engineerBranches = [
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

    setServiceBookings(engineerServiceBookings);
    setOrders(engineerOrders);
    setBranches(engineerBranches);
    setUserData(prev => ({
      ...prev,
      branch: 'BR001',
      branchName: 'T.Nagar Branch'
    }));
    setUserBranch('BR001');
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
      },
      {
        id: 'SRV004',
        laptopModel: 'Apple MacBook Pro',
        serviceType: 'Battery Replacement',
        bookingDate: '2024-01-25',
        status: 'completed',
        estimatedCost: '₹12,000',
        finalCost: '₹11,500',
        technician: 'Suresh Patel',
        completionDate: '2024-01-28',
        userId: 'user101',
        customerName: 'Mike Johnson',
        branchId: 'BR002',
        branchName: 'Thoraipakkam Branch'
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
      },
      {
        id: 'ORD003',
        product: 'Lenovo ThinkPad T480',
        orderDate: '2024-01-24',
        status: 'pending',
        price: '₹32,999',
        quantity: 1,
        deliveryDate: '2024-01-30',
        userId: 'user789',
        customerName: 'Robert Brown',
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
      },
      {
        id: 'PROD002',
        name: 'Lenovo ThinkPad T480',
        category: 'Business Laptop',
        price: '₹32,999',
        stock: 8,
        status: 'active',
        description: 'Durable and reliable business laptop with military-grade durability.',
        specifications: 'Intel Core i7-8650U, 16GB RAM, 512GB SSD, 14" FHD Display, Windows 11 Pro',
        warranty: '2 years',
        createdAt: '2024-01-05'
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
      },
      {
        id: 'CUST002',
        name: 'ABC Corporation',
        email: 'contact@abccorp.com',
        phone: '+91 98765 43211',
        type: 'business',
        companyName: 'ABC Corporation Pvt Ltd',
        gstNumber: '27ABCCT1234A1Z5',
        billingAddress: 'Tech Park, Whitefield, Bangalore, Karnataka - 560001',
        shippingAddress: 'Tech Park, Whitefield, Bangalore, Karnataka - 560001',
        notes: 'Corporate client with bulk orders',
        createdAt: '2024-01-05'
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
          { productId: 'PROD001', productName: 'Refurbished Dell Latitude E7440', quantity: 1, price: '₹24,999', total: '₹24,999' },
          { productId: 'PROD002', productName: 'Laptop Bag & Accessories Kit', quantity: 1, price: '₹2,499', total: '₹2,499' }
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

    setServiceBookings(adminServiceBookings);
    setOrders(adminOrders);
    setProducts(adminProducts);
    setCustomers(adminCustomers);
    setQuotations(adminQuotations);
    setBranches(adminBranches);
    setUserData(prev => ({
      ...prev,
      branch: 'all',
      branchName: 'All Branches'
    }));
    setUserBranch('all');
    setSelectedBranch('all');
    setQuickBranch('all');
  };

  // Product CRUD Operations
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
      warranty: product.warranty || '1 year',
      status: product.status
    });
    setIsAddProductModalOpen(true);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setProducts(prev => prev.map(p => 
      p.id === editingItem.id 
        ? { ...p, ...newProduct, price: `₹${newProduct.price}` }
        : p
    ));
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
    setIsAddProductModalOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  // Customer CRUD Operations
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

  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    setCustomers(prev => prev.map(c => 
      c.id === editingItem.id ? { ...c, ...newCustomer } : c
    ));
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
    setIsAddCustomerModalOpen(false);
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(prev => prev.filter(c => c.id !== customerId));
    }
  };

  // Branch CRUD Operations
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

  const handleUpdateBranch = (e) => {
    e.preventDefault();
    setBranches(prev => prev.map(b => 
      b.id === editingItem.id ? { ...b, ...newBranch } : b
    ));
    setEditingItem(null);
    setNewBranch({
      name: '',
      address: '',
      phone: '',
      manager: '',
      status: 'active'
    });
    setIsAddBranchModalOpen(false);
  };

  const handleDeleteBranch = (branchId) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      setBranches(prev => prev.filter(b => b.id !== branchId));
    }
  };

  // Quotation CRUD Operations
  const handleAddQuotation = (e) => {
    e.preventDefault();
    const quotation = {
      id: `QUOTE00${quotations.length + 1}`,
      ...newQuotation,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'draft'
    };
    setQuotations(prev => [...prev, quotation]);
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
    setIsAddQuotationModalOpen(false);
  };

  const handleAddQuotationItem = () => {
    if (newQuotationItem.productId && newQuotationItem.quantity > 0) {
      const product = products.find(p => p.id === newQuotationItem.productId);
      const itemPrice = parseFloat(newQuotationItem.price);
      const itemTotal = itemPrice * newQuotationItem.quantity;
      
      const newItem = {
        productId: newQuotationItem.productId,
        productName: product.name,
        quantity: newQuotationItem.quantity,
        price: itemPrice,
        total: itemTotal,
        description: product.description,
        warranty: product.warranty || '1 year'
      };

      const updatedItems = [...newQuotation.items, newItem];
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

  const handleDeleteQuotation = (quotationId) => {
    if (window.confirm('Are you sure you want to delete this quotation?')) {
      setQuotations(prev => prev.filter(q => q.id !== quotationId));
    }
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

  const filteredServices = filterDataByBranch(serviceBookings);
  const filteredOrders = filterDataByBranch(orders);

  // Dashboard Component
  const Dashboard = () => {
    if (userRole === 'user') {
      return null;
    }

    return (
      <div className="tab-content">
        <div className="section-header">
          <h2>Dashboard Overview</h2>
          <div className="header-actions">
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
            <div className="view-controls">
              <span className="last-updated">Last updated: Today</span>
            </div>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon services">
              <FaTools />
            </div>
            <div className="stat-content">
              <h3>Total Services</h3>
              <div className="stat-number">{dashboardStats.totalServices}</div>
              <div className="stat-details">
                <span className={`stat-detail pending`}>
                  {dashboardStats.pendingServices} Pending
                </span>
                <span className={`stat-detail completed`}>
                  {dashboardStats.completedServices} Completed
                </span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orders">
              <FaShoppingCart />
            </div>
            <div className="stat-content">
              <h3>Total Orders</h3>
              <div className="stat-number">{dashboardStats.totalOrders}</div>
              <div className="stat-details">
                <span className={`stat-detail pending`}>
                  {dashboardStats.pendingOrders} Pending
                </span>
                <span className={`stat-detail completed`}>
                  {dashboardStats.completedOrders} Completed
                </span>
              </div>
            </div>
          </div>

          {(userRole === 'admin') && (
            <>
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
            </>
          )}
        </div>

        {/* Recent Activities */}
        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <div className="activities-list">
            {filteredServices.slice(0, 5).map(service => (
              <div key={service.id} className="activity-item">
                <div className="activity-icon">
                  <FaTools />
                </div>
                <div className="activity-content">
                  <p><strong>{service.customerName || 'Customer'}</strong> - {service.serviceType}</p>
                  <span className="activity-date">{service.bookingDate} • {service.branchName}</span>
                </div>
                <div className={`activity-status ${service.status}`}>
                  {getStatusText(service.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

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
        <div className="section-header">
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
        <div className="section-header">
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
        <div className="section-header">
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
        <div className="section-header">
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
    return (
      <div className="tab-content">
        <div className="section-header">
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
                  <th>Created Date</th>
                  <th>Valid Until</th>
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
                      <td className="text-left">{quote.createdDate}</td>
                      <td className="text-left">{quote.validUntil}</td>
                      <td className="text-center">
                        <div className="action-buttons">
                          <button className="icon-btn edit" title="Edit">
                            <FaEdit />
                          </button>
                          <button className="icon-btn view" title="View">
                            <FaEye />
                          </button>
                          <button className="icon-btn print" title="Print">
                            <FaPrint />
                          </button>
                          <button className="icon-btn download" title="Download">
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
      </div>
    );
  };

  // Branch Component - Fixed Table Version
  const Branch = () => {
    return (
      <div className="tab-content">
        <div className="section-header">
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
        <div className="section-header">
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
 const RoleSelector = () => (
    <div className="role-selector">
      <div className="role-buttons">
        <button 
          className={`role-btn ${userRole === 'user' ? 'active' : ''}`}
          onClick={() => handleRoleChange('user')}
        >
          <FaUser />
          User View
        </button>
        <button 
          className={`role-btn ${userRole === 'engineer' ? 'active' : ''}`}
          onClick={() => handleRoleChange('engineer')}
        >
          <FaTools />
          Engineer View
        </button>
        <button 
          className={`role-btn ${userRole === 'admin' ? 'active' : ''}`}
          onClick={() => handleRoleChange('admin')}
        >
          <FaUser />
          Admin View
        </button>
      </div>
      
      {(userRole === 'admin' || userRole === 'engineer') && (
        <div className="branch-quick-selector">
          <h4>Quick Branch View:</h4>
          <div className="branch-buttons">
            <button 
              className={`branch-btn ${quickBranch === 'all' ? 'active' : ''}`}
              onClick={() => handleQuickBranchSelect('all')}
            >
              <FaStore />
              <span>All Branches</span>
              <div className="branch-stats">
                <span className="stat">{quickBranchStats.all.services} Services</span>
                <span className="stat">{quickBranchStats.all.orders} Orders</span>
              </div>
            </button>
            
            {branches.map(branch => (
              <button 
                key={branch.id}
                className={`branch-btn ${quickBranch === branch.id ? 'active' : ''}`}
                onClick={() => handleQuickBranchSelect(branch.id)}
              >
                <FaBuilding />
                <span>{branch.name}</span>
                <div className="branch-stats">
                  <span className="stat">{quickBranchStats[branch.id]?.services || 0} Services</span>
                  <span className="stat">{quickBranchStats[branch.id]?.orders || 0} Orders</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
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

  return (
    <div className="account-dashboard">
      <div className="dashboard-container">
        {/* Header */}
       <div className="dashboard-header">
          <div className="user-greeting">
            <h1>Welcome back, {userData.name}!</h1>
            <p>Manage your {userRole} account and activities</p>
            {(userRole === 'engineer' || userRole === 'admin') && (
              <p className="branch-info">
                Currently Viewing: {quickBranch === 'all' ? 'All Branches' : 
                  branches.find(b => b.id === quickBranch)?.name || 'Selected Branch'}
              </p>
            )}
          </div>
          <div className="user-avatar">
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
                {(userRole === 'engineer' || userRole === 'admin') && (
                  <li 
                    className={activeTab === 'dashboard' ? 'active' : ''}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <FaTachometerAlt className="nav-icon" />
                    Dashboard
                  </li>
                )}

                <li 
                  className={activeTab === 'services' ? 'active' : ''}
                  onClick={() => setActiveTab('services')}
                >
                  <FaTools className="nav-icon" />
                  Service Bookings
                </li>

                <li 
                  className={activeTab === 'orders' ? 'active' : ''}
                  onClick={() => setActiveTab('orders')}
                >
                  <FaShoppingCart className="nav-icon" />
                  Order History
                </li>

                {userRole === 'admin' && (
                  <>
                    <li 
                      className={activeTab === 'products' ? 'active' : ''}
                      onClick={() => setActiveTab('products')}
                    >
                      <FaBox className="nav-icon" />
                      Products
                    </li>

                    <li 
                      className={activeTab === 'customers' ? 'active' : ''}
                      onClick={() => setActiveTab('customers')}
                    >
                      <FaUsers className="nav-icon" />
                      Customers
                    </li>

                    <li 
                      className={activeTab === 'quotations' ? 'active' : ''}
                      onClick={() => setActiveTab('quotations')}
                    >
                      <FaFileInvoice className="nav-icon" />
                      Quotations
                    </li>

                    <li 
                      className={activeTab === 'branches' ? 'active' : ''}
                      onClick={() => setActiveTab('branches')}
                    >
                      <FaBuilding className="nav-icon" />
                      Branch 
                    </li>
                  </>
                )}

                <li 
                  className={activeTab === 'profile' ? 'active' : ''}
                  onClick={() => setActiveTab('profile')}
                >
                  <FaUser className="nav-icon" />
                  Profile Details
                </li>
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
                  {(userRole === 'engineer' || userRole === 'admin') && (
                    <li 
                      className={activeTab === 'dashboard' ? 'active' : ''}
                      onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                    >
                      <FaTachometerAlt className="nav-icon" />
                      Dashboard
                    </li>
                  )}

                  <li 
                    className={activeTab === 'services' ? 'active' : ''}
                    onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }}
                  >
                    <FaTools className="nav-icon" />
                    Service Bookings
                  </li>

                  <li 
                    className={activeTab === 'orders' ? 'active' : ''}
                    onClick={() => { setActiveTab('orders'); setMobileMenuOpen(false); }}
                  >
                    <FaShoppingCart className="nav-icon" />
                    Order History
                  </li>

                  {userRole === 'admin' && (
                    <>
                      <li 
                        className={activeTab === 'products' ? 'active' : ''}
                        onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }}
                      >
                        <FaBox className="nav-icon" />
                        Products
                      </li>

                      <li 
                        className={activeTab === 'customers' ? 'active' : ''}
                        onClick={() => { setActiveTab('customers'); setMobileMenuOpen(false); }}
                      >
                        <FaUsers className="nav-icon" />
                        Customers
                      </li>

                      <li 
                        className={activeTab === 'quotations' ? 'active' : ''}
                        onClick={() => { setActiveTab('quotations'); setMobileMenuOpen(false); }}
                      >
                        <FaFileInvoice className="nav-icon" />
                        Quotations
                      </li>

                      <li 
                        className={activeTab === 'branches' ? 'active' : ''}
                        onClick={() => { setActiveTab('branches'); setMobileMenuOpen(false); }}
                      >
                        <FaBuilding className="nav-icon" />
                        Branch 
                      </li>
                    </>
                  )}

                  <li 
                    className={activeTab === 'profile' ? 'active' : ''}
                    onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
                  >
                    <FaUser className="nav-icon" />
                    Profile Details
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="dashboard-main">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'services' && <Services />}
            {activeTab === 'orders' && <Orders />}
            {activeTab === 'products' && userRole === 'admin' && <Products />}
            {activeTab === 'customers' && userRole === 'admin' && <Customers />}
            {activeTab === 'quotations' && userRole === 'admin' && <Quotations />}
            {activeTab === 'branches' && userRole === 'admin' && <Branch />}
            {activeTab === 'profile' && <Profile />}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="mobile-bottom-nav mobile-only">
          {(userRole === 'engineer' || userRole === 'admin') && (
            <div 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <FaTachometerAlt className="nav-icon" />
              <span className="nav-label">Dashboard</span>
            </div>
          )}
          <div 
            className={`nav-item ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <FaTools className="nav-icon" />
            <span className="nav-label">Services</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FaShoppingCart className="nav-icon" />
            <span className="nav-label">Orders</span>
          </div>
          {userRole === 'admin' && (
            <div 
              className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <FaBox className="nav-icon" />
              <span className="nav-label">Products</span>
            </div>
          )}
          <div 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser className="nav-icon" />
            <span className="nav-label">Profile</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* Add/Edit Product Modal */}
      {isAddProductModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingItem ? 'Edit Product' : 'Add New Product'}</h2>
              <button 
                className="close-btn"
                onClick={() => setIsAddProductModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={editingItem ? handleUpdateProduct : handleAddProduct}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-field">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({...prev, name: e.target.value}))}
                      required
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="form-field">
                    <label>Category *</label>
                    <input
                      type="text"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct(prev => ({...prev, category: e.target.value}))}
                      required
                      placeholder="e.g., Business Laptop, Gaming Laptop"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Price (₹) *</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({...prev, price: e.target.value}))}
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="form-field">
                    <label>Stock *</label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct(prev => ({...prev, stock: e.target.value}))}
                      required
                      min="0"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Warranty</label>
                    <select
                      value={newProduct.warranty}
                      onChange={(e) => setNewProduct(prev => ({...prev, warranty: e.target.value}))}
                    >
                      <option value="1 year">1 Year</option>
                      <option value="2 years">2 Years</option>
                      <option value="3 years">3 Years</option>
                      <option value="6 months">6 Months</option>
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
                <div className="form-field">
                  <label>Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({...prev, description: e.target.value}))}
                    rows="3"
                    placeholder="Enter product description..."
                  />
                </div>
                <div className="form-field">
                  <label>Specifications</label>
                  <textarea
                    value={newProduct.specifications}
                    onChange={(e) => setNewProduct(prev => ({...prev, specifications: e.target.value}))}
                    rows="3"
                    placeholder="Enter product specifications..."
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="outline-button" onClick={() => setIsAddProductModalOpen(false)}>
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="primary-button">
                  <FaSave /> {editingItem ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Customer Modal */}
      {isAddCustomerModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingItem ? 'Edit Customer' : 'Add New Customer'}</h2>
              <button 
                className="close-btn"
                onClick={() => setIsAddCustomerModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={editingItem ? handleUpdateCustomer : handleAddCustomer}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer(prev => ({...prev, name: e.target.value}))}
                      required
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div className="form-field">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer(prev => ({...prev, email: e.target.value}))}
                      required
                      placeholder="customer@example.com"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer(prev => ({...prev, phone: e.target.value}))}
                      required
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="form-field">
                    <label>Customer Type *</label>
                    <select
                      value={newCustomer.type}
                      onChange={(e) => setNewCustomer(prev => ({...prev, type: e.target.value}))}
                    >
                      <option value="individual">Individual</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                </div>
                {newCustomer.type === 'business' && (
                  <>
                    <div className="form-row">
                      <div className="form-field">
                        <label>Company Name *</label>
                        <input
                          type="text"
                          value={newCustomer.companyName}
                          onChange={(e) => setNewCustomer(prev => ({...prev, companyName: e.target.value}))}
                          required
                          placeholder="Enter company name"
                        />
                      </div>
                      <div className="form-field">
                        <label>GST Number *</label>
                        <input
                          type="text"
                          value={newCustomer.gstNumber}
                          onChange={(e) => setNewCustomer(prev => ({...prev, gstNumber: e.target.value}))}
                          required
                          placeholder="27ABCDE1234F1Z5"
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="form-field">
                  <label>Billing Address *</label>
                  <textarea
                    value={newCustomer.billingAddress}
                    onChange={(e) => setNewCustomer(prev => ({...prev, billingAddress: e.target.value}))}
                    rows="3"
                    required
                    placeholder="Enter complete billing address..."
                  />
                </div>
                <div className="form-field">
                  <label>Shipping Address *</label>
                  <textarea
                    value={newCustomer.shippingAddress}
                    onChange={(e) => setNewCustomer(prev => ({...prev, shippingAddress: e.target.value}))}
                    rows="3"
                    required
                    placeholder="Enter complete shipping address..."
                  />
                </div>
                <div className="form-field">
                  <label>Notes</label>
                  <textarea
                    value={newCustomer.notes}
                    onChange={(e) => setNewCustomer(prev => ({...prev, notes: e.target.value}))}
                    rows="2"
                    placeholder="Any additional notes..."
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="outline-button" onClick={() => setIsAddCustomerModalOpen(false)}>
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="primary-button">
                  <FaSave /> {editingItem ? 'Update Customer' : 'Add Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Branch Modal */}
      {isAddBranchModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingItem ? 'Edit Branch' : 'Add New Branch'}</h2>
              <button 
                className="close-btn"
                onClick={() => setIsAddBranchModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={editingItem ? handleUpdateBranch : handleAddBranch}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-field">
                    <label>Branch Name *</label>
                    <input
                      type="text"
                      value={newBranch.name}
                      onChange={(e) => setNewBranch(prev => ({...prev, name: e.target.value}))}
                      required
                      placeholder="Enter branch name"
                    />
                  </div>
                  <div className="form-field">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      value={newBranch.phone}
                      onChange={(e) => setNewBranch(prev => ({...prev, phone: e.target.value}))}
                      required
                      placeholder="+91 98406 04073"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Manager *</label>
                    <input
                      type="text"
                      value={newBranch.manager}
                      onChange={(e) => setNewBranch(prev => ({...prev, manager: e.target.value}))}
                      required
                      placeholder="Enter manager name"
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
                <div className="form-field">
                  <label>Address *</label>
                  <textarea
                    value={newBranch.address}
                    onChange={(e) => setNewBranch(prev => ({...prev, address: e.target.value}))}
                    rows="3"
                    required
                    placeholder="Enter complete branch address..."
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="outline-button" onClick={() => setIsAddBranchModalOpen(false)}>
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="primary-button">
                  <FaSave /> {editingItem ? 'Update Branch' : 'Add Branch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Quotation Modal */}
      {isAddQuotationModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <div className="modal-header">
              <h2>Create New Quotation</h2>
              <button 
                className="close-btn"
                onClick={() => setIsAddQuotationModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddQuotation}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-field">
                    <label>Select Customer *</label>
                    <select
                      value={newQuotation.customerId}
                      onChange={(e) => {
                        const customer = customers.find(c => c.id === e.target.value);
                        setNewQuotation(prev => ({
                          ...prev,
                          customerId: e.target.value,
                          customerName: customer ? customer.name : ''
                        }));
                      }}
                      required
                    >
                      <option value="">Select Customer</option>
                      {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name} ({customer.type})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Branch *</label>
                    <select
                      value={newQuotation.branchId}
                      onChange={(e) => handleQuotationFieldChange('branchId', e.target.value)}
                      required
                      disabled={userBranch !== 'all'}
                    >
                      <option value="">Select Branch</option>
                      {branches.map(branch => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Valid Until *</label>
                    <input
                      type="date"
                      value={newQuotation.validUntil}
                      onChange={(e) => handleQuotationFieldChange('validUntil', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Status</label>
                    <select
                      value={newQuotation.status}
                      onChange={(e) => handleQuotationFieldChange('status', e.target.value)}
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                
                <div className="quotation-items-section">
                  <h3>Quotation Items</h3>
                  <div className="add-item-form">
                    <div className="form-row">
                      <div className="form-field">
                        <label>Product</label>
                        <select
                          value={newQuotationItem.productId}
                          onChange={(e) => {
                            const product = products.find(p => p.id === e.target.value);
                            setNewQuotationItem(prev => ({
                              ...prev,
                              productId: e.target.value,
                              productName: product ? product.name : '',
                              price: product ? parseFloat(product.price.replace('₹', '').replace(',', '')) : 0
                            }));
                          }}
                        >
                          <option value="">Select Product</option>
                          {products.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.name} - {product.price}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-field">
                        <label>Quantity</label>
                        <input
                          type="number"
                          value={newQuotationItem.quantity}
                          onChange={(e) => setNewQuotationItem(prev => ({
                            ...prev,
                            quantity: parseInt(e.target.value) || 0,
                            total: (parseFloat(prev.price) * (parseInt(e.target.value) || 0))
                          }))}
                          min="1"
                        />
                      </div>
                      <div className="form-field">
                        <label>Price</label>
                        <input
                          type="text"
                          value={`₹${newQuotationItem.price.toLocaleString()}`}
                          disabled
                        />
                      </div>
                      <div className="form-field">
                        <label>Total</label>
                        <input
                          type="text"
                          value={`₹${(newQuotationItem.price * newQuotationItem.quantity).toLocaleString()}`}
                          disabled
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="outline-button"
                      onClick={handleAddQuotationItem}
                      disabled={!newQuotationItem.productId}
                    >
                      <FaPlus /> Add Item
                    </button>
                  </div>

                  {newQuotation.items.length > 0 && (
                    <div className="items-list">
                      <table>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Quantity</th>
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

                {/* Enhanced Pricing Summary */}
                {newQuotation.items.length > 0 && (
                  <div className="pricing-summary">
                    <h4>Pricing Summary</h4>
                    <div className="price-row">
                      <span>Subtotal:</span>
                      <span>₹{newQuotation.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="form-row">
                      <div className="form-field">
                        <label>Discount (%)</label>
                        <input
                          type="number"
                          value={newQuotation.discount}
                          onChange={(e) => handleQuotationFieldChange('discount', parseFloat(e.target.value) || 0)}
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </div>
                      <div className="form-field">
                        <label>Tax Rate (%)</label>
                        <input
                          type="number"
                          value={newQuotation.taxRate}
                          onChange={(e) => handleQuotationFieldChange('taxRate', parseFloat(e.target.value) || 0)}
                          min="0"
                          max="30"
                          step="0.1"
                        />
                      </div>
                    </div>
                    <div className="price-row discount">
                      <span>Discount Amount:</span>
                      <span>-₹{newQuotation.discountAmount.toLocaleString()}</span>
                    </div>
                    <div className="price-row tax">
                      <span>Tax Amount:</span>
                      <span>₹{newQuotation.taxAmount.toLocaleString()}</span>
                    </div>
                    <div className="price-row total">
                      <span>Total Amount:</span>
                      <span>₹{newQuotation.total.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="form-field">
                  <label>Notes</label>
                  <textarea
                    value={newQuotation.notes}
                    onChange={(e) => handleQuotationFieldChange('notes', e.target.value)}
                    rows="3"
                    placeholder="Additional notes for the quotation..."
                  />
                </div>

                <div className="form-field">
                  <label>Terms & Conditions</label>
                  <textarea
                    value={newQuotation.terms}
                    onChange={(e) => handleQuotationFieldChange('terms', e.target.value)}
                    rows="3"
                    placeholder="Enter terms and conditions..."
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="outline-button" onClick={() => setIsAddQuotationModalOpen(false)}>
                  <FaTimes /> Cancel
                </button>
                <button 
                  type="submit" 
                  className="primary-button"
                  disabled={newQuotation.items.length === 0}
                >
                  <FaSave /> Create Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;