"use client"
import React from 'react'
import CommonBanner from '../../component/CommonBanner/CommonBanner';
import ServicesNavigationBox from '../../component/ServicesNavigationBox/ServicesNavigationBox';
import './DataRecoveryPage.scss';
import Image from 'next/image'
import { 
  FaTools, 
  FaShieldAlt, 
  FaBolt, 
  FaLaptop,
  FaDatabase,
  FaUserShield,
  FaClock,
  FaCogs
} from 'react-icons/fa'

const DataRecoveryPage = () => {
  return (
    <div className="data-recovery-page">
      {/* Hero Banner */}
      <CommonBanner 
        title="Data Recovery Services"
        subtitle="Professional data recovery for all your critical files and storage devices"
      />

      {/* Main Content */}
      <section className="service-content">
        <div className="container">
          {/* Introduction */}
          <div className="intro-section">
            <div className="intro-section-content">
              <div className="intro-text-side">
                <h1>Data Recovery Services at Newton Computer Service</h1>
                <p className="intro-text">
                  At <b>Newton Computer Service</b>, we understand how critical your data is to you. Whether it's important 
                  documents, cherished photos, or vital business information, losing data can be distressing. That's why 
                  we offer professional data recovery services to help you retrieve lost or inaccessible files from various storage devices.
                </p>
              </div>
              <div className="intro-image-side">
                <Image 
                  src="/assets/data-recovery.jpg" 
                  width={500}
                  height={500}
                  alt="Data Recovery Services" 
                  className="intro-image"
                />
              </div>
            </div>
          </div>

          {/* Data Recovery Services Section */}
          <div className="recovery-services-section">
            <h2>Our Data Recovery Services Include</h2>
            <div className="recovery-services-list">
              <div className="recovery-service-item">
                <div className="recovery-service-content">
                  <h3>Hard Drive Recovery</h3>
                  <p>We specialize in recovering data from both traditional HDDs and SSDs, regardless of the cause of data loss, such as accidental deletion, formatting, or hardware failure.</p>
                </div>
              </div>
              
              <div className="recovery-service-item">
                <div className="recovery-service-content">
                  <h3>External Drive Recovery</h3>
                  <p>Our team can recover data from external hard drives, USB flash drives, and memory cards that may have been corrupted or damaged.</p>
                </div>
              </div>
              
              <div className="recovery-service-item">
                <div className="recovery-service-content">
                  <h3>RAID Recovery</h3>
                  <p>We provide expert recovery services for RAID arrays, addressing complex data loss situations that may occur in server environments.</p>
                </div>
              </div>
              
              <div className="recovery-service-item">
                <div className="recovery-service-content">
                  <h3>Data Recovery from Laptops and Desktops</h3>
                  <p>Whether your device won't boot, is showing errors, or has suffered physical damage, we have the tools and expertise to recover your data.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Expertise Section */}
          <div className="expertise-section">
            <div className="container">
              <div className="expertise-content">
                <h2>Why Choose Our Data Recovery Services?</h2>
                <div className="expertise-features">
                  <div className="expertise-feature">
                    <div className="feature-icon">
                      <FaTools className="icon" />
                    </div>
                    <div className="feature-text">
                      <h4>Advanced Techniques</h4>
                      <p>Our experienced technicians use advanced techniques and tools to maximize the chances of successful data recovery.</p>
                    </div>
                  </div>
                  
                  <div className="expertise-feature">
                    <div className="feature-icon">
                      <FaShieldAlt className="icon" />
                    </div>
                    <div className="feature-text">
                      <h4>Data Security & Confidentiality</h4>
                      <p>We prioritize data security and confidentiality, ensuring that your information is handled with care throughout the recovery process.</p>
                    </div>
                  </div>
                  
                  <div className="expertise-feature">
                    <div className="feature-icon">
                      <FaBolt className="icon" />
                    </div>
                    <div className="feature-text">
                      <h4>Reliable & Efficient</h4>
                      <p>Trust us to provide reliable and efficient data recovery services with quick turnaround times.</p>
                    </div>
                  </div>
                  
                  <div className="expertise-feature">
                    <div className="feature-icon">
                      <FaLaptop className="icon" />
                    </div>
                    <div className="feature-text">
                      <h4>All Devices Supported</h4>
                      <p>We recover data from all types of storage devices and computer systems.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features Section */}
          <div className="features-section">
            <div className="container">
              <div className="features-content">
                <h2>Our Recovery Process</h2>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-card-icon">
                      <FaDatabase className="icon" />
                    </div>
                    <h4>Comprehensive Analysis</h4>
                    <p>Thorough assessment of your storage device to determine the best recovery approach.</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-card-icon">
                      <FaUserShield className="icon" />
                    </div>
                    <h4>Secure Handling</h4>
                    <p>Your data is protected with strict security protocols throughout the recovery process.</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-card-icon">
                      <FaClock className="icon" />
                    </div>
                    <h4>Quick Turnaround</h4>
                    <p>Emergency services available for critical data loss situations with fast recovery times.</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-card-icon">
                      <FaCogs className="icon" />
                    </div>
                    <h4>Expert Technicians</h4>
                    <p>Certified professionals with years of experience in data recovery technology.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </section>
      <ServicesNavigationBox />
    </div>
  )
}

export default DataRecoveryPage