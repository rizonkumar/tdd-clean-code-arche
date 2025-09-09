import { useState } from "react";
import { Carousel } from "./Carousel";
import "./App.css";

function App() {
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);

  return (
    <div className="App">
      <div className="container">
        <h1>React TypeScript Carousel Implementation</h1>

        <Carousel
          options={{
            autoplay: autoplayEnabled,
            autoplayDelay: 3000,
            infinite: true,
            showIndicators: true,
            showArrows: true,
            transitionDuration: 500,
            swipeThreshold: 50,
          }}
          events={{
            onSlideChange: (currentIndex, previousIndex) => {
              console.log(
                `Slide changed from ${previousIndex} to ${currentIndex}`
              );
            },
            onAutoplayStart: () => {
              console.log("Autoplay started");
            },
            onAutoplayStop: () => {
              console.log("Autoplay stopped");
            },
          }}
        >
          <div
            className="slide-content"
            style={{
              backgroundImage: "url(https://picsum.photos/800/400?random=1)",
            }}
          >
            <div className="slide-text">
              <h2>Mountain Adventure</h2>
              <p>
                Experience the breathtaking beauty of nature's majestic peaks
              </p>
            </div>
          </div>

          <div
            className="slide-content"
            style={{
              backgroundImage: "url(https://picsum.photos/800/400?random=2)",
            }}
          >
            <div className="slide-text">
              <h2>Ocean Paradise</h2>
              <p>Dive into the crystal clear waters of tropical islands</p>
            </div>
          </div>

          <div
            className="slide-content"
            style={{
              backgroundImage: "url(https://picsum.photos/800/400?random=3)",
            }}
          >
            <div className="slide-text">
              <h2>Forest Retreat</h2>
              <p>
                Find peace and tranquility in the heart of ancient woodlands
              </p>
            </div>
          </div>

          <div
            className="slide-content"
            style={{
              backgroundImage: "url(https://picsum.photos/800/400?random=4)",
            }}
          >
            <div className="slide-text">
              <h2>Desert Wonders</h2>
              <p>Discover the mystical beauty of golden sand dunes</p>
            </div>
          </div>
        </Carousel>

        <div className="carousel-controls">
          <button
            className={`control-btn ${autoplayEnabled ? "active" : ""}`}
            onClick={() => setAutoplayEnabled(!autoplayEnabled)}
          >
            {autoplayEnabled ? "Stop Autoplay" : "Start Autoplay"}
          </button>
        </div>

        <div className="demo-info">
          <h3>Features:</h3>
          <ul>
            <li>Touch/swipe navigation on mobile devices</li>
            <li>Keyboard navigation (arrow keys, Home, End)</li>
            <li>Autoplay functionality with customizable delay</li>
            <li>Navigation arrows and indicator dots</li>
            <li>Smooth transitions with configurable duration</li>
            <li>Infinite loop or finite navigation modes</li>
            <li>Event callbacks for slide changes</li>
            <li>Responsive design for all screen sizes</li>
            <li>React TypeScript implementation with full type safety</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

