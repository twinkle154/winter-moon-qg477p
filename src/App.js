import React, { useState, useMemo } from "react";
import {
  Zap,
  Maximize2,
  Layers,
  DollarSign,
  Lightbulb,
  TrendingUp,
  ThumbsUp,
  CheckCircle,
  Target,
  Factory,
  Clock,
} from "lucide-react";

/* --- 1. Master Product Management Data Structure --- */
// Contains comprehensive data for all 3 brands across 3 categories.
const PM_DATA = {
  // Category 1: Interior Premium Emulsion
  "Interior Premium Emulsion": {
    "Asian Paints": {
      "Price per litre": 650,
      "Coverage (sq ft/L)": 180,
      "Drying time (Hrs)": 4,
      "Durability (1-10)": 9,
      Washability: "High",
      "VOC level": "Low",
      "Weather resistance rating": "N/A",
      "Recoat frequency (Yrs)": 5,
      "Target customer segment": "Luxury Home Owners",
      "Perceived quality score": 9.5,
      "Brand trust score": 9.8,
      "Value-for-money score": 8.0,
      "Profit margin category": "High",
      "Distribution strength index": 9.9,
      "Retail availability score": 9.9,
      "Digital presence score": 9.5,
      "Market share (%)": 40,
      "Eco-friendly certification": "Yes",
      "Packaging innovation score": 9,
    },
    Berger: {
      "Price per litre": 600,
      "Coverage (sq ft/L)": 175,
      "Drying time (Hrs)": 3.5,
      "Durability (1-10)": 8,
      Washability: "High",
      "VOC level": "Low",
      "Weather resistance rating": "N/A",
      "Recoat frequency (Yrs)": 4,
      "Target customer segment": "Mid-to-High Residential",
      "Perceived quality score": 8.5,
      "Brand trust score": 8.5,
      "Value-for-money score": 9.5,
      "Profit margin category": "Medium-High",
      "Distribution strength index": 9.0,
      "Retail availability score": 8.5,
      "Digital presence score": 8.0,
      "Market share (%)": 25,
      "Eco-friendly certification": "Yes",
      "Packaging innovation score": 8,
    },
    Nerolac: {
      "Price per litre": 580,
      "Coverage (sq ft/L)": 170,
      "Drying time (Hrs)": 3,
      "Durability (1-10)": 7,
      Washability: "Medium",
      "VOC level": "Medium",
      "Weather resistance rating": "N/A",
      "Recoat frequency (Yrs)": 3,
      "Target customer segment": "Price-Sensitive Premium",
      "Perceived quality score": 7.5,
      "Brand trust score": 7.8,
      "Value-for-money score": 9.0,
      "Profit margin category": "Medium",
      "Distribution strength index": 8.0,
      "Retail availability score": 7.5,
      "Digital presence score": 7.0,
      "Market share (%)": 15,
      "Eco-friendly certification": "No",
      "Packaging innovation score": 7,
    },
  },
  // Category 2: Exterior Weatherproof
  "Exterior Weatherproof": {
    "Asian Paints": {
      "Price per litre": 750,
      "Coverage (sq ft/L)": 140,
      "Drying time (Hrs)": 6,
      "Durability (1-10)": 10,
      Washability: "High",
      "VOC level": "Low",
      "Weather resistance rating": 10,
      "Recoat frequency (Yrs)": 7,
      "Target customer segment": "Luxury Housing/Tropical Climates",
      "Perceived quality score": 9.8,
      "Brand trust score": 9.9,
      "Value-for-money score": 8.5,
      "Profit margin category": "High",
      "Distribution strength index": 9.9,
      "Retail availability score": 9.9,
      "Digital presence score": 9.5,
      "Market share (%)": 45,
      "Eco-friendly certification": "Yes",
      "Packaging innovation score": 9,
    },
    Berger: {
      "Price per litre": 700,
      "Coverage (sq ft/L)": 135,
      "Drying time (Hrs)": 5,
      "Durability (1-10)": 9,
      Washability: "High",
      "VOC level": "Low",
      "Weather resistance rating": 9,
      "Recoat frequency (Yrs)": 6,
      "Target customer segment": "Standard Housing/High Rainfall",
      "Perceived quality score": 8.8,
      "Brand trust score": 8.9,
      "Value-for-money score": 9.0,
      "Profit margin category": "Medium-High",
      "Distribution strength index": 9.0,
      "Retail availability score": 8.5,
      "Digital presence score": 8.0,
      "Market share (%)": 28,
      "Eco-friendly certification": "Yes",
      "Packaging innovation score": 8,
    },
    Nerolac: {
      "Price per litre": 680,
      "Coverage (sq ft/L)": 130,
      "Drying time (Hrs)": 4.5,
      "Durability (1-10)": 8,
      Washability: "Medium",
      "VOC level": "Medium",
      "Weather resistance rating": 8,
      "Recoat frequency (Yrs)": 5,
      "Target customer segment": "Commercial/Industrial",
      "Perceived quality score": 7.8,
      "Brand trust score": 8.0,
      "Value-for-money score": 8.8,
      "Profit margin category": "Medium",
      "Distribution strength index": 8.0,
      "Retail availability score": 7.5,
      "Digital presence score": 7.0,
      "Market share (%)": 18,
      "Eco-friendly certification": "No",
      "Packaging innovation score": 7,
    },
  },
  // Category 3: Economy/Budget Paint
  "Economy/Budget Paint": {
    "Asian Paints": {
      "Price per litre": 300,
      "Coverage (sq ft/L)": 160,
      "Drying time (Hrs)": 2.5,
      "Durability (1-10)": 6,
      Washability: "Low",
      "VOC level": "Medium",
      "Weather resistance rating": "N/A",
      "Recoat frequency (Yrs)": 1,
      "Target customer segment": "Rental Properties/Rural Markets",
      "Perceived quality score": 7.0,
      "Brand trust score": 9.0,
      "Value-for-money score": 7.5,
      "Profit margin category": "Low",
      "Distribution strength index": 9.9,
      "Retail availability score": 9.9,
      "Digital presence score": 9.5,
      "Market share (%)": 35,
      "Eco-friendly certification": "No",
      "Packaging innovation score": 6,
    },
    Berger: {
      "Price per litre": 280,
      "Coverage (sq ft/L)": 165,
      "Drying time (Hrs)": 2,
      "Durability (1-10)": 7,
      Washability: "Low",
      "VOC level": "Medium",
      "Weather resistance rating": "N/A",
      "Recoat frequency (Yrs)": 1,
      "Target customer segment": "Cost-Conscious Projects",
      "Perceived quality score": 7.5,
      "Brand trust score": 8.0,
      "Value-for-money score": 8.5,
      "Profit margin category": "Low",
      "Distribution strength index": 9.0,
      "Retail availability score": 8.5,
      "Digital presence score": 8.0,
      "Market share (%)": 22,
      "Eco-friendly certification": "No",
      "Packaging innovation score": 7,
    },
    Nerolac: {
      "Price per litre": 250,
      "Coverage (sq ft/L)": 170,
      "Drying time (Hrs)": 1.5,
      "Durability (1-10)": 6,
      Washability: "Low",
      "VOC level": "High",
      "Weather resistance rating": "N/A",
      "Recoat frequency (Yrs)": 1,
      "Target customer segment": "Bulk/Budget Commercial",
      "Perceived quality score": 6.5,
      "Brand trust score": 7.0,
      "Value-for-money score": 9.0,
      "Profit margin category": "Low",
      "Distribution strength index": 8.0,
      "Retail availability score": 7.5,
      "Digital presence score": 7.0,
      "Market share (%)": 10,
      "Eco-friendly certification": "No",
      "Packaging innovation score": 6,
    },
  },
};

