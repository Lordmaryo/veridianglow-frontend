import { useEffect, useState } from "react";
import { useOrderStore } from "../stores/useOrderStore";
import { formatCurrency } from "../utils/utils";

const UserOrders = () => {
  const [activeTab, setActiveTab] = useState("ONGOING/DELIVERED");
  const { getCustomerOrder, orders } = useOrderStore();

  useEffect(() => {
    getCustomerOrder();
  }, [getCustomerOrder]);

  const filteredOrders = orders?.filter((order) => {
    if (activeTab === "ONGOING/DELIVERED") {
      return order.paid || order.status === "PENDING"; // Include pending payments
    }
    return !order.paid;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {/* tab */}
      <div className="flex space-x-4 mb-6 border-b">
        {["ONGOING/DELIVERED", "CANCELED"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-medium ${
              activeTab === tab
                ? "border-b-2 border-accent text-black"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredOrders?.length === 0 ? (
        <p className="text-center text-gray-500">
          No {activeTab.toLowerCase()} orders yet.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">
                  Order #{order?._id.slice(-6)}
                </h2>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    order.paid
                      ? order.status === "DELIVERED"
                        ? "bg-green-200 text-green-800"
                        : order.status === "SHIPPED"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-yellow-200 text-yellow-800"
                      : order.status === "PENDING"
                      ? "bg-gray-200 text-gray-800" 
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {order.paid
                    ? order.status === "PAID"
                      ? "Order awaiting confirmation"
                      : order.status
                    : order.status === "PENDING"
                    ? "PAYMENT PENDING"
                    : order.status === "FAILED"
                    ? "CANCELED"
                    : "ABANDONED"}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm font-semibold">
                Total: {formatCurrency(order.totalAmount)}
              </p>

              {/* Show Failed Payment Reason */}
              {!order.paid && order.status === "FAILED" && (
                <p className="text-sm text-red-600">
                  Payment Failed: {order.gatewayResponse}
                </p>
              )}

              <table className="w-full mt-4 border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border border-gray-200">Product</th>
                    <th className="p-2 border border-gray-200">Qty</th>
                    <th className="p-2 border border-gray-200">Price</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {order?.products.map((product) => (
                    <tr
                      key={product.productId}
                      className="text-center border border-gray-200"
                    >
                      <td className="p-2 border border-gray-200">
                        {product.productName}
                      </td>
                      <td className="p-2 border border-gray-200">
                        {product.quantity}
                      </td>
                      <td className="p-2 border border-gray-200">
                        {formatCurrency(product.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
