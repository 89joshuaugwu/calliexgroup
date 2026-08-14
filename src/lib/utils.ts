import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Deep-merges `overrides` on top of `defaults`, same behaviour as the old
 * theme's CX_CMS::merge_recursive: plain objects merge key-by-key, but
 * arrays and primitives are replaced wholesale. This means an admin only
 * ever needs to save the fields that changed — anything they've never
 * touched still falls back to the shipped defaults, so newly-added schema
 * fields never render blank for content nobody has edited yet.
 */
export function deepMerge<T>(defaults: T, overrides: Partial<T> | undefined | null): T {
  if (!overrides) return defaults;
  if (Array.isArray(defaults)) {
    return (Array.isArray(overrides) ? overrides : defaults) as T;
  }
  if (isPlainObject(defaults) && isPlainObject(overrides)) {
    const result: Record<string, unknown> = { ...(defaults as Record<string, unknown>) };
    for (const key of Object.keys(overrides as Record<string, unknown>)) {
      const overrideValue = (overrides as Record<string, unknown>)[key];
      const defaultValue = (defaults as Record<string, unknown>)[key];
      result[key] =
        defaultValue !== undefined ? deepMerge(defaultValue, overrideValue as never) : overrideValue;
    }
    return result as T;
  }
  return (overrides as T) ?? defaults;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Reads a dot-path ("hero.title", "china.services") off a nested object. */
export function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/** Immutably writes `value` at a dot-path, cloning only the objects along the way. */
export function setByPath<T extends object>(obj: T, path: string, value: unknown): T {
  const keys = path.split(".");
  const clone = (Array.isArray(obj) ? [...(obj as unknown[])] : { ...(obj as Record<string, unknown>) }) as Record<
    string,
    unknown
  >;
  let cursor: Record<string, unknown> = clone;

  keys.forEach((key, i) => {
    if (i === keys.length - 1) {
      cursor[key] = value;
      return;
    }
    const next = cursor[key];
    const nextClone = (Array.isArray(next) ? [...(next as unknown[])] : { ...(next as Record<string, unknown>) }) as Record<
      string,
      unknown
    >;
    cursor[key] = nextClone;
    cursor = nextClone;
  });

  return clone as T;
}

/** Stable id for new repeater rows added in the admin (board members, offices, etc). */
export function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function formatPhoneHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
