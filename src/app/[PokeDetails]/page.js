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
    // console.log(evolutions);
    // console.log(evol)

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
                <div  className={` w-4/5 flex flex-row justify-evenly items-center bg-blue-200`}>
                    {/* <button onClick={() => router.push(`/`)}>Back</button> */}
                    <div className={`${styles.pokeImg} flex flex-col justify-center items-center bg-pink-200 w-1/2`}>
                        <Image src={detail?.image} width={200} height={200} alt={detail?.name}/>

                        {/* evolution */}
                        <div className={`${styles.evol} grid grid-cols-3`}>

                        </div>
                    </div>
                    <div className={` bg-yellow-200 w-1/2 p-2`}>
                        <div className={`${styles.pokeInfos}`}>
                            {/* types */}
                            <div>
                                <p>types</p>
                                <div className={`flex flex-row gap-4`}>
                                    {types.map((type, id) => ( <button key={id}>{type.name}</button> ))}
                                </div>
                            </div>

                            {/* stats */}
                            <div>
                                <p>stats</p>
                                {Object.entries(stats).map(([statName, statValue], id) => (
                                    <div key={id} className={`flex flex-row justify-between w-1/2`}>
                                        <p>{newStatName(statName)}</p>
                                        <progress value={statValue} max={100}></progress>
                                    </div>
                                ))
                                }
                            </div>

                            {/* faiblesses */}
                            <div>
                                <p>weaknesses</p>
                                <div className={`flex flex-row gap-4`}>
                                    {vulnerabilities.length > 0 ? (vulnerabilities.map((weakness, id) => (
                                        <p key={id}>{weakness.name}</p>
                                    ))
                                    ):( <p>No weakness</p> )
                                    }
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            )}
        </div>
    )
}
