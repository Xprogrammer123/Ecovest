export interface Investment {
  _id: string;
  projectName: string;
  amount: number;
  currentValue: number;
  expectedReturn: number;
  riskLevel: string;
  createdAt: string;
}
