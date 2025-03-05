import { Facebook, Instagram, Twitter } from "lucide-react";

const InfoBar = () => {
  return (
    <div className="bg-accent flex flex-row justify-between items-center p-4 h-8">
      <div className="pr-2">
        <h2 className="font-bold text-textOnAccent text-sm">
          Lagos delivery 1-2 working days
        </h2>
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
