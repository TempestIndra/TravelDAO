import BookingSteps from "../organs/BookingSteps"
import HeroSection from "../organs/HeroSection"
import Partners from "../organs/Partners"
import Services from "../organs/Services"
import TopDestination from "../organs/TopDestination"


const Home = () => {
    return (
        <>
            <HeroSection />
            <Services />
            <TopDestination />
            <BookingSteps />
            <Partners />
        </>
    )
}

export default Home