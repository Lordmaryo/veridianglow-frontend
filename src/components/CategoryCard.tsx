import { Link } from "react-router-dom";

interface CategoryCardProps {
  href: string;
  image: string;
  title: string;
}

const CategoryCard = ({ href, image, title }: CategoryCardProps) => {
  return (
    <Link to={href}>
      <div className="xl:w-[300px] lg:w-[240px] md:max-w-80 w-full">
        <div className="w-full md:h-72 h-52">
          <img
          loading="lazy"
            src={image}
            alt={title + " category"}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="font-semibold border border-zinc-500 w-full mt-2 text-center sm:py-2 py-1">
          {title}
        </h2>
      </div>
    </Link>
  );
};

export default CategoryCard;
