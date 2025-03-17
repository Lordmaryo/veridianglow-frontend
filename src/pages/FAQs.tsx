import { useState } from "react";
import FramerMotionAccordion from "../components/FramerMotionAccordion";
import { frequentlyAsked } from "../data/info";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const faqs = frequentlyAsked();
  return (
    <div className="max-w-[600px] mx-auto mt-10 space-y-8 px-4">
      <h2 className="text-xl md:text-3xl text-center font-semibold">
        Frequently Asked Questions
      </h2>
      <div>
        {faqs.map(({ key, question, answer }) => (
          <FramerMotionAccordion
            key={key}
            title={question}
            isOpen={openIndex === key}
            onClick={() => setOpenIndex(openIndex === key ? null : key)}
          >
            {answer}
          </FramerMotionAccordion>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
