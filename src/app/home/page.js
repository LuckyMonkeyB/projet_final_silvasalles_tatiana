'use client'
import PokeList from "@/Components/PokeList/PokeList";
import Slider from "@/Components/Slider/Slider";
import Best from "@/Components/Best/Best";
import { useEffect, useState } from "react";
import styles from '@/ui/home.module.css'

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
            {/* CAROUSEL SECTION*/}
            <section className="w-full flex justify-center items-center">
                <Slider/>
            </section>
            {/* BEST POKEMONS SECTION*/}
            <section className="w-full flex justify-center items-center">
                <Best />
            </section>
            {/* POKEMONS LIST SECTION*/}
            <PokeList />
            {/* GO UP */}
            {goUp && (
            <button onClick={scrollTop} className={`${styles.btnUp}`}>UP</button>
            )}
        </main>
    );
}
