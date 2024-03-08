import React, { useState } from 'react';
import styles from '@/ui/header.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/lib/features/authSlice'



export default function Header() {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    const logged = useSelector((state) => state.auth.isLogged)
    const dispatch = useDispatch()



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
                <div className='flex flex-row'>
                    <Image 
                    className={`${styles.pokedex_img} flex justify-center items-center`} 
                    src='/images/pokedex-retro.png' width={65} height={0}
                    alt='pokedex'
                    onClick={() => router.push('/favorite')} />
                    {logged ? (<Image
                            className={`${styles.trainer_img} flex justify-center items-center mt-3`}
                            src='/images/log/login.png' width={65} height={0}
                            onClick={() => dispatch(logout())}/>)
                        : (<Image
                            className={`${styles.trainer_img} flex justify-center items-center mt-3`}
                            src='/images/log/logout.png' width={65} height={0}
                            onClick={()=>router.push('/login')}/>)
                    }
                </div>
            </div>
        </div>

        </div>
    );
}
