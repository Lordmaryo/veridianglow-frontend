import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const WhatsAppButton = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <div className="shadow-lg rounded-lg absolute right-0 -top-[20rem]">
        {clicked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-t-md p-4 w-80 h-20 flex items-center justify-between bg-accent text-textOnAccent">
              <div className="w-12 h-12">
                <img src="/whatsapp-icon.png" alt="whatsapp icon" />
              </div>
              <h2 className="font-semibold">Start a conversation</h2>
            </div>

            <div className="bg-white w-full p-6 rounded-b-md">
              <p className="text-xs text-zinc-500 mb-4">
                We respond during working hours
              </p>
              <a
                href="https://wa.me/2349012345678"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setClicked(false)}
                className="flex flex-row gap-6 hover:bg-[#f872c580] transition-all p-2 rounded-md"
              >
                <div className="w-12 h-12">
                  <img src="/WhatsApp.svg.webp" alt="whatsapp logo" />
                </div>
                <div>
                  <p>Customer care</p>
                  <p className="text-xs text-zinc-500">VeridianGlow</p>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </div>

      <div className="absolute right-0 bottom-4">
        {clicked ? (
          <motion.button
            animate={{ rotate: clicked ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setClicked(!clicked)}
            className="bg-accent rounded-full p-4 w-16 h-16 flex justify-center items-center"
          >
            <X size={30} />
          </motion.button>
        ) : (
          <motion.button
            onClick={() => setClicked(!clicked)}
            className="w-16 h-16 bg-accent rounded-full p-4"
          >
            <img src="/whatsapp-icon.png" alt="whatsapp icon" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default WhatsAppButton;
