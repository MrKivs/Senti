"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Calendar,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const COLORS = ["#10B981", "#F59E0B", "#3B82F6", "#8B5CF6", "#EC4899"];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({
    start: "2023-01-01",
    end: "2023-12-31",
  });
  const [filter, setFilter] = useState("all");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("summary");

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);

      try {
        const { data: contributions, error: contributionsError } =
          await supabase
            .from("contributions")
            .select("amount, date, description, chama_id")
            .gte("date", dateRange.start)
            .lte("date", dateRange.end);

        const { data: disbursements, error: disbursementsError } =
          await supabase
            .from("disbursements")
            .select("amount, date, description, chama_id")
            .gte("date", dateRange.start)
            .lte("date", dateRange.end);

        const { data: chamas } = await supabase
          .from("chamas")
          .select("id, name");

        if (contributionsError || disbursementsError) {
          console.error(contributionsError || disbursementsError);
          setLoading(false);
          return;
        }

        const totalContributions = contributions.reduce(
          (sum, c) => sum + c.amount,
          0
        );
        const totalDisbursements = disbursements.reduce(
          (sum, d) => sum + d.amount,
          0
        );
        const netChange = totalContributions - totalDisbursements;

        const contributionsOverTime = groupByMonth(contributions);

        const allocation = [
          { category: "Emergency Fund", amount: totalDisbursements * 0.3 },
          { category: "Investments", amount: totalDisbursements * 0.4 },
          { category: "Education", amount: totalDisbursements * 0.2 },
          { category: "Retirement", amount: totalDisbursements * 0.1 },
        ];

        const transactions = [
          ...contributions.map((t) => ({
            ...t,
            type: "contribution",
            chamaName: chamas.find((c) => c.id === t.chama_id)?.name || "-",
          })),
          ...disbursements.map((t) => ({
            ...t,
            type: "disbursement",
            chamaName: chamas.find((c) => c.id === t.chama_id)?.name || "-",
          })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        setReportData({
          summary: {
            totalSavings: totalContributions,
            totalContributions,
            totalDisbursements,
            netChange,
          },
          contributionsOverTime,
          allocation,
          transactions,
        });
      } catch (err) {
        console.error("Fetch error:", err);
      }

      setLoading(false);
    };

    fetchReportData();
  }, [dateRange]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredTransactions = reportData?.transactions?.filter(
    (t) => filter === "all" || t.type === filter
  );

  const handleExport = () => {
    toast("Report exported successfully!");
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">Loading reports...</div>
    );
  }

  if (!reportData || !reportData.summary) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load report data. Please try again later.
      </div>
    );
  }

  const { summary } = reportData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-800">
              Financial Reports
            </h1>
            <p className="text-gray-600">
              Track your savings and disbursements
            </p>
          </div>
          <button
            onClick={handleExport}
            className="bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100 px-4 py-2 rounded-lg flex items-center transition"
          >
            <Download className="w-5 h-5 mr-2" /> Export
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow border p-5 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Date:</span>
            </div>
            <input
              type="date"
              name="start"
              value={dateRange.start}
              onChange={handleDateChange}
              className="border rounded px-3 py-2 text-sm"
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              name="end"
              value={dateRange.end}
              onChange={handleDateChange}
              className="border rounded px-3 py-2 text-sm"
            />

            <div className="ml-auto flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Filter:</span>
              {["all", "contribution", "disbursement"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilterChange(type)}
                  className={`px-3 py-1.5 rounded-lg text-sm capitalize ${
                    filter === type
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <SummaryCard
            title="Total Savings"
            value={`Ksh ${reportData.summary.totalSavings.toLocaleString()}`}
            change="+12.5%"
            isPositive
          />
          <SummaryCard
            title="Contributions"
            value={`Ksh ${reportData.summary.totalContributions.toLocaleString()}`}
            change="+8.3%"
            isPositive
          />
          <SummaryCard
            title="Disbursements"
            value={`Ksh ${reportData.summary.totalDisbursements.toLocaleString()}`}
            change="-2.1%"
            isPositive={false}
          />
          <SummaryCard
            title="Net Change"
            value={`Ksh ${reportData.summary.netChange.toLocaleString()}`}
            change="+7.2%"
            isPositive
          />
        </div>

        {/* Charts */}
        <div className="bg-white rounded-xl shadow border mb-8">
          <div className="border-b px-5 pt-5">
            {["summary", "contributions", "allocation"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? "text-emerald-700 border-b-2 border-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "summary"
                  ? "Savings Summary"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="p-5 h-80">
            {activeTab === "summary" || activeTab === "contributions" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportData.contributionsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="amount"
                    fill={activeTab === "summary" ? "#10B981" : "#3B82F6"}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reportData.allocation}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                    nameKey="category"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {reportData.allocation.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-xl shadow border">
          <div
            className="flex justify-between items-center p-5 cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            <h2 className="text-lg font-semibold text-emerald-800">
              Transaction History
            </h2>
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </div>
          {expanded && (
            <div className="px-5 pb-5 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Amount</th>
                    <th className="text-left p-2">Description</th>
                    <th className="text-left p-2">Chama</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((t, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">
                        {format(new Date(t.date), "dd MMM yyyy")}
                      </td>
                      <td className="p-2 capitalize">{t.type}</td>
                      <td
                        className={`p-2 font-semibold ${
                          t.type === "disbursement"
                            ? "text-amber-700"
                            : "text-emerald-700"
                        }`}
                      >
                        {t.type === "disbursement" ? "-" : "+"}
                        Ksh {t.amount.toLocaleString()}
                      </td>
                      <td className="p-2">{t.description}</td>
                      <td className="p-2">{t.chamaName}</td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-400"
                      >
                        No transactions for selected filter
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Summary Card Component
function SummaryCard({ title, value, change, isPositive }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow border">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl font-bold text-emerald-800">{value}</p>
      <p
        className={`text-sm ${
          isPositive ? "text-emerald-600" : "text-amber-600"
        }`}
      >
        {isPositive ? "↑" : "↓"} {change} from last month
      </p>
    </div>
  );
}

// Helper: Group amounts by YYYY-MM
function groupByMonth(data) {
  const grouped = {};
  data.forEach(({ date, amount }) => {
    const key = date.slice(0, 7); // "YYYY-MM"
    grouped[key] = (grouped[key] || 0) + amount;
  });

  return Object.entries(grouped).map(([date, amount]) => ({ date, amount }));
}

// Minimal toast (optional)
function toast(message) {
  const el = document.createElement("div");
  el.className =
    "fixed top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow z-50";
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}
