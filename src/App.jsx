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
      "/FoodRec": "美食推薦",
      "/TrafficGuide": "交通指南",
      "/ShoppingGuide": "購物指南",
      "/Entertainment": "休閒娛樂",
      "/Profile": "個人檔案",
      "/Post":"新增貼文"
    };

    const currentPath = location.pathname;
    setTitle(pathToTitleMap[currentPath]);
  }, [location]);

  return <Navbar title={title} />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarWrapper />
        <Routes>
          <Route path="/LifeHub" element={<Navigate to='/' replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/FoodRec" element={<FoodRec />} />
          <Route path="/TrafficGuide" element={<TrafficGuide />} />
          <Route path="/ShoppingGuide" element={<ShoppingGuide />} />
          <Route path="/Entertainment" element={<Entertainment />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Post" element={<Post />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
