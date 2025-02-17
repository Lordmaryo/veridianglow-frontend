import { useCallback, useEffect, useState } from "react";
import { Product } from "../types/types";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedProductsProp {
  product: Product[] | undefined;
}

const FeaturedProducts = ({ product }: FeaturedProductsProp) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const totalSlides = product?.length || 0;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateSlidesPerView = () => {
      const scrollSnaps = emblaApi.scrollSnapList().length;
      setSlidesPerView(totalSlides / scrollSnaps);
    };

    updateSlidesPerView();
    emblaApi.on("resize", updateSlidesPerView);
  }, [emblaApi, totalSlides]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const totalDots = Math.ceil(totalSlides / slidesPerView);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Featured Products
        </h2>

        <div className="relative">
          {/* Left arrow */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10 pointer-events-auto"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 pl-4 ml-auto mr-auto">
              {product?.map((p, index) => (
                <div key={index}>
                  <ProductCard key={p._id} product={p} containerWidth="w-48" />
                </div>
              ))}
            </div>
          </div>

          {/* right arrow */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow-md rounded-full"
            onClick={() => emblaApi?.scrollNext()}
            disabled={currentIndex === totalDots - 1}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                currentIndex === index ? "bg-accent w-4 h-2" : "bg-gray-300"
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
