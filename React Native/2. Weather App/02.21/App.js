import * as Location from 'expo-location';
import React,{ useEffect, useState} from "react";
import { View, StyleSheet, Text, Dimensions,ScrollView, ActivityIndicator } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

const { width:SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "";

const icons = {
  Clouds : "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
}

console.log(SCREEN_WIDTH);

export default function App() {
  const [city, setCity ] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ ok , setOk ] = useState(true);
  const getWeather = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude},{useGoogleMaps:false});
    setCity(location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(json.daily); //undefined
  }; 
  useEffect(() => {
    getWeather();
  },[])
  return (<View style={Styles.container}>
      <View style={Styles.city}>
        <Text style={Styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
        pagingEnabled
        indicatorStyle="white"
        horizontal 
        style={Styles.weather}>
        {days.length === 0 ? (
          <View style={Styles.day}>
            <ActivityIndicator color="white" size="large" style={{marginTop:10}} />
          </View>
        ) : (
          days.map((day, index) => 
          <View key={index} style={Styles.day}>
            <View 
              style={{
                flexDirection:"row", 
                alignItems:"flex-end",
                width:"100%",
                justifyContent:"space-between",
              }}>
              <Text style={Styles.temp}>
                {parseFloat(day.temp.day).toFixed}
              </Text>
              <Fontisto name={icons[day.weather[0].main]} size={70} color="white" />
            </View>
            <Text style={Styles.description} >{day.weather[0].main}</Text>
          </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:"tomato",
  },
  city : {
    flex:1,
    justifyContent : "center",
    alignItems : "center",
  },
  cityName :{
    fontSize:68,
    fontWeight : "500",
  },
  weather : {
    
  },
  day :{
    width:SCREEN_WIDTH,
    alignItems:"center",
  },
  temp: {
    marginTop:50,
    fontSize:180,
  },
  description:{
    marginTop:-30,
    fontSize:60,
  },
});
