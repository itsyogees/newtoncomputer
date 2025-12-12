"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCheck, FaWifi, FaNetworkWired, FaServer, FaSync, FaHeadset, FaShieldAlt, FaCogs, FaArrowRight, FaPlug } from 'react-icons/fa';
import './WifiNetworkingSolutions.scss';

export default function WifiNetworkingSolutions() {
  const [currentPartner, setCurrentPartner] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const networkingPartners = [
    '/assets/net-2.png',
    '/assets/net-4.png',
    '/assets/wifi-4.png',
    '/assets/wifi-5.png',
    '/assets/wifi-6.png',
    '/assets/wifi-1.png',
    '/assets/wifi-2.png',
    '/assets/wifi-3.png'
  ];

  const services = [
    {
      icon: <FaWifi />,
      title: "Wireless Integration",
      description: "Full-spectrum wireless network setup with high-performance access points"
    },
    {
      icon: <FaNetworkWired />,
      title: "Network Infrastructure",
      description: "End-to-end network setup with routing, switching, and load balancing"
    },
    {
      icon: <FaHeadset />,
      title: "IT Services & Support",
      description: "Ongoing configuration, optimization, and maintenance services"
    },
    {
      icon: <FaShieldAlt />,
      title: "Security Solutions",
      description: "Secure network setups with advanced protection and monitoring"
    }
  ];

  const wirelessServices = [
    {
      title: "Access Points (AP)",
      description: "Deploying high-performance access points from leading brands such as TP-Link, Ubiquiti, and Aruba ensures fast, secure, and stable connections across large areas.",
      icon: <FaWifi />
    },
    {
      title: "WiFi Extenders and Routers",
      description: "We configure WiFi extenders, modems, and routers to enhance range and performance, making sure there are no dead zones in your network.",
      icon: <FaPlug />
    },
    {
      title: "Custom WiFi Solutions",
      description: "Our wireless solutions are tailored to meet specific business needs, providing reliable, high-speed internet for offices, warehouses, and other large-scale facilities.",
      icon: <FaCogs />
    }
  ];

  const infrastructureServices = [
    {
      title: "Routing and Switching",
      description: "We configure and install routers and switches from brands like Cisco, D-link and Netgear to optimize data flow, ensuring fast and efficient communication between devices.",
      icon: <FaNetworkWired />
    },
    {
      title: "Load Balancing",
      description: "Load balancers distribute traffic evenly across servers, preventing overload and maximizing uptime.",
      icon: <FaSync />
    },
    {
      title: "Device Integration",
      description: "Our team integrates various network devices seamlessly, ensuring compatibility and peak performance across your entire network.",
      icon: <FaServer />
    }
  ];

  const itServices = [
    {
      title: "Network Configuration and Optimization",
      description: "Our expert technicians configure all devices for optimal performance and conduct continuous optimization.",
      icon: <FaCogs />
    },
    {
      title: "Device Support and Maintenance",
      description: "We provide full support for all networking devices, ensuring updates and preventive maintenance to avoid disruptions.",
      icon: <FaHeadset />
    },
    {
      title: "Multi-Brand Expertise",
      description: "Our team works with major brands, including TP-Link, Cisco, Netgear, D-Link, and Aruba, to deliver solutions that maximize functionality and compatibility.",
      icon: <FaCheck />
    }
  ];

  // Check if client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('wifi-solutions');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % Math.ceil(networkingPartners.length / 4));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [networkingPartners.length, isClient]);

  // Get current slide images
  const getCurrentSlideImages = () => {
    const startIndex = currentPartner * 4;
    return networkingPartners.slice(startIndex, startIndex + 4);
  };

  return (
    <div className="wifi-networking-page">
      {/* Hero Section */}
      <section className="wifi-hero">
        <div className="wifi-hero__container">
          <div className="wifi-hero__content">
            <div className="certified-badge">
              <span>Certified Partner</span>
            </div>
            <h1 className="wifi-hero__title">
              Wi-Fi and Networking Solutions
            </h1>
            <p className="wifi-hero__description">
              Newton Computer Services offers comprehensive WiFi and networking solutions for businesses 
              of all sizes. Our expertise spans wireless integrations, network infrastructure setup, and
              advanced IT services that ensure seamless connectivity and optimal performance.
            </p>
            
            {/* Partners Slider Section */}
            <div className="partners-sections">
              <div className="partners-header">
                <h3 className="partners-title">Trusted Technology Partners</h3>
              </div>
              
              <div className="partners-slider">
                <div className="partners-track">
                  {getCurrentSlideImages().map((partner, index) => (
                    <div key={index} className="partner-item">
                      <div className="partner-image-container">
                        <Image
                          src={partner}
                          alt={`Networking Partner ${index + 1}`}
                          width={100}
                          height={60}
                          className="partner-image"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="wifi-hero__actions">
              <button className="wifi-hero__btn wifi-hero__btn--primary">
                Book Service
              </button>
            </div>
          </div>
          <div className="wifi-hero__image">
            <Image 
              src="/assets/wifi-networking-chennai.png" 
              alt="Wi-Fi and Networking Solutions" 
              width={600} 
              height={400}
              priority
            />
          </div>
        </div>
      </section>

      {/* Comprehensive Solutions Section */}
      <section id="wifi-solutions" className="wifi-solutions">
        {/* Floating background circles */}
        <div className="floating-circle floating-circle-1"></div>
        <div className="floating-circle floating-circle-2"></div>
        <div className="floating-circle floating-circle-3"></div>
        
        <div className="wifi-solutions__container">
          <div className="wifi-solutions__content">
            <div className="content-wrapper">
              <h2 className="wifi-solutions__title">
                Comprehensive Wi-Fi and Networking Solutions
              </h2>
              <div className="wifi-solutions__text">
                <p className="intro-text">
                  Newton Computer Services offers comprehensive WiFi and networking solutions for businesses 
                  of all sizes. Our expertise spans wireless integrations, network infrastructure setup, and 
                  advanced IT services that ensure seamless connectivity and optimal performance.
                </p>
                <p className="description-text">
                  With a focus on quality, security, and scalability, we deploy cutting-edge technology from 
                  trusted brands like Cisco, TP-Link, Ubiquiti, Netgear, and Aruba, bringing reliable and 
                  customized networking to your organization.
                </p>
              </div>
            </div>
          </div>
          
          <div className="wifi-solutions__image">
            <div className="image-container">
              <Image
                src="/assets/wifi-provider-chennai.png"
                alt="Wi-Fi Networking Overview"
                width={600}
                height={500}
                className={`solution-image ${isVisible ? 'animate-in' : ''}`}
              />
            </div>
          </div>
        </div>
        
        <div className="wifi-services-overview">
          <h3 className="services-title">WiFi and Networking Services</h3>
          <p className="services-subtitle">
            Our range of services addresses every aspect of business networking, from wireless 
            solutions and network infrastructure to advanced support and IT services.
          </p>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wireless Integration Section */}
      <section className="wireless-integration">
        <div className="wireless-integration__container">
          <div className="wireless-integration__content">
            <div className="wireless-integration__text-content">
              <h2 className="wireless-integration__title">
                Wireless Integration Services
              </h2>
              <div className="wireless-integration__description">
                <p className="intro-text">
                  We provide full-spectrum wireless integration services, setting up wireless networks 
                  that cover your entire workspace and support multiple users and devices with seamless connectivity.
                </p>
                
                <div className="wireless-services">
                  {wirelessServices.map((service, index) => (
                    <div key={index} className="wireless-service">
                      <div className="service-icon">
                        {service.icon}
                      </div>
                      <div className="service-content">
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="wireless-integration__image">
              <div className="image-wrapper">
                <Image
                  src="/assets/wifi-services.png"
                  alt="Wi-Fi Services"
                  width={500}
                  height={400}
                  className="wifi-services-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Infrastructure Section */}
      <section className="network-infrastructure">
        <div className="network-infrastructure__container">
          <div className="network-infrastructure__content">
            <div className="network-infrastructure__text-content">
              <h2 className="network-infrastructure__title">
                End-to-End Network Infrastructure Setup
              </h2>
              <div className="network-infrastructure__description">
                <p className="intro-text">
                  Setting up a high-performance network infrastructure requires expertise in both design and deployment. 
                  Newton Computer Services brings industry-leading technology and years of experience to build a resilient, scalable network infrastructure.
                </p>
                
                <div className="infrastructure-services">
                  {infrastructureServices.map((service, index) => (
                    <div key={index} className="infrastructure-service">
                      <div className="service-icon">
                        {service.icon}
                      </div>
                      <div className="service-content">
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="network-infrastructure__image">
              <div className="image-wrapper">
                <Image
                  src="/assets/networking-srvices.png"
                  alt="Network Infrastructure"
                  width={500}
                  height={400}
                  className="infrastructure-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* IT Services Section */}
      <section className="new-wifi-it-section">
        <div className="new-wifi-it-section__container">
          <div className="new-wifi-it-section__content">
            <div className="new-wifi-it-section__text-content">
              <div className="section-label">
                <span>Advanced IT Support</span>
              </div>
              <h2 className="new-wifi-it-section__title">
                IT Services
              </h2>
              <div className="new-wifi-it-section__description">
                <p className="intro-text">
                  We go beyond network setup by providing ongoing support, maintenance, and advanced IT services 
                  to keep your network secure and optimized.
                </p>
                
                <div className="it-services-list">
                  {itServices.map((service, index) => (
                    <div key={index} className="it-service-item">
                      <div className="service-icon-wrapper">
                        <div className="service-icon">
                          {service.icon}
                        </div>
                      </div>
                      <div className="service-content">
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="new-wifi-it-section__image">
              <div className="image-wrapper">
                <Image
                  src="/assets/newton-charger.png"
                  alt="IT Services and Support"
                  width={600}
                  height={500}
                  className="it-services-image"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}