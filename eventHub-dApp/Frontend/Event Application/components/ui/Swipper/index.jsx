'use client'

import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import { images } from '@/lib/images'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function SwiperComponent() {
    return (
        <section id="prototypes" className='py-12 flex justify-center rounded-lg'>
            <div className='container m-auto flex justify-center'>
                <Swiper
                    navigation
                    pagination={{ type: 'fraction' }}
                    modules={[Navigation, Pagination]}
                    onSwiper={swiper => console.log(swiper)}
                    autoplay={{ delay: 3000 }}
                    loop
                    className='h-96 w-full hover:scale-110 transition duration-300 ease-in-out rounded-lg flex justify-center'
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className='flex h-full w-full items-center justify-center'>
                                <Image
                                    src={image.image}
                                    alt={image.alt}
                                    height={400}
                                    width={400}
                                    className='block h-full w-full object-cover'
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}