import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFiles: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
