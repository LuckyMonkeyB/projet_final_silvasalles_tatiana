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
        <section className={`${styles.pokeList_container} grid grid-cols-1 items-center justify-between p-24 `}>
            <div className='bg-[#f2f2f2] border-2 border-black p-16'>

                {/* FILTERS */}
                <div className={`${styles.filters} flex flex-row   justify-between w-full px-24 `}>
                    {/* searchbar filter */}
                    <div className={`${styles.searchbar}`}>
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
                <div className='grid grid-cols-3 gap-x-5 gap-y-10 p-8 my-4 relative'>
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
                    <button className={`bg-yellow-400 py-2`} onClick={loadMore}>Load More</button>
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
