// Parse SDK configuration and initialization
// This file sets up the connection to the Back4App Parse server
import Parse from "parse";

// Initialize Parse with app credentials
Parse.initialize(
  "aWNL9Z0PjnXfY2j23yo3HgcKgW0oqsoHQ430hwly", // App ID from Back4App
  "ekx89ghYcTfy9OOPoHLaPg5Aa4pXksoGL5ZiUnha" // JavaScript Key from Back4App
);

// Set the Parse server endpoint URL
Parse.serverURL = "https://parseapi.back4app.com/";

// Export configured Parse instance for use throughout the app
export default Parse;
