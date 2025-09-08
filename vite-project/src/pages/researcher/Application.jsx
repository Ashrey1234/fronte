import React from 'react';

import './Application.css';

const Application = ({ application, onEdit, onDelete, onViewDetails, showActions = true }) => {
  if (!application) {
    return <div className="application-not-found">Application not found</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusClass = (status) => {
    return `application-status ${status.toLowerCase()}`;
  };

  return (
    <div className="application-card">
      <div className="application-header">
        <h3 className="application-title">{application.title}</h3>
        <span className={getStatusClass(application.status)}>
          {application.status}
        </span>
      </div>

      <div className="application-details">
        <div className="detail-row">
          <span className="detail-label">Category:</span>
          <span className="detail-value">{application.category || 'N/A'}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Researcher:</span>
          <span className="detail-value">
            {application.researcher_details?.username || 'Unknown'}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Duration:</span>
          <span className="detail-value">
            {formatDate(application.start_date)} - {formatDate(application.end_date)}
          </span>
        </div>

        {application.officer_feedback && (
          <div className="detail-row">
            <span className="detail-label">Officer Feedback:</span>
            <span className="detail-value feedback-text">
              {application.officer_feedback}
            </span>
          </div>
        )}

        <div className="detail-row">
          <span className="detail-label">Submitted:</span>
          <span className="detail-value">
            {application.submitted ? 'Yes' : 'No'}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Important:</span>
          <span className="detail-value">
            {application.important ? 'Yes' : 'No'}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Last Updated:</span>
          <span className="detail-value">
            {formatDate(application.updated_at)}
          </span>
        </div>

        {application.submitted_at && (
          <div className="detail-row">
            <span className="detail-label">Submitted At:</span>
            <span className="detail-value">
              {formatDate(application.submitted_at)}
            </span>
          </div>
        )}
      </div>

      {showActions && (
        <div className="application-actions">
          {onViewDetails && (
            <button 
              className="btn btn-info"
              onClick={() => onViewDetails(application.id)}
            >
              View Details
            </button>
          )}
          
          {application.status === 'Draft' && onEdit && (
            <button 
              className="btn btn-warning"
              onClick={() => onEdit(application.id)}
            >
              Edit
            </button>
          )}
          
          {application.status === 'Draft' && onDelete && (
            <button 
              className="btn btn-danger"
              onClick={() => onDelete(application.id)}
            >
              Delete
            </button>
          )}
          
          {application.status === 'Pending' && (
            <span className="pending-notice">
              Under Review
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Application;