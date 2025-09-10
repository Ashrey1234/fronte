
// src/pages/researcher/TemplatesSection.jsx
import React from "react";
import "./TemplatesSection.css";

const TemplatesSection = () => {
  const templates = [
    {
      title: "Research Fee Structure",
      pdf: "http://localhost:8000/api/document/research-fee-structure/",
      description: "Taasisi ya ZAFIRI: Hii ni form ya kuonyesha pesa utakazo lipa wakati wa kufanya utafiti. Upload pdf hii ikiwa ni rasmi kutoka taasisi."
    },
    {
      title: "Zafiri Report Format",
      pdf: "http://localhost:8000/api/document/zafiri-report-format/",
      description: "Taasisi ya ZAFIRI: Hii ni mwongozo wa kuripoti matokeo yako ya research. Upload pdf yenye format hii pekee."
    },
    {
      title: "Research Form",
      pdf: "http://localhost:8000/api/document/research-form/",
      description: "Taasisi ya ZAFIRI: Hii ni fomu ya maombi ya ruhusa ya kufanya research. Hakikisha umekamilisha maelezo yako kabla ya ku-upload pdf."
    },
    {
      title: "Research Proposal",
      pdf: "http://localhost:8000/api/document/research-proposal/",
      description: "Taasisi ya ZAFIRI: Hii ni proposal yako ya research. Upload pdf yenye muhtasari wa mpango wako wa utafiti."
    },
  ];

  // PDF Icon SVG
  const PdfIcon = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 9H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 9H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 5V7H15V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Download Icon SVG
  const DownloadIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="templates-section">
      <h2 className="section-title">Templates Section</h2>
      <div className="templates-grid">
        {templates.map((item, index) => (
          <div key={index} className="template-card">
            <h3 className="template-title">{item.title}</h3>
            <p className="template-description">{item.description}</p>
            <div className="buttons">
              <a href={item.pdf} target="_blank" rel="noopener noreferrer" className="btn pdf">
                <span className="icon-wrapper">
                  <PdfIcon />
                  <DownloadIcon />
                </span>
                Download PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesSection;