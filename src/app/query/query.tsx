export async function WeatherApi(cityName: string, numOfDays: number) {
  const response = await fetch(
    `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityName}&days=${numOfDays}`,
    {
      headers: {
        "x-rapidapi-key": "fe3469bdc5mshc1376ef3df17411p1623cajsn6da2a938a410",
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      },
    }
  );
  // throw new Error("its an error");
  return response.json();
}
export async function TranslateApi(
  InputToTranslate: string,
  fromLang: string,
  toLang: string
) {
  const url = "https://deep-translate1.p.rapidapi.com/language/translate/v2";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "fe3469bdc5mshc1376ef3df17411p1623cajsn6da2a938a410",
      "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: InputToTranslate,
      source: fromLang,
      target: toLang,
    }),
  };
  const response = await fetch(url, options);
  return response.json();
}
