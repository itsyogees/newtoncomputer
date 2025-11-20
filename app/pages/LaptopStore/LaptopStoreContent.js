"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
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
import CommonBanner from '../../component/CommonBanner/CommonBanner'; 
import './LaptopStore.scss';
import Loading from '../../component/Loading/Loading';

const LaptopStoreContent = () => {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');
  const router = useRouter();
  const sidebarRef = useRef(null);
  
  const [laptops, setLaptops] = useState([]);
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedOS, setSelectedOS] = useState([]);
  const [selectedRAM, setSelectedRAM] = useState([]);
  const [selectedProcessors, setSelectedProcessors] = useState([]);
  const [showSidebar, setShowSidebar] = useState(typeof window !== 'undefined' && window.innerWidth > 768);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedProcessor, setSelectedProcessor] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);

  // Enhanced laptop data with more specifications
  const laptopData = [
    {
      id: 1,
      name: 'Lenovo ThinkPad T460 – (Refurbished)',
      brand: 'lenovo',
      specs: 'Intel® Core i5 – 6th Gen/ 8 GB/ 256 GB SSD',
      originalPrice: 21470,
      currentPrice: 19470,
      image: '/assets/lenovo-image1.jpeg',
      category: 'business',
      rating: 4.5,
      reviews: 128,
      inStock: true,
      specifications: {
        processor: 'Intel Core i5-6300U',
        processorBrand: 'intel',
        ram: '8GB',
        ramCapacity: 8,
        storage: '256GB SSD',
        display: '14" HD (1366x768)',
        os: 'Windows 10 Pro',
        operatingSystem: 'windows'
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
      category: 'business',
      rating: 4.7,
      reviews: 95,
      inStock: true,
      specifications: {
        processor: 'Intel Core i7-8650U',
        processorBrand: 'intel',
        ram: '16GB',
        ramCapacity: 16,
        storage: '512GB SSD',
        display: '14" FHD (1920x1080)',
        os: 'Windows 11 Pro',
        operatingSystem: 'windows'
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
      category: 'business',
      rating: 4.3,
      reviews: 87,
      inStock: true,
      specifications: {
        processor: 'Intel Core i5-8250U',
        processorBrand: 'intel',
        ram: '8GB',
        ramCapacity: 8,
        storage: '256GB SSD',
        display: '14" FHD (1920x1080)',
        os: 'Windows 10 Pro',
        operatingSystem: 'windows'
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
      category: 'personal',
      rating: 4.0,
      reviews: 64,
      inStock: false,
      specifications: {
        processor: 'Intel Core i3-10110U',
        processorBrand: 'intel',
        ram: '4GB',
        ramCapacity: 4,
        storage: '1TB HDD',
        display: '15.6" HD (1366x768)',
        os: 'Windows 10 Home',
        operatingSystem: 'windows'
      }
    },
    {
      id: 5,
      name: 'ASUS ROG Strix G15 – Gaming Laptop',
      brand: 'asus',
      specs: 'Intel® Core i7 – 11th Gen/ 16 GB/ 1 TB SSD/ RTX 3050',
      originalPrice: 85470,
      currentPrice: 79470,
      image: '/assets/placeholder-lap.png',
      category: 'gaming',
      rating: 4.8,
      reviews: 156,
      inStock: true,
      specifications: {
        processor: 'Intel Core i7-11800H',
        processorBrand: 'intel',
        ram: '16GB',
        ramCapacity: 16,
        storage: '1TB SSD',
        display: '15.6" FHD 144Hz',
        os: 'Windows 11 Home',
        operatingSystem: 'windows'
      }
    },
    {
      id: 6,
      name: 'Apple MacBook Air M1',
      brand: 'apple',
      specs: 'Apple M1/ 8 GB/ 256 GB SSD',
      originalPrice: 92900,
      currentPrice: 84900,
      image: '/assets/placeholder-lap.png',
      category: 'premium',
      rating: 4.9,
      reviews: 234,
      inStock: true,
      specifications: {
        processor: 'Apple M1',
        processorBrand: 'apple',
        ram: '8GB',
        ramCapacity: 8,
        storage: '256GB SSD',
        display: '13.3" Retina',
        os: 'macOS Monterey',
        operatingSystem: 'macos'
      }
    }
  ];

  const brands = ['dell', 'lenovo', 'hp', 'acer', 'asus', 'apple'];
  const operatingSystems = ['windows', 'macos', 'linux'];
  const ramOptions = [4, 8, 16, 32];
  const categories = ['business', 'gaming', 'personal', 'premium'];
  const storageOptions = ['256GB SSD', '512GB SSD', '1TB SSD', '1TB HDD'];
  const processorOptions = ['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Apple M1'];
  const conditionOptions = ['Refurbished', 'Like New'];

  // Initialize with brand from URL
  useEffect(() => {
    if (brand) {
      setSelectedBrands([brand.toLowerCase()]);
    }
  }, [brand]);

  // Data loading effect
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLaptops(laptopData);
      setFilteredLaptops(laptopData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtering function
  const filterLaptops = useCallback(() => {
    let filtered = [...laptopData];

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(laptop => selectedBrands.includes(laptop.brand));
    }

    // Operating System filter
    if (selectedOS.length > 0) {
      filtered = filtered.filter(laptop => selectedOS.includes(laptop.specifications.operatingSystem));
    }

    // RAM filter
    if (selectedRAM.length > 0) {
      filtered = filtered.filter(laptop => selectedRAM.includes(laptop.specifications.ramCapacity));
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(laptop => selectedCategories.includes(laptop.category));
    }

    // Storage filter
    if (selectedStorage.length > 0) {
      filtered = filtered.filter(laptop => selectedStorage.includes(laptop.specifications.storage));
    }

    // Processor filter
    if (selectedProcessor.length > 0) {
      filtered = filtered.filter(laptop => 
        selectedProcessor.some(proc => laptop.specifications.processor.includes(proc))
      );
    }

    // Condition filter
    if (selectedCondition.length > 0) {
      filtered = filtered.filter(laptop => 
        selectedCondition.some(condition => laptop.name.toLowerCase().includes(condition.toLowerCase()))
      );
    }

    // Price filter
    filtered = filtered.filter(laptop => 
      laptop.currentPrice >= priceRange[0] && laptop.currentPrice <= priceRange[1]
    );

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(laptop =>
        laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laptop.specs.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
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
        break;
    }

    setFilteredLaptops(filtered);
  }, [
    selectedBrands, 
    selectedOS, 
    selectedRAM, 
    selectedCategories,
    selectedStorage,
    selectedProcessor,
    selectedCondition,
    priceRange, 
    searchTerm, 
    sortBy
  ]);

  useEffect(() => {
    filterLaptops();
  }, [filterLaptops]);

  // Handle window resize for sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click outside sidebar to close it on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768 && 
          showSidebar && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target) &&
          !event.target.closest('.sidebar-toggle')) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSidebar]);

  // Close sidebar when pressing escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && window.innerWidth <= 768 && showSidebar) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [showSidebar]);

  const handleBrandToggle = (brandItem) => {
    setSelectedBrands(prev =>
      prev.includes(brandItem)
        ? prev.filter(b => b !== brandItem)
        : [...prev, brandItem]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleRAMToggle = (ram) => {
    setSelectedRAM(prev =>
      prev.includes(ram)
        ? prev.filter(r => r !== ram)
        : [...prev, ram]
    );
  };

  const handleStorageToggle = (storage) => {
    setSelectedStorage(prev =>
      prev.includes(storage)
        ? prev.filter(s => s !== storage)
        : [...prev, storage]
    );
  };

  const handleProcessorToggle = (processor) => {
    setSelectedProcessor(prev =>
      prev.includes(processor)
        ? prev.filter(p => p !== processor)
        : [...prev, processor]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedOS([]);
    setSelectedRAM([]);
    setSelectedCategories([]);
    setSelectedStorage([]);
    setSelectedProcessor([]);
    setSelectedCondition([]);
    setPriceRange([0, 200000]);
    setSearchTerm('');
  };

  const handleAddToCart = (laptop) => {
    console.log('Added to cart:', laptop);
  };

  const handleAddToWishlist = (laptop) => {
    console.log('Added to wishlist:', laptop);
  };

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

  const handleImageError = (e) => {
    e.target.src = '/assets/placeholder-lap.png';
  };

  if (loading) {
    return (
      <div className="laptop-store">
        <CommonBanner title={getBannerTitle()}/>
        <div className="loading-section">
          <Loading 
            type="spinner" 
            text="Loading laptops..." 
            fullScreen={false}
            size="medium"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="laptop-store">
      <CommonBanner title={getBannerTitle()}/>

      <section className="laptop-store-main">
        <div className="container">
          {/* Top Controls */}
          <div className="store-controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search laptops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="controls-right">
              <button 
                className={`sidebar-toggle mobile-only ${showSidebar ? 'active' : ''}`}
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <FaFilter />
                Filters
                {showSidebar && <FaTimes className="close-icon" />}
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

          <div className="store-content">
            {/* Mobile Overlay */}
            {showSidebar && typeof window !== 'undefined' && window.innerWidth <= 768 && (
              <div 
                className="sidebar-overlay active"
                onClick={() => setShowSidebar(false)}
              />
            )}

            {/* Sidebar Filters */}
            <div 
              ref={sidebarRef}
              className={`filters-sidebar ${showSidebar ? 'sidebar-open' : 'sidebar-closed'}`}
            >
              <div className="sidebar-content">
                <div className="sidebar-header">
                  <h3>Filters</h3>
                  <div className="header-actions">
                    <button 
                      className="clear-filters"
                      onClick={clearAllFilters}
                    >
                      Clear All
                    </button>
                    <button 
                      className="close-sidebar mobile-only"
                      onClick={() => setShowSidebar(false)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>

                {/* Brands Filter */}
                <div className="filter-section">
                  <h4>Brands</h4>
                  <div className="filter-options">
                    {brands.map(brandItem => (
                      <label key={brandItem} className="filter-option">
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

                {/* Price Range Filter */}
                <div className="filter-section">
                  <h4>Price Range</h4>
                  <div className="price-controls">
                    <div className="price-display">
                      Up to {formatPrice(priceRange[1])}
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="price-slider"
                    />
                    <div className="price-limits">
                      <span>{formatPrice(0)}</span>
                      <span>{formatPrice(200000)}</span>
                    </div>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="filter-section">
                  <h4>Category</h4>
                  <div className="filter-options">
                    {categories.map(category => (
                      <label key={category} className="filter-option">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                        />
                        <span className="checkmark"></span>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                {/* RAM Filter */}
                <div className="filter-section">
                  <h4>RAM</h4>
                  <div className="filter-options">
                    {ramOptions.map(ram => (
                      <label key={ram} className="filter-option">
                        <input
                          type="checkbox"
                          checked={selectedRAM.includes(ram)}
                          onChange={() => handleRAMToggle(ram)}
                        />
                        <span className="checkmark"></span>
                        {ram}GB
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`products-section ${showSidebar ? 'with-sidebar' : 'full-width'}`}>
              <div className="results-info">
                <span className="results-count">
                  {filteredLaptops.length} {filteredLaptops.length === 1 ? 'product' : 'products'} found
                </span>
              </div>

              {filteredLaptops.length === 0 ? (
                <div className="no-results">
                  <h3>No laptops found</h3>
                  <p>Try adjusting your filters or search terms</p>
                  <button className="clear-filters-btn" onClick={clearAllFilters}>
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredLaptops.map(laptop => (
                    <div key={laptop.id} className="product-card">
                      <div className="product-image">
                        <Image 
                          src={laptop.image} 
                          alt={laptop.name}
                          width={200}
                          height={140}
                          className="product-img"
                          onError={handleImageError}
                        />
                        
                        {!laptop.inStock && (
                          <div className="stock-badge">Out of Stock</div>
                        )}
                        
                        <button 
                          className="wishlist-btn"
                          onClick={() => handleAddToWishlist(laptop)}
                        >
                          <FaHeart />
                        </button>

                        <div className="product-badges">
                          <span className={`badge ${laptop.category.toLowerCase()}`}>
                            {laptop.category.charAt(0).toUpperCase() + laptop.category.slice(1)}
                          </span>
                          {laptop.currentPrice < laptop.originalPrice && (
                            <span className="badge discount">
                              Save {formatPrice(laptop.originalPrice - laptop.currentPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="product-info">
                        <div className="product-brand">{getBrandDisplayName(laptop.brand)}</div>
                        <h3 className="product-title">{laptop.name}</h3>
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
                          <span className="rating-text">({laptop.reviews})</span>
                        </div>

                        <div className="product-pricing">
                          <span className="current-price">{formatPrice(laptop.currentPrice)}</span>
                          {laptop.originalPrice > laptop.currentPrice && (
                            <span className="original-price">{formatPrice(laptop.originalPrice)}</span>
                          )}
                        </div>

                        <div className="product-actions">
                          <button 
                            className={`cart-btn ${!laptop.inStock ? 'disabled' : ''}`}
                            onClick={() => handleAddToCart(laptop)}
                            disabled={!laptop.inStock}
                          >
                            <FaShoppingCart />
                            {laptop.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                          <button 
                            className="details-btn"
                            onClick={() => handleViewDetails(laptop.id)}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="store-features">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>12 Months Warranty</h3>
              <p>Comprehensive warranty coverage</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <FaTruck />
              </div>
              <h3>Free Shipping</h3>
              <p>Free delivery across Chennai</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <FaCheckCircle />
              </div>
              <h3>Quality Tested</h3>
              <p>25-point quality check</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <FaSyncAlt />
              </div>
              <h3>7-Day Return</h3>
              <p>Easy return policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaptopStoreContent;