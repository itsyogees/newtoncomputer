import React from 'react'
import './ChipLevelServicePage.scss'
import CommonBanner from '../../component/CommonBanner/CommonBanner';
import ServicesNavigationBox from '../../component/ServicesNavigationBox/ServicesNavigationBox';
import Image from 'next/image'

const ChipLevelServicePage = () => {
  return (
    <div className="chip-level-service-page">
      {/* Hero Banner */}
 <CommonBanner 
        title="Chip Level Service"
        subtitle="Expert motherboard-level repairs for all laptop brands"
      />

      {/* Main Content */}
      <section className="service-content">
        <div className="container">
          {/* Introduction */}
         <div className="intro-section">
  <div className="intro-section-content">
    <div className="intro-text-side">
      <h1>Chip Level Service at Newton Computer Service</h1>
      <p className="intro-text">
        At <b>Newton Computer</b> Service, we offer comprehensive chip level service to address 
        a wide range of motherboard-related issues for all major laptop brands, including 
        HP, Lenovo, Acer, IBM, Dell, MSI, ASUS, Sony, and more. Our skilled technicians 
        are equipped to diagnose and repair various problems that may affect your laptops performance.
      </p>
    </div>
    <div className="intro-image-side">
      <Image 
        src="/assets/chip-level-service.jpg" 
        width={500}
        height={500}
        alt="Chip Level Service" 
        className="intro-image"
      />
    </div>
  </div>
</div>

          {/* Common Issues Section */}
          <div className="issues-section">
            <h2>Common Issues We Address</h2>
            <div className="issues-list">
              <div className="issue-item">
                <div className="issue-content">
                  <h3>Laptop Restart Problems:</h3>
                  <p>Continuous restarts or failure to boot can indicate motherboard issues that need expert attention.</p>
                </div>
              </div>
              
              <div className="issue-item">
                <div className="issue-content">
                  <h3>Hanging or Freezing Laptops:</h3>
                  <p>Performance lags or system freezes can be resolved with our chip level service.</p>
                </div>
              </div>
              
              <div className="issue-item">
                <div className="issue-content">
                  <h3>Memory Control Problems:</h3>
                  <p>We troubleshoot and fix issues related to memory detection and performance.</p>
                </div>
              </div>
              
              <div className="issue-item">
                <div className="issue-content">
                  <h3>Keyboard Control Problems:</h3>
                  <p>Unresponsive or malfunctioning keyboards can be repaired to restore functionality.</p>
                </div>
              </div>
              
              <div className="issue-item">
                <div className="issue-content">
                  <h3>Power Supply Problems:</h3>
                  <p>Issues with charging or power supply are expertly handled to ensure your laptop runs smoothly.</p>
                </div>
              </div>
              
              <div className="issue-item">
                <div className="issue-content">
                  <h3>Processor Control Issues:</h3>
                  <p>We diagnose and fix any problems affecting CPU performance.</p>
                </div>
              </div>
              
              <div className="issue-item">
                <div className="issue-content">
                  <h3>Dead Laptops:</h3>
                  <p>Our technicians can often revive laptops that appear completely dead.</p>
                </div>
              </div>
              
              <div className="issue-item">
                <div className="issue-content">
                  <h3>Display Problems:</h3>
                  <p>Issues with the display, such as flickering or black screens, can be addressed effectively.</p>
                </div>
              </div>
              
              <div className="issue-item">
                <div className="issue-content">
                  <h3>BIOS Problems:</h3>
                  <p>We provide solutions for BIOS-related errors and settings.</p>
                </div>
              </div>
              
              <div className="issue-item">
                <div className="issue-content">
                  <h3>Battery Section Issues:</h3>
                  <p>We troubleshoot battery recognition and charging issues.</p>
                </div>
              </div>
              
              <div className="issue-item">
                <div className="issue-content">
                  <h3>Audio Problems:</h3>
                  <p>Sound-related issues, including malfunctioning speakers or audio drivers, are repaired.</p>
                </div>
              </div>
              
              <div className="issue-item">
                <div className="issue-content">
                  <h3>Port & Connectivity Issues:</h3>
                  <p>We offer repairs for DC Pin, VGA, USB, LAN, and Wireless connectivity problems.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div className="trust-section">
            <div className="trust-content">
              {/* <h2>Why Trust Newton Computer Service?</h2> */}
              <p>
                When it comes to chip level service, trust <b>Newton Computer</b>  Service to provide 
                reliable and effective solutions for your laptops motherboard problems. Our goal 
                is to restore your device to optimal working condition swiftly and efficiently.
              </p>
              {/* <div className="trust-features">
                <div className="feature">
                  <span className="feature-icon">🔧</span>
                  <span>Expert Technicians</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">⚡</span>
                  <span>Quick Turnaround</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🛡️</span>
                  <span>Reliable Service</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">💻</span>
                  <span>All Brands Supported</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
       <ServicesNavigationBox />
    </div>
  )
}

export default ChipLevelServicePage