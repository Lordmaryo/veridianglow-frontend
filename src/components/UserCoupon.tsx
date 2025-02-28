import { useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
import { formatDateAndTime } from "../utils/orderUtils";

const UserCoupon = () => {
  const { coupons, getMyCoupons } = useCartStore();

  useEffect(() => {
    getMyCoupons();
  }, []);

  return (
    <div>
      <h2 className="md:text-2xl text-lg font-bold pb-6">Gift and Coupons</h2>
      {coupons && (
        <p>
          Congratulations, You've been gifted {coupons.length} coupon
          {coupons.length > 1 ? "s" : ""}
        </p>
      )}
      {coupons ? (
        <table className="w-full mt-10 mb-4 px-4 overflow-y-hidden">
          <thead className="bg-zinc-200 uppercase font-bold">
            <tr>
              <th className="px-6 py-3 text-left text-xs tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs tracking-wider">
                Percentage off
              </th>
              <th className="px-6 py-3 text-left text-xs tracking-wider">
                Expires At
              </th>
            </tr>
          </thead>
          <tbody className="bg-zinc-300 divide-y divide-gray-700">
            {coupons?.map((coupon) => (
              <tr key={coupon._id} className="hover:bg-gray-400">
                <td className="px-6 py-4 whitespace-nowrap">{coupon.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.discountPercentage}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDateAndTime(coupon.expirationDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-4">You currently have no coupon</div>
      )}
    </div>
  );
};

export default UserCoupon;
