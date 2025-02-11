"use client"
import 'swiper/swiper-bundle.css';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { kelvinToCelcius } from '@/utils/kelvinToCelcius';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';

interface Props {
  temp: number,
  feelsLike: number,
  name: string,
  weatherData:  any,
}

export default function Locations({temp, feelsLike,name, weatherData}: Props) {
  const [click, setClick] = useState(false);
  const [kelvin, setKelvin] = useState(true);
  const [celcius, setCelcius] = useState(false);
  const [selectedOption, setSelectedOption] = useState('celcius');
  const [selectedIndex, setSelectedIndex] = useState(5);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value)
  }
  const handleIndexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIndex(parseInt(e.target.value) / 3 + 1)
  }
  return (
    <>
      <form className='flex justify-center gap-4 my-4'>
        <div className='flex items-center gap-2 hover:cursor-pointer'>
          <input
            type="radio"
            id='celcius'
            value='celcius'
            name='degree'
            checked={selectedOption === 'celcius'}
            onChange={handleChange}
            className='h-5 w-5 checked:bg-[#AD36CB]'
          />
          <label htmlFor="celcius" className='text-white'>C</label>
        </div>
        <div className='flex items-center gap-2 cursor-pointer'>
          <input
            type="radio"
            id='kelvin'
            value='kelvin'
            name='degree'
            checked={selectedOption === 'kelvin'}
            onChange={handleChange}
            className='h-5 w-5 checked:!bg-[#AD36CB]'
          />
          <label htmlFor="kelvin" className='text-white'>K</label>
        </div>
        <select 
          name="hours" 
          id="hours" 
          className='border-none outline-none bg-gradient-to-r from-[#662177] to-[#38368b] text-gray-300 p-2 cursor-pointer'
          onChange={handleIndexChange}
        >
          <option 
            disabled={true}
            defaultChecked={true}
            value="" 
            className='capitalize bg-gray-300 text-black hover:bg-gradient-to-r from-[#662177] to-[#38368b] '
          >
            select an option
          </option>
          <option 
            value="12" 
            className='capitalize bg-gray-300 text-black hover:bg-gradient-to-r from-[#662177] to-[#38368b] '
          >
            12 hours
          </option>

          <option 
            value="24" 
            className='capitalize bg-gray-300 text-black hover:bg-gradient-to-r from-[#662177] to-[#38368b] '
          >
            24 hours
          </option>

          <option 
            value="36" 
            className='capitalize bg-gray-300 text-black hover:bg-gradient-to-r from-[#662177] to-[#38368b] '
          >
            36 hours
          </option>

          <option 
            value="48" 
            className='capitalize bg-gray-300 text-black hover:bg-gradient-to-r from-[#662177] to-[#38368b] '
          >
            48 hours
          </option>
        </select>
      </form>
      <div className="my-20 px-2">
        <Swiper
          onTouchStart={() => setClick(!click)}
          onTouchEnd={() => {setClick(false)}}
          spaceBetween={20}
          centeredSlides={true}
          className={click ? 'cursor-grabbing' : 'cursor-grab mySwiper'}
          breakpoints={{
            200: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            400: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {
            weatherData.slice(0,selectedIndex).map((data: any, index: number) => (
              <SwiperSlide key={index} className=''>
                <div key={index} className='h-[300px] bg-gradient-to-r from-[#660b52] to-[#0a0894] rounded-3xl p-4 cursor flex flex-col justify-between items-center'>
                  <div className='flex items-end justify-start w-full gap-2'>
                    <p className='text-gray-300 text-2xl select-none'>
                      {name}
                    </p>
                  </div>
                  <h2 className='text-gray-300 text-4xl flex items-center gap-2 font-semibold select-none'>
                    <span>
                      <Image src='/icon_temperature.svg' alt='logo' width={10} height={10} />
                    </span>
                    {selectedOption === 'celcius' ? kelvinToCelcius(data.main.temp) : Math.floor(data.main.temp)}{selectedOption === 'celcius' ? '℃' : 'K'}
                    <span>
                      <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='' width={100} height={100} className=''/>
                    </span>
                  </h2>
                  <div className='flex items-end justify-start w-full gap-2'>
                    <p className='text-gray-300 text-lg select-none'>
                      {format(parseISO(data.dt_txt ?? ''), 'EE')}
                    </p>
                    <p className='text-gray-300 text-md select-none'>
                      {format(parseISO(data.dt_txt ?? ''), 'hh:mm a')}
                    </p>
                    <p className='text-gray-300 text-md select-none capitalize'>
                      {data.weather[0].description}
                    </p>
                  </div>
                  <div className="flex items-center justify-evenly w-full flex-wrap gap-1">
                    <div className='flex flex-col items-center'>
                      <h2 className='capitalize text-gray-300 font-semibold text-md select-none'>
                        feels like
                      </h2>
                      <p className='text-gray-300 text-sm select-none'>
                        {selectedOption === 'celcius' ? kelvinToCelcius(data.main.feels_like) : Math.floor(data.main.feels_like)} {selectedOption === 'celcius' ? '℃' : 'K'}
                      </p>
                    </div>
                    <div className='flex flex-col items-center'>
                      <h2 className='capitalize text-gray-300 font-semibold text-md select-none'>
                        air pressure
                      </h2>
                      <p className='text-gray-300 text-sm select-none'>
                        {data.main.pressure} hPa
                      </p>
                    </div>
                    <div className='flex flex-col items-center'>
                      <h2 className='capitalize text-gray-300 font-semibold text-md select-none'>
                        humidity
                      </h2>
                      <p className='text-gray-300 text-sm select-none'>
                        {data.main.humidity}%
                      </p>
                    </div>
                    <div className='flex flex-col items-center'>
                      <h2 className='capitalize text-gray-300 font-semibold text-md select-none'>
                        wind
                      </h2>
                      <p className='text-gray-300 text-sm select-none'>
                        {data.wind.speed} m/s
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
          ))
          }
        </Swiper>
      </div>
    </>
  );
};


