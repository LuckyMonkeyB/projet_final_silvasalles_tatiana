import React, { useState } from 'react';
import styles from '@/ui/header.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={`${styles.header_container} z-10 `}>
        <div className={`${styles.triggerArea} relative flex justify-center`}
            onMouseEnter={() => setIsHovered(true)}>
            <button className='bg-[#f2f2f2] rounded-b-sm'>&#9660;</button>
            <div className={`${styles.content} absolute w-screen flex flex-row justify-between px-6 py-2`} style={{ transform: isHovered ? 'translateY(0)' : 'translateY(-200%)' }} onMouseLeave={() => setIsHovered(false)}>
                <Image 
                className={`${styles.pokemon_img} flex justify-center items-center`} 
                src='/images/pokemon-logo.png' width={200} height={80} 
                onClick={() => router.push('/home')} 
                alt='logo'/>
                <Image 
                className={`${styles.pokedex_img} flex justify-center items-center`} 
                src='/images/pokedex-retro.png' width={65} height={65}
                alt='pokedex'
                onClick={() => router.push('/favorite')} />
            </div>
        </div>

        </div>
    );
}
