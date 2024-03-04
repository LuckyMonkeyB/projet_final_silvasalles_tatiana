'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { retrieve } from '@/lib/features/authSlice'
import { log } from '@/lib/features/authSlice'
import styles from '@/ui/sign.module.css'


export default function login() {

    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.auth.isLogged)

    const router = useRouter()


    const handleConnection = (e) => {
        e.preventDefault();
        dispatch(log());
    }

    useEffect(()=>{
        if(isLogged)
        router.push('/')
    },[isLogged])

    return (
        <div className={`${styles.container} grid justify-center items-center  h-screen`}>
            <form onSubmit={handleConnection} className={`${styles.form}`}>
                <p id={styles.heading} >Login</p>

                <div className='grid gap-2'>
                    <div className={styles.field}>
                    <label className="labs text-white" for="name">Username</label>
                        <input 
                        autocomplete="off" 
                        placeholder="Username" 
                        className={styles.input_field} 
                        type="text"
                        onChange={(e) => dispatch(retrieve(e.target.value))}></input>
                    </div>

                    <div className={styles.field}>
                        <label className="labs text-white" for="password">Password</label>
                        <input 
                        placeholder="Password" 
                        className={styles.input_field} 
                        type="password"
                        onChange={(e) => dispatch(retrieve(e.target.value))}></input>
                    </div>
                </div>

                <p className='pt-4 text-white '>No account? <Link href={`/subscribe`} className='text-yellow-300'>Subscribe</Link></p>

                <div className={`${styles.btn_container} grid justify-center items-center my-10`}>
                    <button type='submit' className={`${styles.btn}`}>Login</button>
                </div>
            </form>
        </div>
    )
}
