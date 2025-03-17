import { Facebook, Instagram, Twitter } from "lucide-react";
import { ReactTyped } from "react-typed";

const InfoBar = () => {
  return (
    <div className="bg-accent flex flex-row justify-between items-center p-4 h-8">
      <div className="pr-2 font-bold text-textOnAccent text-sm">
        <ReactTyped
          strings={[
            "Lagos delivery 1 - 2 working days",
            "Outside Lagos 3 - 7 working days",
          ]}
          typeSpeed={30}
          backSpeed={60}
          loop
        />
      </div>
      <div className="flex flex-row items-center gap-4">
        <a href="#">
          <Twitter size={20} className="text-textOnAccent" />
        </a>
        <a href="#">
          <Facebook size={20} className="text-textOnAccent" />
        </a>
        <a href="#">
          <Instagram size={20} className="text-textOnAccent" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
