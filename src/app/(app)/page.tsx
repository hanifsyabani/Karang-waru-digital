"use client";

import CardStatistik from "@/components/landing_page/card-statistik";
import HeaderSection from "@/components/landing_page/header-section";
import Jumbotron from "@/components/landing_page/jumbotron";
import { Badge } from "@/components/ui/badge";
import { cardStatsItems, contactItems, umkmContent } from "@/lib/items";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import CardBerita from "@/components/landing_page/berita/card-berita";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import CardUmkm from "@/components/landing_page/umkm/card-umkm";
import CardContact from "@/components/landing_page/card-contact";

export default function page() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
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
              height: "100vh",
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
              backgroundImage: "url('/desa-second.png')",
              height: "100vh",
            }}
            className=" bg-cover bg-center flex items-center text-white px-10"
          >
            <div className="absolute inset-0 bg-black/30 z-0" />

            <Jumbotron />
          </section>
        </SwiperSlide>
      </Swiper>

      <section className="px-10 py-20">
        <div className="flex justify-center py-4">
          <Badge className="bg-green-100 text-primary text-xl flex justify-center items-center gap-2">
            <div className="rounded-full bg-primary w-2 h-2 " />
            Data Statistik
          </Badge>
        </div>
        <p className="text-center text-lg">
          {" "}
          Gambaran data perkembangan Desa Karang Waru
        </p>

        <div className="flex justify-center items-center gap-10 py-10">
          {cardStatsItems.map((item) => (
            <CardStatistik item={item} key={item.title} />
          ))}
        </div>
      </section>

      <section className="px-10 py-20 space-y-2">
        <HeaderSection
          title="Berita Terkini"
          subtitle="Ikuti berita terkini Desa Karang Waru"
        />

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
      </section>

      <section className="px-10 py-20 space-y-2">
        <HeaderSection
          title="UMKM Desa"
          subtitle="Temukan berbagai produk unggulan dari UMKM Desa Karang Waru"
        />

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
      </section>

      <section>
        <div className="px-8 py-10 space-y-2 bg-gradient-to-r from-primary to-green-800 text-center">
          <div className="space-y-5 ">
            <div className="flex items-center justify-center gap-2">
              <div className="rounded-full bg-green-100 w-2 h-2 " />
              <h1 className="text-white font-semibold text-xl">Desa Digital</h1>
            </div>
            <h1 className="text-5xl text-white font-bold">
              Ingin mengenal Desa Karang Waru lebih dekat?
            </h1>
            <p className="text-xl text-white">
              Temukan Informasi Lengkap Desa Karang Waru dan Layanan yang
              tersedia
            </p>
          </div>

          <div className="flex justify-center items-center gap-4 mt-10">
            <Button className="bg-white text-green-800 cursor-pointer hover:bg-gray-300  ">
              <Info />
              Lihat Layanan Desa
            </Button>
            <Button className="bg-green-800 text-white cursor-pointer ">
              <Info /> Tentang Desa Kami
            </Button>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4CAF50" />{" "}
              <stop offset="100%" stopColor="#166534" />{" "}
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            fillOpacity="1"
            d="M0,160L80,138.7C160,117,320,75,480,74.7C640,75,800,117,960,128C1120,139,1280,117,1360,106.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </section>

      <section className="px-10 py-20 space-y-2">
        <div className="flex justify-center py-4">
          <Badge className="bg-green-100 text-primary text-xl flex justify-center items-center gap-2">
            <div className="rounded-full bg-primary w-2 h-2" />
            Lokasi dan Kontak
          </Badge>
        </div>
        <p className="text-center">
          Temukan Lokasi dan Kontak Desa Karang Waru
        </p>

        <div className="my-10 flex gap-8 items-center">
          <div className="w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.123456789!2d110.1234567!3d-7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a1234567890%3A0xabcdef123456789!2sDesa%20Karang%20Waru!5e0!3m2!1sid!2sid!4v1694000000000!5m2!1sid!2sid"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="w-1/2 space-y-4">
           {contactItems.map((item :any) => (
            <CardContact item={item} key={item.title}/>
           ))}
          </div>
        </div>
      </section>
    </>
  );
}
