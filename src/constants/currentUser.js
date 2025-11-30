export let DEMO_USERS = {
  "C6YoifVWmr": "Vic",
  "ZrPhWimRDD": "Sine", 
  "wJNOGypooS": "Jakob",
  "pMvUvPogNg": "Caroline"
}; 

export let CURRENT_USER_ID = "C6YoifVWmr"; // Default to Vic

// Function to set current user
export const setCurrentUserId = (userId) => {
  CURRENT_USER_ID = userId;
  localStorage.setItem('demoCurrentUserId', userId);
};

// Get current user name
export const getCurrentUserName = () => {
  return DEMO_USERS[CURRENT_USER_ID] || "Unknown User";
};

// Load saved user from localStorage or use default 
export const initializeCurrentUser = () => {
  const saved = localStorage.getItem('demoCurrentUserId');
  if (saved && DEMO_USERS[saved]) {
    CURRENT_USER_ID = saved;
  }
  return CURRENT_USER_ID;
};