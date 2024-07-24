import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import FoodRec from "./pages/FoodRec"
import TrafficGuide from "./pages/TrafficGuide"
import ShoppingGuide from "./pages/ShoppingGuide"
import Entertainment from "./pages/Entertainment"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/LifeHub" element={<Navigate to='/' replace/>}/>

          <Route path="/" element={<Home/>} />
          <Route path="/FoodRec" element={<FoodRec/>}/>
          <Route path="/TrafficGuide" element={<TrafficGuide/>}/>
          <Route path="/ShoppingGuide" element={<ShoppingGuide/>}/>
          <Route path="/Entertainment" element={<Entertainment/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Login" element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
