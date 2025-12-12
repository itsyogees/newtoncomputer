"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCheck, FaCloud, FaServer, FaSync, FaShieldAlt, FaHeadset, FaCogs, FaArrowRight, FaDatabase, FaRocket } from 'react-icons/fa';
import './CloudHostingServices.scss';

export default function CloudHostingServices() {
  const [currentPartner, setCurrentPartner] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const cloudPartners = [
    '/assets/newton-cloud-server.png',
    '/assets/azure-cloud-server.png',
    '/assets/aws-cloud-server.png',
    '/assets/google-cloud-1.png',
   
  ];

  const cloudServices = [
    {
      icon: <FaServer />,
      title: "Private Cloud Hosting",
      description: "Dedicated private cloud solutions with ultimate control and security",
      features: ["Full Control", "Enhanced Security", "Custom Configuration", "Dedicated Resources"]
    },
    {
      icon: <FaCloud />,
      title: "AWS Hosting",
      description: "Scalable Amazon Web Services for innovation and performance",
      features: ["Global Infrastructure", "Auto Scaling", "Pay-as-you-go", "99.9% Uptime"]
    },
    {
      icon: <FaDatabase />,
      title: "Azure Hosting",
      description: "Microsoft's cloud platform for seamless application performance",
      features: ["Enterprise Grade", "Hybrid Cloud", "AI Integration", "Security Compliance"]
    },
    {
      icon: <FaRocket />,
      title: "Google Cloud Hosting",
      description: "Google's efficient and flexible cloud platform for business growth",
      features: ["Machine Learning", "Global Network", "Cost Optimization", "Data Analytics"]
    }
  ];

  const whyChooseUs = [
    {
      icon: <FaHeadset />,
      title: "Expert Support",
      description: "Our team of certified professionals ensures a smooth and hassle-free hosting experience."
    },
    {
      icon: <FaCogs />,
      title: "Custom Solutions",
      description: "We design hosting strategies tailored to your business requirements."
    },
    {
      icon: <FaShieldAlt />,
      title: "Reliability and Performance",
      description: "Count on our robust infrastructure for maximum uptime and lightning-fast performance."
    },
    {
      icon: <FaSync />,
      title: "Scalable Options",
      description: "Adapt your hosting plan as your business grows with flexible scaling options."
    }
  ];

  const additionalFeatures = [
    {
      title: "24/7 Monitoring",
      description: "Round-the-clock monitoring and proactive support",
      icon: "monitor"
    },
    {
      title: "Security First",
      description: "Enterprise-grade security with regular updates",
      icon: "security"
    },
    {
      title: "Cost Optimization",
      description: "Optimized pricing with transparent billing",
      icon: "cost"
    },
    {
      title: "Migration Services",
      description: "Seamless migration from existing infrastructure",
      icon: "migration"
    }
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

    const section = document.getElementById('cloud-solutions');
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
      setCurrentPartner((prev) => (prev + 1) % Math.ceil(cloudPartners.length / 4));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [cloudPartners.length]);

  // Get current slide images
  const getCurrentSlideImages = () => {
    const startIndex = currentPartner * 4;
    return cloudPartners.slice(startIndex, startIndex + 4);
  };

  return (
    <div className="cloud-hosting-page">
      {/* Hero Section */}
      <section className="cloud-hero">
        <div className="cloud-hero__container">
          <div className="cloud-hero__content">
            <div className="certified-badge">
              <span>Certified Partner</span>
            </div>
            <h1 className="cloud-hero__title">
              Cloud Hosting Services
            </h1>
            <p className="cloud-hero__description">
              At Newton Computers, we specialize in delivering cutting-edge cloud hosting 
              solutions designed to empower your business.
            </p>
            
            {/* Partners Slider Section */}
            <div className="partners-sections">
              <div className="partners-header">
                <h3 className="partners-title">Trusted Cloud Partners</h3>
              </div>
              
              <div className="partners-slider">
                <div className="partners-track">
                  {getCurrentSlideImages().map((partner, index) => (
                    <div key={index} className="partner-item">
                      <div className="partner-image-container">
                        <Image
                          src={partner}
                          alt={`Cloud Partner ${index + 1}`}
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

            <div className="cloud-hero__actions">
              <button className="cloud-hero__btn cloud-hero__btn--primary">
                Book Service
              </button>
              <button className="cloud-hero__btn cloud-hero__btn--secondary">
                View Plans
              </button>
            </div>
          </div>
          <div className="cloud-hero__image">
            <Image 
              src="/assets/cloud-storage-services-1.png" 
              alt="Cloud Hosting Services" 
              width={600} 
              height={400}
              priority
            />
          </div>
        </div>
      </section>

      {/* Main Solutions Section */}
      <section id="cloud-solutions" className="cloud-solutions">
        {/* Floating background circles */}
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        
        <div className="cloud-solutions__container">
          <div className="cloud-solutions__content">
            <div className="content-wrapper">
              <h2 className="cloud-solutions__title">
                Cloud Hosting Solutions Tailored for Your Business
              </h2>
              <div className="cloud-solutions__text">
                <p className="intro-text">
                  At Newton Computers, we specialize in delivering cutting-edge cloud hosting 
                  solutions designed to empower your business. Our comprehensive services include:
                </p>
              </div>
            </div>
          </div>
          
          <div className="cloud-solutions__image">
            <div className="image-container">
              <Image
                src="/assets/cloud-storage-1.png"
                alt="Cloud Hosting Solutions Overview"
                width={600}
                height={500}
                className={`solution-image ${isVisible ? 'animate-in' : ''}`}
              />
            </div>
          </div>
        </div>
        
        <div className="cloud-services-grid">
          {cloudServices.map((service, index) => (
            <div key={index} className="cloud-service-card">
              <div className="service-header">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
              </div>
              <p className="service-description">{service.description}</p>
              <div className="service-features">
                {service.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag">
                    <FaCheck className="check-icon" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-cloud">
        <div className="why-choose-cloud__container container">
          <div className="why-choose-cloud__header">
            <h2 className="why-choose-cloud__title">
              Why Choose Us?
            </h2>
            <p className="why-choose-cloud__subtitle">
              Experience the future of cloud hosting with us. Contact our experts today 
              to explore the best hosting solution for your business.
            </p>
          </div>
          
          <div className="why-choose-grid">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="reason-card">
                <div className="reason-icon">
                  {reason.icon}
                </div>
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-description">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="additional-features">
        <div className="additional-features__container container">
          <div className="additional-features__content">
            <div className="additional-features__text-content">
              <h2 className="additional-features__title">
                Comprehensive Cloud Solutions
              </h2>
              <div className="additional-features__description">
                <p className="intro-text">
                  We provide end-to-end cloud hosting solutions that cover every aspect 
                  of your digital infrastructure needs.
                </p>
                
                <div className="features-list">
                  {additionalFeatures.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <div className="feature-icon">
                        {feature.icon === 'monitor' && <FaHeadset />}
                        {feature.icon === 'security' && <FaShieldAlt />}
                        {feature.icon === 'cost' && <FaCogs />}
                        {feature.icon === 'migration' && <FaSync />}
                      </div>
                      <div className="feature-content">
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="benefits-summary">
                  <h3>Key Benefits</h3>
                  <ul className="benefits-list">
                    <li><FaCheck /> Reduced infrastructure costs by up to 60%</li>
                    <li><FaCheck /> Improved application performance and reliability</li>
                    <li><FaCheck /> Enhanced security with enterprise-grade protection</li>
                    <li><FaCheck /> Flexible scaling to match business growth</li>
                    <li><FaCheck /> Expert support and 24/7 monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="additional-features__image">
              <div className="image-wrapper">
                <Image
                  src="/assets/cloud-storage-services-1-1.png"
                  alt="Cloud Infrastructure"
                  width={500}
                  height={400}
                  className="features-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="cloud-process">
        <div className="cloud-process__container container">
          <h2 className="cloud-process__title">
            Our Cloud Migration Process
          </h2>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Assessment & Planning</h3>
                <p>Comprehensive analysis of your current infrastructure and requirements</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Solution Design</h3>
                <p>Custom cloud architecture design based on your business needs</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Migration & Setup</h3>
                <p>Seamless migration with minimal downtime and disruption</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>Optimization & Support</h3>
                <p>Continuous optimization and 24/7 expert support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
}