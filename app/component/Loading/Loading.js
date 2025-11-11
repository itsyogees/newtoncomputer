// app/components/Loading/Loading.jsx
"use client";
import './Loading.scss';

const Loading = ({ 
  size = 'medium', 
  type = 'spinner',
  text = 'Loading...',
  fullScreen = false 
}) => {
  return (
    <div className={`loading-container ${fullScreen ? 'full-screen' : ''}`}>
      <div className={`loading-content ${size} ${type}`}>
        {type === 'spinner' && <SpinnerLoader size={size} />}
        {type === 'dots' && <DotsLoader size={size} />}
        {type === 'pulse' && <PulseLoader size={size} />}
        {type === 'skeleton' && <SkeletonLoader size={size} />}
        
        {text && <p className="loading-text">{text}</p>}
      </div>
    </div>
  );
};

// Spinner Loader Variant
const SpinnerLoader = ({ size }) => (
  <div className="spinner-loader">
    <div className="spinner"></div>
  </div>
);

// Dots Loader Variant
const DotsLoader = ({ size }) => (
  <div className="dots-loader">
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
  </div>
);

// Pulse Loader Variant
const PulseLoader = ({ size }) => (
  <div className="pulse-loader"></div>
);

// Skeleton Loader Variant
const SkeletonLoader = ({ size }) => (
  <div className="skeleton-loader">
    <div className="skeleton-line skeleton-line--1"></div>
    <div className="skeleton-line skeleton-line--2"></div>
    <div className="skeleton-line skeleton-line--3"></div>
  </div>
);

export default Loading;