import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns `true` once the component has mounted on the client.
 *
 * Prefer this over `useState(false)` + `useEffect(() => setMounted(true), [])`
 * for the common "avoid hydration mismatch by rendering a skeleton until
 * client-only state (e.g. a Zustand-persisted store) is available" pattern —
 * `useSyncExternalStore` reports the client value synchronously instead of
 * triggering a setState from inside an effect.
 */
export function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
