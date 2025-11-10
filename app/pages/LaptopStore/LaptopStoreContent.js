"use client";
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  FaShoppingCart, 
  FaHeart, 
  FaStar, 
  FaSearch, 
  FaFilter, 
  FaTimes,
  FaShieldAlt,
  FaTruck,
  FaCheckCircle,
  FaSyncAlt
} from 'react-icons/fa';
import './LaptopStore.scss';

const LaptopStoreContent = () => {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');
  const router = useRouter();
  
  const [laptops, setLaptops] = useState([]);
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

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
      category: 'Business',
      rating: 4.5,
      reviews: 128,
      inStock: true,
      features: ['8GB RAM', '256GB SSD', '14" Display', 'Windows 10 Pro'],
      description: 'The Lenovo ThinkPad T460 is a reliable business laptop with excellent build quality and performance.',
      fullDescription: 'The Lenovo ThinkPad T460 combines powerful processing with legendary ThinkPad reliability. Featuring a robust chassis, excellent keyboard, and comprehensive security features, this laptop is perfect for business professionals who need dependable performance on the go.',
      warranty: '6 Months Warranty',
      specifications: {
        processor: 'Intel Core i5-6300U',
        ram: '8GB DDR4',
        storage: '256GB SSD',
        display: '14" HD (1366x768)',
        graphics: 'Intel HD Graphics 520',
        battery: '6-cell Li-ion',
        weight: '1.78 kg',
        os: 'Windows 10 Pro'
      }
    },
    {
      id: 2,
      name: 'Dell Latitude 5490 – (Refurbished)',
      brand: 'dell',
      specs: 'Intel® Core i7 – 8th Gen/ 16 GB/ 512 GB SSD',
      originalPrice: 35470,
      currentPrice: 29470,
      image: '/assets/placeholder-lap.png',
      sideImages: [
        '/assets/dell-laptop-side1.jpeg',
        '/assets/dell-laptop-side2.jpeg'
      ],
      category: 'Business',
      rating: 4.7,
      reviews: 95,
      inStock: true,
      features: ['16GB RAM', '512GB SSD', '14" Display', 'Windows 11 Pro'],
      description: 'High-performance Dell Latitude with 8th generation Intel processor.',
      fullDescription: 'The Dell Latitude 5490 offers exceptional performance for demanding business applications with its 8th generation Intel Core i7 processor and fast SSD storage.',
      warranty: '12 Months Warranty',
      specifications: {
        processor: 'Intel Core i7-8650U',
        ram: '16GB DDR4',
        storage: '512GB SSD',
        display: '14" FHD (1920x1080)',
        graphics: 'Intel UHD Graphics 620',
        battery: '4-cell 60Wh',
        weight: '1.65 kg',
        os: 'Windows 11 Pro'
      }
    },
    {
      id: 3,
      name: 'HP EliteBook 840 G5 – (Refurbished)',
      brand: 'hp',
      specs: 'Intel® Core i5 – 8th Gen/ 8 GB/ 256 GB SSD',
      originalPrice: 28470,
      currentPrice: 24470,
      image: '/assets/placeholder-lap.png',
      sideImages: [],
      category: 'Business',
      rating: 4.3,
      reviews: 87,
      inStock: true,
      features: ['8GB RAM', '256GB SSD', '14" Display', 'Windows 10 Pro'],
      description: 'Reliable HP EliteBook for business professionals.',
      fullDescription: 'The HP EliteBook 840 G5 offers excellent performance and security features for business users.',
      warranty: '12 Months Warranty',
      specifications: {
        processor: 'Intel Core i5-8250U',
        ram: '8GB DDR4',
        storage: '256GB SSD',
        display: '14" FHD (1920x1080)',
        graphics: 'Intel UHD Graphics 620',
        battery: '3-cell 50Wh',
        weight: '1.48 kg',
        os: 'Windows 10 Pro'
      }
    },
    {
      id: 4,
      name: 'Acer Aspire 5 – (Refurbished)',
      brand: 'acer',
      specs: 'Intel® Core i3 – 10th Gen/ 4 GB/ 1 TB HDD',
      originalPrice: 18470,
      currentPrice: 15470,
      image: '/assets/placeholder-lap.png',
      sideImages: [],
      category: 'Personal',
      rating: 4.0,
      reviews: 64,
      inStock: false,
      features: ['4GB RAM', '1TB HDD', '15.6" Display', 'Windows 10'],
      description: 'Affordable Acer Aspire for everyday computing.',
      fullDescription: 'The Acer Aspire 5 provides reliable performance for daily computing tasks at an affordable price.',
      warranty: '6 Months Warranty',
      specifications: {
        processor: 'Intel Core i3-10110U',
        ram: '4GB DDR4',
        storage: '1TB HDD',
        display: '15.6" HD (1366x768)',
        graphics: 'Intel UHD Graphics',
        battery: '4-cell 48Wh',
        weight: '1.9 kg',
        os: 'Windows 10 Home'
      }
    }
  ];

  const brands = ['dell', 'lenovo', 'hp', 'acer', 'asus', 'msi'];

  // Initialize with brand from URL
  useEffect(() => {
    if (brand) {
      setSelectedBrands([brand.toLowerCase()]);
    }
  }, [brand]);

  // Data loading effect
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLaptops(laptopData);
      setFilteredLaptops(laptopData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtering function
  const filterLaptops = useCallback(() => {
    let filtered = [...laptopData];

    // Filter by selected brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(laptop => selectedBrands.includes(laptop.brand));
    }

    // Filter by price range
    filtered = filtered.filter(laptop => 
      laptop.currentPrice >= priceRange[0] && laptop.currentPrice <= priceRange[1]
    );

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(laptop =>
        laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laptop.specs.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort laptops
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredLaptops(filtered);
  }, [selectedBrands, priceRange, searchTerm, sortBy]);

  // Apply filters when dependencies change
  useEffect(() => {
    filterLaptops();
  }, [filterLaptops]);

  const handleBrandToggle = (brandItem) => {
    setSelectedBrands(prev =>
      prev.includes(brandItem)
        ? prev.filter(b => b !== brandItem)
        : [...prev, brandItem]
    );
  };

  const handleAddToCart = (laptop) => {
    console.log('Added to cart:', laptop);
    // Add your cart logic here
  };

  const handleAddToWishlist = (laptop) => {
    console.log('Added to wishlist:', laptop);
    // Add your wishlist logic here
  };

  // Navigate to laptop details page
  const handleViewDetails = (laptopId) => {
    router.push(`/pages/LaptopProductDetails/${laptopId}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getBrandDisplayName = (brandItem) => {
    return brandItem.charAt(0).toUpperCase() + brandItem.slice(1);
  };

  const getBannerTitle = () => {
    return brand ? `${getBrandDisplayName(brand)} Laptops` : 'All Laptops';
  };

  // Handle image error and show placeholder
  const handleImageError = (e) => {
    e.target.src = '/assets/placeholder-lap.png';
  };

  if (loading) {
    return (
      <div className="laptop-store-loading">
        <div className="loading-spinner"></div>
        <p>Loading laptops...</p>
      </div>
    );
  }

  return (
    <div className="laptop-store">
      {/* Simple Banner Section */}
      <section className="laptop-store-banner">
        <div className="banner-content">
          <h1 className="banner-title">{getBannerTitle()}</h1>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className="laptop-store-filters">
        <div className="container">
          <div className="filters-header">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search laptops by name or specs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-controls">
              <button 
                className={`filter-toggle ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter />
                Filters
              </button>
              
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="filters-expanded">
              <div className="filter-group">
                <h4>Brands</h4>
                <div className="brand-filters">
                  {brands.map(brandItem => (
                    <label key={brandItem} className="brand-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brandItem)}
                        onChange={() => handleBrandToggle(brandItem)}
                      />
                      <span className="checkmark"></span>
                      {getBrandDisplayName(brandItem)}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Price Range</h4>
                <div className="price-range">
                  <span className="price-label">
                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="price-slider"
                  />
                </div>
              </div>

              <button 
                className="clear-filters"
                onClick={() => {
                  setSelectedBrands([]);
                  setPriceRange([0, 200000]);
                  setSearchTerm('');
                }}
              >
                <FaTimes />
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Laptops Grid Section */}
      <section className="laptop-store-grid">
        <div className="container">
          <div className="grid-header">
            <h2 className="grid-title">
              {filteredLaptops.length} Laptops Found
              {brand && ` in ${getBrandDisplayName(brand)}`}
            </h2>
          </div>

          {filteredLaptops.length === 0 ? (
            <div className="no-results">
              <h3>No laptops found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="laptops-grid">
              {filteredLaptops.map(laptop => (
                <div key={laptop.id} className="laptop-card">
                  <div className="laptop-image">
                    <Image 
                      src={laptop.image} 
                      alt={laptop.name}
                      width={300}
                      height={200}
                      className="product-image"
                      onError={handleImageError}
                    />
                    
                    {!laptop.inStock && (
                      <div className="out-of-stock-badge">Out of Stock</div>
                    )}
                    
                    <div className="laptop-actions">
                      <button 
                        className="action-btn wishlist-btn"
                        onClick={() => handleAddToWishlist(laptop)}
                      >
                        <FaHeart />
                      </button>
                    </div>

                    <div className="laptop-badges">
                      <span className={`badge ${laptop.category.toLowerCase()}`}>
                        {laptop.category}
                      </span>
                      {laptop.currentPrice < laptop.originalPrice && (
                        <span className="badge discount">
                          Save {formatPrice(laptop.originalPrice - laptop.currentPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="laptop-content">
                    <div className="laptop-brand">{getBrandDisplayName(laptop.brand)}</div>
                    <h3 className="laptop-name">{laptop.name}</h3>
                    <p className="laptop-specs">{laptop.specs}</p>
                    
                    <div className="laptop-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < Math.floor(laptop.rating) ? 'star filled' : 'star'}
                          />
                        ))}
                      </div>
                      <span className="rating-text">({laptop.reviews})</span>
                    </div>

                    <div className="laptop-features">
                      {laptop.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="feature-tag">{feature}</span>
                      ))}
                    </div>

                    <div className="laptop-pricing">
                      <div className="price-container">
                        <span className="current-price">{formatPrice(laptop.currentPrice)}</span>
                        {laptop.originalPrice > laptop.currentPrice && (
                          <span className="original-price">{formatPrice(laptop.originalPrice)}</span>
                        )}
                      </div>
                    </div>

                    <div className="laptop-actions-bottom">
                      <button 
                        className={`add-to-cart-btn ${!laptop.inStock ? 'disabled' : ''}`}
                        onClick={() => handleAddToCart(laptop)}
                        disabled={!laptop.inStock}
                      >
                        <FaShoppingCart />
                        {laptop.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                      <button 
                        className="view-details-btn"
                        onClick={() => handleViewDetails(laptop.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="store-features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>12 Months Warranty</h3>
              <p>Every laptop comes with comprehensive warranty coverage</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <FaTruck />
              </div>
              <h3>Free Shipping</h3>
              <p>Free delivery across Chennai with safe packaging</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <FaCheckCircle />
              </div>
              <h3>Quality Tested</h3>
              <p>Rigorous 25-point quality check for every device</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <FaSyncAlt />
              </div>
              <h3>7-Day Return</h3>
              <p>Easy return policy if not satisfied</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaptopStoreContent;