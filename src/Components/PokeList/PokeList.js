'use client'
import React, { useEffect, useState } from 'react'
import { fetchData } from '@/app/api/pokedata'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from '@/ui/pokeList.module.css'


export default function PokeList() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [query, setQuery] = useState(''); //->input
    const [selectedPokemon, setSelectedPokemon] = useState('') //->select

    const router = useRouter()

    useEffect(()=>{
        fetchData(setData, setIsLoading)
    }, [])

    const filteredData = data.filter((item) => {
        const isNameMatch = item.name.toLowerCase().startsWith(query.toLowerCase()) || query.trim() === '';

        const isTypeMatch = selectedPokemon === '' ||
            (item.apiTypes && item.apiTypes.find(type => type.name.toLowerCase() === selectedPokemon.toLowerCase()) );

        return isNameMatch && isTypeMatch;
    });


    return (
        <div className={`${styles.pokeList_container} flex min-h-screen flex-col items-center justify-between p-24`}>
            <div className={`${styles.filters} flex flex-row justify-between w-full px-24`}>
                <div className={`${styles.searchbar}`}>
                    <input type="search" id='search' placeholder='Find your pokemon' onChange={(e)=> setQuery(e.target.value)}/>
                </div>
                <div>
                    <select id='select' value={selectedPokemon} onChange={(e)=>setSelectedPokemon(e.target.value)}>
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
            <div className='grid grid-cols-3 gap-x-5 gap-y-10 p-5'>
                {
                    filteredData?.map((pokemon)=> 
                    <button key={pokemon.id} onClick={() => router.push(`/${pokemon.name}`)} className={`${styles.card} h-[40vh] flex flex-col items-center justify-center gap-y-4 p-5`}>
                        <Image src={pokemon.image} width={200} height={200} className={`${styles.imgPoke} h-3/5`}/>
                        <p className=''>{pokemon.name}</p>
                    </button>
                )}
                { isLoading && <p>Loading...</p> }
            </div>
        </div>
    )
}
