//Setting up Parse
// ** importing Parse as configured in vite.config.js:
import "./parseConfig.js";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import UserProfile from "./pages/UserProfile"; 
import BumpSent from "./pages/BumpSent.jsx";
import BumpReceived from "./pages/BumpReceived.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user/:userId" element={<UserProfile />} />  
          <Route path="/bump-sent" element={<BumpSent />} />
          <Route path="/bump-received" element={<BumpReceived />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
