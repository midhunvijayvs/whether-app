
import './App.css'
import { Breadcrumb, Layout, Menu } from 'antd';
import { Input, Space } from 'antd';
import React from 'react';
import axios from 'axios';
import { AudioOutlined } from '@ant-design/icons';
import { state, useState, useEffect, setState } from 'react';
const { Header, Content, Footer } = Layout;

const API_KEY = '39f3e09998ff35b30cfe67ab6b86db20';
const API_URL1 = 'http://api.openweathermap.org/geo/1.0/direct';



const { Search } = Input;
const query = '';
const API_URL2 = 'https://api.openweathermap.org/data/2.5/weather';



const App = () => {
  const [inputCity, setInputCity] = useState('Calicut');
  const [weatherData, setweatherData] = useState(false);
  const [cordData, setcordData] = useState(0);
  let cord = {};


  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

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
    <Layout className="layout">
      <Header>
        Current Weather
        <div className="logo" />
        
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          
          <Breadcrumb.Item>Weather App</Breadcrumb.Item>
        </Breadcrumb>
        
        
        <div className="site-layout-content">
          <div className='main-frame'>
            <Space direction="vertical" align='center'>
              <Search className='search'
                placeholder="Enter City Name"
                onSearch={onSearch}
                style={{
                  width: 200,
                }}

              />
            </Space>


            <h1 className='place'>{inputCity}</h1>
            <h2>{weatherData && weatherData.data.weather[0].description}</h2>
            <Space className='cardRow'>
              <p><span></span>{weatherData && weatherData.data.main.temp} °C</p>
              <p><span></span>{weatherData && weatherData.data.main.humidity}%</p>
            </Space>

            <Space className='cardRow cardRowSmall'>
              <p><span>Feels Like: </span>{weatherData && weatherData.data.main.feels_like}°C</p>
              <p><span>Pressure: </span>{weatherData && weatherData.data.main.pressure}</p>
            </Space>

            <Space className='cardRow cardRowSmall'>
              <p><span>Min: </span>{weatherData && weatherData.data.main.temp_min}°C</p>
              <p><span>Sea Level: </span>{weatherData && weatherData.data.main.sea_level}m</p>
            </Space>

            <Space className='cardRow cardRowSmall'>
              <p><span>Max: </span>{weatherData && weatherData.data.main.temp_max}°C</p>
              <p><span>Wind: </span>{weatherData && weatherData.data.wind.speed}m/s</p>
            </Space>
            

          </div>

        </div>

      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Tranetech Software Solutions.
      </Footer>
    </Layout>
  );



}

export default App;