import { Routes, Route, useLocation } from "react-router-dom";
//importing react slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { animateScroll } from "react-scroll";

import NavBar from "./components/organs/NavBar"
import Home from "./components/pages/Home";
import Destination from "./components/pages/Destination"
import Transfer  from "./components/pages/Transfer";
import Flights from "./components/pages/Flights";
import Bookings from "./components/pages/Bookings";

import { useEffect } from "react";
import Footer from "./components/organs/Footer";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";


function App() {
  const directory = useLocation();
  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 0,
    });
  }, [directory.pathname]);

  

  return (
    <ChakraProvider>
    <CSSReset />
    {/* The rest of your app components */}

    <div className="w-full bg-white text-gray-950 font-poppins">
      <NavBar />
      <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/destination" element={<Destination />} />
                <Route path="/transfer " element={<Transfer />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/bookings" element={<Bookings />} />
            </Routes>
      <Footer />
    </div>
    </ChakraProvider>
  )
}

export default App
