"use client";
import { TranslateApi } from "@/app/query/query"; // Assuming your API function is here
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import "./style.css";

// Type definitions for the fetched data
type AstroData = {
  moonrise: string;
  moonset: string;
  sunrise: string;
  sunset: string;
};

type LoopingItem = {
  date: string;
  astro: AstroData;
};

const WeatherApp = () => {
  const [looping, setLooping] = useState<LoopingItem[]>([]);
  const [cityName, setCityName] = useState("");

  // Query to fetch weather data
  const { data, error, isLoading } = useQuery({
    queryKey: ["cities", cityName, 1], // query key
    queryFn: () => TranslateApi(cityName, 1), // API call
    staleTime: 2000,
  });

  // Weather state
  const [weather, setWeather] = useState<string>("");

  // Update weather state after fetching data
  useEffect(() => {
    if (data?.forecast?.forecastday) {
      setWeather(data.forecast.forecastday[0].day.condition.text);
      setLooping(data.forecast.forecastday); // Set data to loop over for the forecast
    }
  }, [data]);

  // Error handling if the query fails
  if (error) return <div>Error: {error.message}</div>;

  return (
    <center
      className={`MainWeather flex ${
        weather === "Sunny"
          ? "SunnyWeather"
          : weather === "Partly Cloudy"
          ? "partlyCloudWeather"
          : weather === "Cloudy"
          ? "ColdWeather"
          : "unknownWeather"
      }`}
    >
      <div className="Inputs-Box p-5 flex flex-col gap-3">
        <input
          className="text-slate-900"
          type="text"
          name="city"
          id="city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)} // Set the city name input
          placeholder="Enter city name"
        />
        {cityName.length > 0 && data?.location && (
          <h1>
            Weather Data for {cityName} / {data.location.country}
          </h1>
        )}
        {isLoading ? (
          <div className="text-green-400 text-2xl">Loading...</div>
        ) : cityName.length > 0 && looping?.length > 0 ? (
          looping.map((item, index) => (
            <div key={index}>
              <h2>{item.date}</h2>
              <div>
                <h3>{item?.astro?.moonrise || "N/A"}</h3>
                <h3>{item?.astro?.sunset || "N/A"}</h3>
                <h3>
                  Max Temp: {data?.forecast?.forecastday[0]?.day?.maxtemp_c} °C
                </h3>
              </div>
            </div>
          ))
        ) : (
          !isLoading && <div>No Data</div>
        )}
      </div>
    </center>
  );
};

export default WeatherApp;
