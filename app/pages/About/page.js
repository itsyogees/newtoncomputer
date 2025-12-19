// app/about/page.tsx - Complete About Page
import Image from 'next/image';
import CommonBanner from '../../component/CommonBanner/CommonBanner';
import { 
  FaCheckCircle, 
  FaClock, 
  FaUserFriends, 
  FaTags,
  FaShieldAlt, 
  FaUserCheck, 
  FaLaptop, 
  FaLightbulb,
  FaHeadset,
  FaProjectDiagram,
  FaCalendarAlt, 
  FaMapMarkerAlt,
  FaBriefcase,
  FaStar, 
  FaUsers 
} from 'react-icons/fa';
import './About.scss';

export default function AboutPage() {
  // Why Choose Us Features Data
  const whyChooseFeatures = [
    {
      icon: FaHeadset,
      title: "24/7 Customer Support",
      description: "Round-the-clock assistance to address all your queries and technical concerns with immediate response from our dedicated support team."
    },
    {
      icon: FaShieldAlt,
      title: "Trusted & Reliable",
      description: "14+ years of experience serving thousands of satisfied customers with premium IT solutions and maintaining highest service standards."
    },
    {
      icon: FaTags,
      title: "Best Price Guarantee",
      description: "Competitive pricing with regular discounts and exclusive deals ensuring maximum value for your investment in quality products."
    },
    {
      icon: FaUserCheck,
      title: "Expert Consultation",
      description: "Free personalized advice from our IT experts to help you make informed decisions based on your specific requirements."
    },
    {
      icon: FaLaptop,
      title: "Wide Product Range",
      description: "Extensive selection of laptops, desktops, and accessories from all leading brands to meet every computing need."
    },
    {
      icon: FaUserFriends,
      title: "Customer-Centric Approach",
      description: "Dedicated to understanding your needs and providing tailored solutions that exceed your expectations every time."
    }
  ];

  // Third Section Features
  const thirdSectionFeatures = [
    {
      icon: FaUserFriends,
      title: "Brilliant Client Service",
      description: "Customer satisfaction is our top priority. We go above and beyond to ensure you have the best experience."
    },
    {
      icon: FaClock,
      title: "24/7 Support",
      description: "Round-the-clock assistance to address all your queries and concerns with immediate response."
    },
    {
      icon: FaUserCheck,
      title: "Free Consultations",
      description: "Personalized advice from experts to help you make the best purchase decisions for your needs."
    },
    {
      icon: FaLightbulb,
      title: "User Experience Expertise",
      description: "Simplifying your journey to find the perfect device with our expert guidance and seamless process."
    },
    {
      icon: FaLaptop,
      title: "Comprehensive Range",
      description: "Offering laptops, desktops, and accessories from all leading brands for every need and budget."
    },
    {
      icon: FaHeadset,
      title: "Quick Tips and Advice",
      description: "Empowering you with expert insights and recommendations to make informed technology choices."
    }
  ];

  return (
    <>
      <CommonBanner title="About Us" />

      {/* First Section - About Newton Computer */}
      <div className="about-section">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="about-title">Welcome to Newton Computer</h2>
              <p className="about-lead">
                Your trusted multi-brand laptop destination in Thoraipakkam and T. Nagar! 
                For over 14 years, we have been committed to providing an extensive selection 
                of high-quality laptops from leading brands, catering to a variety of personal 
                and professional computing needs.
              </p>
              <p className="about-text">
                Since our establishment in 2010, we have successfully completed 3,000+ Government 
                and Corporate projects across India, earning the trust and appreciation of countless 
                satisfied customers. Our mission is to deliver exceptional products and services 
                while ensuring an unparalleled shopping experience.
              </p>

              <div className="about-services">
                <h3 className="about-subtitle">Unmatched IT Services</h3>
                <p className="about-text">
                  At Newton Computer, we pride ourselves on delivering comprehensive IT solutions 
                  that combine cutting-edge technology with exceptional customer care. With years 
                  of expertise and a customer-first approach, we aim to be your trusted partner 
                  in navigating the rapidly evolving IT landscape.
                </p>
              </div>
            </div>

            <div className="about-image">
              <Image
                src="/assets/about.jpg"
                alt="Newton Computer"
                width={600}
                height={450}
                className="about-img"
              />
              <div className="about-badges">
                <span>Since 2010</span>
                <span>Thoraipakkam & T. Nagar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - How We Serve */}
      <div className="about-services-section">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="about-title">How We Serve Diverse Needs?</h2>
              <p className="about-lead">
                Our customer-centric approach ensures we cater to various computing demands:
              </p>

              <div className="about-needs">
                <div className="about-need">
                  <div className="about-need-icon">
                    <FaBriefcase />
                  </div>
                  <h3 className="about-need-title">Business Solutions</h3>
                  <p className="about-need-text">Efficient laptops for corporate and government projects.</p>
                </div>

                <div className="about-need">
                  <div className="about-need-icon">
                    <FaUsers />
                  </div>
                  <h3 className="about-need-title">Student-Friendly Devices</h3>
                  <p className="about-need-text">Affordable and feature-rich options for academic excellence.</p>
                </div>

                <div className="about-need">
                  <div className="about-need-icon">
                    <FaProjectDiagram />
                  </div>
                  <h3 className="about-need-title">High-Performance Machines</h3>
                  <p className="about-need-text">Gaming and creative workstations for demanding applications.</p>
                </div>
              </div>

              <div className="about-expertise">
                <p className="about-expertise-text">
                  With <strong>3,000+ completed projects</strong>, we have the expertise to 
                  handle both large-scale orders and individual purchases.
                </p>
              </div>

              <div className="about-pricing">
                <h3 className="about-subtitle">Competitive Pricing and Exclusive Offers</h3>
                <p className="about-text">
                  We believe in making premium devices accessible. Our pricing is competitive, 
                  with regular discounts and special deals to provide maximum value for your investment.
                </p>
              </div>
            </div>

            <div className="about-image">
              <Image
                src="/assets/about-section-2.png"
                alt="Our Services"
                width={500}
                height={600}
                className="about-img"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Third Section - Why Choose Newton Computer */}
      <div className="about-why-section">
        <div className="about-container">
          <div className="about-section-header">
            <span className="about-section-tag">Why Choose Us</span>
            <h2 className="about-section-title">Why Choose Newton Computer?</h2>
            <p className="about-section-intro">
              Discover the unique advantages that make us the preferred choice for thousands of customers
            </p>
          </div>

          <div className="about-why-grid">
            <div className="about-features">
              {thirdSectionFeatures.map((feature, index) => (
                <div key={index} className="about-feature">
                  <div className="about-feature-icon">
                    <feature.icon />
                  </div>
                  <div className="about-feature-content">
                    <h3 className="about-feature-title">{feature.title}</h3>
                    <p className="about-feature-text">{feature.description}</p>
                  </div>
                  <div className="about-feature-number">{index + 1}</div>
                </div>
              ))}
            </div>

            <div className="about-image">
              <div className="about-image-wrapper">
                <Image
                  src="/assets/why-choose-us.png"
                  alt="Why Choose Newton Computer"
                  width={550}
                  height={650}
                  className="about-img"
                />
              </div>
            </div>
          </div>

          <div className="about-cta">
            <div className="about-cta-content">
              <h3 className="about-cta-title">Experience Excellence Firsthand</h3>
              <p className="about-cta-text">
                Our knowledgeable and friendly team is always ready to assist you in selecting 
                a device that fits your unique requirements. From competitive pricing to a welcoming 
                atmosphere, Newton Computer is your go-to destination for exceptional products 
                and outstanding service.
              </p>
              <div className="about-locations">
                <div className="about-location">
                  <FaMapMarkerAlt />
                  <span>Thoraipakkam</span>
                </div>
                <div className="about-location">
                  <FaMapMarkerAlt />
                  <span>T. Nagar</span>
                </div>
              </div>
              <p className="about-visit-text">
                Visit us today and experience why Newton Computer is the preferred choice 
                for thousands of customers across India!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}