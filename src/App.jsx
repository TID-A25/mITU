import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import UserProfile from "./pages/UserProfile";
import OtherUserProfile from "./pages/OtherUserProfile";
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
          <Route path="/other-user-profile" element={<OtherUserProfile />} />
          <Route path="/bump-sent" element={<BumpSent />} />
          <Route path="/bump-received" element={<BumpReceived />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
