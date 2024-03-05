'use client'
import PokeList from "@/Components/PokeList/PokeList";
import Slider from "@/Components/Slider/Slider";
import { useEffect, useState } from "react";
import styles from '@/ui/homepage.module.css'

export default function Home() {

    const [goUp, setGoUp] = useState(false)

    const handleScroll = () => {
        if(window.scrollY > 400){
            setGoUp(true)
        }else{
            setGoUp(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <main className="flex min-h-screen flex-col relative ">
            {/* CAROUSEL */}
            <div className="w-full flex justify-center items-center">
                <Slider/>
            </div>
            {/* POKEMONS LIST */}
            <PokeList />
            {/* GO UP */}
            <div className={`absolute z-10 bottom-0 right-0`}>
                {goUp && (
                <button onClick={scrollTop} className={`${styles.btnUp}`}>Go Up</button>
                )}
            </div>
        </main>
    );
}