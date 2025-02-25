import {
  Archive,
  BarChart,
  CircleDollarSign,
  PlusCircle,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
import { AnalyticsData } from "../types/analyticsType";

export enum Tabs {
  OVERVIEW = "OVERVIEW", // analytics
  CREATE = "CREATE",
  PRODUCTS = "PRODUCTS",
  ARCHIVED = "ARCHIVED",
  ORDERS = "ORDERS",
  COUPON = "COUPON",
}
export const tabs = [
  { id: Tabs.OVERVIEW, label: "Overview", icon: BarChart },
  { id: Tabs.CREATE, label: "Create", icon: PlusCircle },
  { id: Tabs.PRODUCTS, label: "Products", icon: ShoppingBasket },
  { id: Tabs.ARCHIVED, label: "ARCHIVED", icon: Archive },
  { id: Tabs.ORDERS, label: "Orders", icon: ShoppingBag },
  { id: Tabs.COUPON, label: "Coupon", icon: CircleDollarSign },
];

export const dateOptions = [
  { label: "7 Days Ago", value: 7 * 24 * 60 * 60 * 1000 },
  { label: "Last Month", value: 30 * 24 * 60 * 60 * 1000 },
  { label: "Last 6 Months", value: 6 * 30 * 24 * 60 * 60 * 1000 },
  { label: "Last Year", value: 12 * 30 * 24 * 60 * 60 * 1000 },
];

//chart colors
export const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

export const orderDistributionData = (analyticsData: AnalyticsData) => {
  return [
    { name: "Total Orders", value: analyticsData.totalOrders },
    { name: "Paid Orders", value: analyticsData.totalPaidOrders },
    {
      name: "Successful Deliveries",
      value: analyticsData.totalSuccessfullDeliveries,
    },
  ];
};
