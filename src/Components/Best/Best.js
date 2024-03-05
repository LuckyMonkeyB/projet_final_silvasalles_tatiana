'use client'
import React from 'react'
import { fetchData } from '@/app/api/pokedata'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import styles from '@/ui/best.module.css'

export default function Best() {
    //STATES
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // FUNCTIONALITIES (hooks & functions)
    //fetch data
    useEffect(()=>{
        fetchData(setData, setIsLoading)
    }, [])

    const filteredBests = data.filter((pokemon) => {

    })

    return (
        <section>
            <Carousel className={``} >
                <CarouselContent className={``}>
                    {
                        filteredBests.map((pokemon, id) => (<CarouselItem key={id} className={``} >
                            <div>

                            </div>
                            <Image src={pokemon.image} width={200} height={200} alt={pokemon.name} className={``}/>
                        </CarouselItem>))
                    }
                </CarouselContent>
                <CarouselPrevious className="left-14"  />
                <CarouselNext className="right-14" />
            </Carousel>
        </section>
    )
}
