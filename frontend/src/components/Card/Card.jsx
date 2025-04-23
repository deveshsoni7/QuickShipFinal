import React from 'react';

const cardData = [
    {
        img: (
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8-4 8 4v6a8 8 0 11-16 0V7z"></path>
                <circle cx="12" cy="12" r="2" strokeLinecap="round" strokeLinejoin="round"></circle>
            </svg>
        ),
        title: "Your parcel, delivered at the best price",
        des: "No matter the size or destination, find the best delivery options with our reliable couriers at unbeatable rates.",
    },
    {
        img: (
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
        ),
        title: "Trust who’s handling your package",
        des: "We carefully vet our delivery partners, ensuring verified profiles and real customer reviews so you can send with confidence.",
    },
    {
        img: (
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
        ),
        title: "Book in seconds, track in real time!",
        des: "Sending a parcel has never been easier! Just enter your details, choose a delivery option, and track your package every step of the way.",
    },
];

const Card = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 max-w-6xl mx-auto">
            {cardData.map((card, index) => (
                <div key={index} className="flex flex-col space-y-4 items-start space-x-4 p-4">

                    <div className="flex-shrink-0">{card.img}</div>
                    <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
                    <p className="text-gray-400 mt-1 font-bold text-sm">{card.des}</p>
                </div>
            ))}
        </div>
    );
};

export default Card;
