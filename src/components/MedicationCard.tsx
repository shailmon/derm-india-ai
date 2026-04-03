"use client";

import React from "react";
import { Medication } from "@/types";

interface MedicationStageProps {
  medications: Medication[];
  onNext: () => void;
}

const MedicationStage: React.FC<MedicationStageProps> = ({ medications, onNext }) => {
  return (
    <div className="medication-stage animate-fade-in">
      <div className="container">
        <div className="glass-card medication-card">
          <div className="med-header">
            <h2>💊 Recommended Treatment Plans</h2>
            <p className="subtitle">Specific to the Indian Subcontinent Market</p>
          </div>

          <div className="med-list">
            {medications.map((med, idx) => (
              <div key={idx} className="med-item">
                <div className="med-title">
                  <div className="med-main">
                    <h4>{med.name}</h4>
                    <span className={`badge ${med.isOTC ? "otc" : "rx"}`}>
                      {med.isOTC ? "OTC (Over the Counter)" : "Rx (Prescription Only)"}
                    </span>
                  </div>
                  <p className="brands">Common Brands: {med.brands.join(", ")}</p>
                </div>

                <div className="med-grid">
                  <div className="info-box">
                    <strong>Type & Mode:</strong>
                    <span>{med.type}</span>
                  </div>
                  <div className="info-box">
                    <strong>Mechanism:</strong>
                    <span>{med.why}</span>
                  </div>
                  <div className="info-box">
                    <strong>Dosage:</strong>
                    <span>{med.dose}</span>
                  </div>
                  <div className="info-box">
                    <strong>Schedule:</strong>
                    <span>{med.when}</span>
                  </div>
                </div>

                <div className="duration-box">
                  <strong>Expected Duration:</strong>
                  <span>{med.duration}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="safety-warning">
            <strong>⚠️ Safety Note:</strong>
            <p>Combination steroid creams (like Candid B, Betnovate-N) are widely available in India but should NOT be used long-term or on the face without medical guidance—risk of skin thinning.</p>
          </div>

          <button className="next-btn" onClick={onNext}>
            Check Availability & Best Prices 🛒
          </button>
        </div>
      </div>

      <style jsx>{`
        .medication-stage { padding: 40px 0; }
        .medication-card { padding: 40px; border-left: 8px solid var(--accent); }
        .med-header { margin-bottom: 30px; }
        .med-header h2 { font-size: 1.8rem; color: var(--primary); }
        .subtitle { color: var(--text-muted); }

        .med-list { display: flex; flex-direction: column; gap: 24px; }
        .med-item { background: white; border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 24px; }
        
        .med-title { margin-bottom: 20px; }
        .med-main { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .med-main h4 { font-size: 1.4rem; color: var(--text-main); }
        
        .badge { padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
        .badge.otc { background: #dcfce7; color: #166534; }
        .badge.rx { background: #fef2f2; color: #991b1b; }

        .brands { font-size: 14px; color: var(--primary); font-weight: 500; }

        .med-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .info-box { display: flex; flex-direction: column; gap: 4px; }
        .info-box strong { font-size: 12px; color: var(--text-muted); text-transform: uppercase; }
        .info-box span { font-size: 14px; color: var(--text-main); font-weight: 500; }

        .duration-box { background: var(--primary-light); padding: 12px; border-radius: 8px; border: 1px solid var(--glass-border); text-align: center; }
        .duration-box strong { font-size: 14px; margin-right: 8px; }
        .duration-box span { font-size: 14px; font-weight: 700; color: var(--primary); }

        .safety-warning { background: #fffbeb; border: 1px solid #fef3c7; padding: 20px; border-radius: 12px; margin: 30px 0; }
        .safety-warning strong { color: #92400e; display: block; margin-bottom: 4px; }
        .safety-warning p { font-size: 14px; color: #92400e; line-height: 1.5; }

        .next-btn { width: 100%; background: var(--primary); color: white; border: none; padding: 18px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; transition: var(--transition); }
        .next-btn:hover { background: var(--primary-hover); transform: scale(1.02); }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default MedicationStage;
