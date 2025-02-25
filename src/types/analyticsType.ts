export interface AnalyticsData {
  totalUsers: number;
  totalPaidOrders: number;
  totalProducts: number;
  totalOrders: number;
  totalSuccessfullDeliveries: number;
  totalSales: number;
  totalRevenue: number;
}

export interface DailySales {
  sales: number;
  revenue: number | string;
}

export interface AnalyticsResponse {
  success: boolean;
  analyticsData: AnalyticsData;
  dailySalesData: DailySales[];
}
