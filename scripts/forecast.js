const key = "rHKzuQVV7fAxieYJCb7PFUuBKl0r6Eq5";

// Get weather information
const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};
// Get city information
const getCity = async (city) => {
  // Api structure
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;
  // Fetch data
  const response = await fetch(base + query);
  // Turns into data
  const data = await response.json();
  // Return a promise with the first position
  return data[0];
};

getCity("manchester")
  .then((data) => {
    return getWeather(data.Key);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
