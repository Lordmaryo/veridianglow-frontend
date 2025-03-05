import { Star } from "lucide-react";

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
        <Star
          size={iconSize}
          key={`full-${i}`}
          className="text-orange-500 fill-orange-500"
        />
      ))}
      {hasHalfStar && (
        <div className="relative w-fit">
          <Star size={iconSize} className="text-gray-300 fill-white" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star size={iconSize} className="text-orange-500 fill-orange-500" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star size={iconSize} key={`empty-${i}`} className="text-gray-300" />
      ))}
    </div>
  );
};

export default StarRating;
