import { useCallback, useRef } from "react";
import { Text } from "../atoms/Text"
import { TopHotelTexts } from "../particles/DataLists";
import Slider from "react-slick";
import { Card } from "../molecules/Card";
import hotel1 from "../../assets/hotel1.jpeg"
import hotel2 from "../../assets/hotel2.jpeg"
import hotel3 from "../../assets/hotel3.jpeg"
import hotel4 from "../../assets/hotel4.jpeg"
import hotel5 from "../../assets/hotel5.jpeg"
import { Button } from "../atoms/Button";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useModal } from "../molecules/ModalHelper";


const TopHotels = () => {

    const sliderRef = useRef<Slider | null>();
    const { openModal, closeModal, ModalComponent  } = useModal(); 

    // Function for next button
    const next = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();

        }
    };
    // function for previous button
    const previous = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }

    };

    // Slider settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    dots: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };

    const renderCities = useCallback((element: number) => {
        switch (element) {
            case 0:
                return hotel1;
            case 1:
                return hotel2;
            case 2:
                return hotel3;
            case 3:
                return hotel4;
            case 4:
                return hotel5;
            default:
                return "";
        }
    }, [])

    return (
        <section className="w-full h-auto flex flex-col items-center justify-center relative lg:px-24 md:px-20 px-6 my-20">
            <Text as="p" className="font-light text-base text-color3/80 tracking-widest">
                {TopHotelTexts.firstText}
            </Text>
            <br></br>
            <Text as="h2" className="md:text-4xl text-2xl font-medium capitalize text-color3">
                {TopHotelTexts.secondText}
            </Text>

            {/* Controllers  */}
            <div className="mt-12 w-full flex justify-end gap-5 items-center md:px-6 px-3">
                <Button onClick={previous} className="cursor-pointer outline-none border-none bg-color2/30 text-color3 hover:bg-color2 p-2 rounded-full" type="button">
                    <CaretLeft size={18} color="currentColor" weight="fill" />
                </Button>
                <Button onClick={next} className="cursor-pointer outline-none border-none bg-color2/30 text-color3 hover:bg-color2 p-2 rounded-full" type="button">
                    <CaretRight size={18} color="currentColor" weight="fill" />
                </Button>
            </div>

            {/* Slides  */}
            <div className="w-full h-auto mt-4">
                <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
                    {
                        TopHotelTexts.cards.map((card, index) => (
                            <div key={index} className="md:px-6 px-3">
                                <br></br>
                                <Card
                                cardClass="overflow-hidden shadow-md rounded-lg cursor-pointer group"
                                imageAlt={card.rating}
                                imageSrc={renderCities(index)}
                                imageWrapperClass="w-full h-[250px] overflow-hidden"
                                cover="group-hover:scale-125 transition duration-500 ease"
                                textWrapperClass="flex flex-col gap-4 w-full px-5 py-5"
                                onClick={() => {
                                    // console.log("Card clicked:", renderCities(index));
                                    openModal(card,index); // Open the modal with card data
                                }}
                            >
                                    <div className="flex justify-between items-center">
                                        <Text as="h4" className="text-base font-medium text-color3">
                                            {card.rating}
                                        </Text>
                                        <Text as="small" className=" text-color3 font-light text-sm">
                                            {card.price}
                                        </Text>
                                    </div>
                                    {/* <div className="w-full flex gap-4 items-center text-color3">
                                        <AirplaneTilt size={20} color="currentColor" weight="fill" />
                                        <Text as="p" className=" text-color3 font-light text-base">
                                            {card.duration}
                                        </Text>
                                    </div> */}
                                </Card>
                            </div>
                        ))
                    }
                </Slider>
            </div>
            {ModalComponent}
        </section>
    )
}

export default TopHotels