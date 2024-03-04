import React from 'react'
import styles from '@/ui/favorite.module.css'

export default function favorite() {
    return (
        <div className={`${styles.fav_container} flex flex-col justify-center items-center h-screen`}>
            <h1>favorite page</h1>
            <div className={`${styles.pokedex} grid grid-cols-2`}>

                {/* LEFT SIDE */}
                <div className={`${styles.left} border-black border-2 border-solid`}>

                    {/* top buttons */}
                    <div className={`${styles.btns_top_left} flex flex-row`}>
                        <div className={`${styles.btn_big_blue}`}>
                            <div className={`${styles.reflect}`}> </div>
                        </div>
                        <div className={`${styles.mini_btn} ${styles.mini_btn1}`}></div>
                        <div className={`${styles.mini_btn} ${styles.mini_btn3}`}></div>
                        <div className={`${styles.mini_btn} ${styles.mini_btn3}`}></div>
                    </div>

                    {/* screen */}
                    <div className={`${styles.screen}`}>

                        <div className={`${styles.btns_top_screen} flex flex-row justify-center`}>
                            <div className={`${styles.mini_top_screen}`}></div>
                            <div className={`${styles.mini_top_screen}`}></div>
                        </div>

                        <div className={`${styles.pic}`}>
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/200653/psykokwak.gif" alt="psykokwak"/>
                        </div>

                        <div className='flex flex-row justify-between w-100'>
                            <button className={`${styles.bottom_btn_screen}`}></button>

                            <div className={`${styles.speakers}`}>
                                <div className={`${styles.speak}`}></div>
                                <div className={`${styles.speak}`}></div>
                                <div className={`${styles.speak}`}></div>
                                <div className={`${styles.speak}`}></div>
                            </div>  
                        </div>

                    </div>

                    {/* bottom buttons */}
                    <div className={`${styles.btns_bottom_left} flex flex-row`}>
                        <div className={`${styles.big_blue} w-1/5 py-4 `}>
                            <button className={`${styles.big_blue_btn}`}></button>
                        </div>
                        <div className={`${styles.bars} w-2/5 h-100 px-4 `}>
                            <div className={`flex flex-row justify-between py-4`}>
                                <button className={`${styles.bar_btn} ${styles.bar_btn1}`}></button>
                                <button className={`${styles.bar_btn} ${styles.bar_btn2}`}></button>
                            </div>
                        </div>
                        <div className={`${styles.name_screen}`}></div>
                            {/* cross */}
                        <div className={`${styles.cross} w-2/5 h-100 bg-green-300`}>
                                <div className={`${styles.leftcross}`}>
                                    <div className={`${styles.leftT}`}></div>
                                </div>

                                <div className={`${styles.topcross}`}>
                                    <div className={`${styles.upT}`}></div>
                                </div>

                                <div className={`${styles.rightcross}`}>
                                    <div className={`${styles.rightT}`}></div>
                                </div>

                                <div className={`${styles.midcross}`}>
                                    <div className={`${styles.midCircle}`}></div>
                                </div>

                                <div className={`${styles.botcross}`}>
                                    <div className={`${styles.downT}`}></div>
                                </div>
                        </div>

                    </div>


                </div>
                <div className={`${styles.right} border-black border-2 border-solid`}>llo</div>
            </div>


        </div>
    )
}
