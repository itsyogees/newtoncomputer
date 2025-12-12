"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCheck, FaServer, FaDatabase, FaCloud, FaSync, FaHeadset, FaShieldAlt, FaCogs, FaArrowRight } from 'react-icons/fa';
import './ServerAndStorageSolutions.scss';

export default function ServerAndStorageSolutions() {
  const [currentPartner, setCurrentPartner] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const serverPartners = [
    '/assets/hp-server.jpg',
    '/assets/dell-emc.png',
    '/assets/IBM-server.jpeg',
    '/assets/lenovo-thinkserver-2048x837.png',
    '/assets/netapp-nas-logo.png',
    '/assets/Synology_nasLogo.png',
    '/assets/Thecus-nas-logo.png',
  ];

  const features = [
    {
      icon: <FaServer />,
      title: "Enterprise Server Solutions",
      description: "Complete server installations, upgrades, and configuration for optimal performance"
    },
    {
      icon: <FaDatabase />,
      title: "Advanced Storage Systems",
      description: "NAS, cloud storage, and enterprise storage solutions from leading brands"
    },
    {
      icon: <FaSync />,
      title: "Scalable Infrastructure",
      description: "Solutions designed to grow with your business needs and evolving requirements"
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support & Maintenance",
      description: "Round-the-clock monitoring, support, and maintenance services"
    }
  ];

  const serverBrands = [
    { name: "Dell Servers", icon: "dell", description: "Reliable and powerful server solutions for businesses of all sizes" },
    { name: "IBM Servers", icon: "ibm", description: "Enterprise-grade servers with exceptional performance and security" },
    { name: "Lenovo Servers", icon: "lenovo", description: "Innovative server technology with robust management features" },
    { name: "HPE ProLiant", icon: "hpe", description: "Industry-leading servers with comprehensive support services" }
  ];

  const storageBrands = [
    { name: "Synology NAS", icon: "synology", description: "User-friendly NAS solutions for data storage and backup" },
    { name: "Thecus Storage", icon: "thecus", description: "High-performance storage solutions for business applications" },
    { name: "EMC Storage", icon: "emc", description: "Enterprise storage systems for mission-critical data" },
    { name: "NetApp Storage", icon: "netapp", description: "Advanced data management and storage solutions" }
  ];

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

    const section = document.getElementById('server-solutions');
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
    const interval = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % Math.ceil(serverPartners.length / 4));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [serverPartners.length]);

  // Get current slide images
  const getCurrentSlideImages = () => {
    const startIndex = currentPartner * 4;
    return serverPartners.slice(startIndex, startIndex + 4);
  };

  return (
    <div className="server-storage-page">
      {/* Hero Section */}
      <section className="server-hero">
        <div className="server-hero__container">
          <div className="server-hero__content">
            <h1 className="server-hero__title">
              Server and Storage Solutions
            </h1>
            <p className="server-hero__description">
              Newton Computer Services offers a complete range of server and storage solutions tailored 
              to meet the demands of modern businesses.
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
                          alt={`Technology Partner ${index + 1}`}
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

            <div className="server-hero__actions">
              <button className="server-hero__btn server-hero__btn--primary">
                Get Consultation
              </button>
            
            </div>
          </div>
          <div className="server-hero__image">
            <Image 
              src="/assets/storage.png" 
              alt="Server and Storage Solutions" 
              width={600} 
              height={400}
              priority
            />
          </div>
        </div>
      </section>

      {/* Comprehensive Solutions Section */}
      <section id="server-solutions" className="server-solutions">
        {/* Floating background circles */}
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        
        <div className="server-solutions__container">
          <div className="server-solutions__content">
            <div className="content-wrapper">
              <h2 className="server-solutions__title">
                Complete Server and Storage Infrastructure Solutions
              </h2>
              <div className="server-solutions__text">
                <p className="intro-text">
                  Newton Computer Services offers a complete range of server and storage solutions tailored to meet the demands of modern businesses. Whether your organization requires new server installations, upgrades, configuration, or reliable support, we provide end-to-end solutions across major server brands like Dell, IBM, Lenovo, and HPE ProLiant.
                </p>
                <p className="description-text">
                  Additionally, we specialize in diverse storage solutions, including NAS (Network Attached Storage), cloud file storage, and leading storage brands like Synology, Thecus, EMC, and NetApp. Our mission is to ensure your infrastructure runs smoothly, securely, and efficiently, helping your organization maximize its IT investment.
                </p>
              </div>
            </div>
          </div>
          
          <div className="server-solutions__image">
            <div className="image-container">
              <Image
                src="/assets/server-storage-500x406.png"
                alt="Server Infrastructure"
                width={600}
                height={500}
                className={`solution-image ${isVisible ? 'animate-in' : ''}`}
              />
            </div>
          </div>
        </div>
        
        <div className="server-features">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <div className="feature-content">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-server">
        <div className="container">
          <div className="why-choose-server__header">
            <h2 className="why-choose-server__title">
              Why Choose Newton Computer Services for Your Server and Storage Needs?
            </h2>
            <div className="why-choose-server__content">
              <p className="why-choose-server__description">
                With the ever-evolving demands of business technology, having the right server and storage setup is crucial. Newton Computer Services delivers tailored services that allow your infrastructure to scale seamlessly with your needs, maximizing performance and minimizing downtime.
              </p>
              <p className="why-choose-server__description">
                Our experienced team provides a full spectrum of server and storage solutions, from initial setup and configuration to ongoing support and maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="server-brands">
        <div className="server-brands__container container">
          <h2 className="server-brands__title">
            Brands We Work With
          </h2>
          <p className="server-brands__subtitle">
            At Newton Computer Services, we believe in working with only the best. Our partnerships with top brands ensure that your infrastructure is built with quality products.
          </p>
          
          <div className="brands-grid">
            <div className="brands-category">
              <h3 className="brands-category__title">
                <FaServer className="category-icon" />
                Server Solutions
              </h3>
              <div className="brands-list">
                {serverBrands.map((brand, index) => (
                  <div key={index} className="brand-item">
                    <div className="brand-icon">
                      <FaCheck />
                    </div>
                    <div className="brand-content">
                      <h4>{brand.name}</h4>
                      <p>{brand.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="brands-category">
              <h3 className="brands-category__title">
                <FaDatabase className="category-icon" />
                Storage Solutions
              </h3>
              <div className="brands-list">
                {storageBrands.map((brand, index) => (
                  <div key={index} className="brand-item">
                    <div className="brand-icon">
                      <FaCheck />
                    </div>
                    <div className="brand-content">
                      <h4>{brand.name}</h4>
                      <p>{brand.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="custom-solutions">
        <div className="custom-solutions__container container">
          <div className="custom-solutions__content">
            <div className="custom-solutions__text-content">
              <h2 className="custom-solutions__title">
                Custom Solutions for Every Business
              </h2>
              <div className="custom-solutions__description">
                <p className="intro-text">
                  Newton Computer Services understands that each business is unique. Our team works closely with you to design solutions that meet your specific requirements and budget constraints.
                </p>
                
                <div className="solution-benefits">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <FaCogs />
                    </div>
                    <div className="benefit-content">
                      <h4>Cost Optimization</h4>
                      <p>We help you choose servers and storage solutions that meet your needs without unnecessary features, ensuring you get the most value.</p>
                    </div>
                  </div>
                  
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <FaSync />
                    </div>
                    <div className="benefit-content">
                      <h4>Scalability and Flexibility</h4>
                      <p>Our solutions are designed to grow with your business, offering flexibility and scalability as your needs evolve.</p>
                    </div>
                  </div>
                </div>
                
                <div className="additional-benefits">
                  <h3>Additional Benefits</h3>
                  <ul className="benefits-list">
                    <li><FaCheck /> Expert consultation and planning</li>
                    <li><FaCheck /> Seamless integration with existing systems</li>
                    <li><FaCheck /> Comprehensive training and documentation</li>
                    <li><FaCheck /> Proactive monitoring and maintenance</li>
                    <li><FaCheck /> 24/7 technical support</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="custom-solutions__image">
              <div className="image-wrapper">
                <Image
                  src="/assets/server-support-chennai.png"
                  alt="Custom Server Solutions"
                  width={500}
                  height={400}
                  className="custom-solution-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
}