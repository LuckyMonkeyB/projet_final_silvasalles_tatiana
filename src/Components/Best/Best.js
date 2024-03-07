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
        <section className='h-auto w-full  px-24 py-8 bg-[#f2f2f2]'>
            <div className='text-center py-4'>
                <p className='text-4xl'>POKÉMON ELITE</p>
                <p >At the Peak of Pokémon Power: Strength and Vitality</p>
            </div>
            {
                filteredBests?.map((pokemon, id) => (<div key={id} onClick={() => router.push(`/${pokemon.name}`)} className={`${styles.poksImg} flex flex-wrap`}>
                    <Image src={pokemon.sprite} width={50} height={50} alt='pokemon' className={`${styles.bestImg}`}/>
                    <span className={`${styles.tooltipBest}`}>{pokemon.name}</span>
                </div>))
            }

        </section>
    )
}
