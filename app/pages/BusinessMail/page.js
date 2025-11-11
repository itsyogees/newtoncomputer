"use client";
import { useState } from 'react';
import Image from 'next/image';
import { FaCheck, FaShieldAlt, FaUsers, FaSync, FaHeadset, FaEnvelope, FaArrowRight, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import './BusinessMail.scss';

export default function BusinessMail() {
  const [activePlan, setActivePlan] = useState('google');

  const googlePlans = [
    {
      name: 'Business Starter',
      price: '₹400',
      period: 'per user/month',
      features: [
        'Custom business email',
        '100 participant video meetings',
        '30 GB pooled storage per user',
        'Security and management controls',
        'Standard support'
      ]
    },
    {
      name: 'Business Standard',
      price: '₹800',
      period: 'per user/month',
      features: [
        'Custom business email',
        '150 participant video meetings + recording',
        '2 TB pooled storage per user',
        'Security and management controls',
        'Enhanced support'
      ]
    },
    {
      name: 'Business Plus',
      price: '₹1,200',
      period: 'per user/month',
      features: [
        'Custom business email',
        '500 participant video meetings + recording, attendance tracking',
        '5 TB pooled storage per user',
        'Enhanced security and management controls',
        'Premium support'
      ]
    }
  ];

  const microsoftPlans = [
    {
      name: 'Microsoft 365 Business Basic',
      price: '₹360',
      period: 'per user/month',
      features: [
        'Web and mobile versions of Office apps',
        'Exchange, OneDrive, SharePoint, Teams',
        'Chat, call, and collaborate in Teams',
        '1 TB of cloud storage per user',
        'Standard security'
      ]
    },
    {
      name: 'Microsoft 365 Business Standard',
      price: '₹900',
      period: 'per user/month',
      features: [
        'Desktop versions of Office apps',
        'Everything in Business Basic',
        'Webinars with attendee registration and reporting',
        'Manage customer appointments',
        'Advanced security'
      ]
    },
    {
      name: 'Microsoft 365 Business Premium',
      price: '₹1,650',
      period: 'per user/month',
      features: [
        'Everything in Business Standard',
        'Advanced security and device management',
        'Protect against sophisticated cyber threats',
        'Access and data control',
        'Premium support'
      ]
    }
  ];

  const advantages = [
    {
      icon: <FaShieldAlt />,
      title: 'Advanced Security Protocols',
      description: 'Multi-layered security measures including encryption and multi-factor authentication to protect your sensitive information.'
    },
    {
      icon: <FaUsers />,
      title: 'Improved Collaboration',
      description: 'Utilize collaborative tools within Google Workspace and Microsoft 365 for efficient teamwork from anywhere.'
    },
    {
      icon: <FaSync />,
      title: 'Seamless Migration',
      description: 'Efficient data migration from any email server with reliable and secure transfer processes.'
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Technical Assistance',
      description: 'Round-the-clock support to address issues and ensure uninterrupted business communication.'
    }
  ];

  return (
    <div className="business-mail-page">
      {/* Hero Section */}
      <section className="business-hero">
        <div className="business-hero__container">
          <div className="business-hero__content">
            <h1 className="business-hero__title">
              Business Mail Services
            </h1>
            <p className="business-hero__description">
              In today's digital landscape, efficient and secure communication is at the core of any successful business. 
              Newton Computer Services specializes in providing comprehensive business mail services, empowering organizations 
              with reliable and adaptable email platforms.
            </p>
            <div className="business-hero__actions">
              <button className="business-hero__btn business-hero__btn--primary">
                Get Quote
              </button>
              <button className="business-hero__btn business-hero__btn--secondary">
                Contact Us
              </button>
            </div>
          </div>
          <div className="business-hero__image">
            <Image 
              src="/assets/business-mail-services.png" 
              alt="Business Mail Services" 
              width={600} 
              height={400}
              priority
            />
          </div>
        </div>
      </section>

      {/* Certified Partner Section */}
      <section className="certified-partner">
        <div className="container">
          <div className="certified-partner__content">
            <div className="certified-partner__info">
              <h2 className="certified-partner__title">Certified Partner</h2>
              <div className="certified-partner__logo">
                <Image 
                  src="/assets/Google_Workspace_Logo.png" 
                  alt="Google Workspace Partner" 
                  width={300}
                  height={100}
                />
              </div>
              <button className="certified-partner__btn">
                Book Service
              </button>
            </div>
            <div className="certified-partner__description">
              <p>
                We offer end-to-end support for setting up and managing Google Workspace and Microsoft 365 email solutions. 
                Whether you're upgrading from another email provider or starting fresh, Newton Computer Services ensures 
                a seamless and efficient transition tailored to meet the unique needs of your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="plans-section">
        <div className="container">
          <h2 className="section-title">Plans for Every Business Need</h2>
          <p className="plans-intro">
            We recognize that each business has unique needs, which is why Newton Computer Services offers various plans 
            for Google Workspace and Microsoft 365. Our experts work with you to determine the ideal plan that aligns with 
            your operational requirements, helping you choose options that optimize cost, features, and scalability.
          </p>
          
          <div className="plans-toggle">
            <button 
              className={`plans-toggle__btn ${activePlan === 'google' ? 'active' : ''}`}
              onClick={() => setActivePlan('google')}
            >
              <FaGoogle className="toggle-icon" />
              Google Workspace
            </button>
            <button 
              className={`plans-toggle__btn ${activePlan === 'microsoft' ? 'active' : ''}`}
              onClick={() => setActivePlan('microsoft')}
            >
              <FaMicrosoft className="toggle-icon" />
              Microsoft 365
            </button>
          </div>

          <div className="plans-grid">
            {(activePlan === 'google' ? googlePlans : microsoftPlans).map((plan, index) => (
              <div key={index} className="plan-card">
                <div className="plan-card__header">
                  <h3 className="plan-card__name">{plan.name}</h3>
                  <div className="plan-card__price">
                    <span className="price-amount">{plan.price}</span>
                    <span className="price-period">{plan.period}</span>
                  </div>
                </div>
                <ul className="plan-card__features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="plan-feature">
                      <FaCheck className="feature-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="plan-card__btn">
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="business-services">
        <div className="container">
          <div className="business-services__content">
            <div className="business-services__text">
              <h2 className="business-services__title">
                Complete Email Solutions: Why Choose Newton Computer Services?
              </h2>
              <p className="business-services__description">
                Newton Computer Services is dedicated to delivering excellence in business email management. Our team of 
                experienced professionals is committed to facilitating smooth and secure transitions, minimizing disruption 
                to your day-to-day operations. We guide you through each step, from selecting the right plan for Google 
                Workspace or Microsoft 365, to full migration, and provide robust backup and recovery options to safeguard your data.
              </p>
            </div>
            <div className="business-services__image">
              <Image 
                src="/assets/business-mail-services-chennai.jpg" 
                alt="Business Mail Services Chennai" 
                width={600} 
                height={400}
                className="services-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Offering Section */}
      <section className="offering-section">
        <div className="offering-bg">
          <div className="container">
            <h2 className="section-title">Newton Computer Services' Business Mail Offering</h2>
            
            <div className="offering-grid">
              <div className="offering-item">
                <div className="offering-icon">
                  <FaEnvelope />
                </div>
                <h3 className="offering-title">Setting Up Google Workspace and Microsoft 365 Accounts</h3>
                <div className="offering-details">
                  <h4>Google Workspace</h4>
                  <p>
                    Our team configures Google Workspace, allowing your team to leverage familiar tools such as Gmail, 
                    Drive, Docs, and Meet, designed for efficient communication and collaboration.
                  </p>
                  <h4>Microsoft 365</h4>
                  <p>
                    We set up Microsoft 365 to give you access to Outlook, Teams, SharePoint, and Office apps, optimizing 
                    them for your business needs. With Newton Computer Services, your Microsoft 365 account is tailored 
                    for maximum productivity and seamless integration.
                  </p>
                </div>
              </div>
              
              <div className="offering-item">
                <div className="offering-icon">
                  <FaSync />
                </div>
                <h3 className="offering-title">Flexible Data Migration Solutions</h3>
                <div className="offering-details">
                  <h4>From Any Email Server</h4>
                  <p>
                    No matter the origin of your current email service, Newton Computer Services can efficiently migrate 
                    your data to Google Workspace or Microsoft 365.
                  </p>
                  <h4>Reliable and Secure Transfer</h4>
                  <p>
                    We use industry-leading tools to safeguard data integrity during migration, preserving email history, 
                    folder structures, and attachments without compromising security.
                  </p>
                  <p>
                    With a customer-centric approach, Newton Computer Services provides dependable support to manage and 
                    troubleshoot your Google Workspace and Microsoft 365 services.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="support-section">
              <div className="support-icon">
                <FaHeadset />
              </div>
              <h3 className="support-title">24/7 Technical Assistance</h3>
              <p className="support-description">
                Our team is available around the clock to address issues, ensuring uninterrupted business communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="advantages-section">
        <div className="container">
          <div className="advantages-content">
            <div className="advantages-text">
              <h2 className="advantages-title">
                Advantages of Choosing Newton Computer Services for Business Email Solutions
              </h2>
              <p className="advantages-intro">
                By choosing Newton Computer Services, you gain a reliable partner committed to delivering tailored email 
                solutions that enhance productivity, security, and scalability. Our services offer:
              </p>
              
             
            </div>
            
            <div className="advantages-image">
              <Image 
                src="/assets/business-mail-advantages.jpg" 
                alt="Business Mail Advantages" 
                width={600} 
                height={500}
                className="advantages-img"
              />
            </div>
             <div className="advantages-grid">
                {advantages.map((advantage, index) => (
                  <div key={index} className="advantage-item">
                    <div className="advantage-icon">
                      {advantage.icon}
                    </div>
                    <h3 className="advantage-title">{advantage.title}</h3>
                    <p className="advantage-description">{advantage.description}</p>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="business-cta">
        <div className="container">
          <div className="business-cta__content">
            <h2 className="business-cta__title">Ready to Transform Your Business Communication?</h2>
            <p className="business-cta__description">
              Contact us today to discuss your business email needs and discover how our solutions can drive your organization forward.
            </p>
            <div className="business-cta__actions">
              <button className="business-cta__btn business-cta__btn--primary">
                Get Started Now
              </button>
              <button className="business-cta__btn business-cta__btn--secondary">
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}