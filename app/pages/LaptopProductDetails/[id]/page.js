"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaShoppingCart, 
  FaHeart, 
  FaStar, 
  FaArrowLeft,
  FaTruck,
  FaShieldAlt,
  FaCheckCircle,
  FaSyncAlt,
  FaTimes
} from 'react-icons/fa';
import './LaptopProductDetails.scss';

const LaptopProductDetails = () => {
  const params = useParams();
  const router = useRouter();
  const laptopId = params.id;
  
  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Sample laptop data
  const laptopData = [
    {
      id: 1,
      name: 'Lenovo ThinkPad T460 – (Refurbished)',
      brand: 'lenovo',
      specs: 'Intel® Core i5 – 6th Gen/ 8 GB/ 256 GB SSD',
      originalPrice: 21470,
      currentPrice: 19470,
      image: '/assets/lenovo-image1.jpeg',
      sideImages: [
        '/assets/lenovo-image1-side1.jpeg',
        '/assets/lenovo-image1-side2.jpeg',
        '/assets/lenovo-image1-side3.jpeg'
      ],
      category: 'Lenovo Laptops',
      rating: 4.5,
      reviews: 128,
      inStock: true,
      description: 'Return, Replacement & Warranty - Every Product Is Backed By 6 month Warranty, 7 Days Refund and 14 Days Replacement Policy.',
      fullDescription: 'With powerful processing and reliable performance, the ThinkPad T460 is designed to enhance your productivity, anywhere. Easy to use, deploy, and service, this robust laptop has solid-state storage and the legendary ThinkPad reliability and support.',
      warranty: '6 Months Warranty',
      specifications: {
        'Processor': 'Intel® Core™ i5-6300U Processor',
        'Operating System': 'Windows 10 Pro (Windows 8.1 drivers)',
        'Graphics': 'Intel® Integrated or NVIDIA® GeForce® 940MX',
        'Webcam': '720p HD Camera',
        'Memory': 'Up to 32 GB',
        'Storage': '7 mm HDD (500 GB Hybrid – 5400 rpm / 1 TB – 5400 rpm / 500 GB – 7200 rpm) SATA OPAL SSD (128 GB / 192 GB / 240 GB / 256 GB / 512 GB) PCIe SSD (256 GB)',
        'Audio': 'Dolby® Home Theater® v4',
        'Display': '35.56cms (14) HD (1366 x 768) Anti-Glare, 35.56cms (14) FHD (1920 x 1080) Anti-Glare, Touch(Optional)',
        'Dimensions (W x D x H)': '33.90cms (13.35) x 23.24cms (9.15) x 2.10cms (0.83)',
        'Weight': 'Starting at 3.8 lbs (1.7 kg)',
        'Color': 'Black',
        'I/O (Input/Output) Ports': 'RJ45, Docking, Mini DisplayPort™, HDMI™, SD Card Slot, Smart Card Reader(Optional)',
        'Bluetooth': 'Bluetooth® 4.1',
        'WiGig Docking': 'WiGig Docking(Optional)',
        'WLAN': [
          '2 x 2 Intel® Snowfield Peak 2, vPro™, 802.11 a/c + Bluetooth® 4.1, M.2 Module',
          '2 x 2 Intel® Snowfield Peak 2 8260, Non-vPro™, 802.11 a/c + Bluetooth® 4.1, M.2 Combo Module',
          'Intel® WiGig Douglas Peak 18260 Combo, vPro™, M.2 Module with Antenna',
          '2 x 2 ThinkPad® BCM4356, Non-vPro™, 802.11 a/c + Bluetooth® 4.1, M.2 2230 Module'
        ],
        'WWAN': 'Sierra EM7455, Huawei ME906s'
      },
      features: [
        'Intel Core i5 6th Generation',
        '8GB RAM',
        '256GB SSD',
        '14-inch Display',
        'Windows 10 Pro',
        'Refurbished Condition'
      ]
    },
    {
      id: 2,
      name: 'Dell Latitude 5490 – (Refurbished)',
      brand: 'dell',
      specs: 'Intel® Core i7 – 8th Gen/ 16 GB/ 512 GB SSD',
      originalPrice: 35470,
      currentPrice: 29470,
      image: '/assets/lenovo-image1.jpeg',
      sideImages: [
        '/assets/lenovo-image1-side1.jpeg',
        '/assets/lenovo-image1-side2.jpeg',
        '/assets/lenovo-image1-side3.jpeg'
      ],
      category: 'Dell Laptops',
      rating: 4.7,
      reviews: 95,
      inStock: true,
      description: 'Return, Replacement & Warranty - Every Product Is Backed By 6 month Warranty, 7 Days Refund and 14 Days Replacement Policy.',
      fullDescription: 'High-performance business laptop with 8th generation Intel Core i7 processor and fast SSD storage.',
      warranty: '6 Months Warranty',
      specifications: {
        'Processor': 'Intel Core i7-8650U',
        'Operating System': 'Windows 11 Pro',
        'Graphics': 'Intel UHD Graphics 620',
        'Memory': '16GB DDR4',
        'Storage': '512GB SSD',
        'Display': '14" FHD (1920x1080)'
      },
      features: [
        'Intel Core i7 8th Generation',
        '16GB RAM',
        '512GB SSD',
        '14-inch FHD Display',
        'Windows 11 Pro'
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundLaptop = laptopData.find(laptop => laptop.id === parseInt(laptopId));
      setLaptop(foundLaptop);
      if (foundLaptop) {
        setSelectedImage(foundLaptop.image);
      }
      setLoading(false);
    }, 1000);
  }, [laptopId]);

  const handleAddToCart = () => {
    console.log('Added to cart:', laptop, 'Quantity:', quantity);
    // Add to cart logic here
  };

  const handleAddToWishlist = () => {
    console.log('Added to wishlist:', laptop);
    // Add to wishlist logic here
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getBrandDisplayName = (brand) => {
    return brand.charAt(0).toUpperCase() + brand.slice(1);
  };

  if (loading) {
    return (
      <div className="laptop-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading laptop details...</p>
      </div>
    );
  }

  if (!laptop) {
    return (
      <div className="laptop-not-found">
        <h2>Laptop Not Found</h2>
        <p>The laptop you're looking for doesn't exist.</p>
        <Link href="/pages/LaptopStore" className="back-to-store">
          <FaArrowLeft />
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="laptop-product-details">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb">
        <div className="container">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/LaptopStore">Laptops</Link>
          <span> / </span>
          <span className="current">{laptop.name}</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container">
        <div className="product-details-content">
          {/* Images Section */}
          <div className="images-section">
            <div className="main-image">
              <Image 
                src={selectedImage} 
                alt={laptop.name}
                width={600}
                height={400}
                className="product-image"
                onError={(e) => {
                  e.target.src = '/assets/placeholder-lap.png';
                }}
              />
            </div>
            
            {laptop.sideImages && laptop.sideImages.length > 0 && (
              <div className="side-images">
                <div 
                  className={`side-image-thumb ${selectedImage === laptop.image ? 'active' : ''}`}
                  onClick={() => setSelectedImage(laptop.image)}
                >
                  <Image 
                    src={laptop.image} 
                    alt="Main view"
                    width={80}
                    height={60}
                  />
                </div>
                {laptop.sideImages.map((sideImage, index) => (
                  <div 
                    key={index}
                    className={`side-image-thumb ${selectedImage === sideImage ? 'active' : ''}`}
                    onClick={() => setSelectedImage(sideImage)}
                  >
                    <Image 
                      src={sideImage} 
                      alt={`View ${index + 1}`}
                      width={80}
                      height={60}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="product-info-section">
            <div className="product-header">
              <h1 className="product-title">{laptop.name}</h1>
              <p className="product-specs">{laptop.specs}</p>
              
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < Math.floor(laptop.rating) ? 'star filled' : 'star'}
                    />
                  ))}
                </div>
                <span className="rating-text">({laptop.reviews} reviews)</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="pricing-section">
              <div className="price-container">
                <span className="original-price">
                  <span className="price-label">Original price was: </span>
                  {formatPrice(laptop.originalPrice)}
                </span>
                <span className="current-price">
                  <span className="price-label">Current price is: </span>
                  {formatPrice(laptop.currentPrice)}
                </span>
                {laptop.originalPrice > laptop.currentPrice && (
                  <span className="discount-badge">
                    You save {formatPrice(laptop.originalPrice - laptop.currentPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Warranty Section */}
            <div className="warranty-section">
              <div className="warranty-header">
                <FaShieldAlt className="warranty-icon" />
                <h3>Return, Replacement & Warranty</h3>
              </div>
              <p className="warranty-text">{laptop.description}</p>
            </div>

            {/* Quantity and Actions */}
            <div className="actions-section">
              <div className="quantity-selector">
                <label htmlFor="quantity">
                  {laptop.name} {laptop.specs} quantity
                </label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="10"
                  />
                  <button 
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className={`add-to-cart-btn ${!laptop.inStock ? 'disabled' : ''}`}
                  onClick={handleAddToCart}
                  disabled={!laptop.inStock}
                >
                  <FaShoppingCart />
                  {laptop.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button 
                  className="wishlist-btn"
                  onClick={handleAddToWishlist}
                >
                  <FaHeart />
                  Add to Wishlist
                </button>
              </div>
            </div>

            {/* Product Meta */}
            <div className="product-meta">
              <div className="meta-item">
                <strong>Category:</strong> {laptop.category}
              </div>
            </div>

            {/* Quick Features */}
            <div className="quick-features">
              <h3>Key Features</h3>
              <div className="features-grid">
                {laptop.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <FaCheckCircle className="feature-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="tabs-section">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews (0)
            </button>
          </div>

          <div className="tabs-content">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>Product Description</h3>
                <p>{laptop.fullDescription}</p>
                
                <div className="description-features">
                  <h4>Key Highlights</h4>
                  <ul>
                    {laptop.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div className="tab-panel">
                <h3>Detailed Specifications</h3>
                <div className="specifications-table">
                  {Object.entries(laptop.specifications).map(([key, value]) => (
                    <div key={key} className="spec-row">
                      <div className="spec-label">
                        {key}
                      </div>
                      <div className="spec-value">
                        {Array.isArray(value) ? (
                          <ul>
                            {value.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          value
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <div className="no-reviews">
                  <h3>No reviews yet</h3>
                  <p>Be the first to review this product</p>
                  <button className="write-review-btn">
                    Write a Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default LaptopProductDetails;