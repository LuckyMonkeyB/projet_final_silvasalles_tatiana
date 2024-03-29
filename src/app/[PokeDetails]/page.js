'use client'
import { fetchData } from '@/app/api/pokedata'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/ui/pokedetails.module.css'
import { add, remove } from '@/lib/features/favSlice'
import { useDispatch, useSelector } from 'react-redux'



export default function PokeDetails({params}) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        fetchData(setData, setIsLoading)
    }, [])


    const dispatch = useDispatch()
    const favs = useSelector((state) => state.favorites.favs)
    const logged = useSelector((state) => state.auth.isLogged)

    const detail = data.find((pokemon)=>pokemon.name === params.PokeDetails)

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

    console.log(favs)

    return (
        <div className={`${styles.details_page} w-screen h-screen max-md:h-full flex justify-center items-center`}>
            <div className={`${styles.details_container}   w-4/5 h-4/5  `}>
                {/* TITLE */}
                <div className={`${styles.details_title} text-center `}>
                    <h1>{detail?.name}</h1>
                </div>
                {/* LOADING */}
                { isLoading && 
                    <div className={`${styles.myLoading}`}>
                        <p>loading...</p>
                        <Image className={`${styles.giphy}`} src='/images/giphy.gif' width={80} height={90} alt='gif'/>
                    </div>
                }
                {detail !== undefined &&(
                    <div  className={`${styles.details_content} grid grid-cols-2 max-md:grid-cols-1 p-8 `}>
                        {/* POKEMON IMAGE */}
                        <div className={`${styles.pokeImg} grid justify-center items-center order-1 max-md:order-2`}>
                            <Image src={detail?.image} width={200} height={200} alt='pokemon'/>
                        </div>

                        {/* SCREEN */}
                        {/* POKEMON INFOS */}
                        <div className={`${styles.infos_content} flex justify-center items-center p-2 order-2 max-md:order-1 `}>
                            <div className={`${styles.infos_screen} grid lg:grid-cols-2 md-grid-cols-1 p-4 `}>
                                <div className={` ${styles.infos_col}  `}>
                                    {/* types */}
                                    <div className={` ${styles.types}`}>
                                        <p className={`font-bold mb-2`}>TYPES</p>
                                        <div className={`flex flex-row gap-4 mb-4`}>
                                            {types.map((type, id) => ( <button key={id}>{type.name}</button> ))}
                                        </div>
                                    </div>

                                    {/* faiblesses */}
                                    <div className={`${styles.weaknesses}`}>
                                        <p className={`font-bold mb-2`}>WEAKNESSES</p>
                                        <div className={`flex flex-row flex-wrap gap-4 mb-4`}>
                                            {vulnerabilities.length > 0 ? (vulnerabilities.map((weakness, id) => (
                                                <button key={id}>{weakness.name}</button>
                                            ))
                                            ):( <p>No weakness</p> )
                                            }
                                        </div>
                                    </div>

                                </div>

                                {/* stats */}
                                <div className={`${styles.stats} `}>
                                    <p className={`font-bold mb-2`}>STATS</p>
                                    {Object.entries(stats).map(([statName, statValue], id) => (
                                        <div key={id} className={`flex flex-cow justify-between`}>
                                            <p>{newStatName(statName)}</p>
                                            <progress className={`${styles.progress}`} value={statValue} max={100}></progress>
                                        </div>
                                    ))
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                )}
                {/* BUTTONS FAV/RELEASE */}
                {
                    !isLoading &&
                    <div className={`${styles.details_btns} flex flex-row justify-around items-center `}>
                        {logged &&
                            <>{ 
                                favs?.find((pokemon) => pokemon?.id == detail?.id) ?
                                <button onClick={() => dispatch(remove(detail))}>RELEASE</button>
                                :<button onClick={() => dispatch(add(detail))}>CATCH</button> 
                            }</>
                        }
                    </div>
                }
            </div>
        </div>
    )
}
