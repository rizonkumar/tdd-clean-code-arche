"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Carousel_1 = require("../src/Carousel");
describe("Carousel", () => {
  let container;
  let carousel;
  let mockOnSlideChange;
  let mockOnAutoplayStart;
  let mockOnAutoplayStop;
  const createTestContainer = (slidesCount = 3) => {
    const container = document.createElement("div");
    container.className = "carousel-container";
    for (let i = 0; i < slidesCount; i++) {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.textContent = `Slide ${i + 1}`;
      container.appendChild(slide);
    }
    document.body.appendChild(container);
    return container;
  };
  const createMockEvents = () => ({
    onSlideChange: mockOnSlideChange,
    onAutoplayStart: mockOnAutoplayStart,
    onAutoplayStop: mockOnAutoplayStop,
  });
  beforeEach(() => {
    mockOnSlideChange = jest.fn();
    mockOnAutoplayStart = jest.fn();
    mockOnAutoplayStop = jest.fn();
  });
  afterEach(() => {
    if (container && document.body.contains(container)) {
      document.body.removeChild(container);
    }
    jest.clearAllTimers();
  });
  describe("Initialization", () => {
    test("should initialize with default options", () => {
      container = createTestContainer();
      carousel = new Carousel_1.Carousel(container);
      expect(carousel.getCurrentIndex()).toBe(0);
      expect(carousel.getSlidesCount()).toBe(3);
    });
    test("should initialize with custom options", () => {
      container = createTestContainer();
      const options = {
        autoplay: true,
        autoplayDelay: 1000,
        infinite: false,
        showIndicators: false,
        showArrows: false,
        transitionDuration: 300,
        swipeThreshold: 100,
      };
      carousel = new Carousel_1.Carousel(container, options);
      expect(carousel.getCurrentIndex()).toBe(0);
    });
    test("should create indicators when showIndicators is true", () => {
      container = createTestContainer();
      carousel = new Carousel_1.Carousel(container, { showIndicators: true });
      const indicators = container.querySelector(".carousel-indicators");
      expect(indicators).toBeTruthy();
      expect(indicators?.children.length).toBe(3);
    });
    test("should not create indicators when showIndicators is false", () => {
      container = createTestContainer();
      carousel = new Carousel_1.Carousel(container, { showIndicators: false });
      const indicators = container.querySelector(".carousel-indicators");
      expect(indicators).toBeFalsy();
    });
    test("should create arrows when showArrows is true", () => {
      container = createTestContainer();
      carousel = new Carousel_1.Carousel(container, { showArrows: true });
      const prevArrow = container.querySelector(".carousel-arrow-prev");
      const nextArrow = container.querySelector(".carousel-arrow-next");
      expect(prevArrow).toBeTruthy();
      expect(nextArrow).toBeTruthy();
    });
    test("should not create arrows when showArrows is false", () => {
      container = createTestContainer();
      carousel = new Carousel_1.Carousel(container, { showArrows: false });
      const prevArrow = container.querySelector(".carousel-arrow-prev");
      const nextArrow = container.querySelector(".carousel-arrow-next");
      expect(prevArrow).toBeFalsy();
      expect(nextArrow).toBeFalsy();
    });
  });
  describe("Navigation", () => {
    beforeEach(() => {
      container = createTestContainer();
      carousel = new Carousel_1.Carousel(
        container,
        { infinite: true },
        createMockEvents()
      );
    });
    test("should navigate to next slide", () => {
      carousel.next();
      expect(carousel.getCurrentIndex()).toBe(1);
      expect(mockOnSlideChange).toHaveBeenCalledWith(1, 0);
    });
    test("should navigate to previous slide", () => {
      carousel.goToSlide(1);
      carousel.previous();
      expect(carousel.getCurrentIndex()).toBe(0);
      expect(mockOnSlideChange).toHaveBeenCalledWith(0, 1);
    });
    test("should loop to first slide when reaching end with infinite mode", () => {
      carousel.goToSlide(2);
      carousel.next();
      expect(carousel.getCurrentIndex()).toBe(0);
    });
    test("should loop to last slide when reaching start with infinite mode", () => {
      carousel.previous();
      expect(carousel.getCurrentIndex()).toBe(2);
    });
    test("should not go beyond last slide in finite mode", () => {
      const finiteCarousel = new Carousel_1.Carousel(
        container,
        { infinite: false },
        createMockEvents()
      );
      finiteCarousel.goToSlide(2);
      finiteCarousel.next();
      expect(finiteCarousel.getCurrentIndex()).toBe(2);
    });
    test("should not go before first slide in finite mode", () => {
      const finiteCarousel = new Carousel_1.Carousel(
        container,
        { infinite: false },
        createMockEvents()
      );
      finiteCarousel.previous();
      expect(finiteCarousel.getCurrentIndex()).toBe(0);
    });
    test("should go to specific slide", () => {
      carousel.goToSlide(2);
      expect(carousel.getCurrentIndex()).toBe(2);
      expect(mockOnSlideChange).toHaveBeenCalledWith(2, 0);
    });
    test("should not change slide if already on target slide", () => {
      carousel.goToSlide(0);
      expect(mockOnSlideChange).not.toHaveBeenCalled();
    });
    test("should handle invalid slide indices gracefully", () => {
      carousel.goToSlide(-1);
      expect(carousel.getCurrentIndex()).toBe(0);
      carousel.goToSlide(10);
      expect(carousel.getCurrentIndex()).toBe(2);
    });
  });
  describe("Autoplay", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      container = createTestContainer();
    });
    afterEach(() => {
      jest.useRealTimers();
    });
    test("should start autoplay when enabled", () => {
      carousel = new Carousel_1.Carousel(
        container,
        { autoplay: true, autoplayDelay: 1000 },
        createMockEvents()
      );
      expect(mockOnAutoplayStart).toHaveBeenCalled();
    });
    test("should not start autoplay when disabled", () => {
      carousel = new Carousel_1.Carousel(
        container,
        { autoplay: false },
        createMockEvents()
      );
      expect(mockOnAutoplayStart).not.toHaveBeenCalled();
    });
    test("should advance slides during autoplay", () => {
      carousel = new Carousel_1.Carousel(
        container,
        { autoplay: true, autoplayDelay: 1000 },
        createMockEvents()
      );
      jest.advanceTimersByTime(1000);
      expect(carousel.getCurrentIndex()).toBe(1);
      jest.advanceTimersByTime(1000);
      expect(carousel.getCurrentIndex()).toBe(2);
    });
    test("should start and stop autoplay manually", () => {
      carousel = new Carousel_1.Carousel(
        container,
        { autoplay: false },
        createMockEvents()
      );
      carousel.startAutoplay();
      expect(mockOnAutoplayStart).toHaveBeenCalled();
      jest.advanceTimersByTime(1000);
      expect(carousel.getCurrentIndex()).toBe(1);
      carousel.stopAutoplay();
      expect(mockOnAutoplayStop).toHaveBeenCalled();
      jest.advanceTimersByTime(1000);
      expect(carousel.getCurrentIndex()).toBe(1);
    });
    test("should restart autoplay when starting again", () => {
      carousel = new Carousel_1.Carousel(
        container,
        { autoplay: false },
        createMockEvents()
      );
      carousel.startAutoplay();
      jest.advanceTimersByTime(500);
      carousel.stopAutoplay();
      carousel.startAutoplay();
      jest.advanceTimersByTime(1000);
      expect(carousel.getCurrentIndex()).toBe(1);
    });
  });
  describe("Touch Events", () => {
    beforeEach(() => {
      container = createTestContainer();
      carousel = new Carousel_1.Carousel(
        container,
        { swipeThreshold: 50 },
        createMockEvents()
      );
    });
    test("should handle swipe right (previous)", () => {
      const touchStartEvent = new TouchEvent("touchstart", {
        touches: [{ clientX: 100 }],
      });
      const touchEndEvent = new TouchEvent("touchend", {
        changedTouches: [{ clientX: 50 }],
      });
      container.dispatchEvent(touchStartEvent);
      container.dispatchEvent(touchEndEvent);
      expect(carousel.getCurrentIndex()).toBe(2);
    });
    test("should handle swipe left (next)", () => {
      const touchStartEvent = new TouchEvent("touchstart", {
        touches: [{ clientX: 100 }],
      });
      const touchEndEvent = new TouchEvent("touchend", {
        changedTouches: [{ clientX: 150 }],
      });
      container.dispatchEvent(touchStartEvent);
      container.dispatchEvent(touchEndEvent);
      expect(carousel.getCurrentIndex()).toBe(1);
    });
    test("should not navigate on small swipes", () => {
      const touchStartEvent = new TouchEvent("touchstart", {
        touches: [{ clientX: 100 }],
      });
      const touchEndEvent = new TouchEvent("touchend", {
        changedTouches: [{ clientX: 110 }],
      });
      container.dispatchEvent(touchStartEvent);
      container.dispatchEvent(touchEndEvent);
      expect(carousel.getCurrentIndex()).toBe(0);
    });
  });
  describe("Keyboard Navigation", () => {
    beforeEach(() => {
      container = createTestContainer();
      carousel = new Carousel_1.Carousel(container, {}, createMockEvents());
    });
    test("should navigate with arrow keys", () => {
      container.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight" })
      );
      expect(carousel.getCurrentIndex()).toBe(1);
      container.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowLeft" })
      );
      expect(carousel.getCurrentIndex()).toBe(0);
    });
    test("should navigate to first and last slides with Home/End keys", () => {
      container.dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));
      expect(carousel.getCurrentIndex()).toBe(2);
      container.dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }));
      expect(carousel.getCurrentIndex()).toBe(0);
    });
  });
  describe("Indicators", () => {
    beforeEach(() => {
      container = createTestContainer();
      carousel = new Carousel_1.Carousel(
        container,
        { showIndicators: true },
        createMockEvents()
      );
    });
    test("should update active indicator when slide changes", () => {
      const indicators = container.querySelectorAll(".carousel-indicator");
      expect(indicators[0]).toHaveClass("active");
      expect(indicators[1]).not.toHaveClass("active");
      carousel.goToSlide(1);
      expect(indicators[0]).not.toHaveClass("active");
      expect(indicators[1]).toHaveClass("active");
    });
    test("should navigate to slide when indicator is clicked", () => {
      const indicators = container.querySelectorAll(".carousel-indicator");
      indicators[2].click();
      expect(carousel.getCurrentIndex()).toBe(2);
    });
  });
  describe("Arrows", () => {
    beforeEach(() => {
      container = createTestContainer();
      carousel = new Carousel_1.Carousel(
        container,
        { showArrows: true },
        createMockEvents()
      );
    });
    test("should navigate when arrow buttons are clicked", () => {
      const nextArrow = container.querySelector(".carousel-arrow-next");
      const prevArrow = container.querySelector(".carousel-arrow-prev");
      nextArrow.click();
      expect(carousel.getCurrentIndex()).toBe(1);
      prevArrow.click();
      expect(carousel.getCurrentIndex()).toBe(0);
    });
  });
  describe("Edge Cases", () => {
    test("should handle single slide carousel", () => {
      container = createTestContainer(1);
      carousel = new Carousel_1.Carousel(container, {}, createMockEvents());
      carousel.next();
      expect(carousel.getCurrentIndex()).toBe(0);
      carousel.previous();
      expect(carousel.getCurrentIndex()).toBe(0);
    });
    test("should handle empty carousel gracefully", () => {
      const emptyContainer = document.createElement("div");
      document.body.appendChild(emptyContainer);
      expect(() => {
        new Carousel_1.Carousel(emptyContainer);
      }).not.toThrow();
      document.body.removeChild(emptyContainer);
    });
    test("should prevent multiple rapid slide changes", () => {
      container = createTestContainer();
      carousel = new Carousel_1.Carousel(
        container,
        { transitionDuration: 1000 },
        createMockEvents()
      );
      carousel.goToSlide(1);
      carousel.goToSlide(2);
      expect(carousel.getCurrentIndex()).toBe(1);
    });
  });
  describe("Cleanup", () => {
    test("should destroy carousel and clean up event listeners", () => {
      container = createTestContainer();
      carousel = new Carousel_1.Carousel(
        container,
        { autoplay: true, showIndicators: true, showArrows: true },
        createMockEvents()
      );
      carousel.destroy();
      // Check that elements are removed
      expect(container.querySelector(".carousel-indicators")).toBeFalsy();
      expect(container.querySelector(".carousel-arrow")).toBeFalsy();
      expect(mockOnAutoplayStop).toHaveBeenCalled();
    });
    test("should remove container class and tabindex", () => {
      container = createTestContainer();
      carousel = new Carousel_1.Carousel(container);
      expect(container).toHaveClass("carousel-container");
      expect(container.getAttribute("tabindex")).toBe("0");
      carousel.destroy();
      expect(container).not.toHaveClass("carousel-container");
      expect(container.getAttribute("tabindex")).toBeNull();
    });
  });
  describe("Slide Management", () => {
    beforeEach(() => {
      container = createTestContainer();
      carousel = new Carousel_1.Carousel(container, {}, createMockEvents());
    });
    test("should update slide classes correctly", () => {
      const slides = container.querySelectorAll(".carousel-slide");
      expect(slides[0]).toHaveClass("active");
      expect(slides[1]).toHaveClass("next");
      expect(slides[2]).toHaveClass("previous");
      carousel.goToSlide(1);
      expect(slides[0]).toHaveClass("previous");
      expect(slides[1]).toHaveClass("active");
      expect(slides[2]).toHaveClass("next");
    });
    test("should handle circular slide positioning", () => {
      const slides = container.querySelectorAll(".carousel-slide");
      carousel.goToSlide(2);
      expect(slides[2]).toHaveClass("active");
      expect(slides[0]).toHaveClass("next");
      expect(slides[1]).toHaveClass("previous");
    });
  });
});
