"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRef} from 'react';
import { FaLaptop, FaTools,FaStar, FaHeadset, FaCloud,FaUserCheck, FaServer,FaWifi,FaTruck, FaShieldAlt, FaHandshake, FaArrowRight, FaHeart, FaShoppingCart, FaList ,FaChevronDown ,FaBalanceScale ,FaMicrochip ,FaMemory,FaHdd ,FaBolt ,FaSyncAlt ,FaPhone, FaMapMarkerAlt, FaEye, FaTimes, FaChevronLeft, FaChevronRight,FaPhoneAlt, FaEnvelope, FaClock, FaUser, FaCommentAlt ,FaPaperPlane  } from 'react-icons/fa';
import {  FaRegHeart } from 'react-icons/fa';
import { IoIosGlobe } from 'react-icons/io';
import { MdPhoneIphone, MdEmail ,MdLocationOn } from 'react-icons/md';
import { FaCheck, FaCopy } from 'react-icons/fa'; 
import { LuCctv } from "react-icons/lu";
import { MdOutlineSecurity } from "react-icons/md";
import { LuWifi } from "react-icons/lu";
import { FiServer } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { TiCloudStorageOutline } from "react-icons/ti";
import { 
  FaXTwitter, 
  FaInstagram, 
  FaFacebook, 
  FaWhatsapp, 
  FaLinkedin 
} from 'react-icons/fa6';
import BookServiceModal from '@/app/component/BookServiceModal/page';
import Loading from '../../component/Loading/Loading';
import './Home.scss';


const refurbishedLaptops = [
  {
    id: 1,
    name: 'Lenovo ThinkPad T460 ',
    specs: 'Intel® Core i5 – 6th Gen/ 8 GB/ 256 GB SSD',
    originalPrice: '₹21,470.00',
    currentPrice: '₹19,470.00',
    image: '/assets/lenovo-image1.jpeg',
    sideImages: [
      '/assets/lenovo-image1-side1.jpeg',
      '/assets/lenovo-image1-side2.jpeg',
      '/assets/lenovo-image1-side3.jpeg'
    ],
    category: 'Lenovo Laptops',
    description: 'Return, Replacement & Warranty - Every Product Is Backed By 6 month Warranty, 7 Days Refund and 14 Days Replacement Policy.',
    fullDescription: 'With powerful processing and reliable performance, the ThinkPad T460 is designed to enhance your productivity, anywhere. Easy to use, deploy, and service, this robust laptop has solid-state storage and the legendary ThinkPad reliability and support.',
    inStock: true,
    rating: 4.5,
    reviews: 42,
    brand: 'Lenovo'
  },
  {
    id: 2,
    name: 'Lenovo ThinkPad T470 ',
    specs: 'Intel® Core i7 – 6th Gen/ 8 GB/ 256 GB SSD',
    originalPrice: '₹23,240.00',
    currentPrice: '₹21,240.00',
    image: '/assets/lenovo-image1.jpeg',
    sideImages: [
      '/assets/lenovo-image1-side1.jpeg',
      '/assets/lenovo-image1-side2.jpeg',
      '/assets/lenovo-image1-side3.jpeg'
    ],
    category: 'Lenovo Laptops',
    description: 'Return, Replacement & Warranty - Every Product Is Backed By 6 month Warranty, 7 Days Refund and 14 Days Replacement Policy.',
    fullDescription: 'With powerful processing, a superb operating system, the ThinkPad T470 is designed to enhance your productivity, anywhere.',
    inStock: true,
    rating: 4.8,
    reviews: 38,
    brand: 'Lenovo'
  },
  {
    id: 3,
    name: 'HP Elitebook 830 G5 & G6 ',
    specs: 'Intel i7, 8th gen/16GB/256GB SSD',
    originalPrice: '₹25,999.00',
    currentPrice: '₹22,999.00',
    image: '/assets/hp-image1.jpeg',
    sideImages: [
      '/assets/hp-image1-side1.jpeg',
      '/assets/hp-image1-side2.jpeg',
      '/assets/hp-image1-side3.jpeg'
    ],
    category: 'HP Laptops',
    description: 'Return, Replacement & Warranty - Every Product Is Backed By 6 month Warranty, 7 Days Refund and 14 Days Replacement Policy.',
    fullDescription: 'Refurbished HP ProBook 440 G3 Notebook PC. The HP Elitebook 830 G5 & G6 offers exceptional performance with 8th generation Intel i7 processor.',
    inStock: true,
    rating: 4.3,
    reviews: 29,
    brand: 'HP'
  },
  {
    id: 4,
    name: 'Dell Latitude 5490 ',
    specs: 'Intel Core i5 8th Gen/8GB/256GB SSD',
    originalPrice: '₹24,999.00',
    currentPrice: '₹21,999.00',
    image: '/assets/lenovo-image1.jpeg',
    sideImages: [],
    category: 'Dell Laptops',
    description: 'Business-grade laptop with excellent build quality',
    fullDescription: 'Dell Latitude 5490 business laptop with 8th Gen Intel Core i5 processor, perfect for professionals.',
    inStock: true,
    rating: 4.4,
    reviews: 31,
    brand: 'Dell'
  },
  {
    id: 5,
    name: 'ASUS VivoBook 15 ',
    specs: 'Intel Core i3 10th Gen/8GB/512GB SSD',
    originalPrice: '₹28,999.00',
    currentPrice: '₹25,499.00',
    image: '/assets/lenovo-image1.jpeg',
    sideImages: [],
    category: 'ASUS Laptops',
    description: 'Sleek and powerful everyday laptop',
    fullDescription: 'ASUS VivoBook 15 with 10th Gen Intel Core i3 processor and fast SSD storage.',
    inStock: true,
    rating: 4.2,
    reviews: 27,
    brand: 'ASUS'
  },
  {
    id: 6,
    name: 'Acer Aspire 5 ',
    specs: 'AMD Ryzen 5/8GB/512GB SSD/Windows 11',
    originalPrice: '₹32,999.00',
    currentPrice: '₹29,999.00',
    image: '/assets/lenovo-image1.jpeg',
    sideImages: [],
    category: 'Acer Laptops',
    description: 'Powerful AMD processor with Windows 11',
    fullDescription: 'Acer Aspire 5 with AMD Ryzen 5 processor, perfect for multitasking and productivity.',
    inStock: true,
    rating: 4.6,
    reviews: 35,
    brand: 'Acer'
  }
];
export default function Home() {
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [hoveredLaptop, setHoveredLaptop] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [copied, setCopied] = useState(false);
   const [isFavorite, setIsFavorite] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
   const [currentClientIndex, setCurrentClientIndex] = useState(0);
  const clientScrollRef = useRef(null);
const [isBookServiceModalOpen, setIsBookServiceModalOpen] = useState(false);
const [currentLaptopSlide, setCurrentLaptopSlide] = useState(0);
    // Laptop Services Slider Functions
const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
const [selectedBrand, setSelectedBrand] = useState('All');
const [filteredLaptops, setFilteredLaptops] = useState(refurbishedLaptops);
const [sortBy, setSortBy] = useState('featured');
const [loadingStates, setLoadingStates] = useState({});
const [wishlist, setWishlist] = useState([]);
const [cart, setCart] = useState([]);
const [selectedBranch, setSelectedBranch] = useState(null);
const [isPartnerAnimationPaused, setIsPartnerAnimationPaused] = useState(false);
// Hero image slider states
const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);
const [heroImageTransition, setHeroImageTransition] = useState(false);
const [heroImageTimer, setHeroImageTimer] = useState(0);
const router = useRouter();
// Hero images array
const heroImages = [
  '/home-img.png',
  '/assets/firewall-and-antivirus.png',
  '/assets/about-section-2.png',
  '/assets/networking-srvices.png'
];

