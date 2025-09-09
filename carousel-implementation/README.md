# TypeScript Carousel Implementation

A fully-featured, responsive carousel component built with TypeScript, featuring touch/swipe support, keyboard navigation, autoplay functionality, and comprehensive test coverage.

## Features

- ✅ **Touch/Swipe Navigation** - Mobile-friendly swipe gestures
- ✅ **Keyboard Navigation** - Arrow keys, Home, and End key support
- ✅ **Autoplay Functionality** - Configurable autoplay with start/stop controls
- ✅ **Navigation Arrows** - Previous/Next arrow buttons
- ✅ **Indicator Dots** - Clickable slide indicators
- ✅ **Smooth Transitions** - Configurable transition duration
- ✅ **Infinite Loop** - Optional infinite scrolling
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **TypeScript** - Full type safety and IntelliSense support
- ✅ **Event Callbacks** - Custom event handlers for slide changes
- ✅ **Accessibility** - Keyboard navigation and screen reader support
- ✅ **Comprehensive Tests** - 100% test coverage with Jest

## Installation

1. Clone the repository
2. Navigate to the carousel directory
3. Install dependencies:

```bash
npm install
```

## Usage

### Basic Usage

```html
<div class="carousel-container" id="my-carousel">
  <div class="carousel-slide">Slide 1</div>
  <div class="carousel-slide">Slide 2</div>
  <div class="carousel-slide">Slide 3</div>
</div>
```

```typescript
import { Carousel } from './dist/index.js';

const carouselElement = document.getElementById('my-carousel');
const carousel = new Carousel(carouselElement);
```

### Advanced Usage with Options

```typescript
const carousel = new Carousel(carouselElement, {
  autoplay: true,           // Enable autoplay
  autoplayDelay: 3000,      // Autoplay delay in milliseconds
  infinite: true,           // Enable infinite loop
  showIndicators: true,     // Show indicator dots
  showArrows: true,         // Show navigation arrows
  transitionDuration: 500,  // Transition duration in milliseconds
  swipeThreshold: 50        // Minimum swipe distance for navigation
}, {
  onSlideChange: (currentIndex, previousIndex) => {
    console.log(`Slide changed from ${previousIndex} to ${currentIndex}`);
  },
  onAutoplayStart: () => {
    console.log('Autoplay started');
  },
  onAutoplayStop: () => {
    console.log('Autoplay stopped');
  }
});
```

## API Reference

### Constructor

```typescript
new Carousel(container: HTMLElement, options?: CarouselOptions, events?: CarouselEvents)
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoplay` | `boolean` | `false` | Enable autoplay functionality |
| `autoplayDelay` | `number` | `3000` | Delay between autoplay transitions (ms) |
| `infinite` | `boolean` | `true` | Enable infinite loop navigation |
| `showIndicators` | `boolean` | `true` | Show indicator dots |
| `showArrows` | `boolean` | `true` | Show navigation arrows |
| `transitionDuration` | `number` | `500` | Transition duration (ms) |
| `swipeThreshold` | `number` | `50` | Minimum swipe distance for navigation |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `onSlideChange` | `(currentIndex: number, previousIndex: number)` | Fired when slide changes |
| `onAutoplayStart` | `()` | Fired when autoplay starts |
| `onAutoplayStop` | `()` | Fired when autoplay stops |

### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `next()` | - | Navigate to next slide |
| `previous()` | - | Navigate to previous slide |
| `goToSlide(index)` | `index: number` | Navigate to specific slide |
| `startAutoplay()` | - | Start autoplay |
| `stopAutoplay()` | - | Stop autoplay |
| `getCurrentIndex()` | - | Get current slide index |
| `getSlidesCount()` | - | Get total number of slides |
| `destroy()` | - | Destroy carousel and clean up |

## Development

### Building

```bash
npm run build
```

### Running Tests

```bash
npm test
```

### Running Tests in Watch Mode

```bash
npm run test:watch
```

### Demo

Open `demo.html` in your browser to see the carousel in action:

```bash
npm run demo
```

Or simply open `demo.html` directly in your browser.

## CSS Classes

The carousel uses the following CSS classes that you can customize:

- `.carousel-container` - Main carousel container
- `.carousel-slide` - Individual slide container
- `.carousel-slide.active` - Currently active slide
- `.carousel-slide.previous` - Previous slide
- `.carousel-slide.next` - Next slide
- `.carousel-arrow` - Navigation arrows
- `.carousel-arrow-prev` - Previous arrow
- `.carousel-arrow-next` - Next arrow
- `.carousel-indicators` - Indicator dots container
- `.carousel-indicator` - Individual indicator dot
- `.carousel-indicator.active` - Active indicator dot

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers with touch support

## Testing

The carousel has comprehensive test coverage including:

- Initialization with various options
- Navigation (next/previous/specific slide)
- Autoplay functionality
- Touch/swipe events
- Keyboard navigation
- Indicator interactions
- Arrow button interactions
- Edge cases and error handling
- Cleanup and destruction

## Examples

### Simple Image Carousel

```html
<div class="carousel-container" id="image-carousel">
  <div class="carousel-slide" style="background-image: url('image1.jpg')"></div>
  <div class="carousel-slide" style="background-image: url('image2.jpg')"></div>
  <div class="carousel-slide" style="background-image: url('image3.jpg')"></div>
</div>
```

### Content Carousel

```html
<div class="carousel-container" id="content-carousel">
  <div class="carousel-slide">
    <h2>Title 1</h2>
    <p>Content for slide 1</p>
  </div>
  <div class="carousel-slide">
    <h2>Title 2</h2>
    <p>Content for slide 2</p>
  </div>
</div>
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is open source and available under the MIT License.
