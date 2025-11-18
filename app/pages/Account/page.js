"use client";
import React, { useState } from 'react';
import './Account.scss';
import { 
  FaUser, 
  FaShoppingCart, 
  FaTools, 
  FaEdit,
  FaCheck,
  FaClock,
  FaCheckCircle,
  FaEye
} from 'react-icons/fa';
import BookServiceModal from '../../component/BookServiceModal/page'

const Account = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [isEditing, setIsEditing] = useState(false);
  const [isBookServiceModalOpen, setIsBookServiceModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: 'No. 8/683 A, Srividya Avenue, Rajiv Gandhi Salai, Thoraipakkam, Chennai - 600097'
  });

  // Sample service bookings data
  const [serviceBookings, setServiceBookings] = useState([
    {
      id: 'SRV001',
      laptopModel: 'Dell Inspiron 15',
      serviceType: 'Screen Replacement',
      bookingDate: '2024-01-15',
      status: 'completed',
      estimatedCost: '₹3,500',
      finalCost: '₹3,200',
      technician: 'Raj Kumar',
      completionDate: '2024-01-18'
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
      completionDate: null
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
      completionDate: null
    }
  ]);

  // Sample order history
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      product: 'Refurbished Dell Latitude E7440',
      orderDate: '2024-01-10',
      status: 'delivered',
      price: '₹24,999',
      quantity: 1,
      deliveryDate: '2024-01-15'
    },
    {
      id: 'ORD002',
      product: 'Laptop Bag & Accessories Kit',
      orderDate: '2024-01-18',
      status: 'shipped',
      price: '₹2,499',
      quantity: 1,
      deliveryDate: '2024-01-22'
    },
    {
      id: 'ORD003',
      product: 'Wireless Mouse',
      orderDate: '2024-01-25',
      status: 'pending',
      price: '₹899',
      quantity: 2,
      deliveryDate: '2024-01-30'
    }
  ]);

  const [newService, setNewService] = useState({
    laptopModel: '',
    serviceType: '',
    issueDescription: '',
    preferredDate: '',
    preferredTime: ''
  });

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

  const handleNewServiceChange = (field, value) => {
    setNewService(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBookService = (e) => {
    e.preventDefault();
    const newBooking = {
      id: `SRV00${serviceBookings.length + 1}`,
      laptopModel: newService.laptopModel,
      serviceType: newService.serviceType,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      estimatedCost: 'To be determined',
      finalCost: null,
      technician: null,
      completionDate: null
    };
    
    setServiceBookings(prev => [newBooking, ...prev]);
    setNewService({
      laptopModel: '',
      serviceType: '',
      issueDescription: '',
      preferredDate: '',
      preferredTime: ''
    });
    
    alert('Service booked successfully! We will contact you soon.');
  };

  // Function to open book service modal
  const handleBookServiceModal = () => {
    setIsBookServiceModalOpen(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="status-icon completed" />;
      case 'in-progress':
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
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return 'Pending';
    }
  };

  // Order History Component with improved responsive design
  const OrderHistory = () => {
    return (
      <div className="tab-content">
        <div className="section-header">
          <h2>Order History</h2>
          <div className="mobile-only">
            <span className="order-count">{orders.length} orders</span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="orders-container">
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
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
                    <td data-label="Product">{order.product}</td>
                    <td data-label="Order Date">{order.orderDate}</td>
                    <td data-label="Price">{order.price}</td>
                    <td data-label="Status">
                      <span className={`order-status ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td data-label="Actions">
                      <button className="outline-button">
                        <FaEye className="mobile-only" />
                        <span className="desktop-only">View Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Grid */}
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-id">{order.id}</div>
                  <div className={`order-status ${order.status}`}>
                    {order.status}
                  </div>
                </div>
                <div className="order-details">
                  <div className="detail-row">
                    <span className="detail-label">Product:</span>
                    <span className="detail-value">{order.product}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Order Date:</span>
                    <span className="detail-value">{order.orderDate}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value">{order.price}</span>
                  </div>
                  {order.deliveryDate && (
                    <div className="detail-row">
                      <span className="detail-label">Delivery:</span>
                      <span className="detail-value">{order.deliveryDate}</span>
                    </div>
                  )}
                </div>
                <div className="order-actions">
                  <button className="outline-button">
                    <FaEye />
                    <span style={{marginLeft: '8px'}}>View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
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

  return (
    <div className="account-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="user-greeting">
            <h1>{userData.name}!</h1>
            {/* <p>Manage your services, orders, and account details</p> */}
          </div>
          <div className="user-avatar">
            <FaUser className="avatar-icon" />
          </div>
        </div>

        <div className="dashboard-layout">
          {/* Desktop Sidebar */}
          <div className="dashboard-sidebar desktop-only">
            <div className="sidebar-section">
              <h3>Account</h3>
              <ul className="sidebar-nav">
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
                <li 
                  className={activeTab === 'profile' ? 'active' : ''}
                  onClick={() => setActiveTab('profile')}
                >
                  <FaUser className="nav-icon" />
                  Profile Details
                </li>
              </ul>
            </div>

            <div className="sidebar-actions">
              <button 
                className="action-button"
                onClick={handleBookServiceModal}
              >
                <FaTools />
                Book New Service
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="dashboard-main">
            {/* Service Bookings Tab */}
            {activeTab === 'services' && (
              <div className="tab-content">
                <div className="section-header">
                  <h2>Service Bookings</h2>
                  <button 
                    className="primary-button"
                    onClick={handleBookServiceModal}
                  >
                    Book New Service
                  </button>
                </div>

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
                        
                        <div className="service-details">
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
                        
                        {service.status === 'in-progress' && (
                          <div className="service-actions">
                            <button className="outline-button">Track Service</button>
                            <button className="outline-button">Contact Technician</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Order History Tab */}
            {activeTab === 'orders' && <OrderHistory />}

            {/* Profile Details Tab */}
            {activeTab === 'profile' && (
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
            )}

            {/* Book Service Tab - You can keep this if you want both options */}
            {activeTab === 'book-service' && (
              <div className="tab-content">
                <div className="section-header">
                  <h2>Book New Service</h2>
                  <button 
                    className="secondary-button"
                    onClick={() => setActiveTab('services')}
                  >
                    View My Services
                  </button>
                </div>

                <form className="booking-form-container" onSubmit={handleBookService}>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Laptop Model *</label>
                      <input
                        type="text"
                        value={newService.laptopModel}
                        onChange={(e) => handleNewServiceChange('laptopModel', e.target.value)}
                        placeholder="e.g., Dell Inspiron 15, Lenovo ThinkPad T480"
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label>Service Type *</label>
                      <select
                        value={newService.serviceType}
                        onChange={(e) => handleNewServiceChange('serviceType', e.target.value)}
                        required
                      >
                        <option value="">Select Service Type</option>
                        <option value="Screen Replacement">Screen Replacement</option>
                        <option value="Motherboard Repair">Motherboard Repair</option>
                        <option value="Battery Replacement">Battery Replacement</option>
                        <option value="Keyboard Replacement">Keyboard Replacement</option>
                        <option value="Software Installation">Software Installation</option>
                        <option value="Virus Removal">Virus Removal</option>
                        <option value="Data Recovery">Data Recovery</option>
                        <option value="Hardware Upgrade">Hardware Upgrade</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Issue Description *</label>
                    <textarea
                      value={newService.issueDescription}
                      onChange={(e) => handleNewServiceChange('issueDescription', e.target.value)}
                      placeholder="Please describe the issue in detail..."
                      rows="4"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Preferred Date *</label>
                      <input
                        type="date"
                        value={newService.preferredDate}
                        onChange={(e) => handleNewServiceChange('preferredDate', e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label>Preferred Time *</label>
                      <select
                        value={newService.preferredTime}
                        onChange={(e) => handleNewServiceChange('preferredTime', e.target.value)}
                        required
                      >
                        <option value="">Select Time Slot</option>
                        <option value="09:00-12:00">Morning (9:00 AM - 12:00 PM)</option>
                        <option value="12:00-15:00">Afternoon (12:00 PM - 3:00 PM)</option>
                        <option value="15:00-18:00">Evening (3:00 PM - 6:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="primary-button">
                      Book Service Now
                    </button>
                    <button 
                      type="button" 
                      className="outline-button"
                      onClick={() => setActiveTab('services')}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="mobile-bottom-nav mobile-only">
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
          <div 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser className="nav-icon" />
            <span className="nav-label">Profile</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'book-service' ? 'active' : ''}`}
            onClick={handleBookServiceModal}
          >
            <FaTools className="nav-icon" />
            <span className="nav-label">Book Service</span>
          </div>
        </div>
      </div>

      {/* Book Service Modal */}
      <BookServiceModal 
        isOpen={isBookServiceModalOpen}
        onClose={() => setIsBookServiceModalOpen(false)}
      />
    </div>
  );
};

export default Account;