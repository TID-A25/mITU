/**
 * Implement a React hook to fetch a single user profile from Parse.
 * - Accepts a profile ID as input.
 * - Uses useState to store the profile.
 * - Uses useEffect to trigger a fetch when the ID changes or the component mounts.
 * - Calls a service function to get the data.
 * - Returns the formatted profile object (via profileMapper).
 */