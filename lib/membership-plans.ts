export type BillingCycle = "monthly" | "quarterly" | "yearly";

export interface MembershipPlan {
  id: string;
  name: string;
  price: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  deposit: number;
  booksAtOneTime: string;
  monthlyLimit: string;
  description: string;
  isPopular?: boolean;
  features: string[];
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: "sponsored",
    name: "Sponsored Reader",
    price: { monthly: 0, quarterly: 0, yearly: 0 },
    deposit: 0,
    booksAtOneTime: "1-2",
    monthlyLimit: "2-4",
    description: "Supported by sponsors to ensure every child has access to books.",
    features: [
      "1-2 books at a time",
      "2-4 books monthly limit",
      "No security deposit required",
      "Access to all kids & learning genres",
      "Self-pickup or free delivery",
    ],
  },
  {
    id: "basic",
    name: "Basic Reader",
    price: { monthly: 99, quarterly: 279, yearly: 999 },
    deposit: 399,
    booksAtOneTime: "2",
    monthlyLimit: "4",
    description: "Great for individual readers starting their reading habit.",
    features: [
      "2 books at a time",
      "4 books monthly limit",
      "Refundable deposit of ₹399",
      "Access to full general catalog",
      "Standard delivery options",
    ],
  },
  {
    id: "sibling",
    name: "Sibling Plan",
    price: { monthly: 179, quarterly: 499, yearly: 1799 },
    deposit: 699,
    booksAtOneTime: "4",
    monthlyLimit: "8",
    description: "Ideal for two children or siblings reading together.",
    features: [
      "4 books at a time",
      "8 books monthly limit",
      "Refundable deposit of ₹699",
      "Access to full kids & youth catalog",
      "Flexible exchange policy",
    ],
  },
  {
    id: "family",
    name: "Family Reader",
    price: { monthly: 299, quarterly: 849, yearly: 2999 },
    deposit: 999,
    booksAtOneTime: "6",
    monthlyLimit: "12",
    description: "Perfect for families with diverse reading interests.",
    isPopular: true,
    features: [
      "6 books at a time",
      "12 books monthly limit",
      "Refundable deposit of ₹999",
      "Access to all categories and genres",
      "Priority reservations & holds",
      "Ideal for parents + kids reading",
    ],
  },
  {
    id: "more-books",
    name: "More Books Plan",
    price: { monthly: 399, quarterly: 1099, yearly: 3999 },
    deposit: 1299,
    booksAtOneTime: "4",
    monthlyLimit: "16",
    description: "For high-frequency readers who read and return quickly.",
    features: [
      "4 books at a time",
      "16 books monthly limit",
      "Refundable deposit of ₹1,299",
      "Access to full library catalog",
      "Accelerated return & pick options",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited Exchange Plan",
    price: { monthly: 599, quarterly: 1699, yearly: 5999 },
    deposit: 1999,
    booksAtOneTime: "5",
    monthlyLimit: "Unlimited exchanges after returns",
    description: "The ultimate plan for voracious readers who finish books in days.",
    features: [
      "5 books at a time",
      "Unlimited exchanges (no monthly cap)",
      "Refundable deposit of ₹1,999",
      "Access to all premium & new releases",
      "Zero reading restrictions",
    ],
  },
];

export function getMembershipPlan(planId?: string | null) {
  return membershipPlans.find((plan) => plan.id === planId) ?? membershipPlans[3];
}

export function getCycleLabel(cycle: BillingCycle) {
  switch (cycle) {
    case "monthly":
      return "Month";
    case "quarterly":
      return "Quarter";
    case "yearly":
      return "Year";
  }
}

export function getPlanTotal(plan: MembershipPlan, cycle: BillingCycle) {
  return plan.price[cycle] + plan.deposit;
}

export function calculateSavingsPercent(
  plan: MembershipPlan,
  selectedCycle: BillingCycle
) {
  if (selectedCycle === "monthly" || plan.price.monthly === 0) return 0;
  const monthlyCost = plan.price.monthly;
  if (selectedCycle === "quarterly") {
    const qtrMonthlyEquivalent = plan.price.quarterly / 3;
    return Math.round(((monthlyCost - qtrMonthlyEquivalent) / monthlyCost) * 100);
  }
  const yrMonthlyEquivalent = plan.price.yearly / 12;
  return Math.round(((monthlyCost - yrMonthlyEquivalent) / monthlyCost) * 100);
}
