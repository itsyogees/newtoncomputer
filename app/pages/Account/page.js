"use client";
import React, { useState, useEffect } from 'react';
import './Account.scss';
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
  FaExclamationTriangle
} from 'react-icons/fa';
import BookServiceModal from '../../component/BookServiceModal/page';
import Loading from '../../component/Loading/Loading';

const Account = () => {
   const [userRole, setUserRole] = useState('user');
const [activeTab, setActiveTab] = useState(userRole === 'user' ? 'services' : 'dashboard')
 
  const [isEditing, setIsEditing] = useState(false);
  const [isBookServiceModalOpen, setIsBookServiceModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  
  // Modal states
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isAddQuotationModalOpen, setIsAddQuotationModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // User data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: 'No. 8/683 A, Srividya Avenue, Rajiv Gandhi Salai, Thoraipakkam, Chennai - 600097'
  });

  // Form states
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    specifications: '',
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

  const [newQuotation, setNewQuotation] = useState({
    customerId: '',
    customerName: '',
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    validUntil: '',
    notes: ''
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
    totalQuotations: 0
  });

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Update dashboard stats function
  const updateDashboardStats = () => {
    const stats = {
      totalServices: serviceBookings.length,
      pendingServices: serviceBookings.filter(s => s.status === 'pending' || s.status === 'in-progress').length,
      completedServices: serviceBookings.filter(s => s.status === 'completed').length,
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending' || o.status === 'shipped').length,
      completedOrders: orders.filter(o => o.status === 'delivered').length,
      totalProducts: products.length,
      totalCustomers: customers.length,
      totalQuotations: quotations.length
    };
    setDashboardStats(stats);
  };

  // Update stats whenever data changes
  useEffect(() => {
    updateDashboardStats();
  }, [serviceBookings, orders, products, customers, quotations]);

  // Simulate data loading
useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (userRole === 'user') {
      loadUserData();
      setActiveTab('services'); // Ensure services tab is active for users
    } else if (userRole === 'engineer') {
      loadEngineerData();
      setActiveTab('dashboard'); // Ensure dashboard is active for engineers/admins
    } else if (userRole === 'admin') {
      loadAdminData();
      setActiveTab('dashboard'); // Ensure dashboard is active for engineers/admins
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
        userId: 'user123'
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
        userId: 'user123'
      },
      {
        id: 'SRV003',
        laptopModel: 'HP Pavilion',
        serviceType: 'Battery Replacement',
        bookingDate: '2024-01-25',
        status: 'pending',
        estimatedCost: '₹4,500',
        finalCost: null,
        technician: null,
        completionDate: null,
        userId: 'user123'
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
        userId: 'user123'
      },
      {
        id: 'ORD002',
        product: 'Laptop Bag & Accessories Kit',
        orderDate: '2024-01-18',
        status: 'shipped',
        price: '₹2,499',
        quantity: 1,
        deliveryDate: '2024-01-22',
        userId: 'user123'
      },
      {
        id: 'ORD003',
        product: 'Wireless Mouse',
        orderDate: '2024-01-25',
        status: 'pending',
        price: '₹899',
        quantity: 2,
        deliveryDate: null,
        userId: 'user123'
      }
    ];

    setServiceBookings(userServiceBookings);
    setOrders(userOrders);
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
        customerName: 'John Doe'
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
        customerName: 'Jane Smith'
      },
      {
        id: 'SRV003',
        laptopModel: 'HP Pavilion',
        serviceType: 'Battery Replacement',
        bookingDate: '2024-01-25',
        status: 'pending',
        estimatedCost: '₹4,500',
        finalCost: null,
        technician: null,
        completionDate: null,
        userId: 'user789',
        customerName: 'Mike Johnson'
      },
      {
        id: 'SRV004',
        laptopModel: 'Acer Aspire 5',
        serviceType: 'Keyboard Repair',
        bookingDate: '2024-01-28',
        status: 'in-progress',
        estimatedCost: '₹2,800',
        finalCost: null,
        technician: 'Raj Kumar',
        completionDate: null,
        userId: 'user101',
        customerName: 'Sarah Wilson'
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
        customerName: 'John Doe'
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
        customerName: 'Jane Smith'
      },
      {
        id: 'ORD003',
        product: 'Laptop Cooling Pad',
        orderDate: '2024-01-26',
        status: 'pending',
        price: '₹1,299',
        quantity: 1,
        deliveryDate: null,
        userId: 'user789',
        customerName: 'Mike Johnson'
      }
    ];

    setServiceBookings(engineerServiceBookings);
    setOrders(engineerOrders);
  };

  const loadAdminData = () => {
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
        customerName: 'John Doe'
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
        customerName: 'Jane Smith'
      },
      {
        id: 'SRV003',
        laptopModel: 'HP Pavilion',
        serviceType: 'Keyboard Repair',
        bookingDate: '2024-01-22',
        status: 'pending',
        estimatedCost: '₹2,500',
        finalCost: null,
        technician: null,
        completionDate: null,
        userId: 'user789',
        customerName: 'Mike Johnson'
      },
      {
        id: 'SRV004',
        laptopModel: 'MacBook Pro',
        serviceType: 'Software Installation',
        bookingDate: '2024-01-24',
        status: 'completed',
        estimatedCost: '₹1,500',
        finalCost: '₹1,500',
        technician: 'Anita Desai',
        completionDate: '2024-01-25',
        userId: 'user112',
        customerName: 'Robert Brown'
      },
      {
        id: 'SRV005',
        laptopModel: 'Asus ZenBook',
        serviceType: 'Virus Removal',
        bookingDate: '2024-01-26',
        status: 'in-progress',
        estimatedCost: '₹2,000',
        finalCost: null,
        technician: 'Suresh Patel',
        completionDate: null,
        userId: 'user113',
        customerName: 'Priya Sharma'
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
        customerName: 'John Doe'
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
        customerName: 'Jane Smith'
      },
      {
        id: 'ORD003',
        product: 'Wireless Mouse',
        orderDate: '2024-01-25',
        status: 'pending',
        price: '₹899',
        quantity: 2,
        deliveryDate: null,
        userId: 'user789',
        customerName: 'Mike Johnson'
      },
      {
        id: 'ORD004',
        product: 'Lenovo ThinkPad T480',
        orderDate: '2024-01-27',
        status: 'delivered',
        price: '₹32,999',
        quantity: 1,
        deliveryDate: '2024-01-29',
        userId: 'user114',
        customerName: 'Anil Kapoor'
      },
      {
        id: 'ORD005',
        product: 'Laptop Stand',
        orderDate: '2024-01-28',
        status: 'shipped',
        price: '₹1,799',
        quantity: 1,
        deliveryDate: '2024-01-30',
        userId: 'user115',
        customerName: 'Sunita Reddy'
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
        createdAt: '2024-01-05'
      },
      {
        id: 'PROD003',
        name: 'HP EliteBook 840 G5',
        category: 'Business Laptop',
        price: '₹28,999',
        stock: 12,
        status: 'active',
        description: 'Sleek and powerful business laptop with enhanced security features.',
        specifications: 'Intel Core i5-8250U, 8GB RAM, 256GB SSD, 14" FHD Display, Windows 10 Pro',
        createdAt: '2024-01-10'
      },
      {
        id: 'PROD004',
        name: 'Laptop Bag & Accessories Kit',
        category: 'Accessories',
        price: '₹2,499',
        stock: 50,
        status: 'active',
        description: 'Premium laptop bag with accessories including mouse, keyboard cover, and screen cleaner.',
        specifications: 'Water-resistant, Multiple compartments, Padded laptop sleeve',
        createdAt: '2024-01-15'
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
      },
      {
        id: 'CUST003',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        phone: '+91 98765 43212',
        type: 'individual',
        companyName: '',
        gstNumber: '',
        billingAddress: 'Flat 25, Skyline Apartments, Gachibowli, Hyderabad - 500032',
        shippingAddress: 'Flat 25, Skyline Apartments, Gachibowli, Hyderabad - 500032',
        notes: 'Student customer',
        createdAt: '2024-01-08'
      },
      {
        id: 'CUST004',
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        phone: '+91 98765 43213',
        type: 'individual',
        companyName: '',
        gstNumber: '',
        billingAddress: 'Plot No. 45, Sector 15, Gurgaon, Haryana - 122001',
        shippingAddress: 'Plot No. 45, Sector 15, Gurgaon, Haryana - 122001',
        notes: 'Frequent service customer',
        createdAt: '2024-01-12'
      }
    ];

    const adminQuotations = [
      {
        id: 'QUOTE001',
        customerId: 'CUST001',
        customerName: 'John Doe',
        items: [
          { productId: 'PROD001', productName: 'Refurbished Dell Latitude E7440', quantity: 1, price: '₹24,999', total: '₹24,999' },
          { productId: 'PROD004', productName: 'Laptop Bag & Accessories Kit', quantity: 1, price: '₹2,499', total: '₹2,499' }
        ],
        subtotal: '₹27,498',
        tax: '₹4,949',
        total: '₹32,447',
        status: 'sent',
        createdDate: '2024-01-20',
        validUntil: '2024-02-20',
        notes: 'Includes 1-year warranty and free shipping'
      },
      {
        id: 'QUOTE002',
        customerId: 'CUST002',
        customerName: 'ABC Corporation',
        items: [
          { productId: 'PROD002', productName: 'Lenovo ThinkPad T480', quantity: 5, price: '₹32,999', total: '₹164,995' },
          { productId: 'PROD003', productName: 'HP EliteBook 840 G5', quantity: 3, price: '₹28,999', total: '₹86,997' }
        ],
        subtotal: '₹251,992',
        tax: '₹45,358',
        total: '₹297,350',
        status: 'draft',
        createdDate: '2024-01-25',
        validUntil: '2024-02-25',
        notes: 'Bulk order discount applied'
      },
      {
        id: 'QUOTE003',
        customerId: 'CUST003',
        customerName: 'Sarah Wilson',
        items: [
          { productId: 'PROD003', productName: 'HP EliteBook 840 G5', quantity: 1, price: '₹28,999', total: '₹28,999' },
          { productId: 'PROD004', productName: 'Laptop Bag & Accessories Kit', quantity: 1, price: '₹2,499', total: '₹2,499' }
        ],
        subtotal: '₹31,498',
        tax: '₹5,669',
        total: '₹37,167',
        status: 'sent',
        createdDate: '2024-01-28',
        validUntil: '2024-02-28',
        notes: 'Student discount applied'
      }
    ];

    setServiceBookings(adminServiceBookings);
    setOrders(adminOrders);
    setProducts(adminProducts);
    setCustomers(adminCustomers);
    setQuotations(adminQuotations);
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
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      validUntil: '',
      notes: ''
    });
    setIsAddQuotationModalOpen(false);
  };

  const handleAddQuotationItem = () => {
    if (newQuotationItem.productId && newQuotationItem.quantity > 0) {
      const product = products.find(p => p.id === newQuotationItem.productId);
      const itemTotal = parseFloat(newQuotationItem.price) * newQuotationItem.quantity;
      
      setNewQuotation(prev => ({
        ...prev,
        items: [...prev.items, {
          productId: newQuotationItem.productId,
          productName: product.name,
          quantity: newQuotationItem.quantity,
          price: product.price,
          total: `₹${itemTotal.toLocaleString()}`
        }]
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
    setNewQuotation(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
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
  };

  const handleBookServiceModal = () => {
    setIsBookServiceModalOpen(true);
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

  const filteredQuotations = quotations.filter(quotation =>
    quotation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quotation.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dashboard Component

const Dashboard = () => {
  if (userRole === 'user') {
    return null;
  }

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Dashboard Overview</h2>
        <div className="view-controls">
          <span className="last-updated">Last updated: Today</span>
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
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">
            <FaShoppingCart />
          </div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <div className="stat-number">{dashboardStats.totalOrders}</div>
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
          </>
        )}
      </div>

      {/* Recent Activities */}
      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <div className="activities-list">
          {serviceBookings.slice(0, 5).map(service => (
            <div key={service.id} className="activity-item">
              <div className="activity-icon">
                <FaTools />
              </div>
              <div className="activity-content">
                <p><strong>{service.customerName || 'Customer'}</strong> - {service.serviceType}</p>
                <span className="activity-date">{service.bookingDate}</span>
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
  const ServicesManagement = () => {
    const serviceStats = {
      total: serviceBookings.length,
      pending: serviceBookings.filter(s => s.status === 'pending').length,
      inProgress: serviceBookings.filter(s => s.status === 'in-progress').length,
      completed: serviceBookings.filter(s => s.status === 'completed').length
    };

    return (
      <div className="tab-content">
        <div className="section-header">
          <h2>Service Bookings</h2>
          {userRole === 'user' && (
            <button 
              className="primary-button"
              onClick={handleBookServiceModal}
            >
              <FaPlus />
              Book New Service
            </button>
          )}
        </div>

        {/* Service Statistics */}
            {/* {userRole === 'user' && ( */}
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
              {/*   )} */}
        <div className="services-container">
          <div className="services-grid">
            {serviceBookings.map(service => (
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

        {serviceBookings.length === 0 && (
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
  const OrdersManagement = () => {
    const orderStats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length
    };

    return (
      <div className="tab-content">
        <div className="section-header">
          <h2>Order History</h2>
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

        <div className="orders-container">
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  {(userRole === 'engineer' || userRole === 'admin') && <th>Customer</th>}
                  <th>Product</th>
                  <th>Order Date</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td data-label="Order ID">{order.id}</td>
                    {(userRole === 'engineer' || userRole === 'admin') && (
                      <td data-label="Customer">{order.customerName}</td>
                    )}
                    <td data-label="Product">{order.product}</td>
                    <td data-label="Order Date">{order.orderDate}</td>
                    <td data-label="Price">{order.price}</td>
                    <td data-label="Status">
                      <span className={`order-status ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td data-label="Actions">
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {orders.length === 0 && (
          <div className="empty-state">
            <FaShoppingCart className="empty-icon" />
            <h3>No Orders Yet</h3>
            <p>Your order history will appear here once you make a purchase.</p>
          </div>
        )}
      </div>
    );
  };

  // Products Management Component
  const ProductsManagement = () => {
    return (
      <div className="tab-content">
        <div className="section-header">
          <h2>Products Management</h2>
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
            <div className="view-controls">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
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

        {viewMode === 'grid' ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-header">
                  <h3>{product.name}</h3>
                  <span className={`product-status ${product.status}`}>
                    {product.status}
                  </span>
                </div>
                <div className="product-details">
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Price:</strong> {product.price}</p>
                  <p><strong>Stock:</strong> {product.stock} units</p>
                  <p><strong>Description:</strong> {product.description}</p>
                  {product.specifications && (
                    <p><strong>Specifications:</strong> {product.specifications}</p>
                  )}
                </div>
                <div className="product-actions">
                  <button 
                    className="outline-button"
                    onClick={() => handleEditProduct(product)}
                  >
                    <FaEdit /> 
                  </button>
                  <button className="outline-button">
                    <FaEye /> 
                  </button>
                  <button 
                    className="outline-button danger"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FaTrash /> 
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className={`status-badge ${product.status}`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="icon-btn edit"
                          onClick={() => handleEditProduct(product)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="icon-btn view"
                          title="View"
                        >
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
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <FaBox className="empty-icon" />
            <h3>No Products Found</h3>
            <p>{searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first product'}</p>
          </div>
        )}
      </div>
    );
  };

  // Customers Management Component
  const CustomersManagement = () => {
    return (
      <div className="tab-content">
        <div className="section-header">
          <h2>Customers Management</h2>
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
            <div className="view-controls">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
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

        {viewMode === 'grid' ? (
          <div className="customers-grid">
            {filteredCustomers.map(customer => (
              <div key={customer.id} className="customer-card">
                <div className="customer-header">
                  <h3>{customer.name}</h3>
                  <span className={`customer-type ${customer.type}`}>
                    {customer.type}
                  </span>
                </div>
                <div className="customer-details">
                  <p><FaEnvelope /> <strong>Email:</strong> {customer.email}</p>
                  <p><FaPhone /> <strong>Phone:</strong> {customer.phone}</p>
                  <p><FaMapMarkerAlt /> <strong>Address:</strong> {customer.billingAddress}</p>
                  {customer.type === 'business' && (
                    <>
                      <p><FaBuilding /> <strong>Company:</strong> {customer.companyName}</p>
                      <p><FaIdCard /> <strong>GST:</strong> {customer.gstNumber}</p>
                    </>
                  )}
                  <p><FaCalendarAlt /> <strong>Since:</strong> {customer.createdAt}</p>
                  {customer.notes && (
                    <p><FaStickyNote /> <strong>Notes:</strong> {customer.notes}</p>
                  )}
                </div>
                <div className="customer-actions">
                  <button 
                    className="outline-button"
                    onClick={() => handleEditCustomer(customer)}
                  >
                    <FaEdit /> 
                  </button>
                  <button className="outline-button">
                    <FaEye /> 
                  </button>
                  <button 
                    className="outline-button danger"
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    <FaTrash /> 
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="customers-table">
            <table>
              <thead>
                <tr>
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
                {filteredCustomers.map(customer => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <span className={`type-badge ${customer.type}`}>
                        {customer.type}
                      </span>
                    </td>
                    <td>{customer.createdAt}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="icon-btn edit"
                          onClick={() => handleEditCustomer(customer)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="icon-btn view"
                          title="View"
                        >
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
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredCustomers.length === 0 && (
          <div className="empty-state">
            <FaUsers className="empty-icon" />
            <h3>No Customers Found</h3>
            <p>{searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first customer'}</p>
          </div>
        )}
      </div>
    );
  };

  // Quotations Management Component
  const QuotationsManagement = () => {
    return (
      <div className="tab-content">
        <div className="section-header">
          <h2>Quotations Management</h2>
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
            <button 
              className="primary-button"
              onClick={() => {
                setEditingItem(null);
                setNewQuotation({
                  customerId: '',
                  customerName: '',
                  items: [],
                  subtotal: 0,
                  tax: 0,
                  total: 0,
                  validUntil: '',
                  notes: ''
                });
                setIsAddQuotationModalOpen(true);
              }}
            >
              <FaPlus />
              Create Quotation
            </button>
          </div>
        </div>

        <div className="quotations-table">
          <table>
            <thead>
              <tr>
                <th>Quote ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Valid Until</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotations.map(quote => (
                <tr key={quote.id}>
                  <td>{quote.id}</td>
                  <td>{quote.customerName}</td>
                  <td>{quote.total}</td>
                  <td>
                    <span className={`status-badge ${quote.status}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td>{quote.createdDate}</td>
                  <td>{quote.validUntil}</td>
                  <td>
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
              ))}
            </tbody>
          </table>
        </div>

        {filteredQuotations.length === 0 && (
          <div className="empty-state">
            <FaFileInvoice className="empty-icon" />
            <h3>No Quotations Found</h3>
            <p>{searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first quotation'}</p>
          </div>
        )}
      </div>
    );
  };

  // Profile Component
  const ProfileManagement = () => {
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
            <Loading 
              type="spinner" 
              text="Loading your account..." 
              fullScreen={false}
              size="large"
            />
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
          </div>
          <div className="user-avatar">
            <FaUser className="avatar-icon" />
          </div>
        </div>

        {/* Role Selector */}
        <div className="role-selector">
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
                  {/* <span className="nav-badge">{dashboardStats.totalOrders}</span> */}
                </li>

                {userRole === 'admin' && (
                  <>
                    <li 
                      className={activeTab === 'products' ? 'active' : ''}
                      onClick={() => setActiveTab('products')}
                    >
                      <FaBox className="nav-icon" />
                      Products
                      {/* <span className="nav-badge">{dashboardStats.totalProducts}</span> */}
                    </li>

                    <li 
                      className={activeTab === 'customers' ? 'active' : ''}
                      onClick={() => setActiveTab('customers')}
                    >
                      <FaUsers className="nav-icon" />
                      Customers
                      {/* <span className="nav-badge">{dashboardStats.totalCustomers}</span> */}
                    </li>

                    <li 
                      className={activeTab === 'quotations' ? 'active' : ''}
                      onClick={() => setActiveTab('quotations')}
                    >
                      <FaFileInvoice className="nav-icon" />
                      Quotations
                      {/* <span className="nav-badge">{dashboardStats.totalQuotations}</span> */}
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

            {userRole === 'user' && (
              <div className="sidebar-actions">
                <button 
                  className="action-button"
                  onClick={handleBookServiceModal}
                >
                  <FaTools />
                  Book New Service
                </button>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="dashboard-main">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'services' && <ServicesManagement />}
            {activeTab === 'orders' && <OrdersManagement />}
            {activeTab === 'products' && userRole === 'admin' && <ProductsManagement />}
            {activeTab === 'customers' && userRole === 'admin' && <CustomersManagement />}
            {activeTab === 'quotations' && userRole === 'admin' && <QuotationsManagement />}
            {activeTab === 'profile' && <ProfileManagement />}
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
          {userRole === 'user' && (
            <div 
              className="nav-item"
              onClick={handleBookServiceModal}
            >
              <FaTools className="nav-icon" />
              <span className="nav-label">Book Service</span>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <BookServiceModal 
        isOpen={isBookServiceModalOpen}
        onClose={() => setIsBookServiceModalOpen(false)}
      />

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
                    <label>Valid Until *</label>
                    <input
                      type="date"
                      value={newQuotation.validUntil}
                      onChange={(e) => setNewQuotation(prev => ({...prev, validUntil: e.target.value}))}
                      required
                    />
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
                              <td>{item.price}</td>
                              <td>{item.total}</td>
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

                <div className="form-field">
                  <label>Notes</label>
                  <textarea
                    value={newQuotation.notes}
                    onChange={(e) => setNewQuotation(prev => ({...prev, notes: e.target.value}))}
                    rows="3"
                    placeholder="Additional notes for the quotation..."
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