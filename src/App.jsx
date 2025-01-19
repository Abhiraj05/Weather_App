import { useState } from "react";

function App() {
  let current_location,
    country_name,
    current_temp,
    current_weather,
    current_humidity

  const [name, setname] = useState('');
  const [country, setcountry] = useState(null);
  const [temperature, settemperature] = useState(null);
  const [weather, setweather] = useState(null);
  const [location, setlocation] = useState('');
  const[humidity,sethumidity]=useState(null)
  function get_Data() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=25567d212df73b0906682ec5a21925dc&units=metric`
    ).then((api_data) => {
      api_data.json().then((converted_data) => {
        current_location = converted_data["name"];
        country_name = converted_data["sys"]["country"];
        current_temp = converted_data["main"]["temp"];
        current_weather = converted_data["weather"][0]["main"];
        current_humidity=converted_data["main"]["humidity"];
        setname(current_location);
        setcountry(country_name);
        settemperature(current_temp);
        setweather(current_weather);
        sethumidity(current_humidity)
        setlocation("");
      });
    });
  }
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex-wrap text-center font-mono text-3xl capitalize text-white font-extrabold">
          <div className="flex justify-center items-center">
            <input
              type="text"
              className="text-black"
              onChange={(event) => {
                setlocation(event.target.value);
              }}
              value={location}
            />
            <button onClick={get_Data}>search</button>
          </div>
          <p>
            {name},{country}
          </p>
          <p>
            {humidity}%
          </p>
          <p>{temperature}c</p>
          <p>{weather}</p>
        </div>
      </div>
    </>
  );
}

export default App;
