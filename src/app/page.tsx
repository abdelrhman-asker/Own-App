"use client";
import Link from "next/link";
// import WeatherApp from "./Home/Weather/page";

export default function Home() {
  return (
    <div>
      {/* <WeatherApp /> */}
      <div>Nextjs , Ts , Tailwind , Sass(SCSS) , ReactQuery</div>
      <div className="text-red-400">All packages Installed</div>
      <div className="text-green-400">Waiting for Development</div>
      <Link href="/Weather">
        <h3>WeatherApp</h3>
      </Link>
      <Link href="/Translate">
        <h3>TranslateApp</h3>
      </Link>
      <Link href="/Movies">
        <h3>Movies</h3>
      </Link>
    </div>
  );
}
