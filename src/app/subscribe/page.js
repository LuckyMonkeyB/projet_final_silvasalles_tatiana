'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { getIdentity } from '@/lib/features/authSlice'
import { setSubscription } from '@/lib/features/authSlice'
import styles from '@/ui/sign.module.css'

export default function subscribe() {
    
    const isSubscribed = useSelector(state => state.auth.isSubscribed)
    const dispatch = useDispatch()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setSubscription())
    }


    useEffect(()=>{
        if(isSubscribed)
        router.push('/login')
    },[isSubscribed])
    const router = useRouter()

    return (
        <div className={`${styles.container} grid justify-center items-center  h-screen`}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <p id={styles.heading}>Subscribe</p>

                <div className='grid gap-2'>
                    <div className={ `${styles.field}`}>
                        <label className={`${styles.labs}  text-white`} for="email">Email</label>
                        <input 
                        placeholder="Email address" 
                        className={styles.input_field} 
                        type="email"></input>
                    </div>

                    <div className={styles.field}>
                        <label className={`${styles.labs}  text-white`} for="name">Username</label>
                        <input 
                        autocomplete="off" 
                        placeholder="Username" 
                        className={styles.input_field} 
                        type="text"
                        onChange={(e) => dispatch(getIdentity(e.target.value))}></input>
                    </div>

                    <div className={styles.field}>
                        <label className={`${styles.labs}  text-white`} for="password">Password</label>
                        <input 
                        placeholder="Email address" 
                        className={styles.input_field} 
                        type="password"
                        onChange={(e) => dispatch(getIdentity(e.target.value))}></input>
                    </div>

                </div>

                <p className='pt-4 text-white'>Already have an account? <Link href={`/login`} className='text-yellow-300'>Login</Link></p>

                <div className={`${styles.btn_container} grid justify-center items-center my-10`}>
                    <button type='submit' className={`${styles.btn}`}>Submit</button>
                </div>
            </form>
        </div>
    )
}
