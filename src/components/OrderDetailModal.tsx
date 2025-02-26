import { Order } from "../types/OrderType";
import { formatCurrency } from "../utils/utils";

const OrderDetailModal = ({
  selectedOrder,
  setSelectedOrder,
}: {
  selectedOrder: Order;
  setSelectedOrder: (selectedOrder: Order | null) => void;
}) => {
  const { street, city, state, country, zipCode } =
    selectedOrder.deliveryLocation;

  return (
    <div className="bg-white w-[95%] sm:w-auto max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Order Details
      </h2>

      <div className="space-y-3 text-gray-700">
        <p className="border-b pb-2">
          <strong className="text-gray-900">Customer:</strong>{" "}
          {selectedOrder.fullName}
        </p>
        <p className="border-b pb-2">
          <strong className="text-gray-900">Phone:</strong>{" "}
          {selectedOrder.phoneNumber}
        </p>
        <p className="border-b pb-2">
          <strong className="text-gray-900">Email:</strong>{" "}
          {selectedOrder.email}
        </p>
        <p className="border-b pb-2">
          <strong className="text-gray-900">Address:</strong>
          <span className="block">
            {street}, {city}, {state}, {zipCode}, {country}
          </span>
        </p>

        <div className="border-b pb-2">
          <strong className="text-gray-900 block mb-2">Items:</strong>
          <div className="overflow-x-auto">
            <table className="w-full border rounded-lg text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-center">Qty</th>
                  <th className="p-2 text-center">Price</th>
                  <th className="p-2 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.products.map((item) => (
                  <tr key={item._id} className="odd:bg-gray-50 border-b">
                    <td className="p-2">{item.productName}</td>
                    <td className="p-2 text-center">{item.quantity}</td>
                    <td className="p-2 text-center">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="p-2 text-center">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="border-b pb-2">
          <strong className="text-gray-900">Note:</strong>{" "}
          {selectedOrder.orderNote || "N/A"}
        </p>
        <p className="text-lg font-semibold text-gray-900">
          <strong>Total Paid:</strong> $
          {formatCurrency(Number(selectedOrder.amountPaid))}
        </p>
      </div>

      <button
        onClick={() => setSelectedOrder(null)}
        className="mt-5 px-4 py-2 bg-red-500 text-white rounded-lg w-full sm:w-auto hover:bg-red-600 transition"
      >
        Close
      </button>
    </div>
  );
};

export default OrderDetailModal;
