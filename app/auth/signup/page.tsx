import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="flex justify-center w-screen items-center h-screen">
        <div className='login h-full flex flex-col justify-between p-12 w-[75%]'>
        <h1 className='font-semibold text-white text-2xl'>ECOVEST</h1>
        <div>
            <h2 className='text-white mb-5 text-6xl'>
                Invest in what <br /> powers tomorrow.
            </h2>
            <p className='text-white/50'>We connect you to verified impact-focused startups driving real change across Africa, while helping you grow your portfolio with purpose.</p>
        </div>
        </div>
        <div className='h-full items-center gap-5 justify-center p-24 flex-col flex w-full'>
            <div className='text-center'>
            <h2 className="text-4xl">Create an account with Ecovest</h2>
            <p className='text-black/50'>Sign up with Ecovest to access latest investing finds </p>
            </div>
            <button className="border-2 max-w-md w-full justify-center items-center text-black font-medium border-base p-3 flex hover:bg-base hover:text-white transition-all duration-300 gap-2 rounded-full">
                <Image src="/google.svg" alt="google" width={24} height={24} className=""/>
                Continue with Google
            </button>
            <div className='max-w-md w-full flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Full Name</label>
                    <input type="text" className='bg-base/8 outline-0 border border-base/50 rounded-xl w-full p-3' placeholder='Enter your fullname...' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Email</label>
                    <input type="email" className='bg-base/8 outline-0 border border-base/50 rounded-xl w-full p-3' placeholder='Enter your email...' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Password</label>
                    <input type="password" className='bg-base/8 outline-0 border border-base/50 rounded-xl w-full p-3' placeholder='Enter your password...' />
                    <p className="text-base">At least 8 characters</p>
                </div>
            </div>
            <button className="p-3 mt-4 max-w-md w-full rounded-full border-2 border-base hover:bg-transparent hover:text-black transition-all duration-300 bg-base text-white">Create Account</button>
            <div className='text-black/50'>Already have an account? <Link href="/auth/login" className="text-base font-semibold">Log in</Link></div>
        </div>
    </div>
  )
}

export default page