/* --- 2. Static Mappings and Constants --- */
const BRANDS = Object.keys(PM_DATA["Interior Premium Emulsion"]);
const CATEGORIES = Object.keys(PM_DATA);

const COMPETITOR_MAP = {
  "Asian Paints": ["Berger", "Nerolac"],
  Berger: ["Asian Paints", "Nerolac"],
  Nerolac: ["Asian Paints", "Berger"],
};

const PARAMETER_GROUPS = [
  {
    title: "Product Performance",
    keys: [
      "Price per litre",
      "Coverage (sq ft/L)",
      "Drying time (Hrs)",
      "Durability (1-10)",
      "Washability",
      "VOC level",
      "Weather resistance rating",
      "Recoat frequency (Yrs)",
    ],
  },
  {
    title: "Market & Customer Metrics",
    keys: [
      "Target customer segment",
      "Perceived quality score",
      "Brand trust score",
      "Value-for-money score",
    ],
  },
  {
    title: "Strategic Business Metrics",
    keys: [
      "Profit margin category",
      "Distribution strength index",
      "Retail availability score",
      "Digital presence score",
      "Market share (%)",
    ],
  },
  {
    title: "Innovation & Sustainability",
    keys: ["Eco-friendly certification", "Packaging innovation score"],
  },
];

/* --- 3. Utility Functions for Comparison and Analysis --- */

