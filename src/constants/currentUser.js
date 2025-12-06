import Parse from "parse";

// In-memory cache for demo users
export let DEMO_USERS = {};
export let CURRENT_USER_ID = null;

// Fetch demo users from Cloud Function
export const fetchDemoUsers = async () => {
  try {
    const result = await Parse.Cloud.run("getDemoUsers");
    DEMO_USERS = result.reduce((acc, user) => {
      acc[user.id] = user.name;
      return acc;
    }, {});
    
    // Set default user if none selected
    if (!CURRENT_USER_ID && result.length > 0) {
      CURRENT_USER_ID = result[0].id;
    }
    
    return DEMO_USERS;
  } catch (error) {
    console.error("Failed to fetch demo users:", error);
    return {};
  }
};

// Function to set current user
export const setCurrentUserId = async (userId) => {
  try {
    const result = await Parse.Cloud.run("setDemoUser", { userId });
    if (result.success) {
      CURRENT_USER_ID = userId;
      localStorage.setItem('demoCurrentUserId', userId);
      return true;
    }
  } catch (error) {
    console.error("Failed to set current user:", error);
    return false;
  }
};

// Get current user name
export const getCurrentUserName = () => {
  return DEMO_USERS[CURRENT_USER_ID] || "Unknown User";
};

// Load saved user from localStorage and validate with server
export const initializeCurrentUser = async () => {
  const saved = localStorage.getItem('demoCurrentUserId');
  
  // Fetch available users from Cloud Function
  await fetchDemoUsers();
  
  // If saved user exists and is valid, use it
  if (saved && DEMO_USERS[saved]) {
    CURRENT_USER_ID = saved;
  } else if (Object.keys(DEMO_USERS).length > 0) {
    // Otherwise use first available user
    CURRENT_USER_ID = Object.keys(DEMO_USERS)[0];
  }
  
  return CURRENT_USER_ID;
};