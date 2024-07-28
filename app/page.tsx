import { FandQ } from '@/components/f&q'
import React from 'react'

export default async function page() {

  return (
    <main className=' p-8 h-svh bg-indigo-950 text-indigo-100 flex flex-col justify-center gap-16'>
      <div className='max-w-2xl mx-auto space-y-4 px-8 '>
        <h1 className='text-7xl font-extrabold text-pink-700 font-mono'>
          VAKAKS <span className='text-indigo-300 font-light text-base -ml-8'>next.js starter kit</span>
        </h1>
        <p className='opacity-80 font-sans'>
          A starter kit that comes with Next.js, Tailwind CSS, ShadCn, TypeScript and Firebase. It&apos;s designed to help you build your projects
        </p>
      </div>
      
      <FandQ />
    </main>
  )
}
