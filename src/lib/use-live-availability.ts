"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { NextSlot } from "@/lib/booking";

type AvailabilityApiPayload = {
  updatedAt: string;
  timezone: string;
  byId?: Record<string, NextSlot | null>;
  bySlug?: Record<string, NextSlot | null>;
  feesBySlug?: Record<string, { fee: number; durationMinutes: number }>;
};

const REFRESH_INTERVAL_MS = 120_000;

/**
 * Keeps doctor appointment timings live against /api/availability.
 * Uses SSR-rendered slots immediately (zero flash) and fetches fresh database
 * timings on mount, on tab return, and every 2 minutes so cards always show
 * real appointment dates & times instead of falling back to generic placeholders.
 */
export function useLiveAvailabilityBySlug(
  slugs: readonly string[],
  initialSlots: Record<string, NextSlot | null>,
  initialFees?: Record<string, { fee: number; durationMinutes: number }>,
) {
  const [slots, setSlots] = useState<Record<string, NextSlot | null>>(initialSlots);
  const [fees, setFees] = useState<Record<string, { fee: number; durationMinutes: number }>>(
    initialFees ?? {},
  );
  const [isSyncing, setIsSyncing] = useState(false);
  const slugsKey = useMemo(() => [...slugs].sort().join(","), [slugs]);
  const initialRef = useRef(initialSlots);
  initialRef.current = initialSlots;

  useEffect(() => {
    if (!slugsKey) return;
    let active = true;
    const hasMissing = slugs.some((slug) => !initialRef.current[slug]);

    async function sync(forceFresh: boolean) {
      try {
        if (active) setIsSyncing(true);
        const query = new URLSearchParams({ slugs: slugsKey });
        if (forceFresh) query.set("fresh", "1");
        const res = await fetch(`/api/availability?${query.toString()}`, {
          cache: forceFresh ? "no-store" : "default",
        });
        if (!res.ok) return;
        const data = (await res.json()) as AvailabilityApiPayload;
        if (!active) return;

        if (data.bySlug) {
          setSlots((prev) => {
            const next = { ...prev };
            for (const [slug, slot] of Object.entries(data.bySlug ?? {})) {
              if (slot) next[slug] = slot;
            }
            return next;
          });
        }
        if (data.feesBySlug) {
          setFees((prev) => ({ ...prev, ...data.feesBySlug }));
        }
      } catch {
        // Keep last-known-good SSR slots on transient network failures
      } finally {
        if (active) setIsSyncing(false);
      }
    }

    // Immediate sync if any SSR slot was missing, otherwise gentle refresh
    void sync(hasMissing);

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void sync(false);
    }, REFRESH_INTERVAL_MS);

    const onVisibility = () => {
      if (document.visibilityState === "visible") void sync(false);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      active = false;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [slugsKey, slugs]);

  return { slots, fees, isSyncing };
}

/**
 * Same live availability sync keyed by numeric booking doctor ID
 * (used on /services/* specialist booking grids).
 */
export function useLiveAvailabilityById(
  doctorIds: readonly number[],
  initialSlots: Record<number, NextSlot | null>,
) {
  const [slots, setSlots] = useState<Record<number, NextSlot | null>>(initialSlots);
  const [isSyncing, setIsSyncing] = useState(false);
  const idsKey = useMemo(() => [...doctorIds].sort((a, b) => a - b).join(","), [doctorIds]);
  const initialRef = useRef(initialSlots);
  initialRef.current = initialSlots;

  useEffect(() => {
    if (!idsKey) return;
    let active = true;
    const hasMissing = doctorIds.some((id) => !initialRef.current[id]);

    async function sync(forceFresh: boolean) {
      try {
        if (active) setIsSyncing(true);
        const query = new URLSearchParams({ doctorIds: idsKey });
        if (forceFresh) query.set("fresh", "1");
        const res = await fetch(`/api/availability?${query.toString()}`, {
          cache: forceFresh ? "no-store" : "default",
        });
        if (!res.ok) return;
        const data = (await res.json()) as AvailabilityApiPayload;
        if (!active || !data.byId) return;

        setSlots((prev) => {
          const next = { ...prev };
          for (const [idStr, slot] of Object.entries(data.byId ?? {})) {
            const id = Number(idStr);
            if (slot && Number.isFinite(id)) next[id] = slot;
          }
          return next;
        });
      } catch {
        // Keep last-known-good SSR slots
      } finally {
        if (active) setIsSyncing(false);
      }
    }

    void sync(hasMissing);

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void sync(false);
    }, REFRESH_INTERVAL_MS);

    const onVisibility = () => {
      if (document.visibilityState === "visible") void sync(false);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      active = false;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [idsKey, doctorIds]);

  return { slots, isSyncing };
}
