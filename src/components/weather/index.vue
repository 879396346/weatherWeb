<template>
  <div id="weather-app">
    <h1>{{ weatherData[0].tempMax }}°C</h1>
    <div v-if="weatherData" class="content">
      <i :class="icon"></i>
      <p>
        <span class="city">{{ city }}</span>
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
      icon: null,
      city: '扬州',
      weatherData: [{
        tempMax: 30,
        textDay: '晴',
        tempMin: 10,
        humidity: 22,
        uvIndex: 2,
      }],
      latitude: null,
      longitude: null
    };
  },
  async created() {
    if (navigator.geolocation) {
      try {
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                resolve();
              },
              (error) => {
                console.error("Error getting location:", error);
                reject(error);
              },
              {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
              }
          );
        });
      } catch (error) {
        console.error("Promise rejected with", error);
      }
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
    let geo = ''
    // 获取经城市
    try {
      const response = await axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${this.longitude + ',' + this.latitude}&key=2103eccd75874cf89a6f7e68b76a13f4`); // 替换为真实的API URL和查询参数
      geo = response.data.location[0].id
      this.city = response.data.location[0].name
    } catch (error) {
      console.error('Error fetching geo data:', error);
    }

    try {
      const response = await axios.get(`https://devapi.qweather.com/v7/weather/3d?location=${geo}&key=2103eccd75874cf89a6f7e68b76a13f4`); // 替换为真实的API URL和查询参数
      this.weatherData = response.data.daily;
      this.icon = 'qi-' + response.data.daily[0].iconDay
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

  },
  methods: {
    async getLocation() {
      if (navigator.geolocation) {
        try {
          await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                  this.latitude = position.coords.latitude;
                  this.longitude = position.coords.longitude;
                  resolve();
                },
                (error) => {
                  console.error("Error getting location:", error);
                  reject(error);
                },
                {
                  enableHighAccuracy: true,
                  timeout: 5000,
                  maximumAge: 0,
                }
            );
          });
        } catch (error) {
          console.error("Promise rejected with", error);
        }
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    },
  }
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