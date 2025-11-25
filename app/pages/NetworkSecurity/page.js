"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCheck, FaShieldAlt, FaUsers, FaSync, FaHeadset, FaEnvelope, FaArrowRight, FaGoogle, FaMicrosoft, FaArrowLeft, FaArrowRight as FaRightArrow } from 'react-icons/fa';
import './NetworkSecurity.scss';

export default function NetworkSecurity() {
  const [activePlan, setActivePlan] = useState('firewall');
  const [currentPartner, setCurrentPartner] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const securityPartners = [
    '/assets/network-security1.png',
    '/assets/network-security2.png',
    '/assets/network-security3.webp',
    '/assets/network-security4.png',
    '/assets/network-security5.png',
    '/assets/network-security6.png',
    '/assets/network-security7.png',
    '/assets/network-security8.png'
  ];

  const whyChooseUs = [
    {
      icon: <FaShieldAlt />,
      title: "Strong & Reliable Security",
      description: "We build robust security infrastructures tailored to your specific business needs and requirements."
    },
    {
      icon: <FaSync />,
      title: "Fully Customized Solutions",
      description: "From basic endpoint protection to complex multi-site firewall networks, we deliver exactly what you need."
    },
    {
      icon: <FaUsers />,
      title: "Comprehensive Protection",
      description: "Advanced defenses against malware, viruses, and unauthorized access with 24/7 monitoring."
    },
    {
      icon: <FaHeadset />,
      title: "Expert Security Team",
      description: "Years of expertise in delivering enterprise-grade security solutions for businesses of all sizes."
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

    const section = document.getElementById('security-solutions');
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
      setCurrentPartner((prev) => (prev + 1) % Math.ceil(securityPartners.length / 4));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [securityPartners.length]);

  // Get current slide images
  const getCurrentSlideImages = () => {
    const startIndex = currentPartner * 4;
    return securityPartners.slice(startIndex, startIndex + 4);
  };

  return (
    <div className="network-security-page">
      {/* Hero Section */}
      <section className="security-hero">
        <div className="security-hero__container">
          <div className="security-hero__content">
            <h1 className="security-hero__title">
              Network Security Solutions
            </h1>
            <p className="security-hero__description">
              Newton Security Center, part of Newton Computer Services, is dedicated to safeguarding your business 
              with a full range of network security services, including advanced firewall solutions and antivirus protection.
            </p>
            
            {/* Partners Slider Section */}
            <div className="partners-sections">
              <div className="partners-header">
                <h3 className="partners-title">Trusted Security Partners</h3>
              </div>
              
              <div className="partners-slider">
                <div className="partners-track">
                  {getCurrentSlideImages().map((partner, index) => (
                    <div key={index} className="partner-item">
                      <div className="partner-image-container">
                        <Image
                          src={partner}
                          alt={`Security Partner ${index + 1}`}
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

            <div className="security-hero__actions">
              <button className="security-hero__btn security-hero__btn--primary">
                Book Service
              </button>
            </div>
          </div>
          <div className="security-hero__image">
            <Image 
              src="/assets/network-security-solutions.png" 
              alt="Network Security Solutions" 
              width={600} 
              height={400}
              priority
            />
          </div>
        </div>
      </section>

      {/* Security Solutions Section */}
      <section id="security-solutions" className="security-solutions">
        {/* Floating background circles */}
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        
        <div className="security-solutions__container">
          <div className="security-solutions__content">
            <div className="content-wrapper">
              <h2 className="security-solutions__title">
                Network Security Solutions by Newton Security Center: Firewall and Antivirus Protection
              </h2>
              <div className="security-solutions__text">
                <p className="intro-text">
                  Newton Security Center, part of Newton Computer Services, is dedicated to safeguarding your business with a full range of network security services, including advanced firewall solutions and antivirus protection.
                </p>
                <p className="description-text">
                  In today's interconnected world, every organization is vulnerable to cyber threats. Our team delivers robust protection that shields your network, systems, websites, and third-party applications from malicious attacks, keeping your operations safe and secure.
                </p>
                <p className="partners-text">
                  With a focus on both cost-effective and scalable solutions, Newton Security Center partners with leading firewall providers, including <strong>Sophos Cyberoam, Fortinet, Juniper, Check Point, and Cisco</strong>, to tailor security systems to the unique needs of each organization.
                </p>
              </div>
            </div>
          </div>
          
          <div className="security-solutions__image">
            <div className="image-container">
              <Image
                src="/assets/firewall-and-antivirus.png"
                alt="Firewall and Antivirus Protection"
                width={600}
                height={500}
                className={`solution-image ${isVisible ? 'animate-in' : ''}`}
              />
            </div>
          </div>
        </div>
        
        <div className="security-featuress">
          <div className="feature-item">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <div className="feature-content">
              <h4>Advanced Firewall Protection</h4>
              <p>Enterprise-grade firewall solutions customized for your business needs</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <FaSync />
            </div>
            <div className="feature-content">
              <h4>Real-time Antivirus</h4>
              <p>Continuous monitoring and protection against evolving threats</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <FaUsers />
            </div>
            <div className="feature-content">
              <h4>Multi-layered Security</h4>
              <p>Comprehensive protection for networks, systems, and applications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Newton Security Center Section */}
      <section className="why-choose-us">
        <div className="container">
          <div className="why-choose-us__header">
            <h2 className="why-choose-us__title">
              Why Choose Newton Security Center for Your Network Security?
            </h2>
            <p className="why-choose-us__subtitle">
              Newton Security Center is committed to building strong, reliable, and fully customized security infrastructures. With our comprehensive approach, your company benefits from the most advanced defenses against malware, viruses, and unauthorized access. Whether you need basic endpoint protection or a complex firewall network covering multiple sites, Newton Security Center has the expertise to deliver.
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Firewall Solutions Section */}
      <section className="advanced-firewall">
        <div className="advanced-firewall__container container">
          <h2 className="advanced-firewall__title">
            Advanced Firewall Solutions for Complete Network Security
          </h2>
          <div className="advanced-firewall__content">
            <div className="advanced-firewall__text-content">
              <div className="advanced-firewall__description">
                <p className="advanced-firewall__para">
                  Firewalls serve as the first line of defense against external threats, and Newton Security Center provides powerful firewall solutions to protect your company's entire network. We offer products from industry leaders like <strong>Sophos Cyberoam, Fortinet, Juniper, Check Point, and Cisco</strong>, ensuring maximum security for both small and large-scale networks.
                </p>
                
                <div className="firewall-solutions">
                  <div className="solution-item">
                    <div className="solution-icon">
                      <FaShieldAlt />
                    </div>
                    <div className="solution-content">
                      <h4>Sophos Cyberoam Firewalls</h4>
                      <p>Known for unified threat management, Sophos Cyberoam offers extensive features for secure, flexible, and efficient network management.</p>
                    </div>
                  </div>
                  
                  <div className="solution-item">
                    <div className="solution-icon">
                      <FaShieldAlt />
                    </div>
                    <div className="solution-content">
                      <h4>Fortinet Firewalls</h4>
                      <p>With advanced threat protection, Fortinet firewalls provide robust defense against a range of attacks, ideal for companies with high-security demands.</p>
                    </div>
                  </div>
                  
                  <div className="solution-item">
                    <div className="solution-icon">
                      <FaShieldAlt />
                    </div>
                    <div className="solution-content">
                      <h4>Juniper and Check Point Firewalls</h4>
                      <p>Known for their scalability and performance, Juniper and Check Point firewalls deliver high-grade security solutions tailored to complex environments.</p>
                    </div>
                  </div>
                  
                  <div className="solution-item">
                    <div className="solution-icon">
                      <FaShieldAlt />
                    </div>
                    <div className="solution-content">
                      <h4>Cisco Firewalls</h4>
                      <p>Cisco's firewall solutions provide customizable security features to meet the specific needs of any organization, from small businesses to enterprises.</p>
                    </div>
                  </div>
                </div>
                
                <div className="advanced-firewall__conclusion">
                  <p>
                    Our team assists you in selecting the right firewall based on your organization's size, security requirements, and budget, ensuring you get optimal protection at the best value.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="advanced-firewall__image">
              <div className="image-wrapper">
                <Image
                  src="/assets/Firewall-Solutions.png"
                  alt="Firewall Solutions"
                  width={500}
                  height={400}
                  className="firewall-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Antivirus Protection Section */}
      <section className="antivirus-protection">
         <h2 className="antivirus-protection__title">
                Antivirus Protection for Endpoints and Servers
              </h2>
        <div className="antivirus-protection__container container">
          <div className="antivirus-protection__content">
            <div className="antivirus-protection__text-content">
             
              <div className="antivirus-protection__description">
                <p className="intro-text">
                  A strong antivirus solution is essential to protect systems from malware, ransomware, and other digital threats. Newton Security Center provides a full suite of antivirus options to defend both individual systems and servers.
                </p>
                
                <div className="antivirus-features">
                  <div className="antivirus-feature">
                    <div className="antivirus-feature__icon">
                      <FaSync />
                    </div>
                    <div className="antivirus-feature__content">
                      <h4>Real-Time Scanning</h4>
                      <p>Our antivirus solutions provide constant monitoring of your systems, identifying and neutralizing threats in real time.</p>
                    </div>
                  </div>
                  
                  <div className="antivirus-feature">
                    <div className="antivirus-feature__icon">
                      <FaShieldAlt />
                    </div>
                    <div className="antivirus-feature__content">
                      <h4>Regular Updates</h4>
                      <p>We automate antivirus updates to ensure your protection remains up-to-date against new and emerging threats, keeping your business secure 24/7.</p>
                    </div>
                  </div>
                </div>
                
                <div className="website-security">
                  <h3>Website and Application Security</h3>
                  <p>
                    Websites and third-party applications are common targets for hackers, who may inject malicious code or exploit vulnerabilities. Newton Security Center offers comprehensive security measures to defend your digital assets from such attacks.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="antivirus-protection__image">
              <div className="image-wrapper">
                <Image
                  src="/assets/Antivirus-Protection.png"
                  alt="Antivirus Protection"
                  width={500}
                  height={400}
                  className="antivirus-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

        <section className="removable-media-protection">
        <div className="removable-media-protection__container container">
          <div className="removable-media-protection__content">
            <div className="removable-media-protection__image">
              <div className="image-wrapper">
                <Image
                  src="/assets/remove.png"
                  alt="Removable Media Protection"
                  width={500}
                  height={400}
                  className="removable-media-image"
                />
              </div>
            </div>
            
            <div className="removable-media-protection__text-content">
              <h2 className="removable-media-protection__title">
                Protection Against Removable Media Threats
              </h2>
              <div className="removable-media-protection__description">
                <p className="intro-text">
                  Removable devices, like USB drives, are often vulnerable to malware that can bypass traditional network defenses. Newton Security Center provides robust measures to prevent these devices from compromising your systems.
                </p>
                
                <div className="removable-media-features">
                  <div className="removable-media-feature">
                    <div className="removable-media-feature__icon">
                      <FaShieldAlt />
                    </div>
                    <div className="removable-media-feature__content">
                      <h4>Device Scanning and Control</h4>
                      <p>We enforce strict scanning protocols on all USB devices to detect and block any malware that may try to infiltrate your network through these media.</p>
                    </div>
                  </div>
                  
                  <div className="removable-media-feature">
                    <div className="removable-media-feature__icon">
                      <FaUsers />
                    </div>
                    <div className="removable-media-feature__content">
                      <h4>Access Control and Monitoring</h4>
                      <p>Access restrictions and real-time monitoring help secure your network from unauthorized devices and potential data leaks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}