
import { StyleSheet,Platform, Text,ScrollView,LogBox, View,Image,Animated, Button, FlatList,TouchableOpacity,Modal,TouchableWithoutFeedback, Keyboard  } from 'react-native';
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



import { useFonts } from 'expo-font'

import { EventRegister } from 'react-native-event-listeners';
import theme from '../theme/theme';
import themeContext from '../theme/themeContext';
import React, {useState,useRef, useEffect, useContext} from 'react';

import { EndPoint } from "../Constant/links";
import AwesomeAlert from 'react-native-awesome-alerts';

const ArticlesCategory =({articles}) => {

   const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

    // const [error, setError] = useState(null);
const [errorMessage, setErrorMessage] = useState('');

const handleErrorMessage = (error) => {
    if (error.response) {
      // The request was made and the server responded with an error status code
      // if (error.response.status === 401) {
      //   showAlertFunction('Authentication Error: You are not authorized.');
      // } 
      // else if (error.response.status === 404) {
      //   showAlertFunction('Not Found: The requested resource was not found.');

      // } 
      //else if{
      //   showAlertFunction('An error occurred while processing your request.');
      // }
    }  if (error.message === 'Network Error') {
      showAlertFunction('Network Error: Please check your internet connection.');
    } else {
      showAlertFunction('An error occurred while processing your request.');
    }
  };



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

const navigation = useNavigation();



 
  
 const {width, height} = Dimensions.get('window');
 



  const flatlistRef = useRef();
  // Get Dimesnions
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto Scroll

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === articles.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
      } else {
        flatlistRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  });

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    index: index,
  });
  // Data for carousel
  // const carouselData = [
  //   {
  //     id: "01",
  //     image: require("../assets/3q.jpeg"),
  //   },
  //   {
  //     id: "02",
  //     image: require("../assets/2q.jpeg"),
  //   },
  //   {
  //     id: "03",
  //     image: require("../assets/1.jpeg"),
  //   },
  // ];

  //  Display Images // UI
  const renderItem = ({ item, index }) => {
    return (
      <View>
      <TouchableOpacity 

      activeOpacity={1}
      onPress = {() => navigation.navigate('All Articles', item)}
      >
      {item.ArticleImage ? (
        <Image
          source={{uri: item.ArticleImage}}
          style={{
           // height: 180,
           height:height/4 + 10,
            width: screenWidth 
          }}
        />
        ):(

        <Image
          source={require('../assets/500.png')}
          style={{
           // height: 180,
           height:height/4 + 10,
            width: screenWidth 
          }}
        />
        )}
        </TouchableOpacity>

<TouchableOpacity 
style={globalStyles.ArticleHeaderName}
activeOpacity={1}
onPress = {() => navigation.navigate('All Articles', item)}
>
    <Text style={[globalStyles.articleName,{
  textAlign:'center',
  marginBottom:10,
  marginTop:0,
  // fontSize:16,
  //elevation:3,
  shadowColor: Platform.OS === "android" ? 'white' : "white",
  //backgroundColor:'black',
  shadowOffset:{width:1, height:1},
  shadowColor:'#333',
  shadowOpacity:1,
  shadowRadius:2,
  borderRadius:6,
  paddingBottom:10,
  // color:'white',
  fontFamily:'Light'
  
},{color:theme.color},{backgroundColor:theme.backgroundColor}]}>{item.ArticlesName}</Text>
</TouchableOpacity>
      </View>
    );
  };

  // Handle Scroll
  const handleScroll = (event) => {
    // Get the scroll position
    const scrollPosition = event.nativeEvent.contentOffset.x;
    //console.log({ scrollPosition });
    // Get the index of current active item

    const index = scrollPosition / screenWidth;

    //console.log({ index });
    // Update the index

    setActiveIndex(index);
  };

  // Render Dot Indicators
  const renderDotIndicators = () => {
    return articles.map((dot, index) => {
      // if the active index === index

      if (activeIndex === index) {
        return (
          <View
          key={index}

            style={{
              backgroundColor: "green",
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}
          ></View>
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: "red",
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}
          ></View>
        );
      }
    });
  };



 

  return (

    <>{!fontsLoaded ? (<View/>):(



    <View style={[globalStyles.containerr,{backgroundColor:theme.backgroundColor}]}>
    

  
<TouchableOpacity>
<Text style={[globalStyles.Articlesheadertext,{color:theme.color}]}>Articles</Text>
</TouchableOpacity>








      

{ articles && articles.length > 0 ? (

  





<>




  <FlatList
        data={articles}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
      />

     <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 0,
        }}
      >
        {renderDotIndicators()}
      </View>





</>









):(





 <View style={[globalStyles.noitemTextContainer,{backgroundColor:theme.backgroundColor}]}>
  <Text style={globalStyles.noitemText}>No any Article uploaded !
  </Text>


  <View style={globalStyles.ErrorImageContainerHomePage}>
      <Image 
          source={require('../assets/500.png')}  
           style={globalStyles.ErrorImageHomePage}
          
          //source={item.ArticleImage} 
          //resizeMode='contain'
          contentContainerStyle={{ padding: 20 }}
          
          />
  </View>


</View>









)}
{/*MWISHO WA FLAT LIST SLIDES HORIZONTAL*/}









{/*MWISHO WA ARTICLES*/}





<AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Alert!"
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="green"
        onConfirmPressed={hideAlert}
      />





    </View>


)}</>

  );
};






  
export default ArticlesCategory;



const styles = StyleSheet.create({
     

});