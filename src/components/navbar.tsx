import Image from 'next/image'
import React from 'react'
import Search from './search'
import { format, parseISO } from 'date-fns'

interface Props {
  place: string | any,
  firstData: any,
}

export default function Navbar({place, firstData}: Props) {
  return (
    <div className='w-full'>
        <nav className='flex flex-row justify-between items-center p-4 text-white mx-4 px-0 lg:max-w-screen-xl lg:px-4 lg:mx-auto'>
            <Image src='/logo.png' alt='logo' width={100} height={100} />
            <div className='hidden md:flex items-center justify-between gap-4'>
              <Search />
              <div className="flex items-end gap-2">
                <p className=' text-2xl text-[#AD36CB]'>
                  {place}
                </p>
                <p className='text-xl'>
                  {format(parseISO(firstData.dt_txt ?? ''), 'EEEE')}
                </p>
                <p className='text-xl text-[#AD36CB]'>
                  {format(parseISO(firstData.dt_txt ?? ''), 'dd.MM.yyyy')}
                </p>
              </div>
            </div>
        </nav>
    </div>

  )
}
