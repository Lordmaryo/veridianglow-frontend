import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Truck, Clock } from "lucide-react";
import { Order, OrderStatus } from "../types/OrderType";
import OrderDetailModal from "./OrderDetailModal";
import { formatDateAndTime } from "../utils/orderUtils";
import OrderSummaryCard from "./OrderSummaryCard";
import { useOrderStore } from "../stores/useOrderStore";

const OrderTab = () => {
  const { orderResponse, getAllOrders, updateOrderStatus } = useOrderStore();

  const [orders, setOrders] = useState(orderResponse?.orders);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    getAllOrders(currentPage, itemsPerPage);
  }, [currentPage]);

  useEffect(() => {
    setOrders(orderResponse?.orders);
  }, [orderResponse]);

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev?.map((order) => (order._id === id ? { ...order, status } : order))
    );
  };

  const confirmAction = (message: string, action: () => void) => {
    if (window.confirm(message)) {
      action();
    }
  };

  const markAsShipped = (id: string) => {
    confirmAction(
      "Are you sure you want to mark this order as shipped?",
      () => {
        updateOrderStatus(id, OrderStatus.SHIPPED);
        updateStatus(id, OrderStatus.SHIPPED);
      }
    );
  };

  const markAsDelivered = (id: string) => {
    confirmAction(
      "Are you sure you want to mark this order as delivered?",
      () => {
        updateOrderStatus(id, OrderStatus.DELIVERED);
        updateStatus(id, OrderStatus.DELIVERED);
      }
    );
  };

  const filteredOrders = orders?.filter(
    (order) =>
      order.fullName.toLowerCase().includes(search.toLowerCase()) ||
      order._id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full lg:max-w-7xl mx-auto px-4 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <OrderSummaryCard
          color="text-blue-500"
          title={"Total orders"}
          orders={orders || []}
          Icon={Clock}
        />
        <OrderSummaryCard
          color="text-yellow-500"
          title={"Pending Shipment"}
          orders={orders?.filter((o) => o.status === OrderStatus.PAID) || []}
          Icon={Truck}
        />
        <OrderSummaryCard
          color="text-green-500"
          title={"Pending Delivery"}
          orders={orders?.filter((o) => o.status === OrderStatus.SHIPPED) || []}
          Icon={CheckCircle}
        />
      </div>

      <input
        placeholder="Search orders by customer or order ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-1/2 p-2 border rounded-lg max-w-full"
      />

      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-max bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 text-left">Order #</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.map((order) => (
              <motion.tr
                key={order._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest("button")) {
                    setSelectedOrder(order);
                  }
                }}
              >
                <td className="p-3">{order._id}</td>
                <td className="p-3">{order.fullName}</td>
                <td className="p-3">{formatDateAndTime(order.createdAt)}</td>
                <td
                  className={`p-3 font-medium ${
                    order.status === OrderStatus.PAID
                      ? "text-yellow-500"
                      : order.status === OrderStatus.SHIPPED
                      ? "text-blue-500"
                      : "text-green-500"
                  }`}
                >
                  {order.status}
                </td>
                <td className="p-3 space-y-2 sm:space-x-2 flex flex-col sm:flex-row">
                  {order.status === OrderStatus.PAID && (
                    <button
                      onClick={() => markAsShipped(order._id)}
                      className="px-3 py-2 border rounded-lg flex items-center gap-1 w-full sm:w-auto"
                    >
                      <Truck size={16} /> Mark as Shipped
                    </button>
                  )}
                  {order.status === OrderStatus.SHIPPED && (
                    <button
                      onClick={() => markAsDelivered(order._id)}
                      className="px-3 py-2 border rounded-lg flex items-center gap-1 w-full sm:w-auto"
                    >
                      <CheckCircle size={16} className="text-green-500" /> Mark
                      as Delivered
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-medium">
          Page {orderResponse?.pagination.currentPage} of{" "}
          {orderResponse?.pagination.totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < orderResponse!.pagination.totalPages ? prev + 1 : prev
            )
          }
          disabled={
            currentPage === orderResponse?.pagination.totalPages ||
            orderResponse?.pagination.totalPages === 0
          }
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {selectedOrder && (
        <div className="z-[1001] fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-6">
          <OrderDetailModal
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
          />
        </div>
      )}
    </div>
  );
};

export default OrderTab;
