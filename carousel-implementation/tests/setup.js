"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest-environment-jsdom");

global.requestAnimationFrame = (callback) => {
  return setTimeout(callback, 16);
};
global.cancelAnimationFrame = (id) => {
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
