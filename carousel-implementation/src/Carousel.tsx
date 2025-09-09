import React, { useState, useEffect, useRef, useCallback } from "react";

export interface CarouselOptions {
  autoplay?: boolean;
  autoplayDelay?: number;
  infinite?: boolean;
  showIndicators?: boolean;
  showArrows?: boolean;
  transitionDuration?: number;
  swipeThreshold?: number;
}

export interface CarouselEvents {
  onSlideChange?: (currentIndex: number, previousIndex: number) => void;
  onAutoplayStart?: () => void;
  onAutoplayStop?: () => void;
}

export interface CarouselProps {
  children: React.ReactNode[];
  options?: CarouselOptions;
  events?: CarouselEvents;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  options = {},
  events = {},
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout>();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const defaultOptions: Required<CarouselOptions> = {
    autoplay: false,
    autoplayDelay: 3000,
    infinite: true,
    showIndicators: true,
    showArrows: true,
    transitionDuration: 500,
    swipeThreshold: 50,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  const slides = React.Children.toArray(children);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex || isTransitioning) return;

      const previousIndex = currentIndex;
      const newIndex = Math.max(0, Math.min(index, slides.length - 1));

      setCurrentIndex(newIndex);
      setIsTransitioning(true);

      if (events.onSlideChange) {
        events.onSlideChange(newIndex, previousIndex);
      }

      setTimeout(() => {
        setIsTransitioning(false);
      }, mergedOptions.transitionDuration);
    },
    [
      currentIndex,
      isTransitioning,
      slides.length,
      events,
      mergedOptions.transitionDuration,
    ]
  );

  const next = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= slides.length) {
      goToSlide(mergedOptions.infinite ? 0 : currentIndex);
    } else {
      goToSlide(nextIndex);
    }
  }, [currentIndex, slides.length, mergedOptions.infinite, goToSlide]);

  const previous = useCallback(() => {
    const prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      goToSlide(mergedOptions.infinite ? slides.length - 1 : currentIndex);
    } else {
      goToSlide(prevIndex);
    }
  }, [currentIndex, slides.length, mergedOptions.infinite, goToSlide]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX.current;

      if (Math.abs(diff) > mergedOptions.swipeThreshold) {
        if (diff > 0) {
          next();
        } else {
          previous();
        }
      }

      touchStartX.current = 0;
      touchEndX.current = 0;
    },
    [mergedOptions.swipeThreshold, next, previous]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          previous();
          break;
        case "ArrowRight":
          e.preventDefault();
          next();
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(slides.length - 1);
          break;
      }
    },
    [previous, next, goToSlide, slides.length]
  );

  // Autoplay functionality
  const startAutoplay = useCallback(() => {
    if (!mergedOptions.autoplay) return;

    stopAutoplay();

    autoplayRef.current = setInterval(() => {
      next();
    }, mergedOptions.autoplayDelay);

    if (events.onAutoplayStart) {
      events.onAutoplayStart();
    }
  }, [mergedOptions.autoplay, mergedOptions.autoplayDelay, next, events]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = undefined;

      if (events.onAutoplayStop) {
        events.onAutoplayStop();
      }
    }
  }, [events]);

  // Effect for autoplay
  useEffect(() => {
    if (mergedOptions.autoplay) {
      startAutoplay();
    } else {
      stopAutoplay();
    }

    return () => stopAutoplay();
  }, [mergedOptions.autoplay, startAutoplay, stopAutoplay]);

  // Helper functions for slide positioning
  const getPreviousIndex = (index: number): number => {
    return index === 0 ? slides.length - 1 : index - 1;
  };

  const getNextIndex = (index: number): number => {
    return index === slides.length - 1 ? 0 : index + 1;
  };

  // Get slide classes
  const getSlideClasses = (index: number): string => {
    let classes = "carousel-slide";

    if (index === currentIndex) {
      classes += " active";
    } else if (index === getPreviousIndex(currentIndex)) {
      classes += " previous";
    } else if (index === getNextIndex(currentIndex)) {
      classes += " next";
    }

    return classes;
  };

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "400px",
      }}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={getSlideClasses(index)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: index === currentIndex ? 1 : 0,
            transform:
              index === currentIndex
                ? "translateX(0)"
                : index === getPreviousIndex(currentIndex)
                ? "translateX(-100%)"
                : index === getNextIndex(currentIndex)
                ? "translateX(100%)"
                : "translateX(100%)",
            transition: `all ${mergedOptions.transitionDuration}ms ease-in-out`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {slide}
        </div>
      ))}

      {/* Navigation Arrows */}
      {mergedOptions.showArrows && (
        <>
          <button
            className="carousel-arrow carousel-arrow-prev"
            onClick={previous}
            style={{
              position: "absolute",
              top: "50%",
              left: "20px",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.9)",
              border: "none",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              cursor: "pointer",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            ‹
          </button>
          <button
            className="carousel-arrow carousel-arrow-next"
            onClick={next}
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.9)",
              border: "none",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              cursor: "pointer",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Indicators */}
      {mergedOptions.showIndicators && (
        <div
          className="carousel-indicators"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            zIndex: 10,
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                border: "2px solid rgba(255, 255, 255, 0.7)",
                background: index === currentIndex ? "white" : "transparent",
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: index === currentIndex ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
