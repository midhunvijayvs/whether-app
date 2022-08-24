
import './App.css'
import { Breadcrumb, Layout } from 'antd';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import WeatherWidget from './WeatherWidget.js';
import { render } from '@testing-library/react';
import { Counter } from './features/counter/counter';

const { Header, Content, Footer } = Layout;

const API_KEY = '39f3e09998ff35b30cfe67ab6b86db20';
const API_URL1 = 'http://api.openweathermap.org/geo/1.0/direct';


const App = () => {
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
        
        <WeatherWidget/>
        <Counter/>

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

