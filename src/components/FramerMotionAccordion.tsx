import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FramerMotionAccordion = ({
  title,
  children,
  isOpen,
  onClick,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border rounded-lg">
      <button
        className="w-full flex justify-between items-center p-3 font-semibold"
        onClick={onClick}
      >
        {title}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="p-3">{children}</div>
      </motion.div>
    </div>
  );
};

export default FramerMotionAccordion;
