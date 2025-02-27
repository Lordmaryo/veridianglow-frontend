import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { DollarSign, Package, ShoppingCart, Users, Truck } from "lucide-react";
import AnalyticsCard from "./AnalyticsCard";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AnalyticsResponse, DailySales } from "../types/analyticsType";
import { currencyAbbreviation, formatCurrency } from "../utils/utils";
import LoadingSpinner from "./LoadingSpinner";
import { COLORS, dateOptions, orderDistributionData } from "../data/admin";

const OverviewTab = () => {
  const [dailySalesData, setDailySalesData] = useState<DailySales[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDateValue, setStartDateValue] = useState(dateOptions[0].value);
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    totalPaidOrders: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSuccessfullDeliveries: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await axios.post<AnalyticsResponse>("/analytics", {
          startDateValue,
        });
        setAnalyticsData(res.data.analyticsData);
        setDailySalesData(
          res.data.dailySalesData.map((item, index) => ({
            day: `Day ${index + 1}`,
            sales: item.sales,
            revenue: formatCurrency(Number(item.revenue)),
          }))
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [startDateValue]);

  const orderDistribution = orderDistributionData(analyticsData);

  if (loading) return <LoadingSpinner />;
  return (
    <div className="w-full lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.totalUsers.toLocaleString()}
          icon={Users}
          color="bg-blue-300"
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.totalProducts.toLocaleString()}
          icon={Package}
          color="bg-yellow-300"
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color="bg-green-300"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={currencyAbbreviation(analyticsData.totalRevenue)}
          icon={DollarSign}
          color="bg-purple-300"
        />
        <AnalyticsCard
          title="Successful Deliveries"
          value={analyticsData.totalSuccessfullDeliveries.toLocaleString()}
          icon={Truck}
          color="bg-gray-300"
        />
      </div>

      <div className="mt-4 w-36 ml-auto">
        <label className="block text-sm font-medium text-gray-700">
          Select Date Range:
        </label>
        <select
          value={startDateValue}
          onChange={(e) => setStartDateValue(Number(e.target.value))}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {dateOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Sales & Revenue Overview
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#10B981"
              strokeWidth={2}
              name="Sales"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Sales Distribution
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#F59E0B" name="Sales" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Order Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={orderDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {orderDistribution.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewTab;
