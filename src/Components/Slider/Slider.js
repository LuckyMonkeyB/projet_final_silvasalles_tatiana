'use client'
import React, { useEffect, useState } from 'react'
import { fetchData } from '@/app/api/pokedata'
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import styles from '@/ui/slider.module.css'


export default function Slider() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [imgRandom, setImgRandom] = useState([])

    useEffect(()=>{
        fetchData(setData, setIsLoading)
    }, [])

    useEffect(() => {
        const random = data.sort(() => 0.5 - Math.random()).slice(0, 5)
        setImgRandom(random)
    }, [isLoading])
    console.log(imgRandom)

    return (
        <div className='flex justify-center w-full h-72' >
            <Carousel className="flex justify-center items-center" >
                <CarouselContent>
                    {
                        imgRandom.map((pokemon, id) => (<CarouselItem className="flex justify-center items-center" key={id} >
                            <Image src={pokemon.image} width={200} height={200} alt={pokemon.name}/>
                        </CarouselItem>))
                    }
                </CarouselContent>
                <CarouselPrevious  />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
