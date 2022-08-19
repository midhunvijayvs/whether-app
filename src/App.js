
import './App.css'
import Weather from './Weather.js'
import { Breadcrumb, Layout, Menu } from 'antd';
import { Input, Space } from 'antd';
import React from 'react';
import axios from 'axios';
import { AudioOutlined } from '@ant-design/icons';
import { state, useState, useEffect, setState } from 'react';
const { Header, Content, Footer } = Layout;

const API_KEY = '39f3e09998ff35b30cfe67ab6b86db20';
const API_URL1 = 'http://api.openweathermap.org/geo/1.0/direct'


const { Search } = Input;
const query = '';
const API_URL2 = 'https://api.openweathermap.org/data/2.5/weather'

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

const App = () => {

  const [state, setState] = useState(null);

  let cord={};

  // Make a request for a user with a given ID

  const getCordinates = (place) => {
    const params = {
      q: place, appid: API_KEY
    };

    return axios.get(API_URL1, { params})
  }
  getCordinates('London').then((res) => {
    cord.latitude = res.data[0].lat;
    cord.longitude = res.data[0].lon;
    console.log('from APP'+cord.latitude);
    
 
  }).catch((error) => { })



  useEffect(() => {
        
        
        
        
    setState(cord)
   

}, [])



            

           
        }
useEffect(() => {
    if (state) {
        console.log(state, typeof (state), Object.keys(state))
       
        const params = { lat: cord.latitude, lon: cord.longitude, appid: API_KEY };
axios.get(API_URL2, { params }).then((res) => {
  cord.latitude = res.data[0].lat;
  cord.longitude = res.data[0].lon;
  console.log('from APP'+cord.latitude);
  

}).catch((error) => { })


    }
}, [state])





  return (
    <Layout className="layout">
      <Header>
        Current Weather
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(2).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
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
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
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

        </div>

      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        tranetech
      </Footer>
    </Layout>
  );
}

export default App;