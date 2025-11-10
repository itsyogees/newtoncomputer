"use client";
import React from 'react';
import './CommonBanner.scss';

const CommonBanner = ({ title, subtitle, backgroundImage = '/assets/laptop-banner.jpg' }) => {
  return (
    <section 
      className="common-banner"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${backgroundImage}') center/cover no-repeat`
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">{title}</h1>
        {/* {subtitle && <p className="banner-subtitle">{subtitle}</p>} */}
      </div>
    </section>
  );
};

export default CommonBanner;