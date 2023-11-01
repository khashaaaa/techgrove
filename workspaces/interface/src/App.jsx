import { LoaderProvider } from './context/LoaderContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing } from "./pages/Landing"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { ShopCart } from "./pages/ShopCart"

function App() {

  return (
    <LoaderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shopcart" element={<ShopCart />} />
        </Routes>
      </Router>
    </LoaderProvider>
  )
}

export default App
