import './App.css'
import { Input, Space } from 'antd';
import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import humidityIcon from './icons/humidity-icon-white.png';
import arrowDownIcon from './icons/arrow-up.png';
import arrowUpIcon from './icons/arrow-down.png';
import tempIcon from './icons/temp-icon.png';

const API_KEY = '39f3e09998ff35b30cfe67ab6b86db20';
const API_URL1 = 'http://api.openweathermap.org/geo/1.0/direct';



const { Search } = Input;
const WeatherWidget =()=>{

    const [inputCity, setInputCity] = useState('Calicut');
    const [weatherData, setweatherData] = useState(false);
    const [cordData, setcordData] = useState(0);
    
  
  
    
    const onSearch = (value) => {
      console.log(value);
      setInputCity(value);
    }
  
    useEffect(() => {
      
    })
  
  
    useEffect(() => {
      console.log(inputCity)
      getCordinates(inputCity).then((res) => {
        setcordData(res.data[0]);
        console.log('cord res: ', res.data[0].lat);
        console.log('cord Data: ', cordData);
        console.log('input City:' + inputCity);
      }).catch((error) => { })
  
    }, [inputCity])
  
    useEffect(() => {
      getWeather().then((res) => {
        console.log('from API2: ', res);
        setweatherData(res);
        console.log('WeatherData:', weatherData);
        console.log('Temperature', weatherData.data.main.temp);
      }).catch((error) => { })
    }, [cordData])
  
    // Make a request for a user with a given ID
  
    const getCordinates = (place) => {
      const params = {
        q: place, appid: API_KEY
      };
      return axios.get(API_URL1, { params })
    }
  
  
    const getWeather = () => {
      var latitude = cordData.lat;
      var longitude = cordData.lon;
      console.log('latitude' + latitude + 'longitude' + longitude);
      const params = {
        lat: latitude, lon: longitude, units: 'metric', appid: API_KEY
      };
      return axios.get('https://api.openweathermap.org/data/2.5/weather', { params });
    };
  
  
  
  
    return (
      
          
          <div className="site-layout-content">
            <div className='main-frame'>
              <div className='cardHeader' direction="vertical" align='center'>
                <Search className='search'
                  placeholder="Enter City Name"
                  onSearch={onSearch}
                  style={{
                    width: 200,
                  }}
  
                />
              </div>
  
              <div className='cardRow'>
                <h1 className='place'>{inputCity}</h1>
              </div>
             
              
              <Space className='cardRow' align='center'>
                <Space align='end'>
                <img src={tempIcon} className='temp-icon' alt='Icon' ></img>
                 <p className='tempMain'><span></span>{weatherData && weatherData.data.main.temp}??C</p>
                </Space>
                
                <Space  align='end'>
                  <img src={humidityIcon} className='hum-icon' alt='Icon' ></img>
                  <p className='hum'>{weatherData && weatherData.data.main.humidity}%</p>
                </Space> 
              </Space>
  
              <Space className='cardRow'>
                <Space size='large' className='min-max' >
                  <Space>
                  <img src={arrowDownIcon} alt='Down Arrow' ></img>
                  <p>{weatherData && weatherData.data.main.temp_min} ??C</p>
                  </Space>
                  <Space>
                    <img src={arrowUpIcon} alt='Up Arrow' ></img>
                    <p>{weatherData && weatherData.data.main.temp_max} ??C</p>
                 </Space>
                </Space>
                <p><span>Feels Like: </span>{weatherData && weatherData.data.main.feels_like} ??C</p>
                
              </Space>
  
              <Space className='cardRow'>
                <Space>
                  <p>{weatherData && weatherData.data.weather[0].description}</p>
                  <img className='weatherImg' src={`http://openweathermap.org/img/wn/${weatherData && weatherData.data.weather[0].icon}@2x.png`} alt='Icon' ></img>
                </Space>
                <p><span>Wind: </span>{weatherData && weatherData.data.wind.speed} km/h</p>
              </Space>
              
              <Space className='cardRow'>
                <p><span>Pressure: </span>{weatherData && weatherData.data.main.pressure} hPa</p> 
                
                  <p><span>Sea Level: </span>{weatherData && weatherData.data.main.sea_level} m</p>
                
              </Space>
  
              
              
  
            </div>
  
          </div>
  
     
        
     
    );
  
  
}

export default WeatherWidget;