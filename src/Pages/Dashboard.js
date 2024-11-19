// import React, { useState, useEffect } from "react";
// import { Tabs, Tab, Box, IconButton } from '@mui/material';
// import { Mic, Notifications } from '@mui/icons-material';
// import Light from "../Components/Light";
// import Fan from "../Components/Fan";
// import AC from "../Components/AC";
// import { useUser } from "../Context/UserContext";
// import CustomTabPanel from '../Components/CustomTab';
// import { useWebSocket } from "../Context/WebSocketContext";

// function Dashboard() {
//   const [value, setValue] = useState(0);
//   const { user } = useUser();
//   const {sendMessage} = useWebSocket();
//   const [isListening, setIsListening] = useState(false);
//   const [command, setCommand] = useState("");

//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = SpeechRecognition ? new SpeechRecognition() : null;

//   useEffect(() => {
//     if (recognition) {
//       recognition.continuous = false;
//       recognition.lang = "en-US";

//       recognition.onstart = () => setIsListening(true);
//       recognition.onend = () => setIsListening(false);
//       recognition.onresult = (event) => {
//         const transcript = event.results[event.resultIndex][0].transcript;
//         setCommand(transcript);
//         if(transcript=="lights on"){
//           sendMessage(JSON.stringify({
//             type: "DEVICE_CONTROL",
//             deviceid: "ESP32_Device-01",
//         }));
//         }
//       };
//     }
//   }, [recognition]);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const toggleListening = () => {
//     if (isListening) {
//       recognition.stop();
//     } else {
//       recognition.start();

//       setTimeout(() => {
//         recognition.stop();
//       }, 5000);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <section>
//         <div className="d-flex justify-content-between mb-3">
//           <div>
//             <h2>Hello, {user.username}!</h2>
//             <p>Welcome back to your home</p>
//           </div>
//           <IconButton size="medium" sx={{ borderRadius: "500px" }}>
//             <Notifications />
//           </IconButton>
//         </div>
//       </section>

//       <section>
//         <div>
//           <div className="row mt-4">
//             <div className="col-12 col-md-4 mb-3">
//               <div className="card border-0 shadow h-100">
//                 <div className="card-body">
//                   <h5 className="card-title">Temperature</h5>
//                   <h2 className="card-text">22°C</h2>
//                   <p className="card-text">Normal range</p>
//                 </div>
//               </div>
//             </div>

//             {/* Humidity Card */}
//             <div className="col-12 col-md-4 mb-3">
//               <div className="card border-0 shadow h-100">
//                 <div className="card-body">
//                   <h5 className="card-title">Humidity</h5>
//                   <h2 className="card-text">45%</h2>
//                   <p className="card-text">Optimal level</p>
//                 </div>
//               </div>
//             </div>

//             {/* New Voice Command Card */}
//             <div className="col-12 col-md-4 mb-3">
//               <div className="card border-0 shadow h-100">
//                 <div className="card-body">
//                   <h5 className="card-title text-center mb-3">Voice Control</h5>

//                   {/* Flex container for button and text side by side */}
//                   <div className="d-flex justify-content-center align-items-center mt-1">

//                     <button
//                       onClick={toggleListening}
//                       style={{
//                         height: '60px',
//                         width: '60px',
//                         borderRadius: '50%',
//                         border:0
//                       }}
//                     >
//                       <Mic fontSize="large"></Mic>
                      
