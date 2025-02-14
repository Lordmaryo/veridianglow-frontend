import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const InfoBar = () => {
  return (
    <div className="bg-accent flex flex-row justify-between items-center px-4 h-8">
      <div className="pr-2">
        <h2 className="font-bold text-textOnAccent text-sm">
          Lagos delivery 1-2 working days
        </h2>
      </div>
      <div className="flex flex-row items-center gap-4">
        <a href="#">
          <BsTwitterX className="text-textOnAccent" />
        </a>
        <a href="#">
          <FaFacebook className="text-textOnAccent" />
        </a>
        <a href="#">
          <FaInstagram className="text-textOnAccent" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
