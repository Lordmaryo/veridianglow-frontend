import { privacyPolicyData } from "../data/info";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mt-10 text-center">
        <h1 className="text-lg md:text-3xl font-semibold">Privacy Policy</h1>
      </div>

      <div className="mt-6 space-y-6">
        <p className="text-gray-700">{privacyPolicyData.intro}</p>
        <p className="text-gray-700">{privacyPolicyData.trustStatement}</p>
        <p className="text-gray-700">{privacyPolicyData.coverage}</p>

        <section>
          <h3 className="text-lg font-semibold text-gray-800">
            {privacyPolicyData.infoCollection.title}
          </h3>
          <p className="text-gray-700 mt-2">
            {privacyPolicyData.infoCollection.description}
          </p>
          <ul className="list-disc pl-6 mt-2">
            {privacyPolicyData.infoCollection.details.map((item, index) => (
              <li key={index} className="mt-2">
                <strong>{item.subtitle}:</strong> {item.text}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800">
            {privacyPolicyData.infoUsage.title}
          </h3>
          <p className="text-gray-700 mt-2">
            {privacyPolicyData.infoUsage.description}
          </p>
          <ul className="list-disc pl-6 mt-2">
            {privacyPolicyData.infoUsage.purposes.map((purpose, index) => (
              <li key={index} className="mt-2">
                {purpose}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800">
            {privacyPolicyData.dataSharing.title}
          </h3>
          <p className="text-gray-700 mt-2">
            {privacyPolicyData.dataSharing.description}
          </p>
          <ul className="list-disc pl-6 mt-2">
            {privacyPolicyData.dataSharing.basis.map((basis, index) => (
              <li key={index} className="mt-2">
                {basis}
              </li>
            ))}
          </ul>
        </section>

        {[
          "cookies",
          "socialLogins",
          "thirdParties",
          "dataRetention",
          "security",
          "minors",
          "privacyRights",
          "updates",
          "contact",
        ].map((key) => {
          const section =
            privacyPolicyData[key as keyof typeof privacyPolicyData];
          return (
            <section key={key}>
              <h3 className="text-lg font-semibold text-gray-800">
                {typeof section !== "string" && section.title}
              </h3>
              {typeof section !== "string" && (
                <p className="text-gray-700 mt-2">{section.description}</p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
