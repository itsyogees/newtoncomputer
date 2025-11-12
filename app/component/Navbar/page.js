"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaPhone, FaEnvelope, FaChevronDown, FaMapMarkerAlt, FaSearch, FaUser } from "react-icons/fa";
import "./Navbar.scss";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartCount = 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to handle laptop store navigation with brand filter
  const handleLaptopStoreClick = (brand = '') => {
    closeMenu();
    if (brand) {
      window.location.href = `/pages/LaptopStore?brand=${brand}`;
    } else {
      window.location.href = '/pages/LaptopStore';
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className={`info-bar ${isScrolled ? 'info-bar--hidden' : ''}`}>
        <div className="info-bar__container">
          <div className="info-bar__contact">
            <FaEnvelope className="info-bar__icon" />
            <a href="mailto:info@newtoncomputers.in">info@newtoncomputers.in</a>
          </div>
          
          <div className="info-bar__status">
            Open Today: 9:30 AM - 8:00 PM
          </div>

          <div className="info-bar__phones">
            <span className="phone-item">
              <FaMapMarkerAlt className="info-bar__icon" />
              <span className="location-badge">T.Nagar</span>
              <FaPhone className="info-bar__icon" />
              <a href="tel:9840604073">9840604073</a>
            </span>
            
            <span className="divider">|</span>
            
            <span className="phone-item">
              <FaMapMarkerAlt className="info-bar__icon" />
              <span className="location-badge">Thoraipakkam</span>
              <FaPhone className="info-bar__icon" />
              <a href="tel:9940185417">9940185417</a>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">
          {/* Logo */}
          <div className="navbar__logo">
            <Link href="/">
              <Image 
                src="/new-logo.png" 
                alt="Newton Computers" 
                width={150} 
                height={50} 
                priority
              />
            </Link>
          </div>

          {/* Search Bar - First Row */}
          <div className="navbar__search-container">
            {/* <div className="search-icon-left">
              <FaSearch className="search-icon" />
            </div> */}
            <input
              type="text"
              placeholder="Search Your Product..."
              className="navbar__search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="navbar__search-btn"
              onClick={handleSearch}
              aria-label="Search"
            >
              <FaSearch className="search-icon" />
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="navbar__actions">
            <Link href="/account" className="account-btn">
              <FaUser className="account-icon" />
              <span className="account-text">My Account</span>
            </Link>
            <Link href="/cart" className="cart">
              <FaShoppingCart className="cart-icon" />
              <span className="cart-text">Cart</span>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            <Link href="/book-service" className="book-btn">
              BOOK SERVICE
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="navbar__toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'hamburger--active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Second Row - Navigation Links */}
        <div className="navbar__secondary">
          <nav className="navbar__links">
            <Link href="/" className="nav-item" onClick={closeMenu}>
              Home
            </Link>
            
            {/* Shop Dropdown */}
            <div className="nav-dropdown">
              <span className="nav-item">
                Shop <FaChevronDown className="dropdown-arrow" />
              </span>
              <div className="dropdown-menu">
                <Link href="/pages/LaptopStore" onClick={() => handleLaptopStoreClick('')}>
                  All Laptops
                </Link>
                <Link href="/pages/LaptopStore?brand=dell" onClick={() => handleLaptopStoreClick('dell')}>
                  Dell Laptops
                </Link>
                <Link href="/pages/LaptopStore?brand=lenovo" onClick={() => handleLaptopStoreClick('lenovo')}>
                  Lenovo Laptops
                </Link>
                <Link href="/pages/LaptopStore?brand=hp" onClick={() => handleLaptopStoreClick('hp')}>
                  HP Laptops
                </Link>
                <Link href="/pages/LaptopStore?brand=acer" onClick={() => handleLaptopStoreClick('acer')}>
                  Acer Laptops
                </Link>
                <Link href="/pages/LaptopStore?brand=asus" onClick={() => handleLaptopStoreClick('asus')}>
                  ASUS Laptops
                </Link>
                <Link href="/pages/LaptopStore?brand=msi" onClick={() => handleLaptopStoreClick('msi')}>
                  MSI Laptops
                </Link>
              </div>
            </div>

        

            {/* Laptop Services Dropdown */}
            <div className="nav-dropdown">
              <span className="nav-item">
                Laptop Services <FaChevronDown className="dropdown-arrow" />
              </span>
              <div className="dropdown-menu">
                <Link href="/pages/LaptopDamage" onClick={closeMenu}>Laptop Damage</Link>
                <Link href="/pages/ChipLevelServicePage" onClick={closeMenu}>Chip Level Service</Link>
                <Link href="/pages/UpgradePage" onClick={closeMenu}>Laptop Upgrade</Link>
                <Link href="/pages/DataRecoveryPage" onClick={closeMenu}>Data Recovery</Link>
                <Link href="/pages/LaptopAccessories" onClick={closeMenu}>Laptop Accessories</Link>
              </div>
            </div>

            {/* IT Services Dropdown */}
            <div className="nav-dropdown">
              <span className="nav-item">
                IT Services <FaChevronDown className="dropdown-arrow" />
              </span>
              <div className="dropdown-menu">
                <Link href="/pages/BusinessMail" onClick={closeMenu}>Business Mail Services</Link>
                <Link href="/it-services/network-security" onClick={closeMenu}>Network Security Solutions</Link>
                <Link href="/it-services/server-storage" onClick={closeMenu}>Server and Storage Solutions</Link>
                <Link href="/it-services/wifi-networking" onClick={closeMenu}>Wi-Fi and Networking Solutions</Link>
                <Link href="/it-services/cctv" onClick={closeMenu}>CCTV Solution</Link>
                <Link href="/it-services/cloud-hosting" onClick={closeMenu}>Cloud hosting services</Link>
              </div>
            </div>

            {/* Contact Us Dropdown */}
            <div className="nav-dropdown">
              <span className="nav-item">
                Contact Us <FaChevronDown className="dropdown-arrow" />
              </span>
              <div className="dropdown-menu">
                <Link href="/about" onClick={closeMenu}>About Us</Link>
                <Link href="/branches" onClick={closeMenu}>Branches</Link>
                <Link href="/contact" onClick={closeMenu}>Contact Form</Link>
              </div>
            </div>

            
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className={`navbar__mobile ${isMenuOpen ? 'navbar__mobile--active' : ''}`}>
          {/* Mobile Search */}
          <div className="navbar__mobile-search">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search Your Product..."
                className="mobile-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="mobile-search-btn"
                onClick={handleSearch}
                aria-label="Search"
              >
               <FaSearch/>
              </button>
            </div>
          </div>

          <nav className="navbar__mobile-links">
            <Link href="/" className="nav-item" onClick={closeMenu}>
              Home
            </Link>
            
            {/* Mobile Shop Dropdown */}
            <div className="mobile-dropdown">
              <details>
                <summary>Shop</summary>
                <div className="mobile-dropdown-content">
                  <Link href="/pages/LaptopStore" onClick={() => handleLaptopStoreClick('')}>
                    All Laptops
                  </Link>
                  <Link href="/pages/LaptopStore?brand=dell" onClick={() => handleLaptopStoreClick('dell')}>
                    Dell Laptops
                  </Link>
                  <Link href="/pages/LaptopStore?brand=lenovo" onClick={() => handleLaptopStoreClick('lenovo')}>
                    Lenovo Laptops
                  </Link>
                  <Link href="/pages/LaptopStore?brand=hp" onClick={() => handleLaptopStoreClick('hp')}>
                    HP Laptops
                  </Link>
                  <Link href="/pages/LaptopStore?brand=acer" onClick={() => handleLaptopStoreClick('acer')}>
                    Acer Laptops
                  </Link>
                  <Link href="/pages/LaptopStore?brand=asus" onClick={() => handleLaptopStoreClick('asus')}>
                    ASUS Laptops
                  </Link>
                  <Link href="/pages/LaptopStore?brand=msi" onClick={() => handleLaptopStoreClick('msi')}>
                    MSI Laptops
                  </Link>
                </div>
              </details>
            </div>

       

            {/* Mobile Laptop Services Dropdown */}
            <div className="mobile-dropdown">
              <details>
                <summary>Laptop Services</summary>
                <div className="mobile-dropdown-content">
                  <Link href="/pages/LaptopDamage" onClick={closeMenu}>Laptop Damage</Link>
                  <Link href="/pages/ChipLevelServicePage" onClick={closeMenu}>Chip Level Service</Link>
                  <Link href="/pages/UpgradePage" onClick={closeMenu}>Laptop Upgrade</Link>
                  <Link href="/pages/DataRecoveryPage" onClick={closeMenu}>Data Recovery</Link>
                  <Link href="/pages/LaptopAccessories" onClick={closeMenu}>Laptop Accessories</Link>
                </div>
              </details>
            </div>

            {/* Mobile IT Services Dropdown */}
            <div className="mobile-dropdown">
              <details>
                <summary>IT Services</summary>
                <div className="mobile-dropdown-content">
                  <Link href="/pages/BusinessMail" onClick={closeMenu}>Business Mail Services</Link>
                  <Link href="/it-services/network-security" onClick={closeMenu}>Network Security Solutions</Link>
                  <Link href="/it-services/server-storage" onClick={closeMenu}>Server and Storage Solutions</Link>
                  <Link href="/it-services/wifi-networking" onClick={closeMenu}>Wi-Fi and Networking Solutions</Link>
                  <Link href="/it-services/cctv" onClick={closeMenu}>CCTV Solution</Link>
                  <Link href="/it-services/cloud-hosting" onClick={closeMenu}>Cloud hosting services</Link>
                </div>
              </details>
            </div>

            {/* Mobile Contact Us Dropdown */}
            <div className="mobile-dropdown">
              <details>
                <summary>Contact Us</summary>
                <div className="mobile-dropdown-content">
                  <Link href="/about" onClick={closeMenu}>About Us</Link>
                  <Link href="/branches" onClick={closeMenu}>Branches</Link>
                  <Link href="/contact" onClick={closeMenu}>Contact Form</Link>
                </div>
              </details>
            </div>

            
            {/* Mobile Actions */}
            <div className="navbar__mobile-actions">
              <Link href="/account" className="account-mobile" onClick={closeMenu}>
                <FaUser className="account-icon" />
                <span>My Account</span>
              </Link>
              <Link href="/cart" className="cart-mobile" onClick={closeMenu}>
                <FaShoppingCart className="cart-icon" />
                <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
              </Link>
              <Link href="/book-service" className="book-btn-mobile" onClick={closeMenu}>
                BOOK SERVICE
              </Link>
            </div>
          </nav>
        </div>

        {isMenuOpen && (
          <div 
            className="navbar__overlay"
            onClick={closeMenu}
          ></div>
        )}
      </header>
    </>
  );
}