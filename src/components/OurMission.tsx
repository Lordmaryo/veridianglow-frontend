import { Link } from "react-router-dom";

const OurMission = () => {
  return (
    <div className="py-6 px-2 md:px-4 md:flex flex-row-reverse items-center">
      <div className="md:w-[50%] lg:h-[300px]">
        <img src="bosslady.webp" className="object-cover w-full h-full"/>
      </div>
      <div className="space-y-4 md:w-[50%] md:pr-4 pt-4 md:pt-0">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-accent">Our Mission</h2>
          <p>
            VeridianGlow by vee exists to inspire and empower people to feel
            beautiful and confident in their own skin through our products and
            projects.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-accent">Our Vision</h2>
          <p>
            To foster inclusivity, diversity, and environmental sustainability
            as a socially responsible brand in everything we do.
          </p>
        </div>
        <Link to={"/shop"}>
          <button className="py-2 px-4 bg-accent text-textOnAccent font-semibold hover:opacity-85 transition my-4 rounded-md ">Continue shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default OurMission;