//                     </button>
//                     <div className="ms-3">
//                       <p className="mb-2">
//                         {isListening ? "Listening..." : "Start Listening"}
//                       </p>
//                       <p className="mb-0">
//                         {command ? `You said: "${command}"` : "Say a command..."}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section>
//         <div className="row">
//           <div className="col-12 mb-3">
//             <div className="card border-0 shadow">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between">
//                   <h5 className="card-title">Your Rooms</h5>
//                 </div>
//                 <div className="mt-3">
//                   <div className="d-flex justify-content-between">
//                     <Box sx={{ maxWidth: { xs: 320, sm: 287 }, bgcolor: 'background.paper', p: 0 }}>
//                       <Tabs
//                         value={value}
//                         onChange={handleChange}
//                         variant="scrollable"
//                         scrollButtons={false}
//                         aria-label="scrollable auto tabs example"
//                         sx={{ minHeight: "28px", p: 0 }}
//                         style={{ backgroundColor: "#EEEDEB" }}
//                       >
//                         <Tab label="All devices" sx={{ minHeight: "28px", textTransform: 'none', fontSize: "15px", p: 1 }} />
//                         {user.rooms.map((room) => {
//                           return <Tab label={room.name} sx={{ minHeight: "28px", textTransform: 'none', fontSize: "15px", p: 1 }} />;
//                         })}
//                       </Tabs>
//                     </Box>
//                   </div>
//                   <CustomTabPanel value={value} index={0}>
//                     <div className="row mt-4">
//                       {user.devices.length === 0 ? (
//                         <div className="d-flex justify-content-center align-items-center">
//                           <h4>No devices found</h4>
//                         </div>
//                       ) : (
//                         user.devices.map((device) => {
//                           if (device.devicetype === "Light") {
//                             return <Light name={device.devicename} id={device.deviceid} />;
//                           } else if (device.devicetype === "Fan") {
//                             return <Fan name={device.devicename} />;
//                           } else if (device.devicetype === "Air Conditioner") {
//                             return <AC name={device.devicename} />;
//                           }
//                           return null;
//                         })
//                       )}
//                     </div>
//                   </CustomTabPanel>
//                   {user.rooms.map((room, index) => (
//                     <CustomTabPanel value={value} index={index + 1} key={room.name}>
//                       <div className="row mt-4">
//                         {user.devices.filter(device => device.location === room.name).map((device) => {
//                           if (device.devicetype === "Light") {
//                             return <Light key={device.id} name={device.devicename} id={device.deviceid} />;
//                           } else if (device.devicetype === "Fan") {
//                             return <Fan key={device.id} name={device.devicename} />;
//                           } else if (device.devicetype === "Air Conditioner") {
//                             return <AC key={device.id} name={device.devicename} />;
//                           }
//                           return (
//                             <div className="d-flex justify-content-center align-items-center" key={device.id}>
//                               <h4>No devices found in {room.name}</h4>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </CustomTabPanel>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section>
//         <div className="row">
//           <div className="col-12 mb-3">
//             <div className="card border-0 shadow">
//               <div className="card-body">
//                 <h5>Quick Actions</h5>
//                 <div className="d-flex justify-content-between mt-3">
//                   <button className="btn btn-dark w-25 d-flex align-items-center justify-content-center me-2" style={{ height: '80px' }}>
//                     All Off
//                   </button>
//                   <button className="btn btn-dark w-25 d-flex align-items-center justify-content-center me-2" style={{ height: '80px' }}>
//                     Lights Off
//                   </button>
//                   <button className="btn btn-dark w-25 d-flex align-items-center justify-content-center me-2" style={{ height: '80px' }}>
//                     Lock All
//                   </button>
//                   <button className="btn btn-dark w-25 d-flex align-items-center justify-content-center" style={{ height: '80px' }}>
//                     Unlock All
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Dashboard;



import React, { useState, useEffect } from "react";
import { IconButton, Box, Tabs, Tab} from '@mui/material';
import { Mic, Notifications } from '@mui/icons-material';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faSun, faCloudSun,faCloudRain,faCloud, faSnowflake, faTint } from '@fortawesome/free-solid-svg-icons';

import Light from "../Components/Light";
import Fan from "../Components/Fan";
import AC from "../Components/AC";
import { useUser } from "../Context/UserContext";
import CustomTabPanel from '../Components/CustomTab';
import { useWebSocket } from "../Context/WebSocketContext";

import '../css/Dashboard.css';

function Dashboard() {
  const [value, setValue] = useState(0);
  const { user } = useUser();
  const { sendMessage } = useWebSocket();
  const [isListening, setIsListening] = useState(false);
  const [command, setCommand] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(faThermometerHalf);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const API_KEY = "e885975096c9aa61fe98a6d07b9418da"; // Replace with your OpenWeatherMap API Key

  // Fetch location and temperature
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      }, (error) => {
        console.error("Error fetching location:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Fetch temperature when latitude and longitude are available
  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeatherData = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const data = await response.json();
          const temp = data.main.temp;
          const humidity = data.main.humidity;
          const weather = data.weather[0].main.toLowerCase();
  
          setTemperature(temp);
          setHumidity(humidity);
  
          // Dynamically set the icon based on the weather condition and temperature
          if (weather.includes("rain")) {
            setWeatherIcon(faCloudRain); // Rainy weather
          } else if (weather.includes("cloud")) {
            setWeatherIcon(faCloud); // Cloudy weather
          } else if (weather.includes("clear")) {
            setWeatherIcon(faSun); // Clear weather
          } else if (temp >= 30) {
            setWeatherIcon(faSun); // Hot weather
          } else if (temp >= 20) {
            setWeatherIcon(faCloudSun); // Mild weather
          } else {
            setWeatherIcon(faSnowflake); // Cold weather
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setWeatherIcon(faThermometerHalf); // Default fallback icon
        }
      };
  
      fetchWeatherData();
    }
  }, [latitude, longitude]);
  
  
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();

      setTimeout(() => {
        recognition.stop();
      }, 5000);
    }
  };

  return (
    <div className="bg ">
    <div className="container">
      <section>
        <div className="d-flex justify-content-between mb-3">
          <div>
            <h2>Hello, {user.username}!</h2>
            <p>Welcome back to your home</p>
          </div>
          <IconButton size="medium" sx={{ borderRadius: "500px" }}>
            <Notifications />
          </IconButton>
        </div>
      </section>

      <section>
        <div>
          <div className="row mt-4">
            {/* Temperature Card */}
            <div className="col-12 col-md-4 mb-3">
              <div className="temp card border-0 shadow h-100 position-relative">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faThermometerHalf} size="lg" className="me-2" />
                        <h5 className="card-title">Temperature</h5>
                      </div>
                      <h2 className="card-text">
                        {temperature !== null ? `${temperature}°C` : "Loading..."}
                      </h2>
                      <p className="card-text">
                        {temperature !== null
                          ? temperature >= 30
                            ? "Hot"
                            : temperature >= 20
                            ? "Moderate"
                            : "Cold"
                          : ""}
                      </p>
                    </div>
                    <FontAwesomeIcon icon={weatherIcon} size="3x" className="ms-2" />
                  </div>
                </div>
              </div>
            </div>
           {/* Humidity Card */}
