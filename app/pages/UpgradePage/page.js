"use client"
import React from 'react'
import CommonBanner from '../../component/CommonBanner/CommonBanner';
import ServicesNavigationBox from '../../component/ServicesNavigationBox/ServicesNavigationBox';
import './UpgradePage.scss';
import Image from 'next/image'

const UpgradePage = () => {
  return (
    <div className="upgrade-page">
      {/* Hero Banner */}
      <CommonBanner 
        title="RAM & Storage Upgrade Services"
        subtitle="Enhance your laptop's performance with expert upgrades"
      />

      {/* Main Content */}
      <section className="service-content">
        <div className="container">
          {/* Introduction */}
          <div className="intro-section">
            <div className="intro-section-content">
              <div className="intro-text-side">
                <h1>Upgrade RAM and Storage Services at Newton Computer Service</h1>
                <p className="intro-text">
                  Enhance your laptop's performance with our expert upgrade services at <b>Newton Computer Service</b>. 
                  We specialize in upgrading RAM and various storage options, including SSDs, HDDs, and M.2 drives. 
                  Our skilled technicians will assess your laptop and recommend the best upgrade options tailored to your needs.
                </p>
              </div>
              {/* <div className="intro-image-side">
                <Image 
                  src="/assets/upgrade-service.jpg" 
                  width={500}
                  height={500}
                  alt="RAM and Storage Upgrade Services" 
                  className="intro-image"
                />
              </div> */}
            </div>
          </div>

          {/* Upgrade Services Section */}
          <div className="upgrade-services-section">
            <h2>Our Upgrade Services</h2>
            <div className="upgrade-services-list">
              <div className="upgrade-service-item">
                <div className="upgrade-service-content">
                  <h3>RAM Upgrades</h3>
                  <p>Boost your laptop's speed and multitasking capabilities with increased RAM. More memory means smoother performance for demanding applications and improved responsiveness.</p>
                </div>
              </div>
              
              <div className="upgrade-service-item">
                <div className="upgrade-service-content">
                  <h3>SSD Upgrades</h3>
                  <p>Switch to a solid-state drive (SSD) for faster boot times and quicker access to files and applications. Experience a significant improvement in overall system speed.</p>
                </div>
              </div>
              
              <div className="upgrade-service-item">
                <div className="upgrade-service-content">
                  <h3>HDD Upgrades</h3>
                  <p>Need more storage space? We offer high-capacity hard drive (HDD) upgrades to accommodate your growing data needs without sacrificing performance.</p>
                </div>
              </div>
              
              <div className="upgrade-service-item">
                <div className="upgrade-service-content">
                  <h3>M.2 SSD Upgrades</h3>
                  <p>Upgrade to an M.2 SSD for cutting-edge speed and efficiency. M.2 drives deliver exceptional performance, ideal for gaming, video editing, and other resource-intensive tasks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div className="trust-section">
            <div className="trust-content">
              <p>
                At <b>Newton Computer Service</b>, our skilled technicians will assess your laptop and recommend 
                the best upgrade options tailored to your needs. Trust us to provide reliable installation and 
                optimization services to keep your laptop running at its best. Visit us today!
              </p>
            </div>
          </div>
        </div>
      </section>
      <ServicesNavigationBox />
    </div>
  )
}

export default UpgradePage