'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CardUmkm from "./umkm/card-umkm";
import { umkmContent } from "@/lib/items";

export default function CarouselUmkm() {
    return (
        <div className="my-10 flex justify-center items-center px-10">
            <Swiper
                slidesPerView={3}
                spaceBetween={60}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {umkmContent.map((item) => (
                    <SwiperSlide key={item.title}>
                        <CardUmkm data={item} key={item.title} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
