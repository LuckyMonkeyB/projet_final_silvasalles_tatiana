'use client'
import { fetchData } from '@/app/api/pokedata'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/ui/pokedetails.module.css'



export default function PokeDetails({params}) {


    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        fetchData(setData, setIsLoading)
    }, [])

    const router = useRouter()


    const detail = data.find((pokemon)=>pokemon.name === params.PokeDetails)

    const evolutions = detail?.apiEvolutions || [];
    const evol = data.filter((pokemon) => evolutions.includes(pokemon.name)) 

    const types = detail?.apiTypes || []

    const stats = detail?.stats || {}
    const newStatName = (originalStatName) => {
        switch (originalStatName){
            case 'HP':
                return 'HP';
            case 'attack':
                return 'ATK';
            case 'defense':
                return 'DEF';
            case 'special_attack':
                return 'SATK';
            case 'special_defense':
                return 'SDEF';
            case 'speed':
                return 'SPD';

        }
    }


    const weaknesses = detail?.apiResistances || []
    const vulnerabilities = weaknesses.filter((weak) => weak.damage_relation === 'vulnerable')


    return (
        <div className={`${styles.details_container} w-screen h-screen flex flex-col justify-center items-center`}>
            <div>
                <h1>{detail?.name}</h1>
            </div>
            {detail !== undefined &&(
                <div  className={`${styles.details_content} w-4/5 flex flex-row justify-evenly items-center `}>
                    <div className={`${styles.pokeImg} flex flex-col justify-center items-center  w-1/2`}>
                        <Image src={detail?.image} width={200} height={200} alt={detail?.name}/>

                        {/* evolution */}
                        <div className={`${styles.evol} grid grid-cols-3`}>

                        </div>
                    </div>
                    {/* RIGHT SIDE */}
                    <div className={`${styles.infos_content}  w-1/2 flex flex-row justify-between`}>
                        
                        <div className={` ${styles.infos_col}flex flex-col gap-4`}>
                            {/* types */}
                            <div className={` ${styles.types}`}>
                                <p className={`font-bold`}>TYPES</p>
                                <div className={`flex flex-row gap-4`}>
                                    {types.map((type, id) => ( <button key={id}>{type.name}</button> ))}
                                </div>
                            </div>

                            {/* faiblesses */}
                            <div className={`${styles.weaknesses}`}>
                                <p className={`font-bold`}>WEAKNESSES</p>
                                <div className={`flex flex-row gap-4`}>
                                    {vulnerabilities.length > 0 ? (vulnerabilities.map((weakness, id) => (
                                        <button key={id}>{weakness.name}</button>
                                    ))
                                    ):( <p>No weakness</p> )
                                    }
                                </div>
                            </div>

                        </div>

                        {/* stats */}
                        <div className={`${styles.stats}`}>
                            <p className={`font-bold`}>STATS</p>
                            {Object.entries(stats).map(([statName, statValue], id) => (
                                <div key={id} className={`flex flex-row justify-between gap-2`}>
                                    <p>{newStatName(statName)}</p>
                                    <progress value={statValue} max={100}></progress>
                                </div>
                            ))
                            }
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}
