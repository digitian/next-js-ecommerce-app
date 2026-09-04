import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Unmount rendered components between tests. @testing-library/react only
// auto-registers this when it detects Jest-style test globals; since this
// project imports `describe`/`it`/`expect` explicitly instead of enabling
// vitest's `globals: true`, it has to be wired up by hand.
afterEach(() => {
  cleanup();
});
