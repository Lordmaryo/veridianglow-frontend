import { useEffect, useState } from "react";
import { User } from "../types/userTypes";
import { useUserStore } from "../stores/useUserStore";
import { capitalize } from "lodash";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { formatDateAndTime } from "../utils/orderUtils";

const CouponTab = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [coupon, setCoupon] = useState({
    code: "",
    user: "",
    discountPercentage: 0,
    expiresAt: null as Date | null,
  });
  const [discountValue, setDiscountValue] = useState(10);
  const { getAllUsers, users, loading } = useUserStore();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const filteredUsers = users
    ?.filter(
      (user) =>
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 5);

  const generateCoupon = async () => {
    if (!selectedUser || !discountValue) return;

    const { data } = await axios.post<{
      success: boolean;
      coupon: string;
      discountPercentage: number;
      expiresAt: Date;
      user: string;
    }>("/coupon", {
      email: selectedUser.email,
      discountPercentage: discountValue,
    });

    if (data.success) {
      toast.success("Coupon generated successfully");
      console.log(data);
    }

    setCoupon({
      code: data.coupon,
      user: `${selectedUser.firstName} ${selectedUser.lastName}`,
      discountPercentage: data.discountPercentage,
      expiresAt: data.expiresAt,
    });
  };

  if (loading)
    return <div className="text-center text-gray-600 py-4">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Generate Coupon
      </h2>

      <input
        type="text"
        placeholder="Search user..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers?.length !== undefined && filteredUsers?.length > 0 && (
        <ul className="bg-white border border-gray-200 rounded-lg mt-2 shadow-sm divide-y">
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className={`p-3 cursor-pointer transition ${
                selectedUser?._id === user._id
                  ? "bg-accent text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedUser(user)}
            >
              {`${capitalize(user.firstName)} ${user.lastName}`} ({user.email})
            </li>
          ))}
        </ul>
      )}

      {selectedUser && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">
            Selected User:{" "}
            <span className="font-semibold">
              {`${capitalize(selectedUser.firstName)} ${capitalize(
                selectedUser.lastName
              )}`}
            </span>
          </h3>
          <div className="mt-3">
            <label className="block text-gray-600 font-medium mb-1">
              Discount Value
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition"
              value={discountValue}
              onChange={(e) => setDiscountValue(Number(e.target.value))}
            />
          </div>
          <button
            className="mt-5 w-full bg-accent text-white p-3 rounded-lg hover:opacity-85 transition font-semibold"
            onClick={generateCoupon}
          >
            Generate Coupon
          </button>
        </div>
      )}

      {coupon.code && (
        <div className="mt-6 p-5 bg-green-100 border border-green-400 rounded-lg">
          <h3 className="text-lg font-bold text-green-700">
            Coupon Generated!
          </h3>
          <p className="text-gray-700">
            <strong>Code:</strong> {coupon.code}
          </p>
          <p className="text-gray-700">
            <strong>User:</strong> {coupon.user}
          </p>
          <p className="text-gray-700">
            <strong>Discount:</strong> {coupon.discountPercentage}%
          </p>
          <p className="text-gray-700">
            <strong>Expires:</strong>{" "}
            {formatDateAndTime(coupon.expiresAt as Date)}
          </p>
        </div>
      )}
    </div>
  );
};

export default CouponTab;
