import "jest-environment-jsdom";
import "@testing-library/jest-dom";

global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(callback, 16) as any;
};

global.cancelAnimationFrame = (id: number): void => {
  clearTimeout(id);
};

const originalConsole = { ...console };
beforeAll(() => {
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  Object.assign(console, originalConsole);
});
