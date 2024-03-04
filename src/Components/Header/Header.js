import React, { useState } from 'react';
import styles from '@/ui/header.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={styles.header_container}>
        <div
            className={`${styles.triggerArea} bg-red-400`}
            onMouseEnter={() => setIsHovered(true)}
            
        ></div>
        <div className={`${styles.content} flex flex-row justify-between px-6 py-2`} style={{ transform: isHovered ? 'translateY(0)' : 'translateY(-200%)' }} onMouseLeave={() => setIsHovered(false)}>
            <Image className={`${styles.pokemon_img} flex justify-center items-center`} src='/images/pokemon-logo.png' width={200} height={80} onClick={() => router.push('/')} />
            <Image className={`${styles.pokedex_img} flex justify-center items-center`} src='/images/pokedex-retro.png' width={65} height={65} onClick={() => router.push('/favorite')} />
        </div>
        </div>
    );
}
