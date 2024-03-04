'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/ui/welcome.module.css'
import { useRouter } from 'next/navigation';

export default function welcome() {

    const [paragraphs, setParagraphs] = useState([]);
    const [typeCompleted, setTypeCompleted] = useState(false);

    useEffect(() => {
        const textContent = [
            'Welcome new trainer!',
            'Choose your mode',
        ]

        const delay = 1500;

        textContent.forEach((text, index) => {
            setTimeout(() => {
                setParagraphs((prev) => [...prev, text])
                if(index === textContent.length - 1){
                    setTypeCompleted(true)
                }
            }, index * delay)
        })
    }, [])

    const router = useRouter()

    return (
        <div className={`${styles.welcome_container} w-screen h-screen flex justify-center items-center`}>
            <div className={`${styles.typewriter} w-1/3 h-auto`}>
                <div className={`${styles.typewriter_content}`}>
                    {
                        paragraphs.map((text, index) => ( <p key={index}>{text}</p> ))
                    }
                </div>
                {
                    typeCompleted && (
                    <div className={`${styles.choices} flex flex-row justify-center gap-16`}>
                        <p onClick={()=> router.push('/')}>red</p>
                        <p onClick={()=> router.push('/')}>blue</p>
                    </div>
                    )
                }
            </div>
        </div>
    )
}
