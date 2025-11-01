"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CardBerita from "./berita/card-berita";
export default function CarouselBerita() {
    return (
        <div className="my-10 px-10">
            <Swiper
                slidesPerView={3}
                spaceBetween={60}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <CardBerita />
                </SwiperSlide>
                <SwiperSlide>
                    <CardBerita />
                </SwiperSlide>
                <SwiperSlide>
                    <CardBerita />
                </SwiperSlide>
                <SwiperSlide>
                    <CardBerita />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
