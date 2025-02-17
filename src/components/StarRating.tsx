import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number | undefined;
  iconSize?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, iconSize }) => {
  const fullStars = Math.floor(rating ?? 0);
  const decimalPart = (rating ?? 0) - fullStars;
  const hasHalfStar = decimalPart > 0 && decimalPart < 1;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar size={iconSize} key={`full-${i}`} className="text-orange-500" />
      ))}
      {hasHalfStar && (
        <FaStarHalfAlt size={iconSize} className="text-orange-500" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar
          size={iconSize}
          key={`empty-${i}`}
          className="text-gray-300"
        />
      ))}
    </div>
  );
};

export default StarRating;