<div className="col-12 col-md-4 mb-3">
  <div className="humidity card border-0 shadow h-100">
    <div className="card-body">
      <div className="d-flex align-items-center">
        <FontAwesomeIcon icon={faTint} size="lg" className="me-2" />
        <h5 className="card-title">Humidity</h5>
      </div>
      <h2 className="card-text">
        {humidity !== null ? `${humidity}%` : "Loading..."}
      </h2>
      <p className="card-text">
        {humidity !== null
          ? humidity >= 30 && humidity <= 50
            ? "Optimal level"
            : humidity < 30
            ? "Low humidity"
            : "High humidity"
          : "Fetching data..."}
      </p>
    </div>
  </div>
</div>


            {/* Voice Command Card */}
            <div className="col-12 col-md-4 mb-3">
              <div className="card border-0 shadow h-100">
                <div className="card-body">
                  <h5 className="card-title text-center mb-3">Voice Control</h5>
                  <div className="d-flex justify-content-center align-items-center mt-1">
                    <button
                      onClick={toggleListening}
                      style={{
                        height: '60px',
                        width: '60px',
                        borderRadius: '50%',
                        border: 0
                      }}
                    >
                      <Mic fontSize="large" />
                    </button>
                    <div className="ms-3">
                      <p className="mb-2">
                        {isListening ? "Listening..." : "Start Listening"}
                      </p>
                      <p className="mb-0">
                        {command ? `You said:` `${command}` : "Say a command..."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="row">
          <div className="col-12 mb-3">
            <div className="card b border-0 shadow">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">Your Rooms</h5>
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-between">
                    <Box sx={{ maxWidth: { xs: 320, sm: 287 }, bgcolor: 'background.paper', p: 0 }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons={false}
                        aria-label="scrollable auto tabs example"
                        sx={{ minHeight: "28px", p: 0 }}
                        style={{ backgroundColor: "#EEEDEB" }}
                      >
                        <Tab label="All devices" sx={{ minHeight: "28px", textTransform: 'none', fontSize: "15px", p: 1 }} />
                        {user.rooms.map((room) => {
                          return <Tab label={room.name} sx={{ minHeight: "28px", textTransform: 'none', fontSize: "15px", p: 1 }} />;
                        })}
                      </Tabs>
                    </Box>
                  </div>
                  <CustomTabPanel value={value} index={0}>
                    <div className="row mt-4">
                      {user.devices.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center">
                          <h4>No devices found</h4>
                        </div>
                      ) : (
                        user.devices.map((device) => {
                          if (device.devicetype === "Light") {
                            return <Light name={device.devicename} id={device.deviceid} />;
                          } else if (device.devicetype === "Fan") {
                            return <Fan name={device.devicename} />;
                          } else if (device.devicetype === "Air Conditioner") {
                            return <AC name={device.devicename} />;
                          }
                          return null;
                        })
                      )}
                    </div>
                  </CustomTabPanel>
                  {user.rooms.map((room, index) => (
                    <CustomTabPanel value={value} index={index + 1} key={room.name}>
                      <div className="row mt-4">
                        {user.devices.filter(device => device.location === room.name).map((device) => {
                          if (device.devicetype === "Light") {
                            return <Light key={device.id} name={device.devicename} id={device.deviceid} />;
                          } else if (device.devicetype === "Fan") {
                            return <Fan key={device.id} name={device.devicename} />;
                          } else if (device.devicetype === "Air Conditioner") {
                            return <AC key={device.id} name={device.devicename} />;
                          }
                          return (
                            <div className="d-flex justify-content-center align-items-center" key={device.id}>
                              <h4>No devices found in {room.name}</h4>
                            </div>
                          );
                        })}
                      </div>
                    </CustomTabPanel>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="row">
          <div className="col-12 mb-3">
            <div className="card c border-0 shadow">
              <div className="card-body">
                <h5>Quick Actions</h5>
                <div className="d-flex justify-content-between mt-3">
                  <button className="buttons btn btn-dark w-25 d-flex align-items-center justify-content-center me-2" style={{ height: '80px' }}>
                    All Off
                  </button>
                  <button className="buttons btn btn-dark w-25 d-flex align-items-center justify-content-center me-2" style={{ height: '80px' }}>
                    Lights Off
                  </button>
                  <button className="buttons btn btn-dark w-25 d-flex align-items-center justify-content-center me-2" style={{ height: '80px' }}>
                    Lock All
                  </button>
                  <button className="buttons btn btn-dark w-25 d-flex align-items-center justify-content-center" style={{ height: '80px' }}>
                    Unlock All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}

export default Dashboard;