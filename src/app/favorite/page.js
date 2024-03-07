'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchData } from '@/app/api/pokedata'
import { remove, clearOut } from '@/lib/features/favSlice'
import { useDispatch, useSelector } from 'react-redux'
import styles from '@/ui/favorite.module.css'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function favorite() {
    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [show, setShow] = useState(false);
    const [modal, setModal] = useState('')

    const scroll = useRef()

    const dispatch = useDispatch()
    const favs = useSelector((state) => state.favorites.favs)
    const logged = useSelector((state) => state.isLogged)
    
    useEffect(()=>{
        fetchData(setData, setIsLoading)
    }, [])

    const handleShow = (item) => {
        setShow(true);
        setModal(item)
        console.log(modal)
    };

    const releaseBtn = (item) => {
        setShow(false)
        dispatch(remove(item))
    }

    const scrollT = () =>{
        scroll.current.scrollTop = 0;
        console.log('2')
    }

    const scrollB = () =>{
        scroll.current.scrollTop = scroll.current.scrollHeight;
        console.log('1')
    }

    const router = useRouter()


    return (
        <div className={`${styles.favPage} w-screen h-screen px-20 pt-12`}>
            <div className={`flex flex-row`}>
                <div className={`flex flex-row `}>
                {/* top buttons */}
                    <div className={`${styles.btn_big_blue}`}>
                        <div className={`${styles.reflect}`}> </div>
                    </div>
                    <div className={`${styles.mini_btn} ${styles.mini_btn1}`}></div>
                    <div className={`${styles.mini_btn} ${styles.mini_btn2}`}></div>
                    <div className={`${styles.mini_btn} ${styles.mini_btn3}`}></div>
                </div>
                
            </div>

            <div className={`${styles.screen_frame} w-full h-3/4 mt-4 px-6 pt-6 pb-8 `}>
                <div className={`${styles.btns_top_screen} flex flex-row justify-center gap-4 mb-2`}>
                    <div className={`${styles.mini_top_screen}`}></div>
                    <div className={`${styles.mini_top_screen}`}></div>
                </div>
                
                <div className={`${styles.screen} p-8 flex flex-col relative`}>
                    {
                        logged ? 
                        (<>
                        <div className={`flex justify-center mb-2`}>
                            <p>POKÉDEX</p>
                        </div>
                        <div className={`flex flex-wrap gap-4 overflow-hidden`} ref={scroll}>
                            {
                                favs?.map((pokemon, id) => (
                                    <div key={id} className='flex flex-col justify-center items-center' onClick={()=>handleShow(pokemon)}>
                                        <Image alt='pokeball' src={'/images/pokeball/pokeball3.png'} width={50} height={50} className={``}/>
                                        <p>{pokemon.name}</p>
                                    </div>
                                    
                                ))
                            }
                        </div>

                        <div className={`${styles.modal_container} flex flex-col justify-center items-center absolute top-0 bottom-0 left-0 w-full`} style={{ display: show ? 'block' : 'none' }}>
                            <div className=' flex flex-col justify-center items-center pb-6'>
                                <p><img src={modal?.sprite} alt="" srcset="" /></p>
                                <p>{modal?.name}</p>
                            </div>
                            <div className='flex flex-row justify-center gap-4 pb-4'>
                                <button className={`${styles.btn_modal}`} onClick={() => releaseBtn(modal)}>RELEASE</button>
                                <button className={`${styles.btn_modal}`} onClick={() => router.push(`/${modal.name}`)}>SEE MORE</button>
                            </div>
                        </div>
                        </>) : (<div><p>please login</p></div>)
                    }

                </div>


                <div className='flex flex-row justify-between w-100 mt-2 '>
                    <button className={`${styles.bottom_btn_screen}`} onClick={() => dispatch(clearOut())}>
                        <span className={`${styles.tooltiptext}`}>Clear Favorites</span>
                    </button>

                    <div className=' flex flex-col items-center '>
                        <button className={`${styles.scroll}`} onClick={scrollT}>&#9650;
                            <span className={`${styles.tooltipTop} ${styles.tooltiptext}`}>Top</span>
                        </button>
                        <button className={`${styles.scroll}`} onClick={scrollB}>&#9660;
                            <span className={`${styles.tooltipBottom} ${styles.tooltiptext}`}>Bottom</span>
                        </button>
                    </div>


                    <div className={`${styles.speakers} `}>
                        <div className={`${styles.speak}`}></div>
                        <div className={`${styles.speak}`}></div>
                        <div className={`${styles.speak}`}></div>
                        <div className={`${styles.speak}`}></div>
                    </div>  
                </div>

            </div>
        </div>

    )
}
