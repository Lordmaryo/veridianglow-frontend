import {
  Archive,
  BarChart,
  CircleDollarSign,
  PlusCircle,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";

export enum Tabs {
  OVERVIEW = "OVERVIEW", // analytics
  CREATE = "CREATE",
  PRODUCTS = "PRODUCTS",
  DRAFT = "DRAFT",
  ORDERS = "ORDERS",
  COUPON = "COUPON",
}
export const tabs = [
  { id: Tabs.OVERVIEW, label: "Overview", icon: BarChart },
  { id: Tabs.CREATE, label: "Create", icon: PlusCircle },
  { id: Tabs.PRODUCTS, label: "Products", icon: ShoppingBasket },
  { id: Tabs.DRAFT, label: "DRAFT", icon: Archive },
  { id: Tabs.ORDERS, label: "Orders", icon: ShoppingBag },
  { id: Tabs.COUPON, label: "Coupon", icon: CircleDollarSign },
];
