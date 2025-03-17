import { productDetailSection } from "../data/product";
import { Product } from "../types/ProductTypes";
import FramerMotionAccordion from "./FramerMotionAccordion";
import { useState } from "react";

interface DescriptionProps {
  product: Product;
}

const Description = ({ product }: DescriptionProps) => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const sections = productDetailSection(product);

  return (
    <div className="border lg:w-[520px]">
      {sections.map(({ key, title, content }) => (
        <FramerMotionAccordion
          key={key}
          title={title}
          isOpen={openIndex === key}
          onClick={() => setOpenIndex(openIndex === key ? null : key)}
        >
          <div
            className="p-4"
            dangerouslySetInnerHTML={{
              __html: content || "No content provided.",
            }}
          />
        </FramerMotionAccordion>
      ))}
    </div>
  );
};

export default Description;
