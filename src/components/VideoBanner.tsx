import { useEffect, useRef, useState } from "react";

const VideoBanner = ({ videoPath }: { videoPath: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <div className="relative w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] xl:h-screen">
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        poster="/poster-image.png"
        preload="metadata"
        // preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`${videoPath}.webm`} type="video/webm" />
        <source src={`${videoPath}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBanner;
