import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveValue(value: string | number | string[]): R;
      // Add other custom matchers you use
    }
  }
}

// This exports an empty object to make it a module
export {};
