interface CouponInputProps {
  couponCode: string;
  setCouponCode: (code: string) => void;
}
const CouponInput = ({ couponCode, setCouponCode }: CouponInputProps) => {
  return (
    <div className="flex items-end gap-4 mb-6">
      <div className="flex flex-col w-full">
        <label
          htmlFor="coupon-code"
          className="text-sm font-medium text-gray-700 mb-2"
        >
          Have any coupon? Add here
        </label>
        <input
          id="coupon-code"
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
          placeholder="Coupon or gift code"
          className="bg-zinc-100 border border-gray-300 w-full outline-none px-3 py-2 rounded-md focus:ring-2 focus:ring-accent"
        />
      </div>
    </div>
  );
};

export default CouponInput;
