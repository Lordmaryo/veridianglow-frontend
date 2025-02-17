import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { Product } from "../types/types";
import { ChevronDown } from "lucide-react";
import { productDetailSection } from "../data/product";

interface DescriptionProps {
  product: Product;
}

const Description = ({ product }: DescriptionProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const sections = productDetailSection(product);

  return (
    <div className="border lg:w-[520px]">
      <Accordion
        allowZeroExpanded
        preExpanded={[expandedItem ?? ""]}
        onChange={(expandedItems: string[]) =>
          setExpandedItem(expandedItems.length > 0 ? expandedItems[0] : null)
        }
      >
        {sections.map(({ key, title, content }) => (
          <AccordionItem key={key} uuid={key}>
            <AccordionItemHeading>
              <AccordionItemButton
                onClick={() =>
                  setExpandedItem((prev) => (prev === key ? null : key))
                }
              >
                <div className="border font-bold text-xl p-4 flex justify-between items-center">
                  <span>{title}</span>
                  <ChevronDown
                    className={`transition-transform duration-200 ${
                      expandedItem === key ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div
                className="p-4"
                dangerouslySetInnerHTML={{
                  __html: content || "No content provided.",
                }}
              />
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Description;
