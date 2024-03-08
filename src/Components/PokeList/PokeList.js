'use client'
import React, { useEffect, useState } from 'react'
import { fetchData } from '@/app/api/pokedata'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from '@/ui/pokeList.module.css'


export default function PokeList() {
    // STATES
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState(''); //->input
    const [selectedPokemon, setSelectedPokemon] = useState('') //->select
    const [visiblePokemons, setVisiblePokemons] = useState(30)
    // const [goUp, setGoUp] = useState(false)

    // NAVIGATION
    const router = useRouter()

    // FUNCTIONALITIES (hooks & functions)
    //fetch data
    useEffect(()=>{
        fetchData(setData, setIsLoading)
    }, [])
    //loading
    const tabLoaders = ['/images/loaders/flams.gif', '/images/loaders/ghost.gif', '/images/loaders/mew.gif', '/images/loaders/pik.gif', '/images/loaders/pika.gif', '/images/loaders/pikachu.gif', '/images/loaders/pinkish.gif', '/images/loaders/poksloads.gif', '/images/loaders/tortank'];
    const random = Math.floor(Math.random()*tabLoaders.length);
    const loader = tabLoaders[random];
    //filters
    const filteredData = data.filter((item) => {
        const isNameMatch = item.name.toLowerCase().startsWith(query.toLowerCase()) || query.trim() === '';
        const isTypeMatch = selectedPokemon === '' ||
            (item.apiTypes && item.apiTypes.find(type => type.name.toLowerCase() === selectedPokemon.toLowerCase()) );
        return isNameMatch && isTypeMatch;
    });
    //load more button
    const loadMore = () => {
        setVisiblePokemons((prev) => prev +30)
    }
    //go to top button
    // const handleScroll = () => {
    //     if(window.scrollY > 400){
    //         setGoUp(true)
    //     }else{
    //         setGoUp(false)
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll)
    // }, [])

    // const scrollTop = () => {
    //     window.scrollTo({top: 0, behavior: 'smooth'})
    // }


    return (
        <section className={`${styles.pokeList_container} lg:p-24 md:p-16 `}>

            <div className='bg-[#f2f2f2] max-sm:bg-[#d30a40] border-2 border-black p-16 '>
                <div className='flex justify-center items-center  mb-8'>
                    <Image src={'/images/catch.png'} width={300} height={100} className='block max-md:hidden'/>
                    {/* <Image src={'/images/gotta.png'} width={300} height={100}/> */}
                    <Image src={'/images/emAll.png'} width={300} height={100} className='hidden max-md:block'/>

                </div>

                {/* FILTERS */}
                <div className={`${styles.filters} w-full flex flex-row max-md:flex-col lg:px-24 lg:justify-between md:justify-between sm:justify-center `}>
                    {/* searchbar filter */}
                    <div className={`${styles.searchbar} max-md:mb-4`}>
                        <input className={styles.filter} type="search" id='search' placeholder='Find your pokemon' onChange={(e)=> setQuery(e.target.value)}/>
                    </div>
                    {/* select filter */}
                    <div>
                        <select className={`${styles.filter} ${styles.select} h-full`} value={selectedPokemon} onChange={(e)=>setSelectedPokemon(e.target.value)}>
                            <option value="" disabled selected hidden>Filter by type</option>
                            <option value="">All</option>
                            <option value="Normal">Normal</option>
                            <option value="Feu">Fire</option>
                            <option value="Eau">Water</option>
                            <option value="Électrik">Electric</option>
                            <option value="Plante">Grass</option>
                            <option value="Glace">Ice</option>
                            <option value="Combat">Fighting</option>
                            <option value="Poison">Poison</option>
                            <option value="Sol">Ground</option>
                            <option value="Vol">Flying</option>
                            <option value="Psy">Psychic</option>
                            <option value="Insect">Bug</option>
                            <option value="Roche">Rock</option>
                            <option value="Spectre">Ghost</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Ténèbres">Dark</option>
                            <option value="Acier">Steel</option>
                            <option value="Fée">Fairy</option>
                            {/* <option value="">Stellar</option> */}
                        </select>
                    </div>
                </div>

                {/* CARDS */}
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-5 gap-y-10 lg:p-8 md:p-4 sm:p-2 my-4 relative'>
                    {
                        filteredData?.slice(0, visiblePokemons).map((pokemon)=> 
                        <div key={pokemon.id} onClick={() => router.push(`/${pokemon.name}`)} className={`${styles.card} h-[40vh] flex flex-col items-center justify-center gap-y-4 p-5`}>
                            <Image src={pokemon.image} width={200} height={200} className={`${styles.imgPoke} h-3/5`} alt='pokemon'/>
                            <p className=''>{pokemon.name}</p>
                        </div>
                    )}
                {/* LOADING */}
                    { isLoading && 
                    <div className={`${styles.myLoading}`}>
                        {/* <p>loading...</p> */}
                        <Image className={`${styles.loader}`} src={loader} width={100} height={100} alt='loader'/>
                    </div>
                
                    }
                    
                </div>

                <div className={`grid items-center py-4`}>
                {/* MORE */}
                {visiblePokemons < filteredData.length && (
                    <button className={`${styles.moreBtn} py-2`} onClick={loadMore}>Load More</button>
                )}
                </div>

                {/* GO UP
                {goUp && (
                    <button onClick={scrollTop} className={`styles.btnUp`}>Go Up</button>
                )} */}
            </div>
        </section>
    )
}
