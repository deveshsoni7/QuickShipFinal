import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const routes = [
    {
        to: "Delhi",
        image: "https://lh5.googleusercontent.com/p/AF1QipNT3MFYBjz2Mf13lhr3Ib3742ksR0rVlVphOy5z=w675-h390-n-k-no",
    },
    {
        to: "Jaipur",
        image: "https://lh5.googleusercontent.com/p/AF1QipNNCNn4A9ujrP0drFeNWF0ewQJllcIA7CuLUEmT=w675-h390-n-k-no",
    },
    {
        to: "Mumbai",
        image: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcT3D8FVbnHXx3AyXasHIP9kgpttazxT_MnAEQpS2eiPXsFQygyOEclbVDMKjEwiA6KYuhc_jA3hYSwtNWtKz735ez6V6GMxD1sq3uF-VLc",
    },
    {
        to: "Bangalore",
        image: "https://lh5.googleusercontent.com/p/AF1QipMHvkB151icA3Pa0YFWpakcpCv_LplFa1gorz6j=w675-h390-n-k-no",
    },
    {
        to: "Kolkata",
        image: "https://lh5.googleusercontent.com/p/AF1QipNnptrhpIWg381UziEAXkVOywjV11rBzKaVIlsb=w675-h390-n-k-no",
    },
];

const LastCard = () => {
    return (
        <div className="w-[80%] mx-auto py-10">
            {/* Section Title */}
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our best working places</h2>

            {/* Swiper Slider */}
            <Swiper
                slidesPerView={1.2}
                spaceBetween={20}
                navigation
                modules={[Navigation]}
                breakpoints={{
                    640: { slidesPerView: 1.5 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="relative"
            >
                {routes.map((route, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105">
                            <img src={route.image} alt={route.to} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold flex items-center justify-center">{route.to}</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default LastCard;