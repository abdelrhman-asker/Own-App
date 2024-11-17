"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { TranslateApi } from "../query/query";
import "./style.css";

const Translate = () => {
  const [InputToTranslate, setInputToTranslate] = useState<string>("hello");
  const [fromLang, setFromLang] = useState<string>("en");
  const [toLang, setToLang] = useState<string>("ar");

  // Query to fetch Translations
  const { data, error, isLoading } = useQuery({
    queryKey: ["InputToTranslate", InputToTranslate, fromLang, toLang], // query key
    queryFn: () => TranslateApi(InputToTranslate, fromLang, toLang), // API call
    staleTime: 2000,
  });
  useEffect(() => {
    console.log(data?.data?.translations?.translatedText);
  });
  if (error) console.log(error);
  return (
    <div className="MainTranslatingPage">
      <div className="FromToAndTextContent">
        <div>
          <h4>from </h4>
          <select
            name="lang"
            id="FromLang"
            value={fromLang}
            onChange={(e) => setFromLang(e.target.value)}
          >
            <optgroup label="Available Languages">
              <option value="en" defaultChecked>
                english
              </option>
              <option value="ar">arabic</option>
              <option value="es">spain</option>
              <option value="it">italy</option>
            </optgroup>
          </select>
        </div>
        <input
          type="text"
          value={InputToTranslate}
          onChange={(e) => setInputToTranslate(e.target.value)}
        />
        <div>
          <h4>To </h4>

          <select
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
            name="lang"
            id="ToLang"
          >
            <optgroup label="Available Languages">
              <option value="en">english</option>
              <option value="ar" defaultChecked>
                arabic
              </option>
              <option value="es">spain</option>
              <option value="it">italy</option>
            </optgroup>
          </select>
        </div>
      </div>
      {isLoading ? (
        <h2 className="TranslatedContent">Translating...</h2>
      ) : (
        <h2 className="TranslatedContent">
          {data?.data?.translations?.translatedText}
        </h2>
      )}
    </div>
  );
};

export default Translate;
