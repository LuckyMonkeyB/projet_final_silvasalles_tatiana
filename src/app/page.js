'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import styles from '@/ui/welcome.module.css'


export default function welcome() {
    const [typeCompleted, setTypeCompleted] = useState(false);
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true)

    useEffect(() => {
      const delay = 1500;

      setTimeout(() => {
        setTypeCompleted(true)
      }, delay)
    }, [])

    const handleArrow = () => {
      setShow(true);
      setVisible(false)
    };

    const router = useRouter()

    return (
        <div className={`${styles.welcome_container} w-screen h-screen flex justify-center items-center`}>
            <div className='flex flex-col items-center' style={{ display: visible ? 'block' : 'none' }}>
              <Image className={`${styles.welcomeImg}`} src={'/images/oak/oak_world.png'} width={150} height={150} alt='professor'/>
              <div className={`${styles.typewriter} w-full h-auto`}>
                <div className={`${styles.typewriter_content}`}>
                  <p>Welcome to the world of POKEMON!</p>
                </div>
                {typeCompleted && (
                <p className={`${styles.arrow} float-right`} onClick={handleArrow}>&#9660;</p>
                )}
              </div>
            </div>
            {show && (
              <div className='flex flex-col items-center'>
              <Image className={`${styles.welcomeImg}`} src={'/images/oak/oak_sub.png'} width={150} height={150} alt='professor'/>
                <div className={`${styles.typewriter } w-full h-auto`}>
                <div className={`${styles.typewriter_content}`}>
                  <p>Would you like to become a trainer?</p>
                </div>
                  {
                    typeCompleted && (
                    <div className={`${styles.choices} flex flex-row justify-center gap-16`}>
                        <p onClick={()=> router.push('/subscribe')}>Yes</p>
                        <p onClick={()=> router.push('/subscribe')}>No</p>
                    </div>
                    )
                  }
                </div>
              </div>
            )}
        </div>
    )
}
