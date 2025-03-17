const returnPolicyData = {
  question: "Are refunds, returns, or exchanges available?",
  answer:
    "Due to the nature of our products, we are unable to offer refunds, returns, or exchanges once an order has been picked up or shipped, except in cases where the items inside the package (for delivery orders) arrive damaged.",
  qualityCheck:
    "We conduct thorough quality checks before dispatching orders. While we take every precaution to ensure products reach you in perfect condition, unforeseen damage may occur during the delivery process.",
  damagedItems:
    "If your package contains damaged items, please reach out to us at support@veridianglow.com within 48 working hours. Kindly include photos of the damaged product(s) (excluding the outer packaging, as it does not impact the product quality).",
  returnProcess:
    "Upon approval, we will facilitate the return process. Once we receive and inspect your returned item, we will notify you via email. If replacements are available, a new order will be dispatched; otherwise, we will proceed with a refund.",
};

const ReturnPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mt-10 text-center">
        <h1 className="text-lg md:text-3xl font-semibold">
          Return & Refund Policy
        </h1>
      </div>
      <div className="mt-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {returnPolicyData.question}
          </h3>
          <p className="text-gray-700 mt-2">{returnPolicyData.answer}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Quality Check</h3>
          <p className="text-gray-700 mt-2">{returnPolicyData.qualityCheck}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Damaged Items</h3>
          <p className="text-gray-700 mt-2">{returnPolicyData.damagedItems}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Return Process
          </h3>
          <p className="text-gray-700 mt-2">{returnPolicyData.returnProcess}</p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
