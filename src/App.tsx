import '@smastrom/react-rating/style.css'
import { Outlet } from "react-router-dom"
import Footer from './components/common/Footer'
import Header from "./components/common/Header"

function App() {


  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
