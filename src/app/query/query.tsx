export async function TranslateApi(cityName: string, numOfDays: number) {
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
