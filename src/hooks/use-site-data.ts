"use client";

import { useEffect, useState } from "react";

/**
 * Site data types — mirror the API contract documented in worklog.md.
 */
export type SiteContent = Record<string, string>;

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  link?: string | null;
  tags?: string | null;
  featured: boolean;
  order: number;
}

export interface Vacancy {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  description: string;
  requirements: string;
  hiring: boolean;
  order: number;
}

export interface GalleryImage {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  order: number;
}

export interface Review {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  rating: number;
  message: string;
  avatarUrl?: string | null;
  approved: boolean;
}

export interface Award {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  issuer: string;
  year: string;
  order: number;
}

export interface SiteData {
  content: SiteContent;
  products: Product[];
  vacancies: Vacancy[];
  gallery: GalleryImage[];
  reviews: Review[];
  awards: Award[];
}

export interface SiteDataState {
  data: SiteData | null;
  loading: boolean;
  error: string | null;
}

// Module-level cache so every section component on the page shares one fetch.
let cache: SiteData | null = null;
let inflight: Promise<SiteData> | null = null;

const EMPTY_DATA: SiteData = {
  content: {},
  products: [],
  vacancies: [],
  gallery: [],
  reviews: [],
  awards: [],
};

async function fetchAll(): Promise<SiteData> {
  const endpoints = [
    "/api/content",
    "/api/products",
    "/api/vacancies",
    "/api/gallery",
    "/api/reviews",
    "/api/awards",
  ] as const;

  const [contentRes, productsRes, vacanciesRes, galleryRes, reviewsRes, awardsRes] =
    await Promise.all(endpoints.map((url) => fetch(url)));

  if (!contentRes.ok) throw new Error("Failed to load site content");

  const [content, products, vacancies, gallery, reviews, awards] = await Promise.all([
    contentRes.json(),
    productsRes.ok ? productsRes.json() : [],
    vacanciesRes.ok ? vacanciesRes.json() : [],
    galleryRes.ok ? galleryRes.json() : [],
    reviewsRes.ok ? reviewsRes.json() : [],
    awardsRes.ok ? awardsRes.json() : [],
  ]);

  return {
    content: (content ?? {}) as SiteContent,
    products: (products ?? []) as Product[],
    vacancies: (vacancies ?? []) as Vacancy[],
    gallery: (gallery ?? []) as GalleryImage[],
    reviews: (reviews ?? []) as Review[],
    awards: (awards ?? []) as Award[],
  };
}

function loadOnce(): Promise<SiteData> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;
  inflight = fetchAll()
    .then((data) => {
      cache = data;
      return data;
    })
    .catch((err) => {
      // Reset inflight so subsequent mounts can retry.
      inflight = null;
      throw err;
    });
  return inflight;
}

/**
 * Hook that loads all public site data (content + collections) once per page.
 * Uses a module-level cache so multiple section components share one fetch.
 */
export function useSiteData(): SiteDataState {
  const [state, setState] = useState<SiteDataState>(() => ({
    data: cache,
    loading: cache === null,
    error: null,
  }));

  useEffect(() => {
    let mounted = true;
    // If cache already populated, initial state is already correct — nothing to do.
    if (cache) return;
    loadOnce()
      .then((data) => {
        if (mounted) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (mounted) {
          setState({
            data: EMPTY_DATA,
            loading: false,
            error: err instanceof Error ? err.message : "Failed to load data",
          });
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  return state;
}

/**
 * Safe accessor for content values with sensible fallbacks.
 */
export function getContent(content: SiteContent | undefined, key: string, fallback = ""): string {
  if (!content) return fallback;
  return content[key] ?? fallback;
}

/**
 * Parse a JSON-encoded array stored in SiteContent. Returns fallback on error.
 */
export function parseContentJson<T>(content: SiteContent | undefined, key: string, fallback: T): T {
  if (!content || !content[key]) return fallback;
  try {
    const parsed = JSON.parse(content[key]);
    return Array.isArray(parsed) ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}
