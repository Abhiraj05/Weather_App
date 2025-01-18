import { useState } from "react";

function App() {
  let current_location,
    country_name,
    current_temp,
    current_weather,
    current_time,
    time_in_hours,
    time_in_minutes;
  const [name, setname] = useState(null);
  const [country, setcountry] = useState(null);
  const [temperature, settemperature] = useState(null);
  const [weather, setweather] = useState(null);
  const [location, setlocation] = useState(null);
  const [minutes, setminutes] = useState(null);
  const [hours, sethours] = useState(null);

  function get_Data() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=25567d212df73b0906682ec5a21925dc&units=metric`
    ).then((api_data) => {
      api_data.json().then((converted_data) => {
        current_location = converted_data["name"];
        country_name = converted_data["sys"]["country"];
        current_temp = converted_data["main"]["temp"];
        current_weather = converted_data["weather"][0]["main"];
        current_time = converted_data["timezone"];
        setname(current_location);
        setcountry(country_name);
        settemperature(current_temp);
        setweather(current_weather);
        time_in_hours = Math.floor(current_time / 3600);
        time_in_minutes = Math.floor((current_time % 3600) / 60);
        sethours(time_in_hours);
        setminutes(time_in_minutes);
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
          <p>{temperature}c</p>
          <p>{weather}</p>
          <p>
            {hours}:{minutes}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
