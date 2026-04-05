"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import AnalysisResultComp from "@/components/AnalysisResult";
import MedicationCard from "@/components/MedicationCard";
import PriceComparison from "@/components/PriceComparison";
import { analyzeSkin, getMedications, findMarketProducts } from "@/lib/engine";
import { AnalysisResult, Medication, ProductInfo } from "@/types";

type Stage = "UPLOAD" | "RESULTS" | "MEDS" | "FINDER";

export default function Home() {
  const [stage, setStage] = useState<Stage>("UPLOAD");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [meds, setMeds] = useState<Medication[]>([]);
  const [products, setProducts] = useState<ProductInfo[]>([]);

  const handleAnalyze = async (data: { image: File | null; text: string }) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeSkin(data.text, data.image);
      setAnalysis(result);
      setStage("RESULTS");
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Something went wrong during analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGoToMeds = () => {
    if (analysis && analysis.conditions.length > 0) {
      // Aggregate treatments for ALL detected conditions
      const allMeds = analysis.conditions.flatMap(condition => getMedications(condition.name));
      // Filter for unique medications by name
      const uniqueMeds = Array.from(new Map(allMeds.map(m => [m.name, m])).values());
      
      setMeds(uniqueMeds);
      setStage("MEDS");
    }
  };

  const handleGoToFinder = () => {
    if (meds.length > 0) {
      // Aggregating product availability for ALL recommended medications
      const allProducts = meds.flatMap(med => findMarketProducts(med.name));
      // Filter for unique products (best price per platform/medication)
      const uniqueProducts = Array.from(new Map(allProducts.map(p => [p.name + p.platform, p])).values());
      
      setProducts(uniqueProducts);
      setStage("FINDER");
    }
  };

  const handleReset = () => {
    setStage("UPLOAD");
    setAnalysis(null);
    setMeds([]);
    setProducts([]);
  };

  const steps = [
    { id: "UPLOAD", label: "Analysis" },
    { id: "RESULTS", label: "Results" },
    { id: "MEDS", label: "Treatment" },
    { id: "FINDER", label: "Pharmacy" }
  ];

  return (
    <div className="page-wrapper">
      <nav className="stage-nav">
        <div className="container nav-content">
          <div className="logo">DermIndia AI</div>
          <div className="steps-indicator">
            {steps.map((step, idx) => (
              <div key={idx} className={`step-item ${stage === step.id ? "active" : ""} ${steps.findIndex(s => s.id === stage) > idx ? "completed" : ""}`}>
                <span className="step-num">{idx + 1}</span>
                <span className="step-label">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {stage === "UPLOAD" && (
        <Hero onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      )}

      {stage === "RESULTS" && analysis && (
        <AnalysisResultComp result={analysis} onNext={handleGoToMeds} />
      )}

      {stage === "MEDS" && meds.length > 0 && (
        <MedicationCard medications={meds} onNext={handleGoToFinder} />
      )}

      {stage === "FINDER" && products.length > 0 && (
        <PriceComparison products={products} onReset={handleReset} />
      )}

      <style jsx>{`
        .page-wrapper {
          min-height: calc(100vh - 100px);
          display: flex;
          flex-direction: column;
        }
        .stage-nav {
          padding: 20px 0;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-family: var(--font-outfit);
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--primary);
        }
        .steps-indicator {
          display: flex;
          gap: 24px;
        }
        .step-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          position: relative;
        }
        .step-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }
        .step-label {
          font-size: 14px;
          font-weight: 500;
        }

        .step-item.active { color: var(--primary); }
        .step-item.active .step-num { border-color: var(--primary); background: var(--primary); color: white; }
        
        .step-item.completed { color: #10b981; }
        .step-item.completed .step-num { border-color: #10b981; background: #10b981; color: white; }

        @media (max-width: 600px) {
          .step-label { display: none; }
          .logo { font-size: 1.2rem; }
        }
      `}</style>
    </div>
  );
}
