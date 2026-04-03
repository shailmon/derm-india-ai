"use client";

import React from "react";
import { ProductInfo } from "@/types";

interface FinderStageProps {
  products: ProductInfo[];
  onReset: () => void;
}

const FinderStage: React.FC<FinderStageProps> = ({ products, onReset }) => {
  const sortedProducts = [...products].sort((a, b) => b.efficacy - a.efficacy);
  const topPick = sortedProducts[0];
  const others = sortedProducts.slice(1);

  return (
    <div className="finder-stage animate-fade-in">
      <div className="container">
        <div className="glass-card finder-card">
          <div className="finder-header">
            <h2>🛒 Pharmacy & E-commerce Finder</h2>
            <p className="subtitle">Real-time comparison across Indian platforms</p>
          </div>

          <div className="top-recommendation">
            <div className="top-badge">🏆 TOP RECOMMENDATION</div>
            <div className="product-main">
              <div className="product-info">
                <h3>{topPick.name}</h3>
                <div className="score-badge">Efficacy Score: {topPick.efficacy}/10</div>
                <div className="rating">⭐ {topPick.rating}/5 ({topPick.reviews} reviews)</div>
              </div>
              <div className="price-platform">
                <div className="price">₹{topPick.price}</div>
                <div className="platform">on {topPick.platform}</div>
              </div>
            </div>
            
            <div className="product-tags">
              {topPick.isDoctorEndorsed && <span className="tag doctor">✅ Doctor Endorsed</span>}
              <span className="tag verified">🛡️ Verified Sourcing</span>
            </div>

            <a href={topPick.link} target="_blank" rel="noopener noreferrer" className="buy-btn">
              Buy Now on {topPick.platform}
            </a>
          </div>

          <div className="other-options">
            <h4>Other Verified Options:</h4>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Platform</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {others.map((product, idx) => (
                  <tr key={idx}>
                    <td><strong>{product.name}</strong></td>
                    <td>{product.platform}</td>
                    <td className="price-cell">₹{product.price}</td>
                    <td>⭐ {product.rating}</td>
                    <td>
                      <a href={product.link} target="_blank" rel="noopener noreferrer" className="small-buy-btn">
                        Buy
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="disclaimer-note">
            <p>🛒 Product links and prices are based on generalized Indian market data. Always check for current discounts and verified sellers on the destination platform. Ensure you have a valid prescription for Rx-only medications.</p>
          </div>

          <button className="reset-btn" onClick={onReset}>
            Start New Sequential Analysis 🔄
          </button>
        </div>
      </div>

      <style jsx>{`
        .finder-stage { padding: 40px 0; }
        .finder-card { padding: 40px; border-left: 8px solid #10b981; }
        .finder-header { margin-bottom: 30px; }
        .finder-header h2 { font-size: 1.8rem; color: #10b981; }
        
        .top-recommendation { background: linear-gradient(135deg, white, #f0fdf4); border: 2px solid #bbf7d0; border-radius: var(--radius-md); padding: 30px; margin-bottom: 40px; position: relative; }
        .top-badge { position: absolute; top: -12px; left: 20px; background: #fbbf24; color: #78350f; font-size: 12px; font-weight: 800; padding: 4px 12px; border-radius: var(--radius-sm); }
        
        .product-main { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .product-info h3 { font-size: 1.6rem; color: var(--text-main); margin-bottom: 4px; }
        .score-badge { display: inline-block; background: var(--primary-light); color: var(--primary); padding: 4px 10px; border-radius: 4px; font-size: 14px; font-weight: 700; margin-bottom: 8px; }
        .rating { font-size: 14px; color: var(--text-muted); }
        
        .price-platform { text-align: right; }
        .price { font-size: 2rem; font-weight: 700; color: #10b981; }
        .platform { font-size: 14px; color: var(--text-muted); }

        .product-tags { display: flex; gap: 12px; margin-bottom: 24px; }
        .tag { font-size: 13px; font-weight: 600; padding: 6px 12px; border-radius: 20px; }
        .tag.doctor { background: #e0f2fe; color: #075985; }
        .tag.verified { background: #f1f5f9; color: #475569; }

        .buy-btn { display: block; width: 100%; height: 50px; background: #10b981; color: white; border: none; padding: 12px; border-radius: var(--radius-md); text-align: center; text-decoration: none; font-weight: 700; transition: var(--transition); display: flex; align-items: center; justify-content: center; }
        .buy-btn:hover { background: #059669; transform: translateY(-2px); }

        .other-options { margin-bottom: 40px; }
        .other-options h4 { margin-bottom: 20px; color: var(--text-muted); }
        table { width: 100%; border-collapse: collapse; overflow: hidden; border-radius: 12px; }
        th { text-align: left; background: #f8fafc; padding: 16px; font-size: 14px; color: #64748b; font-weight: 600; }
        td { border-top: 1px solid #f1f5f9; padding: 16px; font-size: 14px; background: white; }
        .price-cell { font-weight: 700; color: #10b981; }
        .small-buy-btn { background: #f1f5f9; color: var(--text-main); font-size: 12px; font-weight: 700; text-decoration: none; padding: 6px 16px; border-radius: 6px; }
        .small-buy-btn:hover { background: var(--primary-light); color: var(--primary); }

        .disclaimer-note { background: #f1f5f9; padding: 20px; border-radius: 12px; margin-bottom: 30px; font-size: 13px; color: #64748b; line-height: 1.5; }

        .reset-btn { width: 100%; border: 2px solid var(--primary); background: transparent; color: var(--primary); padding: 16px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; transition: var(--transition); }
        .reset-btn:hover { background: var(--primary-light); }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default FinderStage;