/**
 * Generates dynamic PM insights based on current selections.
 */
const generateInsights = (comparisonData, category) => {
  if (!comparisonData || comparisonData.length < 3) return [];

  const brands = comparisonData.map((d) => d.brand);
  const metrics = (key) => comparisonData.map((d) => d.data[key]);

  const findBest = (key, type = "max") => {
    const values = metrics(key).filter((v) => typeof v === "number");
    if (values.length === 0) return { brand: "N/A", value: "N/A" };
    const comparator = type === "max" ? Math.max : Math.min;
    const bestValue = comparator(...values);
    const index = metrics(key).indexOf(bestValue);
    return { brand: brands[index], value: bestValue };
  };

  const lowestPrice = findBest("Price per litre", "min");
  const highestCoverage = findBest("Coverage (sq ft/L)", "max");
  const highestDurability = findBest("Durability (1-10)", "max");
  const bestVFM = findBest("Value-for-money score", "max");
  const marketLeader = findBest("Market share (%)", "max");
  const lowVOCOptions = comparisonData.filter(
    (d) => d.data["VOC level"] === "Low"
  );
  const nonEcoFriendly = comparisonData.filter(
    (d) => d.data["Eco-friendly certification"] === "No"
  );

  const insights = [
    `**Value Leadership:** **${bestVFM.brand}** offers the highest Value-for-money score (${bestVFM.value}/10) in the **${category}** segment.`,
    `**Market Dominance:** **${marketLeader.brand}** maintains a strong lead with a **${marketLeader.value}%** market share, backed by high Distribution and Retail availability scores.`,
    `**Product Excellence:** **${highestDurability.brand}** leads in Durability, achieving a score of **${highestDurability.value}/10**, crucial for product positioning.`,
    `**Cost-Efficiency:** **${lowestPrice.brand}** offers the lowest price per litre ($${lowestPrice.value}) and **${highestCoverage.brand}** offers the best coverage (${highestCoverage.value} sq ft/L).`,
    `**Sustainability Gap:** ${nonEcoFriendly
      .map((d) => d.brand)
      .join(
        " and "
      )} do not currently hold an Eco-friendly certification in this category, representing a potential gap for sustainable market growth.`,
    `**Premium Health Focus:** Only ${lowVOCOptions
      .map((d) => d.brand)
      .join(
        " and "
      )} offer a **Low VOC level**, indicating a strong focus on premium, health-conscious customer segments.`,
  ];

  if (category === "Exterior Weatherproof") {
    const highestWeather = findBest("Weather resistance rating", "max");
    insights.splice(
      2,
      0,
      `**Weather Defense:** **${highestWeather.brand}** offers the highest weather resistance (${highestWeather.value}/10) and longest recoat frequency of ${highestWeather.value} years.`
    );
  }

  return insights;
};

/**
 * Generates rule-based recommendations.
 */
const generateRecommendations = (category, data) => {
  const rules = [];

  // Rule 1: Best for budget customers (Lowest Price, Good Coverage/VFM)
  const budgetBrand = data.reduce((a, b) =>
    a.data["Price per litre"] < b.data["Price per litre"] ? a : b
  );
  rules.push({
    icon: DollarSign,
    title: "Best for Budget Customers",
    brand: budgetBrand.brand,
    reason: `Lowest price per litre (₹${budgetBrand.data["Price per litre"]}) combined with competitive coverage.`,
  });

  // Rule 2: Best for luxury/premium interior walls (Highest Quality/Trust)
  const luxuryBrand = data.reduce((a, b) =>
    a.data["Perceived quality score"] > b.data["Perceived quality score"]
      ? a
      : b
  );
  rules.push({
    icon: ThumbsUp,
    title: "Best for Luxury/Premium Walls",
    brand: luxuryBrand.brand,
    reason: `Highest Perceived Quality Score (${luxuryBrand.data["Perceived quality score"]}/10) and highest Brand Trust.`,
  });

  // Rule 3: Best for long durability (Highest Durability/Recoat Frequency)
  const durabilityKey =
    category === "Exterior Weatherproof"
      ? "Weather resistance rating"
      : "Durability (1-10)";
  const durabilityBrand = data.reduce((a, b) =>
    a.data[durabilityKey] > b.data[durabilityKey] ? a : b
  );
  rules.push({
    icon: CheckCircle,
    title: "Best for Long Durability",
    brand: durabilityBrand.brand,
    reason: `Highest ${durabilityKey} (${durabilityBrand.data[durabilityKey]}/10) and longest Recoat Frequency of ${durabilityBrand.data["Recoat frequency (Yrs)"]} years.`,
  });

  // Rule 4: Best for commercial buildings (Market Share/Distribution)
  const commercialBrand = data.reduce((a, b) =>
    a.data["Distribution strength index"] >
    b.data["Distribution strength index"]
      ? a
      : b
  );
  rules.push({
    icon: Factory,
    title: "Best for Commercial/Industrial Projects",
    brand: commercialBrand.brand,
    reason: `Dominates with the highest Market Share (${commercialBrand.data["Market share (%)"]}%) and Distribution Strength Index.`,
  });

  // Rule 5: Best for quick-dry requirement (Lowest Drying Time)
  const quickDryBrand = data.reduce((a, b) =>
    a.data["Drying time (Hrs)"] < b.data["Drying time (Hrs)"] ? a : b
  );
  rules.push({
    icon: Clock,
    title: "Best for Quick-Dry Requirement",
    brand: quickDryBrand.brand,
    reason: `Fastest Drying Time at only ${quickDryBrand.data["Drying time (Hrs)"]} hours, optimizing project turnaround.`,
  });

  return rules;
};

