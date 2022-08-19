import './App.css'
import './Weather.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;
const query = '';
const API_KEY = '39f3e09998ff35b30cfe67ab6b86db20';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

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
    const query = value;
}
    ;


const Weather = (props) => {
    let lat = props.cord.latitude;
    let cordProps = {};
    cordProps=props.cord;
    const [state, setState] = useState(null)
    console.log('fromwhether'+cordProps);
    useEffect(() => {
        
        
        
        
        setState(cordProps)
       

    }, [])

    useEffect(() => {
        if (state) {
            console.log(state, typeof (state), Object.keys(state))
            const getWeather = (latIn, lonIn) => {
                const params = { lat: latIn, lon: lonIn, appid: API_KEY };

                return axios.get(API_URL, { params })
            }
        }
    }, [state])


    // getWeather(cord.lat, cord.lon).then((res) => {


    // }).catch((error) => { })


    return (
        <div className='main-frame'>
        <Space direction="vertical">
            <Search
                placeholder="input search text"
                onSearch={onSearch}
                style={{
                    width: 200,
                }}

            />
        </Space>
        <h1 className='place'>Calicut</h1>
        <p><span>Temperature:</span></p>
        <p><span>Wind:</span></p>
    </div> 

    )
}

export default Weather;