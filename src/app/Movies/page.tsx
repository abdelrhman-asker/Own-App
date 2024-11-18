"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { MovieApi } from "../query/query";
// import Image from "next/image";
type Movie = {
  id: string;
  title: string;
  poster_path: string;
};
const Movies = () => {
  const [looping, setLooping] = useState([]);

  const [MovieName, setMovieName] = useState<string>("");
  const [Categ, setCateg] = useState<string>("movie");
  const [imgLoads, setImageLoads] = useState(true);
  // Query to fetch weather data
  const { data, error, isLoading } = useQuery({
    queryKey: ["movies", MovieName, Categ], // query key
    queryFn: () => MovieApi(MovieName, Categ), // API call
    staleTime: 2000,
  });
  useEffect(() => {
    setLooping(data?.search);
  }, [data]);

  if (error) console.log(error);
  if (isLoading) console.log("Loading");

  return (
    <div>
      <input
        type="text"
        name="MovieName"
        id="MovieInput"
        placeholder="Enter Your Movie"
        className="w-80 h-20 rounded-xl text-gray-800 text-l"
        value={MovieName}
        onChange={(e) => setMovieName(e.target.value)}
      />

      <div>
        {looping?.length > 0
          ? looping.map((movie: Movie) => {
              return (
                <div key={movie?.id}>
                  <h2>{movie?.title}</h2>
                  {/* <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      onLoad={() => setImageLoads(false)}
                    /> */}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Movies;