/* --- 4. React Components --- */

// Helper to format values
const formatValue = (key, value) => {
  if (value === "N/A") return "N/A";
  if (key.includes("Price")) return `₹${value}`;
  if (
    key.includes("score") ||
    key.includes("rating") ||
    key.includes("Durability")
  )
    return `${value}/10`;
  if (key.includes("Market share")) return `${value}%`;
  if (key.includes("Hrs")) return `${value} hrs`;
  if (key.includes("Yrs")) return `${value} yrs`;
  if (key.includes("sq ft/L")) return `${value} sq ft/L`;
  if (value === "Yes")
    return <CheckCircle className="w-5 h-5 text-green-500 inline-block" />;
  if (value === "No")
    return <Zap className="w-5 h-5 text-red-500 inline-block" />;
  return value;
};

// Main App Component
export default function App() {
  const [primaryBrand, setPrimaryBrand] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Auto-fill competitor logic
  const competitors = useMemo(() => {
    if (!primaryBrand || !COMPETITOR_MAP[primaryBrand]) return ["", ""];
    return COMPETITOR_MAP[primaryBrand];
  }, [primaryBrand]);

  const [productB, productC] = competitors;

  // Handles the comparison logic
  const handleCompare = () => {
    setErrorMessage("");
    setResults(null);

    if (!primaryBrand || !category) {
      setErrorMessage(
        "Please select both a Primary Brand and a Product Category."
      );
      return;
    }

    const comparisonBrands = [primaryBrand, productB, productC];

    const comparisonData = comparisonBrands.map((brand) => ({
      brand: brand,
      data: PM_DATA[category][brand],
    }));

    setResults(comparisonData);
  };

  // Memoize the generated content
  const insights = useMemo(() => {
    return results ? generateInsights(results, category) : [];
  }, [results, category]);

  const recommendations = useMemo(() => {
    return results ? generateRecommendations(category, results) : [];
  }, [results, category]);

  // UI Helper for Comparison Table
  const ComparisonTable = ({ data }) => (
    <div className="mt-10 overflow-x-auto">
      <h2 className="text-3xl font-bold mb-4 text-purple-700 border-b pb-2">
        Product Comparison Matrix
      </h2>
      <div className="bg-white rounded-2xl shadow-xl">
        {PARAMETER_GROUPS.map((group, groupIndex) => (
          <div key={group.title} className="mb-6">
            <h3 className="text-xl font-extrabold bg-purple-50 text-purple-900 p-3 sticky top-0 z-10 border-b-2 border-purple-200">
              {group.title}
            </h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Metric</th>
                  {data.map((item) => (
                    <th
                      key={item.brand}
                      className="px-6 py-3 text-center font-bold text-base text-purple-700"
                    >
                      {item.brand}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {group.keys
                  .filter((key) => key in data[0].data)
                  .map((key) => (
                    <tr
                      key={key}
                      className="hover:bg-purple-50 transition duration-100"
                    >
                      <td className="px-6 py-3 whitespace-normal text-sm font-semibold text-gray-700 w-1/4">
                        {key}
                      </td>
                      {data.map((item, index) => (
                        <td
                          key={index}
                          className="px-6 py-3 whitespace-nowrap text-center text-sm"
                        >
                          {formatValue(key, item.data[key])}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );

  // UI Helper for Recommendations
  const RecommendationEngine = ({ recommendations }) => (
    <div className="mt-10 p-6 bg-purple-50 rounded-2xl shadow-inner">
      <h2 className="text-3xl font-bold mb-6 text-purple-700 flex items-center">
        <Lightbulb className="w-7 h-7 mr-3 text-purple-500" /> Recommendation
        Engine
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md border-t-4 border-purple-400"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center">
              <rec.icon className="w-5 h-5 mr-2 text-purple-600" /> {rec.title}
            </h3>
            <p className="text-xl font-extrabold text-purple-900">
              {rec.brand}
            </p>
            <p className="text-sm text-gray-600 mt-2">{rec.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // UI Helper for Insights
  const ProductManagerInsights = ({ insights }) => (
    <div className="mt-10 p-6 bg-yellow-50 rounded-2xl shadow-xl border border-yellow-200">
      <h2 className="text-3xl font-bold mb-4 text-yellow-800 flex items-center">
        <Target className="w-7 h-7 mr-3 text-yellow-600" /> Product Manager
        Insights
      </h2>
      <ul className="list-disc list-inside space-y-3 text-gray-700">
        {insights.map((insight, index) => (
          <li
            key={index}
            className="text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: insight }}
          ></li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-2xl">
        {/* Header and Portfolio Summary */}
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-purple-800">
            🎨 PM Comparison Tool
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Benchmarking Indian Paint Majors on Strategic Product Metrics
          </p>
          <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-lg text-gray-700 italic">
            {/* Portfolio Summary */}
            This tool benchmarks top Indian paint brands (Asian Paints, Berger,
            Nerolac) using structured product management metrics, including
            performance, strategic, and innovation criteria. It provides
            automated competitive insights and a rule-based recommendation
            engine to identify market gaps and strategic opportunities within
            the coatings industry portfolio.
          </div>
        </header>

        {/* --- Input and Selection Section --- */}
        <div className="p-6 bg-purple-100 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            🟣 Select Comparison Criteria
          </h2>

          {/* Product & Category Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Primary Brand */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 flex items-center mb-2">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-600" /> Primary
                Brand (Product A)
              </label>
              <select
                className="border-2 border-purple-400 bg-white rounded-xl p-3 w-full shadow-md focus:ring-purple-500 focus:border-purple-500 appearance-none transition duration-150 text-lg"
                value={primaryBrand}
                onChange={(e) => setPrimaryBrand(e.target.value)}
              >
                <option value="" disabled>
                  Select Primary Brand
                </option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Product Category */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 flex items-center mb-2">
                <Layers className="w-5 h-5 mr-2 text-purple-600" /> Product
                Category
              </label>
              <select
                className="border-2 border-purple-400 bg-white rounded-xl p-3 w-full shadow-md focus:ring-purple-500 focus:border-purple-500 appearance-none transition duration-150 text-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select Product Category
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Auto-Filled Competitor Blocks */}
          <h3 className="text-xl font-bold text-purple-800 mt-8 mb-4">
            Competitor Lineup
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <BrandBlock
              title="Product A (Primary)"
              brand={primaryBrand}
              color="bg-purple-200 border-purple-600"
            />
            <BrandBlock
              title="Product B (Competitor)"
              brand={productB}
              color="bg-gray-100 border-gray-400"
            />
            <BrandBlock
              title="Product C (Competitor)"
              brand={productC}
              color="bg-gray-100 border-gray-400"
            />
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div
              className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg"
              role="alert"
            >
              <p className="font-semibold">Input Required:</p>
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Compare Button */}
          <div className="text-center mt-10">
            <button
              onClick={handleCompare}
              disabled={!primaryBrand || !category}
              className={`
                        inline-flex items-center justify-center 
                        bg-purple-600 hover:bg-purple-700 text-white 
                        px-10 py-4 rounded-full 
                        shadow-xl hover:shadow-2xl transition duration-300 ease-in-out 
                        text-xl font-bold tracking-wider
                        disabled:bg-gray-400 disabled:shadow-none
                    `}
            >
              <Maximize2 className="w-6 h-6 mr-3" />
              Run Strategic Comparison
            </button>
          </div>
        </div>

        {/* --- Results Section --- */}
        {results && (
          <>
            <ComparisonTable data={results} />
            <ProductManagerInsights insights={insights} />
            <RecommendationEngine recommendations={recommendations} />
          </>
        )}
      </div>
    </div>
  );
}

// Reusable Brand Block Component
const BrandBlock = ({ title, brand, color }) => (
  <div className={`${color} p-4 rounded-xl border-2 shadow-md`}>
    <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
    <p className="text-xl font-extrabold text-purple-900 h-7">
      {brand || "Awaiting Selection..."}
    </p>
  </div>
);
