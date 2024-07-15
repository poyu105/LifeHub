import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import FoodRec from "./pages/FoodRec"
import TrafficGuide from "./pages/TrafficGuide"
import ShoppingGuide from "./pages/ShoppingGuide"
import Entertainment from "./pages/Entertainment"

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
        </Routes>
      </Router>
    </>
  )
}

export default App
