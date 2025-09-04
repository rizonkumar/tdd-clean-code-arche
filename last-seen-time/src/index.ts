/**
 * Main entry point for the TypeScript Bootcamp project
 */

export function greet(name: string): string {
  return `Hello, ${name}! Welcome to TypeScript Bootcamp!`;
}

export function add(a: number, b: number): number {
  return a + b;
}

// Example usage
if (require.main === module) {
  console.log(greet("World"));
  console.log(`2 + 3 = ${add(2, 3)}`);
}
