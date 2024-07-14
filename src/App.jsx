import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/LifeHub" element={<Navigate to='/' replace/>}/>

          <Route path="/" element={<Home/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
