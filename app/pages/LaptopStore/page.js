"use client";
import { Suspense } from 'react';
import LaptopStoreContent from './LaptopStoreContent';

export default function LaptopStorePage() {
  return (
    <Suspense fallback={
      <div className="laptop-store-loading">
        <div className="loading-spinner"></div>
        <p>Loading store...</p>
      </div>
    }>
      <LaptopStoreContent />
    </Suspense>
  );
}