"use client"
import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

type Props = {
    className?: string,
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined,
    onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined
}

export default function Search({}: Props) {
    const [searchValue, setSearchValue] = useState("")
    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setSearchValue(e.target.value)
    }
  return (
    <form onSubmit={() => {console.log("submitted")}} className="relative w-[400px] h-12">
        <input 
        type="text" 
        className="bg-[#494949] w-full h-full rounded-full text-white ps-4 pe-10 border-none  focus:border-none outline-none"
        placeholder="Search for a location"
        onChange={handleSearch}
        />
        <button className="absolute right-0 top-0 h-full w-12 flex items-center justify-center rounded-e-full transition-all ease-linear" type='submit'>
            <FiSearch color="white" size={25} />
        </button>
    </form>
  )
}