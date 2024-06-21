
import { StyleSheet,TextInput,ActivityIndicator, Text,Animated,ScrollView, View,Image, Button, FlatList,TouchableOpacity,Modal,TouchableWithoutFeedback, Keyboard  } from 'react-native';
import {globalStyles} from '../Styles/GlobalStyles';
import Card from '../Shared/card';
import { MaterialIcons } from '@expo/vector-icons';
import useFetch from '../useFetch';
import axios from 'axios';
import Header from '../Header/header';
// import HomeScreenCard from '../Shared/HomeScreenCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {MotiView} from 'moti';


import { Ionicons, FontAwesome} from '@expo/vector-icons';


import{LinearGradient} from 'expo-linear-gradient';
import MinorHeader from '../Header/MinorHeader';
import HobsPage from '../RenderedComponents/HobsPage';

//import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

//import {AppLoading} from 'expo';
import * as SplashScreen from 'expo-splash-screen';
//E3E4FA
import {useFonts} from 'expo-font';
//import AppLoading from 'expo-app-loading';



// This import used to change color
import { EventRegister } from 'react-native-event-listeners';
import theme from '../theme/theme';
import themeContext from '../theme/themeContext';
import React, {useState, useEffect, useContext} from 'react';




const AllExperts =({navigation}) => {

let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});
// To change color
const theme = useContext(themeContext)
const [darkMode, setdarkMode] = useState(false)


//FOR SEARCHING
const [input, setInput] = useState('');
//console.log(input);





  //FOR ALL HOB APIS
// const { universities:allHob, isPending, error } = useFetch('https://freeprojectsshareapp.pythonanywhere.com/apis/Hobs');


 return (
 

 <>{!fontsLoaded ? (<View/>):(
 


// { MWANZO WA container1}
 <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>



<MinorHeader title="Experts Category"/>






{/*MWANZO WA VIEW YA SEARCH*/}

      <View 
      style={globalStyles.SearchContainer}
      >
        
        <View
          
            
       style={globalStyles.InputContainer}     
            

          >

          <TouchableOpacity>
          {/*<FontAwesome size={20} name="search" />*/}
          
          <TextInput
          style={globalStyles.TextInput}
          value={input} onChangeText ={(text) => setInput(text)}
            
            placeholder="Enter expert category"
            placeholderTextColor="red"
          />
          </TouchableOpacity>
        </View>
       
      </View>



{/*MWISHO WA VIEW YA SEARCH*/}




{/*MWANZO WA VIEW YA EXPERTS TITLE*/}

      <View style={{
        marginTop: 10,
         paddingHorizontal: 20,
      }}>

    








        
        <View
          style={{
            paddingVertical: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={[{
             
            fontFamily: 'Bold',
            //color:'white',


            //fontFamily: 'RobotoLight',
        },{color:theme.color}]}>Experts</Text>
          <Text style={[{
            fontFamily: 'Bold',
             
            //color: '#6E8AFA'
          },{color:theme.color}]}>
            See All
          </Text>
        </View>
      </View>



{/*EXPERTS TITLE*/}











<HobsPage input={input} setInput={setInput} />















    </View>
// MWISHO WA container1


)}</>

  );
};






  
export default AllExperts;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'black',

    
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  universityheadertext:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold',
    color:'red',
    // marginBottom:20,
    marginTop:0,
  
  },
});