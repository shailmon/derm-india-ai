export type Severity = "Mild" | "Moderate" | "Potentially Serious";

export interface Condition {
  name: string;
  sources: string[];
  indicators: string[];
  causes: string;
}

export interface AnalysisResult {
  conditions: Condition[];
  severity: Severity;
  severityReason: string;
}

export interface Medication {
  name: string;
  brands: string[];
  type: string;
  why: string;
  dose: string;
  when: string;
  duration: string;
  isOTC: boolean;
}

export interface ProductInfo {
  name: string;
  price: string;
  platform: string;
  link: string;
  rating: number;
  reviews: number;
  efficacy: number;
  isDoctorEndorsed: boolean;
}
