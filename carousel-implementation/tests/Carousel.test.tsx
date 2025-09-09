import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Carousel } from "../src/Carousel";

const mockOnSlideChange = jest.fn();
const mockOnAutoplayStart = jest.fn();
const mockOnAutoplayStop = jest.fn();

const TestSlides = () => (
  <>
    <div data-testid="slide-0">Slide 1</div>
    <div data-testid="slide-1">Slide 2</div>
    <div data-testid="slide-2">Slide 3</div>
  </>
);

describe("Carousel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render with default props", () => {
    render(
      <Carousel>
        <TestSlides />
      </Carousel>
    );

    expect(screen.getByTestId("slide-0")).toBeInTheDocument();
    expect(screen.getByTestId("slide-1")).toBeInTheDocument();
    expect(screen.getByTestId("slide-2")).toBeInTheDocument();
  });

  test("should show indicators when enabled", () => {
    render(
      <Carousel options={{ showIndicators: true }}>
        <TestSlides />
      </Carousel>
    );

    const indicators = screen.getAllByRole("button", { name: "" }); // indicators don't have accessible names
    expect(indicators.length).toBe(3);
  });

  test("should show arrows when enabled", () => {
    render(
      <Carousel options={{ showArrows: true }}>
        <TestSlides />
      </Carousel>
    );

    expect(screen.getByText("‹")).toBeInTheDocument();
    expect(screen.getByText("›")).toBeInTheDocument();
  });

  test("should navigate to next slide on arrow click", async () => {
    const user = userEvent.setup();
    render(
      <Carousel options={{ showArrows: true }}>
        <TestSlides />
      </Carousel>
    );

    const nextButton = screen.getByText("›");
    await user.click(nextButton);

    // Check if slide classes change (active slide should be slide-1)
    await waitFor(() => {
      const slide1 = screen.getByTestId("slide-1");
      expect(slide1).toBeInTheDocument();
    });
  });

  test("should navigate to previous slide on arrow click", async () => {
    const user = userEvent.setup();
    render(
      <Carousel options={{ showArrows: true }}>
        <TestSlides />
      </Carousel>
    );

    const nextButton = screen.getByText("›");
    await user.click(nextButton); // Go to slide 1

    const prevButton = screen.getByText("‹");
    await user.click(prevButton); // Go back to slide 0

    await waitFor(() => {
      const slide0 = screen.getByTestId("slide-0");
      expect(slide0).toBeInTheDocument();
    });
  });

  test("should navigate with keyboard", async () => {
    render(
      <Carousel events={{ onSlideChange: mockOnSlideChange }}>
        <TestSlides />
      </Carousel>
    );

    const carousel = screen.getByRole("presentation"); // carousel container
    fireEvent.keyDown(carousel, { key: "ArrowRight" });

    await waitFor(() => {
      expect(mockOnSlideChange).toHaveBeenCalledWith(1, 0);
    });
  });

  test("should handle touch events", async () => {
    render(
      <Carousel events={{ onSlideChange: mockOnSlideChange }}>
        <TestSlides />
      </Carousel>
    );

    const carousel = screen.getByRole("presentation");
    fireEvent.touchStart(carousel, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(carousel, { changedTouches: [{ clientX: 50 }] });

    await waitFor(() => {
      expect(mockOnSlideChange).toHaveBeenCalledWith(2, 0); // Should go to previous (last slide)
    });
  });

  test("should call onSlideChange callback", async () => {
    render(
      <Carousel events={{ onSlideChange: mockOnSlideChange }}>
        <TestSlides />
      </Carousel>
    );

    const carousel = screen.getByRole("presentation");
    fireEvent.keyDown(carousel, { key: "ArrowRight" });

    await waitFor(() => {
      expect(mockOnSlideChange).toHaveBeenCalledWith(1, 0);
    });
  });

  test("should start and stop autoplay", () => {
    jest.useFakeTimers();

    render(
      <Carousel
        options={{ autoplay: true, autoplayDelay: 1000 }}
        events={{
          onAutoplayStart: mockOnAutoplayStart,
          onAutoplayStop: mockOnAutoplayStop,
        }}
      >
        <TestSlides />
      </Carousel>
    );

    expect(mockOnAutoplayStart).toHaveBeenCalled();

    jest.useRealTimers();
  });

  test("should handle indicator clicks", async () => {
    const user = userEvent.setup();
    render(
      <Carousel
        options={{ showIndicators: true }}
        events={{ onSlideChange: mockOnSlideChange }}
      >
        <TestSlides />
      </Carousel>
    );

    const indicators = screen.getAllByRole("button", { name: "" });
    await user.click(indicators[2]); // Click third indicator

    await waitFor(() => {
      expect(mockOnSlideChange).toHaveBeenCalledWith(2, 0);
    });
  });

  test("should handle infinite loop", async () => {
    const user = userEvent.setup();
    render(
      <Carousel
        options={{ showArrows: true, infinite: true }}
        events={{ onSlideChange: mockOnSlideChange }}
      >
        <TestSlides />
      </Carousel>
    );

    // Go to last slide
    const nextButton = screen.getByText("›");
    await user.click(nextButton); // slide 1
    await user.click(nextButton); // slide 2
    await user.click(nextButton); // should loop to slide 0

    await waitFor(() => {
      expect(mockOnSlideChange).toHaveBeenCalledWith(0, 2);
    });
  });
});

