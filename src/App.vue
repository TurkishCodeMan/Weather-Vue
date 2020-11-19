<template>
  <div
    id="app"
    :class="
      typeof weather.main != 'undefined' && weather.main.temp > 14 ? 'hot' : ''
    "
  >
    <div class="searchBox">
      <input
        @keypress="fetchWeather"
        v-model="query"
        type="text"
        placeholder="Search"
        class="searchBar"
      />
    </div>
    <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
      <div class="location-box">
        <div class="location">
          {{ weather.name }} , {{ weather.sys.country }}
        </div>
        <br />
        <div class="date">{{ dateBuilder() }}</div>
      </div>
      <div class="weather-box">
        <div class="temp">{{ Math.round(weather.main.temp) }}</div>
        <div class="weather">{{ weather.weather[0].main }}</div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'App',
  data(){
    return {
      api_key:'178d7b2d096ea9c5bedc099791717ce9',
      url_base:'https://api.openweathermap.org/data/2.5/',
      query:'',
      weather:{}
    }
  },
  methods:{
    fetchWeather(e){
      if(e.key=="Enter"){
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
        .then(data=>{
          return data.json();
        }).then(this.setResult)
      }
    },
    setResult(result){
      this.weather=result;
      console.log(this.weather)
    },
    dateBuilder(){
      let dates=new Date();
      let months=["January","February","March","April"
      ,"May","June","July","August","September","November",
      "December"];
      let days=["Sunday","Monday","Tuesday","Wednesday",
      "Thursday","Friday","Saturday"];


      let day=days[dates.getDay()];
      let date=dates.getDate();
      let month=months[dates.getMonth()];
      let year=dates.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    }
    

  }
  
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "montserrat", sans-serif;
}
#app {
  background-image: url("./assets/cold.jpg");
  background-size: cover;
  background-position: bottom;
  min-height: 100vh;
  padding: 25px;
}
#app.hot {
  background-image: url("./assets/hot.jpg");
}
main {
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}

.searchBox {
  width: 100%;
  margin-bottom: 30px;
}
.searchBox .searchBar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  outline: none;
  border: none;
  background: none;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}
.searchBox .searchBar:focus {
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  border-radius: 16px 0px 16px 0px;
}
.location-box .location {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
}
.location-box .date {
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  font-style: italic;
}
.weather-box {
  text-align: center;
}
.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
