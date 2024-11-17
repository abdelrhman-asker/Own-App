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
      <Link href="/Weather">WeatherApp</Link>
      <Link href="/Translate">TranslateApp</Link>
    </div>
  );
}
