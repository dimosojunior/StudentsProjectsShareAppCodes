import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import MyDrawer from './Drawer/drawer';
import MyTab from './Tab/MyTab';
import MyStack from './Stack/MyStack';


import {NavigationContainer, DarkTheme,DefaultTheme} from '@react-navigation/native';


import theme from './theme/theme';
import themeContext from './theme/themeContext';
import React, {useState, useEffect, useContext} from 'react';
import { EventRegister } from 'react-native-event-listeners';


export default function App({navigation}) {

   const [darkMode, setdarkMode] = useState(false)

   //kwa ajili ya kuchange theme
  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setdarkMode(data)
      //console.log(data)
    })
    return () => {
      EventRegister.removeAllListeners(listener)
    }
  }, [darkMode])



  return (
    <View style={styles.container}>
  
  <themeContext.Provider value={darkMode === true ? theme.light : theme.dark}>
     <NavigationContainer theme={darkMode === true ? DefaultTheme : DarkTheme}>
       
<MyDrawer />
   </NavigationContainer>
    </themeContext.Provider>

        <StatusBar backgroundColor="lightgreen" barStyle="dark-content" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop:30,
  },
});
