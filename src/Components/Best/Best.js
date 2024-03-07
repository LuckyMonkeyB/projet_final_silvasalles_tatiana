'use client'
import React, { useEffect, useState } from 'react'
import { fetchData } from '@/app/api/pokedata'
import Image from 'next/image'
import styles from '@/ui/best.module.css'
import { useRouter } from 'next/navigation'

export default function Best() {
    //STATES
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // FUNCTIONALITIES (hooks & functions)
    //fetch data
    useEffect(()=>{
        fetchData(setData, setIsLoading)
    }, [])

    const router = useRouter()

    const filteredBests = data.filter((pokemon) => (pokemon.stats.attack > 98 && pokemon.stats.HP > 98))

    return (
        <section className='h-auto w-full flex flex-wrap px-24 py-8 bg-[#f2f2f2]'>
            {
                filteredBests?.map((pokemon, id) => (<div key={id} onClick={() => router.push(`/${pokemon.name}`)}>
                    <Image src={pokemon.sprite} width={50} height={50} alt='pokemon' className={``}/>
                </div>))
            }

        </section>
    )
}
