'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchData } from '@/app/api/pokedata'
import styles from '@/ui/favorite.module.css'
import { useSelector } from 'react-redux'

export default function favorite() {
    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        fetchData(setData, setIsLoading)
    }, [])

    const favs = useSelector((state) => state.favorites.favs)


    return (
        <div className={`${styles.favPage} w-screen h-screen flex justify-center items-center`}>
            <div className={`${styles.fav_container} grid grid-cols-1  w-3/5 h-4/5`}>
                {/* LOADING */}
                {/* { isLoading && 
                    <div className={`${styles.myLoader}`}>
                        <p>loading...</p>
                        <Image className={`${styles.gif}`} src='/images/pokedex-redCircle.png' width={80} height={90}/>
                    </div>
                } */}

                {
                    favs.map((pokemon, id) => (
                        <Image key={id} src={pokemon.sprite} width={100} height={100}/>
                    ))
                }
            </div>
        </div>
    )
}
