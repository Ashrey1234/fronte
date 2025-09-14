// src/components/StatsCards.jsx
import React from "react";
import "./StatsCards.css";

const StatsCards = ({ stats }) => {
  // Document Icon SVG
  const DocumentIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Clock Icon SVG
  const ClockIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Check Circle Icon SVG
  const CheckCircleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // X Circle Icon SVG
  const XCircleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="stats-section">
      
      <h2 className="stats-title">Application Statistics</h2>
       {/* <h2 className="stats-title">Application Statistics</h2> */}
       
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">
            <DocumentIcon />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.total || 0}</h3>
            <p className="stat-label">Total Applications</p>
          </div>
        </div>
        
        <div className="stat-card pending">
          <div className="stat-icon">
            <ClockIcon />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.pending || 0}</h3>
            <p className="stat-label">Pending Applications</p>
          </div>
        </div>
        
        <div className="stat-card approved">
          <div className="stat-icon">
            <CheckCircleIcon />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.approved || 0}</h3>
            <p className="stat-label">Approved Applications</p>
          </div>
        </div>
        
        <div className="stat-card rejected">
          <div className="stat-icon">
            <XCircleIcon />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.rejected || 0}</h3>
            <p className="stat-label">Rejected Applications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
















