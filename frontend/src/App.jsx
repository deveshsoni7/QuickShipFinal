import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import PublishRide from "./pages/Publish_Ride/PublishRide";
import RideSearch from "./pages/Ride_Search/RideSearch";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Profile from "./pages/Profile/Profile.jsx";
import MyRides from "./pages/MyRides/MyRides.jsx";

function App() {
  const [loginPop, setLoginPop] = useState(false); // Fixed naming

  return (
    <>
      {/* Only show popup when loginPop is true */}
      {loginPop && <LoginPopup setLoginPop={setLoginPop} />}
      
      <div className="bg-black-700">
        <Navbar setLoginPop={setLoginPop} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PublishRide" element={<PublishRide />} />
          <Route path="/RideSearch" element={<RideSearch />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/myRides"  element={<MyRides/>}/>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
