<template>
  <div id="weather-app">
    <h1>{{ weatherData[0].tempMax }}°C</h1>
    <div v-if="weatherData" class="content">
      <i class="qi-100-fill"></i>
      <p>
        <span class="city">南京</span>
        <span class="weather">{{ weatherData[0].textDay }}</span>
      </p>
      <p>
        <span class="value">{{ weatherData[0].tempMin }}</span>
        <span class="unit">最低气温°C</span>
      </p>
      <p>
        <span class="value">{{ weatherData[0].humidity }}</span>
        <span class="unit">湿度%</span>
      </p>
      <p>
        <span class="value">{{ weatherData[0].uvIndex }}</span>
        <span class="unit">紫外线</span>
      </p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      weatherData: [{
        tempMax: 0,
        textDay: '晴',
        tempMin: 10,
        humidity: 22,
        uvIndex: 2
      }],
    };
  },
  async created() {
    let geo = ''
    // 获取经纬度
    try {
      const response = await axios.get('https://geoapi.qweather.com/v2/city/lookup?location=nanjing&key=2103eccd75874cf89a6f7e68b76a13f4'); // 替换为真实的API URL和查询参数
      geo = response.data.location[0].id
      try {
        const response = await axios.get(`https://devapi.qweather.com/v7/weather/3d?location=${geo}&key=2103eccd75874cf89a6f7e68b76a13f4`); // 替换为真实的API URL和查询参数
        this.weatherData = response.data.daily;
        for (const key in response.data.daily) {
          for (const key1 in this.weatherData[0]) {
            if (key === key1) {
              this.weatherData[0][key1] = response.data.daily[key1]
            }
          }
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    } catch (error) {
      console.error('Error fetching geo data:', error);
    }
  },
};
</script>

<style scoped>
/* Add your custom styles here */
  h1 {
    font-size: 30px;
    margin-left: 20px;
    margin-top: 10px;
  }
 i {
   margin: 10px;
   font-size: 50px;
 }
 .content {
   display: flex;
   justify-content: space-between;
   margin-top: 35px;
   p {
     span {
       display: block;
       margin: 5px;
     }
     .city {
       font-size: 25px;
     }
     .weather {
       font-size: 25px;
     }
     .value {
       text-align: center;
       font-size: 30px;
     }
     .unit {
       text-align: center;
       color: #4b67af;
       font-size: 20px;
       width: 100px;
     }
   }
 }
</style>