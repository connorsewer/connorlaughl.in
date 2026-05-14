"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Returns true once the component has hydrated on the client.
 * Uses useSyncExternalStore so it does not trigger
 * react-hooks/set-state-in-effect lint warnings.
 */
export function useClientMounted(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
