"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaLock,
  FaCreditCard,
  FaShieldAlt,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowLeft,
  FaCheckCircle,
  FaTruck,
  FaUndo,
  FaGoogle,
  FaApple
} from 'react-icons/fa';
import './Payment.scss';

// Wrap the main component with Suspense
export default function Payment() {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentContent />
    </Suspense>
  );
}

// Main payment content component
function PaymentContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    // Card Details
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    
    // Billing Address
    billingAddress: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    
    // Shipping Address
    shippingSameAsBilling: true,
    shippingAddress: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    }
  });

  const [errors, setErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Load order data from cart
  useEffect(() => {
    const loadOrderData = () => {
      try {
        const savedCheckoutData = localStorage.getItem('checkoutData');
        if (!savedCheckoutData) {
          router.push('/cart');
          return;
        }

        const data = JSON.parse(savedCheckoutData);
        setOrderData(data);

        // Pre-fill form with user data if available
        const userData = localStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          setFormData(prev => ({
            ...prev,
            billingAddress: {
              ...prev.billingAddress,
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              email: user.email || '',
              phone: user.phone || ''
            }
          }));
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading order data:', error);
        router.push('/cart');
      }
    };

    loadOrderData();
  }, [router]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(' ') : value;
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Card validation
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }

      if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }

      if (!formData.cvv.match(/^\d{3,4}$/)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }

      if (!formData.cardHolder.trim()) {
        newErrors.cardHolder = 'Card holder name is required';
      }
    }

    // Billing address validation
    if (!formData.billingAddress.firstName.trim()) {
      newErrors['billingAddress.firstName'] = 'First name is required';
    }

    if (!formData.billingAddress.lastName.trim()) {
      newErrors['billingAddress.lastName'] = 'Last name is required';
    }

    if (!formData.billingAddress.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors['billingAddress.email'] = 'Please enter a valid email';
    }

    if (!formData.billingAddress.phone.match(/^\d{10}$/)) {
      newErrors['billingAddress.phone'] = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.billingAddress.address.trim()) {
      newErrors['billingAddress.address'] = 'Address is required';
    }

    if (!formData.billingAddress.city.trim()) {
      newErrors['billingAddress.city'] = 'City is required';
    }

    if (!formData.billingAddress.state.trim()) {
      newErrors['billingAddress.state'] = 'State is required';
    }

    if (!formData.billingAddress.zipCode.match(/^\d{6}$/)) {
      newErrors['billingAddress.zipCode'] = 'Please enter a valid 6-digit PIN code';
    }

    // Shipping address validation if different from billing
    if (!formData.shippingSameAsBilling) {
      if (!formData.shippingAddress.firstName.trim()) {
        newErrors['shippingAddress.firstName'] = 'First name is required';
      }

      if (!formData.shippingAddress.lastName.trim()) {
        newErrors['shippingAddress.lastName'] = 'Last name is required';
      }

      if (!formData.shippingAddress.address.trim()) {
        newErrors['shippingAddress.address'] = 'Address is required';
      }

      if (!formData.shippingAddress.city.trim()) {
        newErrors['shippingAddress.city'] = 'City is required';
      }

      if (!formData.shippingAddress.state.trim()) {
        newErrors['shippingAddress.state'] = 'State is required';
      }

      if (!formData.shippingAddress.zipCode.match(/^\d{6}$/)) {
        newErrors['shippingAddress.zipCode'] = 'Please enter a valid 6-digit PIN code';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setProcessing(true);

    try {
      // Simulate API call to process payment
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate order ID
      const newOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setOrderId(newOrderId);

      // Save order to localStorage
      const orderDetails = {
        orderId: newOrderId,
        ...orderData,
        paymentMethod,
        billingAddress: formData.billingAddress,
        shippingAddress: formData.shippingSameAsBilling ? formData.billingAddress : formData.shippingAddress,
        paymentStatus: 'completed',
        orderStatus: 'confirmed',
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      localStorage.setItem('currentOrder', JSON.stringify(orderDetails));
      
      // Clear cart
      localStorage.removeItem('checkoutData');
      
      // Show success
      setOrderSuccess(true);

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  // Payment methods
  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: FaCreditCard,
      description: 'Pay with Visa, Mastercard, or RuPay',
      popular: true
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: FaGoogle,
      description: 'Pay using UPI apps like Google Pay, PhonePe',
      popular: true
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: FaShieldAlt,
      description: 'Transfer directly from your bank account'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: FaApple,
      description: 'Paytm, Amazon Pay, and other wallets'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: FaTruck,
      description: 'Pay when you receive your order'
    }
  ];

  if (loading) {
    return <PaymentLoading />;
  }

  if (orderSuccess) {
    return <OrderSuccess orderId={orderId} orderData={orderData} />;
  }

  return (
    <div className="payment-page">
      <div className="container">
        {/* Header */}
        <div className="payment-header">
          <Link href="/cart" className="back-link">
            <FaArrowLeft />
            Back to Cart
          </Link>
          <h1 className="payment-title">Payment Details</h1>
          <div className="secure-badge">
            <FaLock />
            <span>Secure Payment</span>
          </div>
        </div>

        <div className="payment-layout">
          {/* Left Column - Payment Form */}
          <div className="payment-form-section">
            <form onSubmit={handleSubmit} className="payment-form">
              {/* Payment Method Selection */}
              <div className="form-section">
                <h3 className="section-title">
                  <FaCreditCard />
                  Payment Method
                </h3>
                <div className="payment-methods-grid">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`payment-method-card ${paymentMethod === method.id ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="method-header">
                        <method.icon className="method-icon" />
                        <div className="method-info">
                          <span className="method-name">{method.name}</span>
                          <span className="method-description">{method.description}</span>
                        </div>
                        {method.popular && (
                          <span className="popular-badge">Popular</span>
                        )}
                      </div>
                      <div className="method-radio">
                        <div className={`radio-dot ${paymentMethod === method.id ? 'active' : ''}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Details */}
              {paymentMethod === 'card' && (
                <div className="form-section">
                  <h3 className="section-title">Card Details</h3>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                        maxLength={19}
                        className={errors.cardNumber ? 'error' : ''}
                      />
                      {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                        maxLength={5}
                        className={errors.expiryDate ? 'error' : ''}
                      />
                      {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                        maxLength={4}
                        className={errors.cvv ? 'error' : ''}
                      />
                      {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="cardHolder">Card Holder Name</label>
                      <input
                        type="text"
                        id="cardHolder"
                        placeholder="John Doe"
                        value={formData.cardHolder}
                        onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                        className={errors.cardHolder ? 'error' : ''}
                      />
                      {errors.cardHolder && <span className="error-text">{errors.cardHolder}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Payment */}
              {paymentMethod === 'upi' && (
                <div className="form-section">
                  <h3 className="section-title">UPI Payment</h3>
                  <div className="upi-section">
                    <div className="form-group full-width">
                      <label htmlFor="upiId">UPI ID</label>
                      <input
                        type="text"
                        id="upiId"
                        placeholder="yourname@upi"
                        className="upi-input"
                      />
                    </div>
                    <button type="button" className="btn-upi-pay">
                      <FaGoogle />
                      Pay with UPI
                    </button>
                  </div>
                </div>
              )}

              {/* Billing Address */}
              <div className="form-section">
                <h3 className="section-title">
                  <FaUser />
                  Billing Address
                </h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="billingFirstName">First Name</label>
                    <input
                      type="text"
                      id="billingFirstName"
                      value={formData.billingAddress.firstName}
                      onChange={(e) => handleInputChange('billingAddress.firstName', e.target.value)}
                      className={errors['billingAddress.firstName'] ? 'error' : ''}
                    />
                    {errors['billingAddress.firstName'] && (
                      <span className="error-text">{errors['billingAddress.firstName']}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="billingLastName">Last Name</label>
                    <input
                      type="text"
                      id="billingLastName"
                      value={formData.billingAddress.lastName}
                      onChange={(e) => handleInputChange('billingAddress.lastName', e.target.value)}
                      className={errors['billingAddress.lastName'] ? 'error' : ''}
                    />
                    {errors['billingAddress.lastName'] && (
                      <span className="error-text">{errors['billingAddress.lastName']}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="billingEmail">
                      <FaEnvelope />
                      Email
                    </label>
                    <input
                      type="email"
                      id="billingEmail"
                      value={formData.billingAddress.email}
                      onChange={(e) => handleInputChange('billingAddress.email', e.target.value)}
                      className={errors['billingAddress.email'] ? 'error' : ''}
                    />
                    {errors['billingAddress.email'] && (
                      <span className="error-text">{errors['billingAddress.email']}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="billingPhone">
                      <FaPhone />
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="billingPhone"
                      placeholder="10-digit number"
                      value={formData.billingAddress.phone}
                      onChange={(e) => handleInputChange('billingAddress.phone', e.target.value.replace(/\D/g, ''))}
                      maxLength={10}
                      className={errors['billingAddress.phone'] ? 'error' : ''}
                    />
                    {errors['billingAddress.phone'] && (
                      <span className="error-text">{errors['billingAddress.phone']}</span>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="billingAddress">
                      <FaMapMarkerAlt />
                      Address
                    </label>
                    <textarea
                      id="billingAddress"
                      rows={3}
                      value={formData.billingAddress.address}
                      onChange={(e) => handleInputChange('billingAddress.address', e.target.value)}
                      className={errors['billingAddress.address'] ? 'error' : ''}
                    />
                    {errors['billingAddress.address'] && (
                      <span className="error-text">{errors['billingAddress.address']}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="billingCity">City</label>
                    <input
                      type="text"
                      id="billingCity"
                      value={formData.billingAddress.city}
                      onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                      className={errors['billingAddress.city'] ? 'error' : ''}
                    />
                    {errors['billingAddress.city'] && (
                      <span className="error-text">{errors['billingAddress.city']}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="billingState">State</label>
                    <input
                      type="text"
                      id="billingState"
                      value={formData.billingAddress.state}
                      onChange={(e) => handleInputChange('billingAddress.state', e.target.value)}
                      className={errors['billingAddress.state'] ? 'error' : ''}
                    />
                    {errors['billingAddress.state'] && (
                      <span className="error-text">{errors['billingAddress.state']}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="billingZipCode">PIN Code</label>
                    <input
                      type="text"
                      id="billingZipCode"
                      placeholder="6 digits"
                      value={formData.billingAddress.zipCode}
                      onChange={(e) => handleInputChange('billingAddress.zipCode', e.target.value.replace(/\D/g, ''))}
                      maxLength={6}
                      className={errors['billingAddress.zipCode'] ? 'error' : ''}
                    />
                    {errors['billingAddress.zipCode'] && (
                      <span className="error-text">{errors['billingAddress.zipCode']}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address Toggle */}
              <div className="form-section">
                <div className="shipping-toggle">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.shippingSameAsBilling}
                      onChange={(e) => handleInputChange('shippingSameAsBilling', e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Shipping address same as billing
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="pay-now-btn"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <div className="processing-spinner"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <FaLock />
                    Pay Now ₹{orderData?.total?.toLocaleString()}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-summary-sidebar">
            <OrderSummarySidebar orderData={orderData} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Order Summary Sidebar Component
const OrderSummarySidebar = ({ orderData }) => {
  if (!orderData) return null;

  const tax = Math.round(orderData.total * 0.18);

  return (
    <div className="order-summary-card">
      <h3>Order Summary</h3>
      
      <div className="order-items">
        {orderData.items?.map((item) => (
          <div key={item.id} className="order-item">
            <div className="item-image">
              <Image
                src={item.image}
                alt={item.name}
                width={50}
                height={35}
                className="product-image"
              />
            </div>
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">Qty: {item.quantity}</span>
            </div>
            <div className="item-price">
              ₹{(item.price * item.quantity).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="price-breakdown">
        <div className="price-row">
          <span>Subtotal</span>
          <span>₹{orderData.subtotal?.toLocaleString()}</span>
        </div>
        
        {orderData.discount > 0 && (
          <div className="price-row discount">
            <span>Discount</span>
            <span>-₹{orderData.discount?.toLocaleString()}</span>
          </div>
        )}
        
        <div className="price-row">
          <span>Shipping</span>
          <span className="free">FREE</span>
        </div>
        
        <div className="price-row">
          <span>Tax</span>
          <span>₹{tax.toLocaleString()}</span>
        </div>
        
        <div className="price-row total">
          <span>Total</span>
          <span>₹{(orderData.total + tax).toLocaleString()}</span>
        </div>
      </div>

      <div className="delivery-info">
        <div className="delivery-item">
          <FaTruck />
          <span>Free delivery in 5-7 business days</span>
        </div>
        <div className="delivery-item">
          <FaUndo />
          <span>30-day easy returns</span>
        </div>
        <div className="delivery-item">
          <FaShieldAlt />
          <span>1-year warranty included</span>
        </div>
      </div>
    </div>
  );
};

// Order Success Component
const OrderSuccess = ({ orderId, orderData }) => {
  const router = useRouter();

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">
            <FaCheckCircle />
          </div>
          
          <h1>Order Confirmed!</h1>
          <p className="success-message">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          
          <div className="order-id">
            Order ID: <strong>{orderId}</strong>
          </div>

          <div className="order-details-card">
            <h3>Order Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span>Total Amount:</span>
                <strong>₹{orderData?.total?.toLocaleString()}</strong>
              </div>
              <div className="detail-item">
                <span>Items:</span>
                <span>{orderData?.totalItems} items</span>
              </div>
              <div className="detail-item">
                <span>Estimated Delivery:</span>
                <span>5-7 business days</span>
              </div>
              <div className="detail-item">
                <span>Shipping to:</span>
                <span>Your provided address</span>
              </div>
            </div>
          </div>

          <div className="success-actions">
            <button 
              onClick={() => router.push('/orders')}
              className="btn btn-primary"
            >
              View Order Details
            </button>
            <button 
              onClick={() => router.push('/')}
              className="btn btn-secondary"
            >
              Continue Shopping
            </button>
          </div>

          <div className="support-info">
            <p>Need help? <a href="mailto:support@yourstore.com">Contact our support team</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Component
const PaymentLoading = () => {
  return (
    <div className="payment-page">
      <div className="container">
        <div className="loading-payment">
          <div className="loading-spinner"></div>
          <p>Loading payment details...</p>
        </div>
      </div>
    </div>
  );
};