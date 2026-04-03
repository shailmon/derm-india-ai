"use client";

import React, { useState, useRef } from "react";

interface HeroProps {
  onAnalyze: (data: { image: File | null; text: string }) => void;
  isAnalyzing: boolean;
}

const Hero: React.FC<HeroProps> = ({ onAnalyze, isAnalyzing }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text && !image) return;
    onAnalyze({ image, text });
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>DermIndia AI</h1>
          <p className="hero-subtitle">Advanced Analysis & Medication Finder specifically for the Indian Subcontinent.</p>
          
          <div className="glass-card hero-card">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Skin Condition Image</label>
                <div 
                  className={`upload-zone ${isAnalyzing ? "scanning-animation" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <span className="icon">📸</span>
                      <p>Click to upload or drag & drop skin photo</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    accept="image/*" 
                    hidden 
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Describe your symptoms</label>
                <textarea 
                  placeholder="e.g., 'I have itchy red patches on my lower legs that appeared 2 days ago after gardening...'" 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  disabled={isAnalyzing}
                />
              </div>

              <button 
                type="submit" 
                className={`analyze-btn ${isAnalyzing ? "loading" : ""}`}
                disabled={isAnalyzing || (!text && !image)}
              >
                {isAnalyzing ? "Analyzing Skin..." : "Analyze My Skin"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          padding: 80px 0;
          background: radial-gradient(circle at 50% -20%, var(--primary-light), transparent);
        }
        .hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          color: var(--primary);
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 3rem;
        }
        .hero-card {
          padding: 40px;
          text-align: left;
        }
        .input-group {
          margin-bottom: 24px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: var(--primary);
        }
        .upload-zone {
          height: 300px;
          border: 2px dashed var(--glass-border);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.5);
          transition: var(--transition);
        }
        .upload-zone:hover {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.8);
        }
        .image-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .upload-placeholder {
          text-align: center;
          color: var(--text-muted);
        }
        .icon {
          font-size: 2rem;
          margin-bottom: 8px;
          display: block;
        }
        textarea {
          width: 100%;
          height: 120px;
          padding: 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
          font-family: var(--font-inter);
          resize: none;
          background: rgba(255, 255, 255, 0.5);
        }
        textarea:focus {
          outline: none;
          border-color: var(--primary);
        }
        .analyze-btn {
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
        }
        .analyze-btn:hover {
          background: var(--primary-hover);
          transform: translateY(-2px);
        }
        .analyze-btn:disabled {
          background: var(--text-muted);
          cursor: not-allowed;
          transform: none;
        }
        .analyze-btn.loading {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
