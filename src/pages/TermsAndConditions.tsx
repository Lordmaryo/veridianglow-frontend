import { termsData } from "../data/info";

const TermsAndConditions = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mt-10 text-center">
        <h1 className="text-lg md:text-3xl font-semibold">
          Terms And Conditions
        </h1>
        <h2 className="mt-4">
          Please read these terms and conditions carefully before using the
          www.veridianglow.com website
        </h2>
      </div>
      <div className="mt-10 space-y-6">
        {Object.entries(termsData).map(([title, content], index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-700 mt-2">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsAndConditions;
