"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { 
  FaShoppingCart, 
  FaPhone, 
  FaEnvelope, 
  FaChevronDown, 
  FaMapMarkerAlt, 
  FaUser, 
  FaSignInAlt, 
  FaBars, 
  FaTimes, 
  FaBookmark,
  FaSignOutAlt,
  FaCalendarAlt
} from "react-icons/fa";
import BookServiceModal from "../BookServiceModal/page";
import "./Navbar.scss";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookServiceModalOpen, setIsBookServiceModalOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const profileDropdownRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleBookService = () => {
    closeMenu();
    setIsBookServiceModalOpen(true);
  };

  const closeModal = () => {
    setIsBookServiceModalOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <>
      {/* Top Info Bar with Diagonal Split - HIDDEN ON MOBILE */}
      {!isMobile && (
        <div className={`info-bar ${isScrolled ? 'info-bar--hidden' : ''}`}>
          <div className="info-bar__diagonal-split">
            {/* Blue Section (70%) */}
            <div className="info-bar__section info-bar__section--blue">
              <div className="info-bar__content">
                <div className="info-bar__contact-info">
                  <FaEnvelope className="info-bar__icon info-bar__icon--white" />
                  <a href="mailto:info@newtoncomputers.in">info@newtoncomputers.in</a>
                  
                  <div className="info-bar__locations">
                    <span className="location-separator">|</span>
                    <FaMapMarkerAlt className="info-bar__icon info-bar__icon--white" />
                    <span className="locations-text">
                      T.Nagar-9840604073 | Thoraipakkam-9940185417
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* White Section (30%) */}
            <div className="info-bar__section info-bar__section--white">
              <div className="info-bar__content">
                <button 
                  className="info-bar__book-btn"
                  onClick={handleBookService}
                >
                  <FaCalendarAlt className="book-icon" />
                  <span>Book Service</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${isMobile ? 'navbar--mobile' : ''}`}>
        <div className="navbar__container">
          {/* Logo */}
          <div className="navbar__logo">
            <Link href="/" onClick={closeMenu}>
              <Image 
                src="/new-logo.png" 
                alt="Newton Computers" 
                width={150} 
                height={50} 
                priority
                className="logo-image"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="navbar__nav-links" aria-label="Main navigation">
            <Link href="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
            
            {/* Shop Dropdown */}
            <div className="nav-item dropdown">
              <button className="nav-link dropdown-toggle">
                Shop <FaChevronDown className="dropdown-arrow" />
              </button>
              <div className="dropdown-menu">
                <Link href="/pages/LaptopStore" className="dropdown-item" onClick={closeMenu}>
                  All Laptops
                </Link>
                <Link href="/pages/LaptopStore?brand=dell" className="dropdown-item" onClick={closeMenu}>
                  Dell Laptops
                </Link>
                <Link href="/pages/LaptopStore?brand=lenovo" className="dropdown-item" onClick={closeMenu}>
                  Lenovo Laptops
                </Link>
                <Link href="/pages/LaptopStore?brand=hp" className="dropdown-item" onClick={closeMenu}>
                  HP Laptops
                </Link>
                <Link href="/pages/LaptopStore?brand=acer" className="dropdown-item" onClick={closeMenu}>
                  Acer Laptops
                </Link>
                <Link href="/pages/LaptopStore?brand=asus" className="dropdown-item" onClick={closeMenu}>
                  ASUS Laptops
                </Link>
                <Link href="/pages/LaptopStore?brand=msi" className="dropdown-item" onClick={closeMenu}>
                  MSI Laptops
                </Link>
              </div>
            </div>

            {/* Laptop Services Dropdown */}
            <div className="nav-item dropdown">
              <button className="nav-link dropdown-toggle">
                Laptop Services <FaChevronDown className="dropdown-arrow" />
              </button>
              <div className="dropdown-menu">
                <Link href="/pages/LaptopDamage" className="dropdown-item" onClick={closeMenu}>Laptop Damage</Link>
                <Link href="/pages/ChipLevelServicePage" className="dropdown-item" onClick={closeMenu}>Chip Level Service</Link>
                <Link href="/pages/UpgradePage" className="dropdown-item" onClick={closeMenu}>Laptop Upgrade</Link>
                <Link href="/pages/DataRecoveryPage" className="dropdown-item" onClick={closeMenu}>Data Recovery</Link>
                <Link href="/pages/LaptopAccessories" className="dropdown-item" onClick={closeMenu}>Laptop Accessories</Link>
              </div>
            </div>

            {/* IT Services Dropdown */}
            <div className="nav-item dropdown">
              <button className="nav-link dropdown-toggle">
                IT Services <FaChevronDown className="dropdown-arrow" />
              </button>
              <div className="dropdown-menu">
                <Link href="/pages/BusinessMail" className="dropdown-item" onClick={closeMenu}>Business Mail Services</Link>
                <Link href="/pages/NetworkSecurity" className="dropdown-item" onClick={closeMenu}>Network Security Solutions</Link>
                <Link href="/pages/ServerAndStorageSolutions" className="dropdown-item" onClick={closeMenu}>Server and Storage Solutions</Link>
                <Link href="/pages/WifiNetworkingSolutions" className="dropdown-item" onClick={closeMenu}>Wi-Fi and Networking Solutions</Link>
                <Link href="/pages/CctvSolutions" className="dropdown-item" onClick={closeMenu}>CCTV Solution</Link>
                <Link href="/pages/CloudHostingServices" className="dropdown-item" onClick={closeMenu}>Cloud hosting services</Link> 
              </div>
            </div>
     <div className="nav-item dropdown">
              <button className="nav-link dropdown-toggle">
               Contact Us <FaChevronDown className="dropdown-arrow" />
              </button>
              <div className="dropdown-menu">
                <Link href="/pages/About" className="dropdown-item" onClick={closeMenu}> About Us</Link>
                <Link href="/pages/Branches" className="dropdown-item" onClick={closeMenu}>Branches</Link>
                
              </div>
            </div>
            {/* <Link href="/pages/About" className="nav-link" onClick={closeMenu}>
              About Us
            </Link> */}
          </nav>

          {/* Desktop Actions with Profile Dropdown */}
          <div className="navbar__actions">
            {/* Profile Dropdown */}
            <div className="nav-item profile-dropdown" ref={profileDropdownRef}>
              <button 
                className="action-btn profile-btn"
                onClick={toggleProfileDropdown}
                title="My Account"
              >
                <FaUser className="action-icon" />
              </button>
              
              {isProfileDropdownOpen && (
                <div className="profile-dropdown-menu">
                  <Link href="/component/Login" className="profile-dropdown-item" onClick={() => setIsProfileDropdownOpen(false)}>
                    <FaSignInAlt className="profile-dropdown-icon" />
                    <span>Login</span>
                  </Link>
                  <Link href="/pages/Account" className="profile-dropdown-item" onClick={() => setIsProfileDropdownOpen(false)}>
                    <FaUser className="profile-dropdown-icon" />
                    <span>Account</span>
                  </Link>
                  <button className="profile-dropdown-item logout-btn" onClick={() => setIsProfileDropdownOpen(false)}>
                    <FaSignOutAlt className="profile-dropdown-icon" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            <Link href="/pages/Cart" className="action-btn cart-btn" title="Cart">
              <FaShoppingCart className="action-icon" />
              {cartItemsCount > 0 && (
                <span className="cart-count">{cartItemsCount}</span>
              )}
            </Link>
            
            <button 
              className="book-service-btn"
              onClick={handleBookService}
              title="Book Service"
            >
              BOOK SERVICE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="navbar__toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <FaTimes className="toggle-icon" />
            ) : (
              <FaBars className="toggle-icon" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`navbar__mobile ${isMenuOpen ? 'navbar__mobile--active' : ''}`}>
          <div className="navbar__mobile-header">
            <div className="navbar__mobile-logo">
              <Link href="/" onClick={closeMenu}>
                <Image 
                  src="/new-logo.png" 
                  alt="Newton Computers" 
                  width={120} 
                  height={40} 
                  priority
                />
              </Link>
            </div>
            <button 
              className="navbar__mobile-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          {/* Mobile Contact Info Section */}
          <div className="navbar__mobile-contact">
            <div className="mobile-contact-section">
              <FaEnvelope className="mobile-contact-icon" />
              <a href="mailto:info@newtoncomputers.in">info@newtoncomputers.in</a>
            </div>
            
            <div className="mobile-locations-section">
              <FaMapMarkerAlt className="mobile-location-icon" />
              <span className="mobile-locations-text">
                T.Nagar-9840604073 | Thoraipakkam-9940185417
              </span>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="navbar__mobile-nav">
            <div className="mobile-nav-section">
              <Link href="/" className="mobile-nav-link" onClick={closeMenu}>
                Home
              </Link>
            </div>

            {/* Mobile Shop Dropdown */}
            <div className="mobile-nav-section dropdown-section">
              <details>
                <summary className="mobile-dropdown-summary">
                  Shop
                  <FaChevronDown className="mobile-dropdown-arrow" />
                </summary>
                <div className="mobile-dropdown-content">
                  <Link href="/pages/LaptopStore" className="mobile-dropdown-item" onClick={closeMenu}>
                    All Laptops
                  </Link>
                  <Link href="/pages/LaptopStore?brand=dell" className="mobile-dropdown-item" onClick={closeMenu}>
                    Dell Laptops
                  </Link>
                  <Link href="/pages/LaptopStore?brand=lenovo" className="mobile-dropdown-item" onClick={closeMenu}>
                    Lenovo Laptops
                  </Link>
                  <Link href="/pages/LaptopStore?brand=hp" className="mobile-dropdown-item" onClick={closeMenu}>
                    HP Laptops
                  </Link>
                  <Link href="/pages/LaptopStore?brand=acer" className="mobile-dropdown-item" onClick={closeMenu}>
                    Acer Laptops
                  </Link>
                  <Link href="/pages/LaptopStore?brand=asus" className="mobile-dropdown-item" onClick={closeMenu}>
                    ASUS Laptops
                  </Link>
                  <Link href="/pages/LaptopStore?brand=msi" className="mobile-dropdown-item" onClick={closeMenu}>
                    MSI Laptops
                  </Link>
                </div>
              </details>
            </div>

            {/* Mobile Laptop Services Dropdown */}
            <div className="mobile-nav-section dropdown-section">
              <details>
                <summary className="mobile-dropdown-summary">
                  Laptop Services
                  <FaChevronDown className="mobile-dropdown-arrow" />
                </summary>
                <div className="mobile-dropdown-content">
                  <Link href="/pages/LaptopDamage" className="mobile-dropdown-item" onClick={closeMenu}>Laptop Damage</Link>
                  <Link href="/pages/ChipLevelServicePage" className="mobile-dropdown-item" onClick={closeMenu}>Chip Level Service</Link>
                  <Link href="/pages/UpgradePage" className="mobile-dropdown-item" onClick={closeMenu}>Laptop Upgrade</Link>
                  <Link href="/pages/DataRecoveryPage" className="mobile-dropdown-item" onClick={closeMenu}>Data Recovery</Link>
                  <Link href="/pages/LaptopAccessories" className="mobile-dropdown-item" onClick={closeMenu}>Laptop Accessories</Link>
                </div>
              </details>
            </div>

            {/* Mobile IT Services Dropdown */}
            <div className="mobile-nav-section dropdown-section">
              <details>
                <summary className="mobile-dropdown-summary">
                  IT Services
                  <FaChevronDown className="mobile-dropdown-arrow" />
                </summary>
                <div className="mobile-dropdown-content">
                  <Link href="/pages/BusinessMail" className="mobile-dropdown-item" onClick={closeMenu}>Business Mail Services</Link>
                  <Link href="/pages/NetworkSecurity" className="mobile-dropdown-item" onClick={closeMenu}>Network Security Solutions</Link>
                  <Link href="/pages/ServerAndStorageSolutions" className="mobile-dropdown-item" onClick={closeMenu}>Server and Storage Solutions</Link>
                  <Link href="/pages/WifiNetworkingSolutions" className="mobile-dropdown-item" onClick={closeMenu}>Wi-Fi and Networking Solutions</Link>
                  <Link href="/pages/CctvSolutions" className="mobile-dropdown-item" onClick={closeMenu}>CCTV Solution</Link>
                  <Link href="/pages/CloudHostingServices" className="mobile-dropdown-item" onClick={closeMenu}>Cloud hosting services</Link>
                </div>
              </details>
            </div>

            {/* Additional Mobile Links */}
            <div className="mobile-nav-section">
              <Link href="/pages/Cart" className="mobile-nav-link" onClick={closeMenu}>
                Cart
                {cartItemsCount > 0 && (
                  <span className="mobile-cart-badge">{cartItemsCount}</span>
                )}
              </Link>
            </div>
            
            <div className="mobile-nav-section">
              <Link href="/pages/Branches" className="mobile-nav-link" onClick={closeMenu}>
                Our Branches
              </Link>
            </div>
            
            <div className="mobile-nav-section">
              <Link 
                href="#" 
                className="mobile-nav-link" 
                onClick={(e) => {
                  e.preventDefault();
                  handleBookService();
                }}
              >
                Book Service
              </Link>
            </div>
            
            <div className="mobile-nav-section">
              <Link href="/pages/About" className="mobile-nav-link" onClick={closeMenu}>
                About Us
              </Link>
            </div>
            
            <div className="mobile-nav-section">
              <Link href="/component/Login" className="mobile-nav-link" onClick={closeMenu}>
                Login
              </Link>
            </div>
            
            <div className="mobile-nav-section">
              <Link href="/pages/Account" className="mobile-nav-link" onClick={closeMenu}>
                My Account
              </Link>
            </div>
          </nav>
        </div>

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div 
            className="navbar__overlay"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </header>

      {/* Book Service Modal */}
      <BookServiceModal 
        isOpen={isBookServiceModalOpen}
        onClose={closeModal}
      />
    </>
  );
}