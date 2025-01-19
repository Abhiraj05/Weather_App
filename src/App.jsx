import { useState } from "react";
import sky from "./assets/clear-sky.png";
import searchicon from "./assets/icons8-search-500.png";
import tempicon from "./assets/tempeicon.png";
import locationicon from "./assets/locationicon.png";
import humidityicon from "./assets/humidityicon.png";
import cloudsicon from "./assets/cloudsicon.png";
import windicon from "./assets/windicon.png";
import icon from "./assets/weather-app.png";
import Spinner from "./Spinner";


function App() {
  let current_location,
    country_name,
    current_temp,
    current_weather,
    current_humidity,
    current_speed,
    converted_speed;

  const [name, setname] = useState("");
  const [country, setcountry] = useState(null);
  const [temperature, settemperature] = useState(null);
  const [weather, setweather] = useState(null);
  const [location, setlocation] = useState("");
  const [humidity, sethumidity] = useState(null);
  const [speed,setspeed]=useState(null);
  const [enable, setenable] = useState(null);
  const [spinnervisbility, setspinner] = useState(null);
  const [message,setmessage]=useState("")
  const [view,setview]=useState(true)

  function get_Data() {
    if (isNaN(location)) {
      setspinner(true);
      setenable(false)
      setmessage("")
      const set_interval=  setInterval(() => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=25567d212df73b0906682ec5a21925dc&units=metric`
      ).then((api_data) => {
        api_data.json().then((converted_data) => {
          current_location = converted_data["name"];
          country_name = converted_data["sys"]["country"];
          current_temp = converted_data["main"]["temp"];
          current_weather = converted_data["weather"][0]["main"];
          current_humidity = converted_data["main"]["humidity"];
          current_speed=converted_data["wind"]["speed"]
          converted_speed=(current_speed*3.6).toFixed(2)
          setname(current_location);
          setcountry(country_name);
          settemperature(current_temp);
          setweather(current_weather);
          sethumidity(current_humidity);
          setspeed(converted_speed)
          setlocation("");
          setenable(true);
          setspinner(false);
          setview(false)
          clearInterval(set_interval)
        });
      });

     },2000);

    } 
       else {
        setmessage("please enter the location !")
        setenable(false)
    }

}


 

  

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex-wrap text-center font-mono  capitalize text-white font-extrabold bg-gray-800 p-10 rounded-lg">
        {view && (<div className="flex justify-center items-center gap-5">
            <img className="h-12 w-12" src={icon} alt="" />
          <h1 className="text-3xl capitalize font-mono">weather app</h1>
          </div>)}
          <div className="flex justify-center items-center gap-4 mt-5 mb-5">
            <input
              type="text"
              className="text-black text-lg pl-4 focus:outline-none h-10 w-60 rounded-lg bg-gray-200 capitalize placeholder:capitalize placeholder:text-base
              "
              onChange={(event) => {
                setlocation(event.target.value);
              }}
              value={location}
              placeholder="search location"
            />
            <button onClick={get_Data}>
              <img className="w-8 h-8" src={searchicon} alt="" />
            </button>
          </div>
          <div>{spinnervisbility && <Spinner />}</div>
          <p className="text-white text-lg mt-3 mb-3">{message}</p>
          <div className="flex justify-center items-center">
            <div>
              {enable && (
                <div className="flex justify-center items-center">
                  <img className="w-28 h-28 mb-5" src={sky} alt="" />
                </div>
              )}
              {enable && (
                <div className="flex justify-center items-center gap-1">
                  <img className="w-12 h-12" src={tempicon} alt="" />
                  <p className="text-4xl">{temperature}°C</p>
                </div>
              )}

              {enable && (
                <div className="flex justify-center items-center gap-2 mt-5">
                  <img className="w-8 h-8" src={locationicon} alt="" />
                  <p className="text-2xl">
                    {name},{country}
                  </p>
                </div>
              )}
               {enable && (
                <div className="flex justify-center items-center gap-3 mt-5">
                  <img className="w-10 h-10" src={cloudsicon} alt="" />
                  <p  className="text-2xl">{weather}</p>
                </div>
              )}
              {enable && (
                <div className="flex justify-center items-center gap-5 mt-5">
                  <div>
                    <div className="flex justify-center items-center gap-2 ">
                      <img  className="w-10 h-10" src={windicon} alt="" />
                      <div> <p className="text-xl  flex justify-start items-center">
                          {speed}km/h
                        </p>
                        <p className="text-lg font-medium ">wind speed</p></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center items-center gap-2 ">
                      <img className="w-9 h-9" src={humidityicon} alt="" />
                      <div>
                        <p className="text-xl  flex justify-start items-center">
                          {humidity}%
                        </p>
                        <p className="text-lg font-medium">humidity</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-center">
        <p className="font-sans font-semibold md:text-base text-sm text-white capitalize mb-9">
          made with &#10084; by abhiraj
        </p>
      </div>
    </>
  );
}

export default App;
