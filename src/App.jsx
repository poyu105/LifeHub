import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FoodRec from "./pages/FoodRec";
import TrafficGuide from "./pages/TrafficGuide";
import ShoppingGuide from "./pages/ShoppingGuide";
import Entertainment from "./pages/Entertainment";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Post from "./pages/Post";
import { useEffect, useState } from "react";

// NavbarWrapper component to handle title passing
function NavbarWrapper() {
  const location = useLocation();
  const [title, setTitle] = useState('');

  useEffect(() => {
    // Mapping path to title
    const pathToTitleMap = {
      "/": "Home",
      "/foodRec": "美食推薦",
      "/trafficGuide": "交通指南",
      "/shoppingGuide": "購物指南",
      "/entertainment": "休閒娛樂",
      "/profile": "個人檔案",
      "/post":"新增貼文"
    };

    const currentPath = location.pathname;
    setTitle(pathToTitleMap[currentPath]);
  }, [location]);

  return <Navbar title={title} />;
}

function App() {
  return (
      <Router>
        <AuthProvider>
          <NavbarWrapper />
          <Routes>
            <Route path="/LifeHub" element={<Navigate to='/' replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/foodRec" element={<FoodRec />} />
            <Route path="/trafficGuide" element={<TrafficGuide />} />
            <Route path="/shoppingGuide" element={<ShoppingGuide />} />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App;
