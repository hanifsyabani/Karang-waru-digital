"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import Jumbotron from "./jumbotron";
export default function CarouselJumbotron() {
    return (
        <Swiper
            spaceBetween={30}
            effect={"fade"}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{
                clickable: true,
            }}
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            className="mySwiper"
        >
            <SwiperSlide>
                <section
                    style={{
                        backgroundImage: "url('/desa-main.png')",
                        height: "90vh",
                    }}
                    className=" bg-cover bg-center flex items-center text-white px-10"
                >
                    <div className="absolute inset-0 bg-black/30 z-0" />

                    <Jumbotron />
                </section>
            </SwiperSlide>
            <SwiperSlide>
                <section
                    style={{
                        backgroundImage: "url('/bg-2.jpg')",
                        height: "90vh",
                    }}
                    className=" bg-cover bg-center flex items-center text-white px-10"
                >
                    <div className="absolute inset-0 bg-black/30 z-0" />

                    <Jumbotron />
                </section>
            </SwiperSlide>
        </Swiper>
    )
}
