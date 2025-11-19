"use client";
import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaShoppingCart, 
  FaArrowLeft,
  FaCreditCard,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaLock,
  FaUser
} from 'react-icons/fa';
import './Cart.scss';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const router = useRouter();

  // Sample cart data
  const sampleCartItems = [
    {
      id: 1,
      name: 'Lenovo ThinkPad T460 – (Refurbished)',
      specs: 'Intel® Core i5 – 6th Gen/ 8 GB/ 256 GB SSD',
      price: 19470,
      originalPrice: 21470,
      image: '/assets/lenovo-image1.jpeg',
      quantity: 1,
      category: 'Lenovo Laptops',
      warranty: '6 months',
      stock: 5,
      sku: 'LEN-T460-REF'
    },
    {
      id: 2,
      name: 'HP Elitebook 830 G5 & G6 – (Refurbished)',
      specs: 'Intel i7, 8th gen/16GB/256GB SSD',
      price: 22999,
      originalPrice: 25999,
      image: '/assets/hp-image1.jpeg',
      quantity: 1,
      category: 'HP Laptops',
      warranty: '6 months',
      stock: 3,
      sku: 'HP-830G5-REF'
    }
  ];

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load cart data
  useEffect(() => {
    const timer = setTimeout(() => {
      setCartItems(sampleCartItems);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Calculate cart values
  const calculateCartValues = useCallback(() => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = cartItems.reduce((total, item) => 
      total + ((item.originalPrice - item.price) * item.quantity), 0
    );
    const total = subtotal;
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return { subtotal, discount, total, totalItems };
  }, [cartItems]);

  // Memoized calculations - MOVE THIS BEFORE handleProceedToCheckout
  const { subtotal, discount, total, totalItems } = useMemo(() => {
    return calculateCartValues();
  }, [calculateCartValues]);

  // Update quantity
  const updateQuantity = useCallback((id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  // Remove item
  const removeItem = useCallback((id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  // Check stock availability
  const checkStockAvailability = useCallback(() => {
    const outOfStockItems = cartItems.filter(item => item.quantity > item.stock);
    return outOfStockItems;
  }, [cartItems]);

  // Validate cart
  const validateCart = useCallback(() => {
    const errors = [];

    if (cartItems.length === 0) {
      errors.push('Your cart is empty');
      return { isValid: false, errors };
    }

    const outOfStockItems = checkStockAvailability();
    if (outOfStockItems.length > 0) {
      errors.push(`Some items exceed available stock`);
    }

    const invalidQuantities = cartItems.filter(item => item.quantity < 1);
    if (invalidQuantities.length > 0) {
      errors.push('Some items have invalid quantities');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [cartItems, checkStockAvailability]);

  // Handle checkout - FIXED: Now uses memoized values
  const handleProceedToCheckout = useCallback(async () => {
    const validation = validateCart();
    
    if (!validation.isValid) {
      alert(`Cannot proceed to checkout:\n${validation.errors.join('\n')}`);
      return;
    }

    setCheckoutLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const outOfStockItems = checkStockAvailability();
      if (outOfStockItems.length > 0) {
        alert(`Sorry, the following items are out of stock:\n${
          outOfStockItems.map(item => `- ${item.name}`).join('\n')
        }`);
        setCheckoutLoading(false);
        return;
      }

      // Prepare and save checkout data - USING MEMOIZED VALUES
      const checkoutData = {
        items: cartItems,
        subtotal: subtotal,
        discount: discount,
        total: total,
        totalItems: totalItems,
        timestamp: new Date().toISOString(),
        checkoutId: `CHK-${Date.now()}`
      };

      localStorage.setItem('checkoutData', JSON.stringify(checkoutData));

      // Navigate to payment page
      router.push('/pages/Payment');

    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  }, [cartItems, validateCart, checkStockAvailability, router, subtotal, discount, total, totalItems]);

  // Low stock items
  const lowStockItems = useMemo(() => {
    return cartItems.filter(item => item.stock < 3 && item.quantity <= item.stock);
  }, [cartItems]);

  if (loading) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="loading-cart">
            <div className="loading-spinner"></div>
            <p>Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Header */}
        <div className="cart-header">
          <Link href="/" className="back-to-shop">
            <FaArrowLeft />
            Continue Shopping
          </Link>
          <h1 className="cart-title">Shopping Cart</h1>
          <div className="cart-summary-header">
            <span>{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FaShoppingCart />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Link href="/" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            {/* Stock Warnings */}
            {lowStockItems.length > 0 && (
              <div className="stock-warning-banner">
                <FaUser />
                <span>
                  {lowStockItems.length} item{lowStockItems.length > 1 ? 's' : ''} {lowStockItems.length > 1 ? 'are' : 'is'} in high demand. Order soon!
                </span>
              </div>
            )}

            <div className="cart-layout">
              {/* Cart Items */}
              <div className="cart-items-section">
                <div className="cart-items-header">
                  <h2>Cart Items ({totalItems})</h2>
                  <button 
                    className="clear-cart-btn"
                    onClick={() => setCartItems([])}
                  >
                    <FaTrash />
                    Clear All
                  </button>
                </div>

                <div className="cart-items">
                  {cartItems.map((item) => (
                    <CartItem 
                      key={item.id}
                      item={item}
                      isMobile={isMobile}
                      onUpdateQuantity={updateQuantity}
                      onRemoveItem={removeItem}
                    />
                  ))}
                </div>

                {/* Trust Badges */}
                <TrustBadges />
              </div>

              {/* Order Summary */}
              <div className="order-summary-section">
                <OrderSummary 
                  subtotal={subtotal}
                  discount={discount}
                  total={total}
                  totalItems={totalItems}
                  onCheckout={handleProceedToCheckout}
                  isLoading={checkoutLoading}
                  cartItems={cartItems}
                />
                
                {/* Promo Code */}
                <PromoSection />
                
                {/* Recently Viewed */}
                <RecentlyViewed />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Cart Item Component
const CartItem = ({ item, isMobile, onUpdateQuantity, onRemoveItem }) => {
  const isOutOfStock = item.quantity > item.stock;
  const isLowStock = item.stock < 3 && !isOutOfStock;

  return (
    <div className={`cart-item ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="item-image">
        <Image
          src={item.image}
          alt={item.name}
          width={isMobile ? 80 : 120}
          height={isMobile ? 60 : 80}
          className="product-image"
          priority={item.id <= 2}
        />
        {isOutOfStock && (
          <div className="stock-badge out-of-stock-badge">Out of Stock</div>
        )}
        {isLowStock && (
          <div className="stock-badge low-stock-badge">Only {item.stock} left</div>
        )}
      </div>

      <div className="item-details">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-specs">{item.specs}</p>
        <p className="item-sku">SKU: {item.sku}</p>
        <div className="item-meta">
          <span className="item-category">{item.category}</span>
          <span className="item-warranty">
            <FaShieldAlt /> {item.warranty} Warranty
          </span>
        </div>
      </div>

      <div className="item-quantity">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="quantity-btn"
          disabled={item.quantity <= 1 || isOutOfStock}
          aria-label="Decrease quantity"
        >
          <FaMinus />
        </button>
        <span className="quantity-display">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="quantity-btn"
          disabled={isOutOfStock}
          aria-label="Increase quantity"
        >
          <FaPlus />
        </button>
      </div>

      <div className="item-pricing">
        <div className="price-current">
          ₹{(item.price * item.quantity).toLocaleString()}
        </div>
        {item.originalPrice > item.price && (
          <div className="price-original">
            ₹{(item.originalPrice * item.quantity).toLocaleString()}
          </div>
        )}
        {item.originalPrice > item.price && (
          <div className="price-savings">
            Save ₹{((item.originalPrice - item.price) * item.quantity).toLocaleString()}
          </div>
        )}
      </div>

      <button
        onClick={() => onRemoveItem(item.id)}
        className="remove-item-btn"
        aria-label="Remove item"
      >
        <FaTrash />
      </button>
    </div>
  );
};

// Order Summary Component
const OrderSummary = ({ 
  subtotal, 
  discount, 
  total, 
  totalItems, 
  onCheckout, 
  isLoading,
  cartItems 
}) => {
  const hasOutOfStockItems = cartItems.some(item => item.quantity > item.stock);
  
  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      
      <div className="summary-row">
        <span>Subtotal ({totalItems} items)</span>
        <span>₹{subtotal.toLocaleString()}</span>
      </div>

      {discount > 0 && (
        <div className="summary-row discount">
          <span>Discount</span>
          <span>-₹{discount.toLocaleString()}</span>
        </div>
      )}

      <div className="summary-row">
        <span>Shipping</span>
        <span className="free-shipping">FREE</span>
      </div>

      <div className="summary-row">
        <span>Tax</span>
        <span>Calculated at checkout</span>
      </div>

      <div className="summary-divider"></div>

      <div className="summary-row total">
        <span>Total</span>
        <span>₹{total.toLocaleString()}</span>
      </div>

      {/* Checkout Button */}
      <button 
        className={`checkout-btn ${hasOutOfStockItems ? 'disabled' : ''}`}
        onClick={onCheckout}
        disabled={isLoading || hasOutOfStockItems || cartItems.length === 0}
      >
        {isLoading ? (
          <>
            <div className="checkout-spinner"></div>
            Processing...
          </>
        ) : (
          <>
            <FaCreditCard />
            Proceed to Checkout
          </>
        )}
      </button>

      {hasOutOfStockItems && (
        <div className="error-message">
          ⚠️ Adjust quantities before checkout
        </div>
      )}

    

      <div className="payment-methods">
        <p>We accept:</p>
        <div className="payment-icons">
          <span>💳</span>
          <span>📱</span>
          <span>🏦</span>
          <span>🔗</span>
        </div>
      </div>

      <div className="security-notice">
        <FaLock />
        <span>Your payment information is secure and encrypted</span>
      </div>
    </div>
  );
};

// Trust Badges Component
const TrustBadges = () => (
  <div className="trust-badges">
    <div className="trust-badge">
      <FaShieldAlt />
      <span>Secure Checkout</span>
    </div>
    <div className="trust-badge">
      <FaTruck />
      <span>Free Shipping</span>
    </div>
    <div className="trust-badge">
      <FaUndo />
      <span>Easy Returns</span>
    </div>
  </div>
);

// Promo Section Component
const PromoSection = () => (
  <div className="promo-section">
    <h4>Have a promo code?</h4>
    <div className="promo-input-group">
      <input 
        type="text" 
        placeholder="Enter promo code"
        className="promo-input"
      />
      <button className="promo-btn">Apply</button>
    </div>
  </div>
);

// Recently Viewed Component
const RecentlyViewed = () => (
  <div className="recently-viewed">
    <h4>You might also like</h4>
    <div className="suggested-products">
      <div className="suggested-product">
        <Image
          src="/assets/lenovo-image1-side1.jpeg"
          alt="Lenovo ThinkPad"
          width={60}
          height={40}
        />
        <span>Lenovo ThinkPad</span>
      </div>
      <div className="suggested-product">
        <Image
          src="/assets/hp-image1-side1.jpeg"
          alt="HP Elitebook"
          width={60}
          height={40}
        />
        <span>HP Elitebook</span>
      </div>
    </div>
  </div>
);