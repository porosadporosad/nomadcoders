import * as Location from 'expo-location';
import React,{ useEffect, useState} from "react";
import { View, StyleSheet, Text, Dimensions,ScrollView } from 'react-native';

const { width:SCREEN_WIDTH } = Dimensions.get("window");

console.log(SCREEN_WIDTH);

export default function App() {
  const [city, setCity ] = useState("Loading...");
  const [location, setLocation] = useState(null);
  const [ ok , setOk ] = useState(true);
  const ask = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude},{useGoogleMaps:false});
    setCity(location[0].city);
  }; 
  useEffect(() => {
    ask();
  },[])
  return <View style={Styles.container}>
      <View style={Styles.city}>
        <Text style={Styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
        pagingEnabled
        indicatorStyle="white"
        horizontal 
        style={Styles.weather}>
        <View style={Styles.day}>
          <Text style={Styles.temp}>27</Text>
          <Text style={Styles.description}>Sunny</Text>
        </View>
        <View style={Styles.day}>
          <Text style={Styles.temp}>27</Text>
          <Text style={Styles.description}>Sunny</Text>
        </View>
      </ScrollView>
  </View>;
      
  
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
