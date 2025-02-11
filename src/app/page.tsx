"use client"
import Locations from "@/components/locations";
import Navbar from "@/components/navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { CiLocationOn } from "react-icons/ci";

export default function Home() {
  //http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=317dcd8e9a04ba31ee82b00564a1a831

  interface WeatherResponse {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItem[];
    city: City;
  }
  
  interface ForecastItem {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sys;
    dt_txt: string;
  }
  
  interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  }
  
  interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  interface Clouds {
    all: number;
  }
  
  interface Wind {
    speed: number;
    deg: number;
    gust: number;
  }
  
  interface Sys {
    pod: string;
  }
  
  interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }
  
  interface Coord {
    lat: number;
    lon: number;
  }


  const { isLoading, error, data } = useQuery<WeatherResponse>({
    queryKey: ['repoData'],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?id=2741623&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      console.log(data);
      return data;
    }
  });
  const firstData = data?.list[0];
  const weatherData = data?.list;
  console.log('weather', weatherData)

  if (isLoading) return (
    <div className="flex h-dvh items-center justify-center bg-black">
      <Image src='/logo.png' alt='logo' width={100} height={300} />
    </div>
  )
  
  return (
    <div className="h-dvh bg-[#000000]">
      <Navbar 
        place={data?.city.country} 
        firstData={firstData}     
      />
      <Locations 
        temp={firstData?.main.temp ?? 0}
        feelsLike={firstData?.main.feels_like ?? 0}
        name={data?.city.name ?? 'unknown'}
        weatherData={weatherData}
      />
    </div>
  );
}
