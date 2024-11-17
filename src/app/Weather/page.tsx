"use client";
import { WeatherApi } from "@/app/query/query"; // Assuming your API function is here
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import "./style.css";
import Image from "next/image";

// Type definitions for the fetched data
type AstroData = {
  moonrise: string;
  moonset: string;
  sunrise: string;
  sunset: string;
};
type dayData = {
  maxtemp_c: number;
  condition: {
    icon: string;
    text: string;
  };
};
type LoopingItem = {
  date: string;
  day: dayData;
  astro: AstroData;
  numOfDays: number;
};

const WeatherApp = () => {
  const [looping, setLooping] = useState<LoopingItem[]>([]);
  const [cityName, setCityName] = useState("");
  const [numOfDays] = useState<number>(3);
  const [imgLoads, setImageLoads] = useState(true);

  // Query to fetch weather data
  const { data, error, isLoading } = useQuery({
    queryKey: ["cities", cityName, numOfDays], // query key
    queryFn: () => WeatherApi(cityName, numOfDays), // API call
    staleTime: 200000,
    enabled: cityName.length > 1,
  });

  // Weather state
  const [weather, setWeather] = useState<string>("");

  // Update weather state after fetching data
  useEffect(() => {
    if (data?.forecast?.forecastday) {
      setWeather(data.forecast.forecastday[0].day.condition.text);
      setLooping(data.forecast.forecastday); // Set data to loop over for the forecast
    } else {
      setWeather("");
    }
    console.log(data);
    console.log(weather);
    console.log(imgLoads);
  }, [cityName, data, imgLoads]);

  // Error handling if the query fails
  if (error) return <div>Error: {error.message}</div>;

  return (
    <center
      className={`MainWeather flex ${
        weather == "Sunny"
          ? "SunnyWeather"
          : weather == "Partly Cloudy"
          ? "partlyCloudWeather"
          : weather == "Cloudy"
          ? "ColdWeather"
          : weather == "Overcast"
          ? "overCastWeather"
          : "unknownWeather"
      }`}
    >
      <div className="Inputs-Box p-5 flex flex-col items-center justify-center gap-3">
        <input
          className="text-slate-900"
          type="text"
          name="city"
          id="city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)} // Set the city name input
          placeholder="Enter city name"
        />
        <div className="flex items-center justify-center gap-4">
          <label htmlFor="NumberOfDays">Number Of Days</label>

          <input
            className="text-slate-900"
            type="number"
            id="NumberOfDays"
            // onChange={(e) => setNumOfDays(+e.target.value)}
            value={numOfDays}
            disabled
          ></input>
        </div>
        {cityName.length > 0 && data?.location && (
          <h1>
            Weather Data for {cityName} / {data.location.country}
          </h1>
        )}
        {isLoading ? (
          <div className="text-green-400 text-2xl">Loading...</div>
        ) : cityName.length > 0 && looping?.length > 0 ? (
          <div className="MappingParent">
            {looping.map((item, index) => (
              <div key={index} className="MappingFirstOut">
                <h2>{item?.date}</h2>
                <h3>SunRise: {item?.astro?.sunrise || "N/A"}</h3>
                <h3>SunSet: {item?.astro?.sunset || "N/A"}</h3>
                <h3>Max Temp: {item?.day?.maxtemp_c} °C</h3>
                {imgLoads && "loading..."}
                <Image
                  src={`https:${item?.day?.condition?.icon}`}
                  alt={item?.day?.condition?.text}
                  width={50}
                  height={50}
                  quality={0}
                  onLoad={() => setImageLoads(false)}
                />
              </div>
            ))}
          </div>
        ) : (
          !isLoading && <div>No Data</div>
        )}
      </div>
    </center>
  );
};

export default WeatherApp;