// Auto change hero image
useEffect(() => {
  const interval = setInterval(() => {
    setHeroImageTransition(true);
    setTimeout(() => {
      setCurrentHeroImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
      setHeroImageTransition(false);
    }, 300); // Match this with CSS transition duration
  }, 5000); // Change image every 5 seconds

  return () => clearInterval(interval);
}, [heroImages.length]);

// Timer for progress bar
useEffect(() => {
  const timerInterval = setInterval(() => {
    setHeroImageTimer(prev => {
      if (prev >= 5000) {
        return 0;
      }
      return prev + 100;
    });
  }, 100);

  return () => clearInterval(timerInterval);
}, [currentHeroImageIndex]);
// Add these event handlers
const handlePartnerMouseEnter = () => {
  setIsPartnerAnimationPaused(true);
};

const handlePartnerMouseLeave = () => {
  setIsPartnerAnimationPaused(false);
};

// Add this function after your other functions
const handleGetDirections = (branch) => {
  let mapsUrl = '';
  
  if (branch === 'tnagar') {
    // T.Nagar branch coordinates
    mapsUrl = 'https://www.google.com/maps/dir/?api=1&destination=28-B%2F16%2C+Murugesan+Street%2C+North+Usman+Road%2C+T.Nagar%2C+Chennai-600017';
  } else if (branch === 'thoraipakkam') {
    // Thoraipakkam branch coordinates
    mapsUrl = 'https://www.google.com/maps/dir/?api=1&destination=No.+8%2F683+A%2C+Srividya+Avenue%2C+Rajiv+Gandhi+Salai%2C+Thoraipakkam%2C+Chennai+-+600097';
  }
  
  // Open Google Maps in a new tab
  if (mapsUrl) {
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  }
};
  const sliderData = [
    {
      id: 1,
      image: '/assets/banner-5.jpg',
      title: 'Premium Laptops & Services',
      subtitle: 'Get the best deals on refurbished laptops with warranty',
      buttonText: 'Shop Now'
    },
    {
      id: 2,
      image: '/assets/banner1.jpg',
      title: 'Expert Laptop Repair Services',
      subtitle: 'Chip level service, data recovery, and hardware upgrades',
      buttonText: 'Book Service'
    },
    {
      id: 3,
      image: '/assets/banner-4.jpg',
      title: 'IT Solutions & Support',
      subtitle: 'Complete IT services for home and business',
      buttonText: 'Get Quote'
    }
  ]

// Laptop Services Data
const laptopServices = [
  'Laptop Upgradation',
  'Motherboard',
  'Hinges',
  'Touchpad',
  'Chip Level Service',
  'Ram & SSD',
  'Adapters',
  'Data Recovery',
  'Batteries',
  'Display',
  'WIFI & Bluetooth',
  'Keypads'
];
const [slidesToShowRefurbished, setSlidesToShowRefurbished] = useState(4);
const [slidesToShowServices, setSlidesToShowServices] = useState(4);
 
const getRefurbishedSlidesToShow = () => {
  if (typeof window === 'undefined') return 4;
  
  const width = window.innerWidth;
  
  if (width >= 1024) {
    return 4; // Desktop: 4 laptops
  } else if (width >= 768) {
    return 2; // Tablet: 2 laptops
  } else {
    return 1; // Mobile: 1 laptop
  }
};

const getServicesSlidesToShow = () => {
  if (typeof window === 'undefined') return 4;
  
  const width = window.innerWidth;
  
  if (width >= 1400) {
    return 4; // Very large desktop: 6 services
  } else if (width >= 1200) {
    return 4; // Large desktop: 5 services
  } else if (width >= 1024) {
    return 4; // Desktop: 4 services
  } else if (width >= 768) {
    return 3; // Tablet: 3 services
  } else if (width >= 480) {
    return 2; // Mobile landscape: 2 services
  } else {
    return 1; // Mobile portrait: 1 service
  }
};

// Update slides for refurbished laptops on resize
useEffect(() => {
  const updateRefurbishedSlides = () => {
    setSlidesToShowRefurbished(getRefurbishedSlidesToShow());
  };

  updateRefurbishedSlides();
  window.addEventListener('resize', updateRefurbishedSlides);
  
  return () => window.removeEventListener('resize', updateRefurbishedSlides);
}, []);

// Update slides for services on resize
useEffect(() => {
  const updateServicesSlides = () => {
    setSlidesToShowServices(getServicesSlidesToShow());
  };

  updateServicesSlides();
  window.addEventListener('resize', updateServicesSlides);
  
  return () => window.removeEventListener('resize', updateServicesSlides);
}, []);
// Refurbished laptops carousel functions
const nextLaptopSlide = () => {
  setCurrentLaptopSlide(prev => {
    const maxSlide = Math.max(0, filteredLaptops.length - slidesToShowRefurbished);
    if (prev >= maxSlide) return 0;
    return prev + 1;
  });
};

const prevLaptopSlide = () => {
  setCurrentLaptopSlide(prev => {
    const maxSlide = Math.max(0, filteredLaptops.length - slidesToShowRefurbished);
    if (prev <= 0) return maxSlide;
    return prev - 1;
  });
};

// Services carousel functions
const nextServiceSlide = () => {
  const maxSlide = Math.max(0, laptopServices.length - slidesToShowServices);
  setCurrentServiceSlide(prev => {
    if (prev >= maxSlide) return 0;
    return prev + 1;
  });
};

const prevServiceSlide = () => {
  const maxSlide = Math.max(0, laptopServices.length - slidesToShowServices);
  setCurrentServiceSlide(prev => {
    if (prev <= 0) return maxSlide;
    return prev - 1;
  });
};
 
 

// Auto-slide effect for laptops
useEffect(() => {
  if (filteredLaptops.length <= slidesToShowRefurbished) return;
  
  const interval = setInterval(() => {
    nextLaptopSlide();
  }, 5000);

  return () => clearInterval(interval);
}, [currentLaptopSlide, slidesToShowRefurbished, filteredLaptops.length]);

  
useEffect(() => {
  if (!isAutoPlaying || laptopServices.length <= slidesToShowServices) return;

  const interval = setInterval(() => {
    nextServiceSlide();
  }, 4000);

  return () => clearInterval(interval);
}, [currentServiceSlide, isAutoPlaying, slidesToShowServices, laptopServices.length]);  
const handleBrandFilter = (brand) => {
  setSelectedBrand(brand);
  
  if (brand === 'All') {
    setFilteredLaptops(refurbishedLaptops);
  } else {
    const filtered = refurbishedLaptops.filter(
      laptop => laptop.brand.toLowerCase().includes(brand.toLowerCase())
    );
    setFilteredLaptops(filtered);
  }
  setCurrentLaptopSlide(0);
};


const handleSortChange = (sortType) => {
  setSortBy(sortType);
  
  const sorted = [...filteredLaptops].sort((a, b) => {
    const priceA = parseFloat(a.currentPrice.replace('₹', '').replace(/,/g, ''));
    const priceB = parseFloat(b.currentPrice.replace('₹', '').replace(/,/g, ''));
    
    switch (sortType) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });
  
  setFilteredLaptops(sorted);
};



const handleAddToWishlist = (laptop) => {
  setWishlist(prev => {
    if (prev.some(item => item.id === laptop.id)) {
      return prev.filter(item => item.id !== laptop.id);
    } else {
      return [...prev, { ...laptop, addedAt: new Date() }];
    }
  });
  
  setLoadingStates(prev => ({ ...prev, [laptop.id]: 'wishlist' }));
  setTimeout(() => {
    setLoadingStates(prev => ({ ...prev, [laptop.id]: null }));
  }, 1000);
};

const handleAddToCart = (laptop) => {
  if (!laptop.inStock) {
    alert('This product is currently out of stock. Please check back later.');
    return;
  }
  
  setCart(prev => {
    const existingItem = prev.find(item => item.id === laptop.id);
    if (existingItem) {
      return prev.map(item =>
        item.id === laptop.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prev, { ...laptop, quantity: 1 }];
    }
  });
  
  setLoadingStates(prev => ({ ...prev, [laptop.id]: 'cart' }));
  setTimeout(() => {
    setLoadingStates(prev => ({ ...prev, [laptop.id]: null }));
  }, 1000);
  
  // Show notification
  showNotification(`${laptop.name} added to cart!`);
};

