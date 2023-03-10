import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { theme } from './colors.js';
import React,{ useState } from 'react';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.gray }}>Work</Text>
        </TouchableOpacity>  
        <TouchableOpacity onPress={travel}> 
          <Text style={{...styles.btnText, color: !working ? "white" : theme.gray}}>Travel</Text>
        </TouchableOpacity>   
      </View>
        <TextInput value={text} onChangeText={onChangeText} placeholder={working ? "Add a To Do" : "Where do you want to go?"} style={styles.input}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal:20 ,
  },
  header:{
    justifyContent:"space-around",
    flexDirection:"row",
    marginTop:100,
  },
  btnText:{
    fontSize:38,
    fontWeight:"600",
  },
  input:{
    backgroundColor:"white",
    paddingVertical:15,
    paddingHorizontal:20,
    borderRadius:30,
    marginTop:20,
    fontSize:18,
  },
});
