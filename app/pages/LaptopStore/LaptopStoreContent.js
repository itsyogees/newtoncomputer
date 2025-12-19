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
  FaSyncAlt,
  FaLaptop,
  FaLaptopCode,
  FaKeyboard,
  FaPrint
} from 'react-icons/fa';
import CommonBanner from '../../component/CommonBanner/CommonBanner'; 
import './LaptopStore.scss';
import Loading from '../../component/Loading/Loading';

const LaptopStoreContent = () => {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');
  const category = searchParams.get('category');
  const router = useRouter();
  const sidebarRef = useRef(null);
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedOS, setSelectedOS] = useState([]);
  const [selectedRAM, setSelectedRAM] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedProcessor, setSelectedProcessor] = useState([]);
  const [selectedAccessoryType, setSelectedAccessoryType] = useState([]);
  const [selectedPrinterType, setSelectedPrinterType] = useState([]);
  const [selectedPrinterFunction, setSelectedPrinterFunction] = useState([]);
  const [showSidebar, setShowSidebar] = useState(typeof window !== 'undefined' && window.innerWidth > 768);

  // Enhanced product data with all categories
  const productData = [
    // Refurbished Laptops
    {
      id: 1,
      name: 'Lenovo ThinkPad T460',
      brand: 'lenovo',
      specs: 'Intel® Core i5 – 6th Gen/ 8 GB/ 256 GB SSD',
      originalPrice: 21470,
      currentPrice: 19470,
      image: '/assets/lenovo-image1.jpeg',
      category: 'refurbished-laptop',
      type: 'laptop',
      condition: 'refurbished',
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
      name: 'Dell Latitude 5490',
      brand: 'dell',
      specs: 'Intel® Core i7 – 8th Gen/ 16 GB/ 512 GB SSD',
      originalPrice: 35470,
      currentPrice: 29470,
      image: '/assets/placeholder-lap.png',
      category: 'refurbished-laptop',
      type: 'laptop',
      condition: 'refurbished',
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

    // Brand New Laptops
    {
      id: 3,
      name: 'Apple MacBook Air M1',
      brand: 'apple',
      specs: 'Apple M1/ 8 GB/ 256 GB SSD',
      originalPrice: 92900,
      currentPrice: 84900,
      image: '/assets/placeholder-lap.png',
      category: 'new-laptop',
      type: 'laptop',
      condition: 'new',
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
    },
    {
      id: 4,
      name: 'ASUS ROG Strix G15 – Gaming Laptop',
      brand: 'asus',
      specs: 'Intel® Core i7 – 11th Gen/ 16 GB/ 1 TB SSD/ RTX 3050',
      originalPrice: 85470,
      currentPrice: 79470,
      image: '/assets/placeholder-lap.png',
      category: 'new-laptop',
      type: 'laptop',
      condition: 'new',
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

    // Laptop Accessories
    {
      id: 5,
      name: 'Logitech MX Master 3 Wireless Mouse',
      brand: 'logitech',
      specs: 'Wireless, 4000 DPI, Ergonomic Design',
      originalPrice: 7999,
      currentPrice: 6499,
      image: '/assets/placeholder-lap.png',
      category: 'accessories',
      type: 'mouse',
      accessoryType: 'mouse',
      condition: 'new',
      rating: 4.6,
      reviews: 89,
      inStock: true,
      specifications: {
        connectivity: 'Wireless (Bluetooth/Receiver)',
        battery: '70 days',
        dpi: '4000 DPI',
        color: 'Graphite'
      }
    },
    {
      id: 6,
      name: 'Dell Professional Laptop Backpack',
      brand: 'dell',
      specs: 'Water-resistant, 15.6" Laptop Compartment',
      originalPrice: 3499,
      currentPrice: 2499,
      image: '/assets/placeholder-lap.png',
      category: 'accessories',
      type: 'bag',
      accessoryType: 'bag',
      condition: 'new',
      rating: 4.3,
      reviews: 45,
      inStock: true,
      specifications: {
        capacity: '30L',
        waterResistance: 'Yes',
        laptopSize: 'Up to 15.6"',
        color: 'Black'
      }
    },
    {
      id: 7,
      name: 'HP USB-C Docking Station',
      brand: 'hp',
      specs: 'USB-C Hub with 4K HDMI, Ethernet, USB Ports',
      originalPrice: 8999,
      currentPrice: 6999,
      image: '/assets/placeholder-lap.png',
      category: 'accessories',
      type: 'docking-station',
      accessoryType: 'docking-station',
      condition: 'new',
      rating: 4.4,
      reviews: 67,
      inStock: true,
      specifications: {
        ports: 'HDMI, USB 3.0, Ethernet, USB-C',
        powerDelivery: '100W',
        displaySupport: '4K@60Hz'
      }
    },

    // Printers
    {
      id: 8,
      name: 'HP LaserJet Pro MFP M428fdw',
      brand: 'hp',
      specs: 'Laser Printer, Print/Scan/Copy/Fax, Wireless',
      originalPrice: 34999,
      currentPrice: 29999,
      image: '/assets/placeholder-lap.png',
      category: 'printer',
      type: 'laser',
      printerType: 'laser',
      printerFunction: 'mfp',
      condition: 'new',
      rating: 4.7,
      reviews: 120,
      inStock: true,
      specifications: {
        printerType: 'Laser',
        functions: 'Print/Scan/Copy/Fax',
        connectivity: 'Wi-Fi, Ethernet, USB',
        printSpeed: '28 ppm'
      }
    },
    {
      id: 9,
      name: 'Canon PIXMA G3070 Ink Tank Printer',
      brand: 'canon',
      specs: 'Ink Tank, Wi-Fi, AirPrint',
      originalPrice: 18999,
      currentPrice: 15999,
      image: '/assets/placeholder-lap.png',
      category: 'printer',
      type: 'ink-tank',
      printerType: 'ink-tank',
      printerFunction: 'print',
      condition: 'new',
      rating: 4.5,
      reviews: 95,
      inStock: true,
      specifications: {
        printerType: 'Ink Tank',
        functions: 'Print',
        connectivity: 'Wi-Fi, USB',
        printSpeed: '8.8 ipm (color)'
      }
    },
    {
      id: 10,
      name: 'Epson EcoTank L3210',
      brand: 'epson',
      specs: 'Refillable Ink Tank, All-in-One',
      originalPrice: 16999,
      currentPrice: 13999,
      image: '/assets/placeholder-lap.png',
      category: 'printer',
      type: 'ink-tank',
      printerType: 'ink-tank',
      printerFunction: 'mfp',
      condition: 'new',
      rating: 4.6,
      reviews: 110,
      inStock: true,
      specifications: {
        printerType: 'Ink Tank',
        functions: 'Print/Scan/Copy',
        connectivity: 'USB',
        printSpeed: '10 ppm (black)'
      }
    }
  ];

  // Filter options
  const brands = ['dell', 'lenovo', 'hp', 'apple', 'asus', 'logitech', 'canon', 'epson'];
  const operatingSystems = ['windows', 'macos', 'linux'];
  const ramOptions = [4, 8, 16, 32];
  const productCategories = ['refurbished-laptop', 'new-laptop', 'accessories', 'printer'];
  const storageOptions = ['256GB SSD', '512GB SSD', '1TB SSD', '1TB HDD'];
  const processorOptions = ['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Apple M1'];
  const printerTypes = ['laser', 'ink-tank', 'inkjet'];
  const accessoryTypes = ['mouse', 'bag', 'docking-station'];
  const printerFunctions = ['print', 'mfp'];

  // Get brands by category
  const getBrandsByCategory = () => {
    if (selectedCategories.includes('printer')) {
      return ['hp', 'canon', 'epson'];
    } else if (selectedCategories.includes('accessories')) {
      return ['dell', 'hp', 'logitech'];
    } else if (selectedCategories.includes('refurbished-laptop') || selectedCategories.includes('new-laptop')) {
      return ['dell', 'lenovo', 'hp', 'apple', 'asus'];
    }
    return brands; // Show all brands if no category selected
  };

  // Initialize with brand or category from URL
  useEffect(() => {
    const selectedBrands = [];
    const selectedCategories = [];
    
    if (brand) {
      selectedBrands.push(brand.toLowerCase());
    }
    
    if (category) {
      selectedCategories.push(category.toLowerCase());
    }
    
    setSelectedBrands(selectedBrands);
    setSelectedCategories(selectedCategories);
  }, [brand, category]);

  // Data loading effect
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(productData);
      setFilteredProducts(productData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtering function - FIXED VERSION
  const filterProducts = useCallback(() => {
    console.log('Filtering products...');
    console.log('Selected categories:', selectedCategories);
    console.log('Selected brands:', selectedBrands);
    console.log('Selected RAM:', selectedRAM);
    console.log('Selected storage:', selectedStorage);
    console.log('Selected accessory types:', selectedAccessoryType);
    console.log('Selected printer types:', selectedPrinterType);
    console.log('Selected printer functions:', selectedPrinterFunction);
    console.log('Price range:', priceRange);
    
    let filtered = [...productData];

    // 1. Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
      console.log('After category filter:', filtered.length);
    }

    // 2. Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand)
      );
      console.log('After brand filter:', filtered.length);
    }

    // 3. Price filter
    filtered = filtered.filter(product => 
      product.currentPrice >= priceRange[0] && product.currentPrice <= priceRange[1]
    );
    console.log('After price filter:', filtered.length);

    // 4. RAM filter (only for laptops)
    if (selectedRAM.length > 0 && (selectedCategories.includes('refurbished-laptop') || selectedCategories.includes('new-laptop'))) {
      filtered = filtered.filter(product => 
        product.type === 'laptop' && 
        product.specifications?.ramCapacity && 
        selectedRAM.includes(product.specifications.ramCapacity)
      );
      console.log('After RAM filter:', filtered.length);
    }

    // 5. Storage filter (only for laptops)
    if (selectedStorage.length > 0 && (selectedCategories.includes('refurbished-laptop') || selectedCategories.includes('new-laptop'))) {
      filtered = filtered.filter(product => 
        product.type === 'laptop' && 
        product.specifications?.storage && 
        selectedStorage.includes(product.specifications.storage)
      );
      console.log('After storage filter:', filtered.length);
    }

    // 6. Accessory type filter
    if (selectedAccessoryType.length > 0 && selectedCategories.includes('accessories')) {
      filtered = filtered.filter(product => 
        selectedAccessoryType.includes(product.accessoryType)
      );
      console.log('After accessory type filter:', filtered.length);
    }

    // 7. Printer type filter
    if (selectedPrinterType.length > 0 && selectedCategories.includes('printer')) {
      filtered = filtered.filter(product => 
        selectedPrinterType.includes(product.printerType)
      );
      console.log('After printer type filter:', filtered.length);
    }

    // 8. Printer function filter
    if (selectedPrinterFunction.length > 0 && selectedCategories.includes('printer')) {
      filtered = filtered.filter(product => 
        selectedPrinterFunction.includes(product.printerFunction)
      );
      console.log('After printer function filter:', filtered.length);
    }

    // 9. Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.specs.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log('After search filter:', filtered.length);
    }

    // 10. Sort
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
        // Default sort by category and then by rating
        filtered.sort((a, b) => {
          if (a.category !== b.category) {
            return a.category.localeCompare(b.category);
          }
          return b.rating - a.rating;
        });
        break;
    }

    console.log('Final filtered products:', filtered.length);
    setFilteredProducts(filtered);
  }, [
    selectedBrands, 
    selectedOS, 
    selectedRAM, 
    selectedCategories,
    selectedStorage,
    selectedProcessor,
    selectedAccessoryType,
    selectedPrinterType,
    selectedPrinterFunction,
    priceRange, 
    searchTerm, 
    sortBy
  ]);

  // Run filter whenever dependencies change
  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

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

  const handleBrandToggle = (brandItem) => {
    setSelectedBrands(prev =>
      prev.includes(brandItem)
        ? prev.filter(b => b !== brandItem)
        : [...prev, brandItem]
    );
  };

  const handleCategoryToggle = (categoryItem) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryItem)) {
        return prev.filter(c => c !== categoryItem);
      } else {
        return [...prev, categoryItem];
      }
    });
  };

  const handleAccessoryTypeToggle = (type) => {
    setSelectedAccessoryType(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handlePrinterTypeToggle = (type) => {
    setSelectedPrinterType(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handlePrinterFunctionToggle = (func) => {
    setSelectedPrinterFunction(prev =>
      prev.includes(func)
        ? prev.filter(f => f !== func)
        : [...prev, func]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedOS([]);
    setSelectedRAM([]);
    setSelectedCategories([]);
    setSelectedStorage([]);
    setSelectedProcessor([]);
    setSelectedAccessoryType([]);
    setSelectedPrinterType([]);
    setSelectedPrinterFunction([]);
    setPriceRange([0, 200000]);
    setSearchTerm('');
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    alert(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product) => {
    console.log('Added to wishlist:', product);
    alert(`${product.name} added to wishlist!`);
  };

  const handleViewDetails = (productId) => {
    router.push(`/pages/ProductDetails/${productId}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getBrandDisplayName = (brandItem) => {
    const brandNames = {
      'dell': 'Dell',
      'lenovo': 'Lenovo',
      'hp': 'HP',
      'apple': 'Apple',
      'asus': 'ASUS',
      'logitech': 'Logitech',
      'canon': 'Canon',
      'epson': 'Epson'
    };
    return brandNames[brandItem] || brandItem.charAt(0).toUpperCase() + brandItem.slice(1);
  };

  const getCategoryDisplayName = (categoryItem) => {
    const names = {
      'refurbished-laptop': 'Refurbished Laptops',
      'new-laptop': 'New Laptops',
      'accessories': 'Laptop Accessories',
      'printer': 'Printers'
    };
    return names[categoryItem] || categoryItem;
  };

  const getProductIcon = (category) => {
    switch(category) {
      case 'refurbished-laptop':
        return <FaLaptopCode />;
      case 'new-laptop':
        return <FaLaptop />;
      case 'accessories':
        return <FaKeyboard />;
      case 'printer':
        return <FaPrint />;
      default:
        return <FaLaptop />;
    }
  };

  const getPrinterTypeDisplayName = (type) => {
    const names = {
      'laser': 'Laser Printer',
      'ink-tank': 'Ink Tank Printer',
      'inkjet': 'Inkjet Printer'
    };
    return names[type] || type;
  };

  const getPrinterFunctionDisplayName = (func) => {
    const names = {
      'print': 'Print Only',
      'mfp': 'All-in-One (Print/Scan/Copy/Fax)'
    };
    return names[func] || func;
  };

  const getBannerTitle = () => {
    if (category) return getCategoryDisplayName(category);
    if (brand) return `${getBrandDisplayName(brand)} Products`;
    return 'Shop All Products';
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
            text="Loading products..." 
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
                placeholder="Search products..."
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

                {/* Product Categories Filter */}
                <div className="filter-section">
                  <h4>Product Categories</h4>
                  <div className="filter-options">
                    {productCategories.map(categoryItem => (
                      <label key={categoryItem} className="filter-option">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(categoryItem)}
                          onChange={() => handleCategoryToggle(categoryItem)}
                        />
                        <span className="checkmark"></span>
                        <span className="filter-text">
                          <span className="filter-icon">
                            {getProductIcon(categoryItem)}
                          </span>
                          {getCategoryDisplayName(categoryItem)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands Filter - Dynamic based on selected category */}
                <div className="filter-section">
                  <h4>Brands</h4>
                  <div className="filter-options">
                    {getBrandsByCategory().map(brandItem => (
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

                {/* Laptop Specific Filters - Only show for laptop categories */}
                {(selectedCategories.includes('refurbished-laptop') || 
                  selectedCategories.includes('new-laptop') || 
                  selectedCategories.length === 0) && (
                  <>
                    {/* RAM Filter */}
                    <div className="filter-section">
                      <h4>RAM</h4>
                      <div className="filter-options">
                        {ramOptions.map(ram => (
                          <label key={ram} className="filter-option">
                            <input
                              type="checkbox"
                              checked={selectedRAM.includes(ram)}
                              onChange={() => setSelectedRAM(prev =>
                                prev.includes(ram)
                                  ? prev.filter(r => r !== ram)
                                  : [...prev, ram]
                              )}
                            />
                            <span className="checkmark"></span>
                            {ram}GB
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Storage Filter */}
                    <div className="filter-section">
                      <h4>Storage</h4>
                      <div className="filter-options">
                        {storageOptions.map(storage => (
                          <label key={storage} className="filter-option">
                            <input
                              type="checkbox"
                              checked={selectedStorage.includes(storage)}
                              onChange={() => setSelectedStorage(prev =>
                                prev.includes(storage)
                                  ? prev.filter(s => s !== storage)
                                  : [...prev, storage]
                              )}
                            />
                            <span className="checkmark"></span>
                            {storage}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Processor Filter */}
                    <div className="filter-section">
                      <h4>Processor</h4>
                      <div className="filter-options">
                        {processorOptions.map(processor => (
                          <label key={processor} className="filter-option">
                            <input
                              type="checkbox"
                              checked={selectedProcessor.includes(processor)}
                              onChange={() => setSelectedProcessor(prev =>
                                prev.includes(processor)
                                  ? prev.filter(p => p !== processor)
                                  : [...prev, processor]
                              )}
                            />
                            <span className="checkmark"></span>
                            {processor}
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Accessories Type Filter - Only show for accessories */}
                {(selectedCategories.includes('accessories') || selectedCategories.length === 0) && (
                  <div className="filter-section">
                    <h4>Accessory Type</h4>
                    <div className="filter-options">
                      {accessoryTypes.map(type => (
                        <label key={type} className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedAccessoryType.includes(type)}
                            onChange={() => handleAccessoryTypeToggle(type)}
                          />
                          <span className="checkmark"></span>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Printer Type Filter - Only show for printers */}
                {(selectedCategories.includes('printer') || selectedCategories.length === 0) && (
                  <>
                    <div className="filter-section">
                      <h4>Printer Type</h4>
                      <div className="filter-options">
                        {printerTypes.map(type => (
                          <label key={type} className="filter-option">
                            <input
                              type="checkbox"
                              checked={selectedPrinterType.includes(type)}
                              onChange={() => handlePrinterTypeToggle(type)}
                            />
                            <span className="checkmark"></span>
                            {getPrinterTypeDisplayName(type)}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="filter-section">
                      <h4>Functions</h4>
                      <div className="filter-options">
                        {printerFunctions.map(func => (
                          <label key={func} className="filter-option">
                            <input
                              type="checkbox"
                              checked={selectedPrinterFunction.includes(func)}
                              onChange={() => handlePrinterFunctionToggle(func)}
                            />
                            <span className="checkmark"></span>
                            {getPrinterFunctionDisplayName(func)}
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className={`products-section ${showSidebar ? 'with-sidebar' : 'full-width'}`}>
              <div className="results-info">
                <span className="results-count">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </span>
                {selectedCategories.length > 0 && (
                  <div className="active-filters">
                    {selectedCategories.map(cat => (
                      <span key={cat} className="active-filter">
                        {getCategoryDisplayName(cat)}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="no-results">
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search terms</p>
                  <button className="clear-filters-btn" onClick={clearAllFilters}>
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                      <div className="product-image">
                        <Image 
                          src={product.image} 
                          alt={product.name}
                          width={200}
                          height={140}
                          className="product-img"
                          onError={handleImageError}
                        />
                        
                        {!product.inStock && (
                          <div className="stock-badge">Out of Stock</div>
                        )}
                        
                        <button 
                          className="wishlist-btn"
                          onClick={() => handleAddToWishlist(product)}
                        >
                          <FaHeart />
                        </button>

                        <div className="product-badges">
                          <span className={`badge ${product.category}`}>
                            {getProductIcon(product.category)}
                            {product.condition === 'refurbished' ? 'Refurbished' : 
                             product.category === 'new-laptop' ? 'New' :
                             getCategoryDisplayName(product.category)}
                          </span>
                          {product.originalPrice > product.currentPrice && (
                            <span className="badge discount">
                              Save {Math.round((1 - product.currentPrice / product.originalPrice) * 100)}%
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="product-info">
                        <div className="product-brand">{getBrandDisplayName(product.brand)}</div>
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-specs">{product.specs}</p>
                        
                        <div className="product-rating">
                          <div className="stars">
                            {[...Array(5)].map((_, i) => (
                              <FaStar 
                                key={i} 
                                className={i < Math.floor(product.rating) ? 'star filled' : 'star'}
                              />
                            ))}
                          </div>
                          <span className="rating-text">({product.reviews})</span>
                        </div>

                        <div className="product-pricing">
                          <span className="current-price">{formatPrice(product.currentPrice)}</span>
                          {product.originalPrice > product.currentPrice && (
                            <span className="original-price">{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>

                        <div className="product-actions">
                          <button 
                            className={`cart-btn ${!product.inStock ? 'disabled' : ''}`}
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                          >
                            <FaShoppingCart />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                          <button 
                            className="details-btn"
                            onClick={() => handleViewDetails(product.id)}
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
          <div className="store-features__grid">
            <div className="store-feature__card">
              <div className="store-feature__icon">
                <FaShieldAlt />
              </div>
              <h3 className="store-feature__title">12 Months Warranty</h3>
              <p className="store-feature__description">
                Comprehensive warranty on all products
              </p>
            </div>
            
            <div className="store-feature__card">
              <div className="store-feature__icon">
                <FaTruck />
              </div>
              <h3 className="store-feature__title">Free Shipping</h3>
              <p className="store-feature__description">
                Free delivery across Chennai & suburbs
              </p>
            </div>
            
            <div className="store-feature__card">
              <div className="store-feature__icon">
                <FaCheckCircle />
              </div>
              <h3 className="store-feature__title">Quality Tested</h3>
              <p className="store-feature__description">
                Rigorous quality inspection for all products
              </p>
            </div>
            
            <div className="store-feature__card">
              <div className="store-feature__icon">
                <FaSyncAlt />
              </div>
              <h3 className="store-feature__title">7-Day Return</h3>
              <p className="store-feature__description">
                Hassle-free return policy on all purchases
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaptopStoreContent;