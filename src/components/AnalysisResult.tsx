"use client";

import React from "react";
import { AnalysisResult } from "@/types";

interface AnalysisStageProps {
  result: AnalysisResult;
  onNext: () => void;
}

const AnalysisStage: React.FC<AnalysisStageProps> = ({ result, onNext }) => {
  return (
    <div className="analysis-stage animate-fade-in">
      <div className="container">
        <div className="glass-card result-card">
          <div className="result-header">
            <span className={`severity-badge ${result.severity.toLowerCase()}`}>
              {result.severity}
            </span >
            <h2>🔍 Evaluation Results</h2>
          </div>

          <p className="severity-reason">{result.severityReason}</p>

          <div className="conditions-list">
            <h3>Possible Condition(s):</h3>
            {result.conditions.map((condition, idx) => (
              <div key={idx} className="condition-item">
                <div className="condition-name">
                  <h4>{condition.name}</h4>
                  <span className="condition-sources">
                    Sources: {condition.sources.join(", ")}
                  </span>
                </div>
                
                <div className="condition-details">
                  <div className="detail-section">
                    <strong>📋 Key Indicators:</strong>
                    <ul>
                      {condition.indicators.map((indicator, i) => (
                        <li key={i}>{indicator}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="detail-section">
                    <strong>🧬 Common Causes:</strong>
                    <p>{condition.causes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="next-btn" onClick={onNext}>
            View Recommended Treatment Plan 💊
          </button>
        </div>
      </div>

      <style jsx>{`
        .analysis-stage {
          padding: 40px 0;
        }
        .result-card {
          padding: 40px;
          border-left: 8px solid var(--primary);
        }
        .result-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }
        .severity-badge {
          padding: 4px 12px;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
        }
        .severity-badge.mild { background: #d1fae5; color: #065f46; }
        .severity-badge.moderate { background: #fef3c7; color: #92400e; }
        .severity-badge.potentially serious { background: #fee2e2; color: #991b1b; }

        .severity-reason {
          background: #f8fafc;
          padding: 16px;
          border-radius: var(--radius-md);
          margin-bottom: 30px;
          color: var(--text-muted);
          line-height: 1.6;
        }

        h2 { font-size: 1.8rem; }
        h3 { margin-bottom: 20px; font-size: 1.4rem; color: var(--primary); }

        .condition-item {
          background: white;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          margin-bottom: 24px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .condition-name {
          background: var(--primary-light);
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .condition-name h4 { font-size: 1.25rem; }
        .condition-sources { font-size: 12px; color: var(--text-muted); font-style: italic; }

        .condition-details { padding: 24px; }
        .detail-section { margin-bottom: 16px; }
        .detail-section strong { display: block; margin-bottom: 8px; color: var(--text-main); }
        .detail-section ul { padding-left: 20px; color: var(--text-muted); }
        .detail-section p { color: var(--text-muted); }

        .next-btn {
          width: 100%;
          background: var(--primary);
          color: white;
          border: none;
          padding: 18px;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: var(--transition);
          margin-top: 20px;
        }
        .next-btn:hover { background: var(--primary-hover); }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AnalysisStage;