const handleBuyNow = (laptop) => {
  if (!laptop.inStock) {
    alert('This product is currently out of stock.');
    return;
  }
  
  handleAddToCart(laptop);
  // You can add navigation to cart page here
  console.log('Proceed to checkout:', laptop);
};
     const clientLogos = [
    '/assets/vrr.png',
    '/assets/NB.png',
    '/assets/Priy.png',
    '/assets/coffee-shastra-logo.png',
    '/assets/sdat.jpeg',
    '/assets/gc.jpeg',
    '/assets/tamilnadu.jpeg',
    '/assets/car.png',
    '/assets/tiru.jpeg'
  ];

 useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClientIndex((prevIndex) => 
        prevIndex === clientLogos.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [clientLogos.length]);

  // Scroll to current client
  useEffect(() => {
    if (clientScrollRef.current) {
      const clientWidth = 180; // Width of each client logo including margin
      clientScrollRef.current.scrollTo({
        left: currentClientIndex * clientWidth,
        behavior: 'smooth'
      });
    }
  }, [currentClientIndex]);


    // Social media data
    const socialMedia = [
      {
        name: 'X (Twitter)',
        icon: FaXTwitter,
        url: 'https://twitter.com/yourusername',
        color: '#000000'
      },
      {
        name: 'Instagram',
        icon: FaInstagram,
        url: 'https://instagram.com/yourusername',
        color: '#E4405F'
      },
      {
        name: 'Facebook',
        icon: FaFacebook,
        url: 'https://facebook.com/yourusername',
        color: '#1877F2'
      },
      {
        name: 'WhatsApp',
        icon: FaWhatsapp,
        url: 'https://wa.me/yourphonenumber',
        color: '#25D366'
      },
      {
        name: 'LinkedIn',
        icon: FaLinkedin,
        url: 'https://linkedin.com/company/yourcompany',
        color: '#0A66C2'
      }
    ]
  
    // Copy page link function
    const copyPageLink = () => {
      const pageUrl = 'https://newtoncomputer.vercel.app/';
      navigator.clipboard.writeText(pageUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  // Slider data


// Get service image
const getServiceImage = (serviceName) => {
  const imageMap = {
    'Laptop Upgradation': '/assets/laptop-upgradation.webp',
    'Motherboard': '/assets/mother-board.webp',
    'Hinges': '/assets/hinges.webp',
    'Touchpad': '/assets/Touchpad.webp',
    'Chip Level Service': '/assets/mother-board.webp',
    'Ram & SSD': '/assets/laptop-upgradation.webp',
    'Adapters': '/assets/mother-board.webp',
    'Data Recovery': '/assets/laptop-upgradation.webp',
    'Batteries': '/assets/mother-board.webp',
    'Display': '/assets/Touchpad.webp',
    'WIFI & Bluetooth': '/assets/Hinges.webp',
    'Keypads': '/assets/Touchpad.webp'
  };
  return imageMap[serviceName] || '/assets/laptop-upgradation.webp';
};

// Add this function to determine slides to show based on screen size
const getSlidesToShow = () => {
  if (typeof window === 'undefined') return 4;
  
  const width = window.innerWidth;
  const containerWidth = width * 0.9; // 90% of viewport width
  const cardWidth = 300; // Approximate card width including margins
  
  // Calculate based on container width instead of viewport width
  const maxCards = Math.floor(containerWidth / cardWidth);
  
  // Return at least 1, at most 6
  return Math.max(1, Math.min(6, maxCards));
};

// Update your carousel slide calculation
useEffect(() => {
  const updateSlidesToShow = () => {
    const slides = getSlidesToShow();
    setSlidesToShow(slides);
  };

  updateSlidesToShow();
  window.addEventListener('resize', updateSlidesToShow);
  
  return () => window.removeEventListener('resize', updateSlidesToShow);
}, []);

  
  const laptopBrands = [
    'Dell Laptops',
    'Lenovo Laptops', 
    'HP Laptops',
    'Acer Laptops',
    'MSI Laptops',
    'ASUS Laptops'
  ]




// Auto-slide effect for laptops
useEffect(() => {
  const interval = setInterval(() => {
    nextLaptopSlide();
  }, 5000); // Change slide every 5 seconds

  return () => clearInterval(interval);
}, [currentLaptopSlide]);

 
 const showNotification = (message) => {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
};
 

  // Slider functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }


const [slidesToShow, setSlidesToShow] = useState(6);
const carouselTrackRef = useRef(null);

 

 

  const handleServiceClick = (service, index) => {
    setSelectedService(selectedService === index ? null : index);
  }

  // Auto play slider
useEffect(() => {
  if (!isAutoPlaying) return;

  const interval = setInterval(() => {
    nextServiceSlide();
  }, 4000);

  return () => clearInterval(interval);
}, [currentServiceSlide, isAutoPlaying, slidesToShow]);
useEffect(() => {
  const track = carouselTrackRef.current;
  if (!track) return;

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left
        nextServiceSlide();
      } else {
        // Swipe right
        prevServiceSlide();
      }
    }
  };

  track.addEventListener('touchstart', handleTouchStart);
  track.addEventListener('touchend', handleTouchEnd);

  return () => {
    track.removeEventListener('touchstart', handleTouchStart);
    track.removeEventListener('touchend', handleTouchEnd);
  };
}, []);

  const openModal = (laptop) => {
    setSelectedLaptop(laptop)
    setSelectedImage(laptop.image)
  }

  const closeModal = () => {
    setSelectedLaptop(null)
    setSelectedImage(null)
  }

  const handleSideImageClick = (image) => {
    setSelectedImage(image)
  }
  const aboutSectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
  const [counted, setCounted] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    years: 0,
    customers: 0
  });

  const achievementStats = [
    { id: 1, number: 14, suffix: '+', label: 'Years of Experience', key: 'years' },
    { id: 2, number: 1500, suffix: '+', label: 'Happy Customers', key: 'customers' }
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted) {
            setIsVisible(true);
            setCounted(true);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) {
        observer.unobserve(aboutSectionRef.current);
      }
    };
  }, [counted]);
  useEffect(() => {
    if (isVisible && counted) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60fps
      const stepDuration = duration / steps;

      achievementStats.forEach((stat) => {
        let currentStep = 0;
        const stepValue = stat.number / steps;

        const timer = setInterval(() => {
          currentStep++;
          const currentValue = Math.min(
            Math.floor(stepValue * currentStep),
            stat.number
          );

          setAnimatedStats(prev => ({
            ...prev,
            [stat.key]: currentValue
          }));

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, stepDuration);
      });
    }
  }, [isVisible, counted]);
  const startCounting = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCount = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current) + suffix;
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target + suffix;
        }
      };
      
      updateCount();
    });
  };

  // Start counting when section becomes visible
  useEffect(() => {
    if (isVisible && !counted) {
      startCounting();
    }
  }, [isVisible, counted]);
  // Add to your existing state variables
 const handleShopNow = () => {
    router.push('/pages/LaptopStore');
  };

// Partners logos data
const partnerLogos = [
  '/assets/partner1.png',
  '/assets/partner2.png',
  '/assets/partner3.png',
  '/assets/partner4.png',
  '/assets/partner5.png',
  '/assets/partner6.png',
  '/assets/msi.png',
  '/assets/lenovo.png',
  '/assets/hp.png',
  '/assets/acer.png',
  '/assets/asus.png',
  '/assets/dell.png'
];

  
 const handleBookService = () => {
  setIsBookServiceModalOpen(true);
};

 
 
  return (
    <div className="homepage">
      <BookServiceModal 
  isOpen={isBookServiceModalOpen}
  onClose={() => setIsBookServiceModalOpen(false)}
/>
   <div className="social-sidebar">
  <div className="social-icons">
    {socialMedia.map((social, index) => {
      const IconComponent = social.icon;
      return (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          style={{ '--delay': index * 0.1 + 's' }}  
          aria-label={`Visit our ${social.name}`}
        >
          <IconComponent className="social-icon-svg" />
          <span className="social-tooltip">{social.name}</span>
        </a>
      );
    })}
    
    {/* Copy Link Button */}
    <button
      className="social-icon copy-link-btn"
      onClick={copyPageLink}
      style={{ '--delay': '0.5s' }} 
      aria-label="Copy page link"
    >
      {copied ? <FaCheck className="social-icon-svg" /> : <FaCopy className="social-icon-svg" />}
      <span className="social-tooltip">
        {copied ? 'Copied!' : 'Copy Link'}
      </span>
    </button>
  </div>
</div>
      
      {/* Slider Section */}
    

      {/* Hero Section - Moved below slider */}
       
<section className="hero">
  <div className="hero__container">
    <div className="hero__content-wrapper">
      <div className="hero__content">
        <h1 className="hero__title">
          MULTI-BRAND Laptop Store and Services
        </h1>
        <p className="hero__description">
          Newton Computer, your one-stop multi-brand laptop shop located in Thoraipakkam and T. Nagar. 
          We offer an extensive selection of top-quality laptops from leading brands to meet all your 
          computing needs. Our knowledgeable staff is here to help you find the perfect device 
          tailored to your lifestyle.
        </p>
        <div className="hero__actions">
          <button 
            className="hero__btn hero__btn--primary"
            onClick={handleShopNow}
          > <FaShoppingCart className="btn-icon" />
            Shop Now  
          </button>
        </div>
      </div>
    </div>
    
    <div className="hero__image-container">
      <div className="hero-image-slider">
        {heroImages.map((image, index) => (
          <Image 
            key={index}
            src={image} 
            alt={`Hero image ${index + 1}`} 
            width={600} 
            height={400}
            priority={index === 0}
            className={`hero-slider-image ${index === currentHeroImageIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Rest of your existing sections remain the same */} 
    <section className="features">
  <div className="container">
    <div className="features__grid">
      {/* Card 1: Free Pickup and Delivery */}
      <div className="feature-card">
        <div className="feature-card__icon">
          <FaTruck />
        </div>
        <h3 className="feature-card__title">Free pickup and delivery</h3>
        <p className="feature-card__description">
          Convenient, reliable, and stress-free – we bring the service to you
        </p>
        <div className="feature-card__actions">
          <button className="feature-btn feature-btn--primary">
           Shop Now
            <FaArrowRight className="btn-arrow" />
          </button>
        </div>
      </div>

      {/* Card 2: Trusted Repairs */}
      <div className="feature-card">
        <div className="feature-card__icon">
          <FaShieldAlt />
        </div>
        <h3 className="feature-card__title">Get a Quote</h3>
        <p className="feature-card__description">
          Trusted, safe, and reliable repairs. Your devices security is our top priority!
        </p>
        <div className="feature-card__actions">
          <button className="feature-btn feature-btn--primary">
            Get a Quote
            <FaArrowRight className="btn-arrow" />
          </button>
        </div>
      </div>

      {/* Card 3: Become a Partner */}
      <div className="feature-card">
        <div className="feature-card__icon">
          <FaHandshake />
        </div>
        <h3 className="feature-card__title">Become a partner</h3>
        <p className="feature-card__description">
          Join our network to access top-quality products, expert support.
        </p>
        <div className="feature-card__actions">
          <button className="feature-btn feature-btn--primary">
            Become a Partner
            <FaArrowRight className="btn-arrow" />
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
  
<section className="online-store-section">
  <div className="container">
 <div className="section-header">
      <div className="header-content">
        <h2 className="section-title">
          <span className="services-main-title-accent">Refurbished</span> Laptops - New Arrivals
        </h2>
       
      </div>
      
      <button 
        className="view-all-btn-header"
        onClick={() => router.push('/pages/LaptopStore')}
      >
        View All Products <FaArrowRight className="arrow-icon" />
      </button>
    </div>

    {/* Products Carousel */}
    <div className="products-carousel">
      {/* Carousel Navigation */}
       <button 
    className="carousel-nav-btn prev-btn"
    onClick={prevLaptopSlide}
    aria-label="Previous products"
    disabled={currentLaptopSlide === 0}
  >
    <FaChevronLeft />
  </button>
      
      {/* Carousel Container */}
      <div className="carousel-container">
        <div 
      className="carousel-track"
      style={{
        transform: `translateX(-${currentLaptopSlide * (100 / slidesToShowRefurbished)}%)`
      }}
    >
          {filteredLaptops.map((laptop) => {
            const originalPrice = parseFloat(laptop.originalPrice.replace('₹', '').replace(/,/g, ''));
            const currentPrice = parseFloat(laptop.currentPrice.replace('₹', '').replace(/,/g, ''));
            const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
            const isInWishlist = wishlist.some(item => item.id === laptop.id);
            const isLoading = loadingStates[laptop.id];
            
            return (
              <div key={laptop.id} className="product-card-wrapper">
                <div className="product-card">
                  {/* Product Image Container */}
                  <div className="product-image-container">
                    <div className="image-wrapper">
                      <Image
                        src={laptop.image}
                        alt={laptop.name}
                        width={280}
                        height={200}
                        className="product-image"
                        priority={laptop.id <= 4}
                      />
                      
                      {/* Discount Badge */}
                      {/* {discount > 0 && (
                        <div className="discount-badge">
                          <span className="discount-text">-{discount}%</span>
                        </div>
                      )}
                       */}
                      {/* Stock Status */}
                      <div className={`stock-badge ${laptop.inStock ? 'in-stock' : 'out-of-stock'}`}>
                        {laptop.inStock ? 'In Stock' : 'Out of Stock'}
                      </div>
                      
                      
                      
                      {/* Quick Actions */}
                      <div className="quick-actions">
                        <button
                          className={`quick-action-btn wishlist-btn ${isInWishlist ? 'active' : ''}`}
                          onClick={() => handleAddToWishlist(laptop)}
                          disabled={isLoading === 'wishlist'}
                          title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          {isLoading === 'wishlist' ? (
                            <FaSyncAlt className="spinning" />
                          ) : (
                            <FaHeart className={isInWishlist ? 'filled' : ''} />
                          )}
                        </button>
                        
                        <button
                          className="quick-action-btn view-btn"
                          onClick={() => openModal(laptop)}
                          title="Quick View"
                        >
                          <FaEye />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="product-info">
                    <div className="product-category">
                      <span>{laptop.category}</span>
                    </div>
                    
                    <h3 className="product-title" title={laptop.name}>
                      {laptop.name}
                    </h3>
                    
                    {/* Specifications */}
                    <div className="product-specs">
                      <div className="spec-item">
                        
                        <span>{laptop.specs}</span>
                      </div>
                    </div>
                    
                   
                    
                    {/* Pricing */}
                    <div className="product-pricing">
                      
                      {originalPrice > currentPrice && (
                        <div className="original-price">
                          <span className="price-symbol">₹</span>
                          <span className="price-amount">{originalPrice.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="current-price">
                        <span className="price-symbol">₹</span>
                        <span className="price-amount">{currentPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  
                    
                    {/* Product Actions */}
                   <div className="product-actions">
  <button
    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
    onClick={() => handleToggleFavorite(laptop.id)}
    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
  >
    {isFavorite ? <FaHeart className="filled" /> : <FaRegHeart />}
  </button>
  
  <button
    className={`action-btn add-to-cart ${!laptop.inStock ? 'disabled' : ''} ${
      isLoading === 'cart' ? 'loading' : ''
    }`}
    onClick={() => handleAddToCart(laptop)}
    disabled={!laptop.inStock || isLoading === 'cart'}
  >
    {isLoading === 'cart' ? (
      <>
        <FaSyncAlt className="spinning" />
        <span>Adding...</span>
      </>
    ) : !laptop.inStock ? (
      <>
        <FaTimes />
        <span>Out of Stock</span>
      </>
    ) : (
      <>
        <FaShoppingCart />
        <span>Add to Cart</span>
      </>
    )}
  </button>
</div>
                    
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Next Button */}
      <button 
    className="carousel-nav-btn next-btn"
    onClick={nextLaptopSlide}
    aria-label="Next products"
    disabled={currentLaptopSlide >= Math.max(0, filteredLaptops.length - slidesToShowRefurbished)}
  >
    <FaChevronRight />
  </button>
    </div>
    
    {/* Carousel Dots */}
    {filteredLaptops.length > getSlidesToShow() && (
      <div className="carousel-dots">
        {[...Array(Math.ceil(filteredLaptops.length / getSlidesToShow()))].map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === Math.floor(currentLaptopSlide / getSlidesToShow()) ? 'active' : ''}`}
            onClick={() => setCurrentLaptopSlide(i * getSlidesToShow())}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    )}
    
    {/* View All Button */}
    {filteredLaptops.length > getSlidesToShow() * 2 && (
      <div className="view-all-container">
        <button className="view-all-btn">
          <span>View All Products</span>
          <FaArrowRight className="arrow-icon" />
        </button>
      </div>
    )}
  </div>
</section>

      {/* Laptop Services Section */}
<section className="laptop-services-carousel">
  <div className="services-carousel-container">
    <h2 className="services-carousel-title">Laptop <span className="services-main-title-accent">Services</span></h2>
    
    
    <div className="carousel-wrapper">
      <button 
        className="carousel-nav-btn carousel-prev-btn" 
        onClick={prevServiceSlide}
        aria-label="Previous services"
        disabled={currentServiceSlide === 0}
      >
        <FaChevronLeft />
      </button>
      
      <div className="carousel-viewport">
        <div 
          className="carousel-track"
          ref={carouselTrackRef}
          style={{
            transform: `translateX(-${currentServiceSlide * (100 / slidesToShowServices)}%)`
          }}
        >
          {laptopServices.map((service, index) => (
            <div 
              key={index} 
              className="carousel-card"
              style={{ 
                flex: `0 0 calc(${100 / slidesToShowServices}% - ${slidesToShowServices > 2 ? '1rem' : '0.5rem'})`,
                minWidth: `calc(${100 / slidesToShowServices}% - ${slidesToShowServices > 2 ? '1rem' : '0.5rem'})`
              }}
            >
              <div className="service-image-container">
                <Image 
                  src={getServiceImage(service)}
                  alt={service}
                  width={300}
                  height={225}
                  className="service-image"
                />
                <div className="image-title-overlay">
                  <h3 className="image-title">{service}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="carousel-nav-btn carousel-next-btn" 
        onClick={nextServiceSlide}
        aria-label="Next services"
        disabled={currentServiceSlide >= laptopServices.length - slidesToShowServices}
      >
        <FaChevronRight />
      </button>
    </div>
  </div>
</section>

{/* IT Services Section */}
<section className="services-section">
  <div className="container">
    <div className="services-header">
      <h2 className="services-title">
        Our <span className="services-main-title-accent">IT Services</span>
      </h2>
      <p className="services-subtitle">
        Comprehensive technology solutions for businesses and individuals
      </p>
    </div>
    
    <div className="services-grid">
      <div className="service-card">
        <div className="service-icon-box">
          <FaLaptop className="service-icon" />
        </div>
        <h3 className="service-name">Laptop & Desktop</h3>
        <p className="service-description">Repair, upgrade & maintenance services</p>
      </div>
      
      <div className="service-card">
        <div className="service-icon-box">
          <LuCctv className="service-icon" />
        </div>
        <h3 className="service-name">CCTV Solutions</h3>
        <p className="service-description">Installation & monitoring systems</p>
      </div>
      
      <div className="service-card">
        <div className="service-icon-box">
          <MdOutlineSecurity className="service-icon" />
        </div>
        <h3 className="service-name">Network Security</h3>
        <p className="service-description">Firewall & threat protection</p>
      </div>
      
      <div className="service-card">
        <div className="service-icon-box">
          <LuWifi className="service-icon" />
        </div>
        <h3 className="service-name">Wi-Fi & Networking</h3>
        <p className="service-description">Setup & optimization services</p>
      </div>
      
      <div className="service-card">
        <div className="service-icon-box">
          <FiServer className="service-icon" />
        </div>
        <h3 className="service-name">Server & Storage</h3>
        <p className="service-description">Setup & management solutions</p>
      </div>
      
      <div className="service-card">
        <div className="service-icon-box">
          <CiMail className="service-icon" />
        </div>
        <h3 className="service-name">Business Mail</h3>
        <p className="service-description">Email setup & configuration</p>
      </div>
      
      <div className="service-card">
        <div className="service-icon-box">
          <TiCloudStorageOutline className="service-icon" />
        </div>
        <h3 className="service-name">Cloud Storage</h3>
        <p className="service-description">Secure data storage solutions</p>
      </div>
    </div>
  </div>
</section>

{/* Store Locations Section */}
<section className="store-locations">
  <div className="container-location">
    <h2 className="section-titles">Our <span className="services-main-title-accent">Store Locations</span></h2>
    <p className="section-subtitle">Visit us at our conveniently located branches</p>
    
    <div className="locations-grid">
      {/* T.Nagar Branch Card */}
      <div className="location-card">
        <div className="location-media">
          {/* Map Container */}
          <div className="location-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.860341832715!2d80.23043847330108!3d13.044560287277593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267c85017da53%3A0xc487691bdae5d0a4!2sNEWTON%20COMPUTERS%20-%20T.NAGAR!5e0!3m2!1sen!2sin!4v1766030345500!5m2!1sen!2sin" 
              width="100%" 
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Newton Computers T.Nagar Branch"
              className="map-frame"
            ></iframe>
          </div>
          
          {/* Image Container */}
          <div className="location-image">
            <Image 
              src="/assets/newton-zigzag.jpg" 
              alt="Newton Computers T.Nagar Store" 
              width={400}
              height={200}
              className="store-image"
            />
            <div className="image-overlay">
              <span className="overlay-text">Visit Our Store</span>
            </div>
          </div>
        </div>
        
        <div className="location-details">
          <h3 className="location-title">Head Office</h3>
          <div className="location-address">
            <FaMapMarkerAlt className="address-icon" />
            <p>Newton Computer Services<br />
               28-B/16, Murugesan Street, North Usman Road, T.Nagar,<br />
               Chennai-600017</p>
          </div>
          
          <div className="location-info">
            <div className="info-item">
              <FaPhone className="info-icon" />
              <div className="info-content">
                <span className="info-label">Phone:</span>
                <a href="tel:+919840604073" className="info-value">+91 98406 04073</a>
              </div>
            </div>
            
            <div className="info-item">
              <FaClock className="info-icon" />
              <div className="info-content">
                <span className="info-label">Timings:</span>
                <span className="info-value">Mon to Sat - 9:30 AM to 6:30 PM</span>
              </div>
            </div>
          </div>
          
          <button 
            className="location-action-btn"
            onClick={() => handleGetDirections('tnagar')}
            aria-label="Get directions to T.Nagar branch"
          >
            Get Directions <FaArrowRight />
          </button>
        </div>
      </div>
      
      {/* Thoraipakkam Branch Card */}
      <div className="location-card">
        <div className="location-media">
          {/* Map Container */}
          <div className="location-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.573009499082!2d80.23063077329842!3d12.935142487376833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d09d9a1335f%3A0x481f049fe11e049d!2sNEWTON%20COMPUTERS%20-%20OMR%20THORAIPAKKAM!5e0!3m2!1sen!2sin!4v1766030408084!5m2!1sen!2sin" 
              width="100%" 
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Newton Computers Thoraipakkam Branch"
              className="map-frame"
            ></iframe>
          </div>
          
          {/* Image Container */}
          <div className="location-image">
            <Image 
              src="/assets/newton-zigzag2.jpg" 
              alt="Newton Computers Thoraipakkam Store" 
              width={400}
              height={200}
              className="store-image"
            />
            <div className="image-overlay">
              <span className="overlay-text">Visit Our Store</span>
            </div>
          </div>
        </div>
        
        <div className="location-details">
          <h3 className="location-title">Branch - Service Center Thoraipakkam</h3>
          <div className="location-address">
            <FaMapMarkerAlt className="address-icon" />
            <p>Newton Computer Services<br />
               No. 8/683 A, Srividya Avenue, Rajiv Gandhi Salai,<br />
               Thoraipakkam, Chennai - 600097</p>
          </div>
          
          <div className="location-info">
            <div className="info-item">
              <FaPhone className="info-icon" />
              <div className="info-content">
                <span className="info-label">Phone:</span>
                <a href="tel:+919940185417" className="info-value">+91-99401 85417</a>
              </div>
            </div>
            
            <div className="info-item">
              <FaClock className="info-icon" />
              <div className="info-content">
                <span className="info-label">Timings:</span>
                <span className="info-value">Everyday - 10:30 AM to 8:30 PM</span>
              </div>
            </div>
          </div>
          
          <button 
            className="location-action-btn"
            onClick={() => handleGetDirections('thoraipakkam')}
            aria-label="Get directions to Thoraipakkam branch"
          >
            Get Directions <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
  {/* <div className="service-details-circles">
    <div className="circle-decoration circle-1"></div>
    <div className="circle-decoration circle-2"></div>
    <div className="circle-decoration circle-3"></div>
    <div className="circle-decoration circle-4"></div>
  </div> */}
  
 
 
<section className="our-clients">
  <div className="container-our-client">
    <h2 className="clients-title">Our Valued <span className="services-main-title-accent">Clients</span></h2>
    
    <div className="clients-carousel-container">
      <div className="clients-carousel">
        {/* First set of logos */}
        {clientLogos.map((logo, index) => (
          <div key={`first-${index}`} className="client-logo-wrapper">
            <Image
              src={logo}
              alt={`Client logo ${index + 1}`}
              width={120}
              height={100}
              className="client-logo"
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {clientLogos.map((logo, index) => (
          <div key={`second-${index}`} className="client-logo-wrapper">
            <Image
              src={logo}
              alt={`Client logo ${index + 1}`}
              width={120}
              height={60}
              className="client-logo"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* GeM Section */}
<section className="gem-section">
  <div className="container">
    <div className="gem-content">
      <div className="gem-left">
        <div className="gem-text">
          <div className="gem-badge">
            <span>Authorized Partner</span>
          </div>
          <h2 className="gem-title">
            Authorized <span className="gem-highlight">GeM Seller</span> – Your Reliable Procurement Partner
          </h2>
          <p className="gem-description">
            We are an authorized and trusted partner on the Government e-Marketplace (GeM), 
            committed to delivering excellence in public procurement. With strong ties to 
            multiple government organizations and departments, we have built a reputation 
            for reliability, quality, and transparency.
          </p>
        </div>

   
      </div>
      
      <div className="gem-image">
        <div className="gem-image-container">
          <Image 
            src="/assets/ge_m-removebg-preview.png" 
            alt="Government e-Marketplace GeM Logo"
            width={500}
            height={400}
            className="gem-logo"
            priority
          />
          <div className="gem-image-glow"></div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* About Newton Computers Section */}
 
  <section className="about-newton" ref={aboutSectionRef}>
    <div className="container-about" ref={aboutSectionRef}>
      <div className="about-content" ref={aboutSectionRef}>
        <div className="about-images" ref={aboutSectionRef}>
          <div className="image-collage">
            <div className="image-main">
              <Image 
                src="/assets/newton-zigzag2.jpg" 
                alt="Newton Computers Store"
                width={400}
                height={500}
                className="about-img main-img"
              />
              <div className="experience-badge">
                <span className="years">{animatedStats.years}+</span>
                <span className="text">Years of Excellence</span>
              </div>
            </div>
            <div className="image-secondary" ref={aboutSectionRef}>
              <Image 
                src="/assets/newton-zigzag.jpg" 
                alt="Our Team"
                width={400}  
                height={350}  
                className="about-img secondary-img"
              />
              <div className="stats-overlay">
                <div className="stat-item">
                  <span className="stat-number">{animatedStats.customers}+</span>
                  <span className="stat-text">Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-text">
          <div className="section-badge">
            <span>About Us</span>
          </div>
          
          <h2 className="about-title">
            Newton Computers
            <span className="subtitle">Your One-Stop Multi-Brand Laptop Store</span>
          </h2>
          
          <p className="about-tagline">
            More Than 14 Years We Provide Multi-Brand Laptop Store & Service
          </p>
          
          <p className="about-description">
            Since the establishment in 2010, we are dealing all major brands and achieving more than 1500+ satisfied customers across India. We are receiving overwhelming response from all the sides of the customers.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <FaHeadset />
              </div>
              <div className="feature-content">
                <h4>Brilliant Client Service</h4>
                <p>24/7 Support & Free Consultations</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <FaUserCheck />
              </div>
              <div className="feature-content">
                <h4>User Experience</h4>
                <p>Laptop & Desktop Quick Tips and Advice</p>
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </div>
  </section>
<section className="compact-contact-section">
  <div className="container">
    <h2 className="contact-section-title">Get in <span className="services-main-title-accent">Touch</span></h2>
    <p className="contact-section-subtitle">Contact us for expert IT solutions and support</p>
    
    <div className="contact-grid">
      {/* Left Column - Contact Info */}
      <div className="contact-info">
        <div className="contact-info-item">
          <FaPhoneAlt className="contact-icon" />
          <div>
            <h3>Phone Numbers</h3>
            <div className="contact-details">
              <a href="tel:+919840604073">T.Nagar: 9840604073</a>
              <a href="tel:+919940185417">Thoraipakkam: 9940185417</a>
            </div>
          </div>
        </div>
        
        <div className="contact-info-item">
          <FaEnvelope className="contact-icon" />
          <div>
            <h3>Email</h3>
            <a href="mailto:info@newtoncomputers.in" className="email-link">
              info@newtoncomputers.in
            </a>
          </div>
        </div>
        
        <div className="contact-info-item">
          <FaClock className="contact-icon" />
          <div>
            <h3>Working Hours</h3>
            <p>Mon-Fri: 9:00 AM - 7:00 PM</p>
            <p>Saturday: 9:00 AM - 5:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
      
      {/* Right Column - Quick Form */}
      <div className="contact-form">
        <div className="form-header">
          <h3>Quick Message</h3>
          <p>We'll get back to you within 24 hours</p>
        </div>
        
        <form className="quick-contact-form">
          <div className="form-row">
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Your Name" 
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="tel" 
                placeholder="Phone Number" 
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
            />
          </div>
          
          <div className="form-group">
            <textarea 
              placeholder="Your Message" 
              rows="3"
              required
            ></textarea>
          </div>
          
          <button type="submit" className="submit-btn">
            Send Message <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
    
    
  </div>
</section>
{/* Our Partners Section */} 
<section className="partners-section">
  <div className="container">
    <div className="partners-header">
      <h2 className="partners-title">Our Partners</h2>
     
    </div>
    
    <div className="partners-container">
      <div className="partners-scroll">
     <div 
  className={`partners-track ${isPartnerAnimationPaused ? 'paused' : ''}`}
  onMouseEnter={handlePartnerMouseEnter}
  onMouseLeave={handlePartnerMouseLeave}
  style={{
    animationPlayState: isPartnerAnimationPaused ? 'paused' : 'running'
  }}
>
          {/* First set of logos */}
          {partnerLogos.map((logo, index) => (
            <div key={`first-${index}`} className="partner-logo">
              <Image
                src={logo}
                alt={`Partner ${index + 1}`}
                width={120}
                height={60}
                className="partner-image"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {partnerLogos.map((logo, index) => (
            <div key={`second-${index}`} className="partner-logo">
              <Image
                src={logo}
                alt={`Partner ${index + 1}`}
                width={120}
                height={60}
                className="partner-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Laptop Details Modal */}
      {selectedLaptop && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            
            <div className="modal-body">
              <div className="modal-image-section">
                <div className="modal-main-image">
                  <Image 
                    src={selectedImage || selectedLaptop.image} 
                    alt={selectedLaptop.name}
                    width={500}
                    height={400}
                    className="modal-laptop-image"
                  />
                </div>
                
                {/* Side View Images */}
                <div className="modal-side-images">
                  {selectedLaptop.sideImages && selectedLaptop.sideImages.map((sideImage, index) => (
                    <div 
                      key={index}
                      className={`side-image-thumb ${selectedImage === sideImage ? 'active' : ''}`}
                      onClick={() => handleSideImageClick(sideImage)}
                    >
                      <Image 
                        src={sideImage} 
                        alt={`${selectedLaptop.name} view ${index + 1}`}
                        width={80}
                        height={60}
                        className="side-image"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="modal-details">
                <h2 className="modal-title">{selectedLaptop.name}</h2>
                <p className="modal-specs">{selectedLaptop.specs}</p>
                
                <div className="modal-pricing">
                  <span className="modal-original-price">{selectedLaptop.originalPrice}</span>
                  <span className="modal-current-price">{selectedLaptop.currentPrice}</span>
                  <span className="modal-price-note">Current price is: {selectedLaptop.currentPrice}</span>
                </div>

                <div className="modal-description">
                  <p>{selectedLaptop.fullDescription}</p>
                </div>

                <div className="modal-warranty">
                  <h4>Return, Replacement & Warranty</h4>
                  <p>Every Product Is Backed By 6 month Warranty, 7 Days Refund and 14 Days Replacement Policy.</p>
                </div>

                <div className="modal-quantity">
                  <label htmlFor="quantity">Quantity:</label>
                  <input 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    min="1" 
                    max="10" 
                    defaultValue="1"
                    className="quantity-input"
                  />
                </div>

                <div className="modal-actions">
                  <button className="modal-btn modal-btn--primary">
                    Add to cart
                  </button>
                </div>

                <div className="modal-category">
                  <strong>Category:</strong> {selectedLaptop.category}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}