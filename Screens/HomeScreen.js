
import { StyleSheet,TextInput,ActivityIndicator, Text,Animated,ScrollView, View,Image, Button, FlatList,TouchableOpacity,Modal,TouchableWithoutFeedback, Keyboard  } from 'react-native';
import {globalStyles} from '../Styles/GlobalStyles';
import Card from '../Shared/card';
import { MaterialIcons } from '@expo/vector-icons';
import useFetch from '../useFetch';
import axios from 'axios';
import Header from '../Header/header';
// import HomeScreenScreenCard from '../Shared/HomeScreenScreenCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {MotiView} from 'moti';

import ArticlesCategory from '../RenderedComponents/ArticlesCategory';
import Universities from '../RenderedComponents/Universities';

import { Ionicons, FontAwesome} from '@expo/vector-icons';

// import Search from '../Shared/search';

import{LinearGradient} from 'expo-linear-gradient';

//import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

//import {AppLoading} from 'expo';
import * as SplashScreen from 'expo-splash-screen';
//E3E4FA

//import AppLoading from 'expo-app-loading';



// This import used to change color
import { EventRegister } from 'react-native-event-listeners';
import theme from '../theme/theme';
import themeContext from '../theme/themeContext';
import React, {useState, useEffect, useContext} from 'react';
import LotterViewScreen from '../Screens/LotterViewScreen';

import { EndPoint } from "../Constant/links";

import { useFonts } from 'expo-font';




const HomeScreen =({navigation}) => {


// To change color
const theme = useContext(themeContext)
const [darkMode, setdarkMode] = useState(false)






  
 //FOR UNIVERSITY APIS
// const { universities, isPending, error } = useFetch('https://dimosojunior.pythonanywhere.com/GetAllUniversities/');

//https://myapis.pythonanywhere.com/authentication/user_list_view/





 //FOR ARTICLES APIS
const { universities:articles, isPending, error  } = useFetch(EndPoint + `/apis/Articles/`);






 const {width, height} = Dimensions.get('window');



//KWA AJILI YA KUCOUNT ALL PROJECTS
 const [TotalProjects, setTotalProjects] = useState(0);
  
  useEffect(() => {
    // Make an API request to your Django API
    axios
      .get(EndPoint+'/CountAllProjectsView/')
      .then((response) => {
        const { queryset } = response.data;
        setTotalProjects(queryset);
        
        //setIsPending(false);
      })
      .catch((error) => {
        
        //setIsPending(false);
      });
  }, []);


  
    return (
 


 


// { MWANZO WA container1}
 <View style={[globalStyles.container,{backgroundColor:theme.backgroundColor}]}>

 
   <Header />






{ isPending ? (



  <LotterViewScreen />


  ): (






    <ArticlesCategory articles={articles} />



)} 







{/*MWISHO WA ARTICLES*/}














{/*MWANZO WA VIEW YA SEARCH*/}

      <View style={{
        marginTop: 10,
         paddingHorizontal: 20,
      }}>
        
        <View
          style={{
            paddingBottom: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={[globalStyles.UniversitiesText,{
            
            //fontWeight: 'bold',
            //color:'white',


            
        },{color:theme.color}]}>Universities</Text>
          <Text style={[globalStyles.seeAllText,{
             
            //fontWeight: 'bold', 
            //color: '#6E8AFA'
          },{color:theme.color}]}>
            Projects - {TotalProjects}
          </Text>
        </View>
      </View>



{/*MWISHO WA VIEW YA SEARCH*/}









{/*ADD YOUR ADS HERE*/}





















    <Universities />










{/*<AllMaterials universities={universities} />
*/}














    </View>
// MWISHO WA container1




  );
};






  
export default HomeScreen;


const styles = StyleSheet.create({
  container1: {
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