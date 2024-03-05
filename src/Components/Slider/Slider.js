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

    const [bgStyles, setBgStyles] = useState([])

    useEffect(()=>{
        fetchData(setData, setIsLoading)
    }, [])

    useEffect(() => {
        const random = data.sort(() => 0.5 - Math.random()).slice(0, 5)
        setImgRandom(random)
    }, [isLoading])
    console.log(imgRandom)

    useEffect(() => {
        const styling = imgRandom.map((pokemon) => {
            const lastType = pokemon.apiTypes[pokemon.apiTypes.length - 1]?.name.toLowerCase()

            switch (lastType) {
                case 'normal':
                    return{
                        backgroundImage: 'linear-gradient(to right top, #f1f2f2, #e9eaea, #e1e2e2, #d9dadb, #d1d2d3)',
                    }
                case 'électrik':
                    return {
                        backgroundImage: 'linear-gradient(to right, #fcfc83, #fcea78, #fad86f, #f7c768, #f2b663)',
                    };
                case 'feu':
                    return {
                        backgroundImage: 'linear-gradient(to right, #fcc283, #feb769, #ffac4f, #ffa132, #ff9500)',
                    };
                case 'eau':
                    return {
                        backgroundImage: 'linear-gradient(to right, #98cae4, #7cbce1, #5fafdf, #3fa0dd, #0392da)',
                    };
                case 'plante':
                    return {
                        backgroundImage: 'linear-gradient(to right, #b6f263, #95d954, #75c046, #56a738, #358f2b)',
                    };
                case 'glace':
                    return {
                        backgroundImage: 'linear-gradient(to right, #d7ebf1, #b3d6e0, #8dc2cf, #65aebe, #329aad)',
                    };
                case 'combat':
                    return {
                        backgroundImage: 'linear-gradient(to right, #f2d9d8, #f4b0ac, #f08680, #e65a53, #d71d26)',
                    };
                case 'poison':
                    return {
                        backgroundImage: 'linear-gradient(to right, #e9a5f1, #d186d6, #b967ba, #a1479f, #8a2485)',
                    };
                case 'sol':
                    return {
                        backgroundImage: 'linear-gradient(to right, #c1a598, #a48a7e, #887065, #6d574d, #533f36)',
                    };
                case 'vol':
                    return {
                        backgroundImage: 'linear-gradient(to right, #eaedf3, #c8d3ec, #a8b9e5, #8aa0dd, #6c86d4)',
                    };
                case 'psy':
                    return {
                        backgroundImage: 'linear-gradient(to right, #e7d3dd, #e6adc7, #e485ad, #df598f, #d80e6f)',
                    };
                case 'insecte':
                    return {
                        backgroundImage: 'linear-gradient(to right, #bfbfbf, #8fa5b8, #40939e, #007c60, #315e03)',
                    };
                case 'roche':
                    return {
                        backgroundImage: 'linear-gradient(to right, #b1b1b1, #999899, #827f80, #6c6767, #55514e)',
                    };
                case 'spectre':
                    return {
                        backgroundImage: 'linear-gradient(to right, #d1d1d1, #b7b4c7, #9e98bd, #867cb2, #6d61a6)',
                    };
                case 'dragon':
                    return {
                        backgroundImage: 'linear-gradient(to right, #a2a3fd, #8d8cf8, #7975f3, #645eec, #4f46e5)',
                    };
                case 'ténèbres':
                    return {
                        backgroundImage: 'linear-gradient(to right, #8d8d8d, #727273, #58575b, #3f3e43, #27272d)',
                    };
                case 'acier':
                    return {
                        backgroundImage: 'linear-gradient(to right, #e9e8e8, #c4c3c3, #a0a0a0, #7e7e7e, #5d5d5d)',
                    };
                case 'fée':
                    return {
                        backgroundImage: 'linear-gradient(to right, #fef8fc, #fddef3, #fac4e9, #f6a9e0, #f28dd6)',
                    };
                default:
                    return {};
            }
        })
        setBgStyles(styling)
    }, [imgRandom])


    return (
        <div className={` ${styles.carousel_container} flex justify-center h-96 `}>
        {/* LOADING */}
        { isLoading && 
            <div className={`${styles.reflect} `}>
                <p>loading...</p>
            </div>
    }
                    

            <Carousel className="flex justify-center items-center" >
                <CarouselContent className="h-96 w-screen">
                    {
                        imgRandom.map((pokemon, id) => (<CarouselItem key={id} className="flex justify-center items-center w-full h-full relative" style={bgStyles[id]}>
                            <div>

                                <p className={`${styles.nameTitle}`}>{pokemon.name}</p>
                            </div>
                            <Image src={pokemon.image} width={200} height={200} alt={pokemon.name} className={`absolute z-10`}/>
                        </CarouselItem>))
                    }
                </CarouselContent>
                <CarouselPrevious className="left-14"  />
                <CarouselNext className="right-14" />
            </Carousel>
        </div>
    )
}

