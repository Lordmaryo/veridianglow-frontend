import { Link } from "react-router-dom";
import VideoBanner from "../components/VideoBanner";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative">
      {/* <div className="w-full h-full absolute bg-[#0000009c] z-10"/> */}
      <VideoBanner videoPath={"/output-with-brandname"} />
      <div className="z-10 px-4 absolute xl:bottom-24 bottom-4 left-1/2 transform -translate-x-1/2 text-center w-full">
        <motion.div
          className="font-semibold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="md:text-xl text-sm">
            Welcome to the number one online skin care market in Nigeria
          </h2>
        </motion.div>
        <Link to={"/shop"}>
          <button className="bg-accent text-textOnAccent py-2 px-4 font-semibold mt-4 rounded-md">
            Start Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
