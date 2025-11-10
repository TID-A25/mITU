/**
 * Build utility functions to transform Parse objects into plain JavaScript objects.
 * - Avoid exposing Parse-specific structures to UI components.
 * - Map field names cleanly (e.g., .get("name") → name).
 * - Handle optional fields, nested relations, and fallback defaults.
 * - Add multiple mappers if needed (e.g., mapProfile, mapInterests).
 */