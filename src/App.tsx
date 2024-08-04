import '@smastrom/react-rating/style.css'
import { Toaster } from 'react-hot-toast'
import { Outlet } from "react-router-dom"
import Footer from './components/common/Footer'
import Header from "./components/common/Header"

function App() {


  return (
    <>
      <Header />
      <div className='min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
