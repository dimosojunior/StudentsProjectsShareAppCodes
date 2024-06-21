
import { StyleSheet,Linking,Alert,ScrollView,Platform, TextInput,ActivityIndicator,Switch, Text,Animated, View,Image, Button, FlatList,TouchableOpacity,Modal,TouchableWithoutFeedback, Keyboard  } from 'react-native';
import {globalStyles} from '../Styles/GlobalStyles';
import Card from '../Shared/card';

import useFetch from '../useFetch';
import axios from 'axios';

// import HomeScreenCard from '../Shared/HomeScreenCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {MotiView} from 'moti';





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
import React, {useState,useCallback, useEffect, useContext} from 'react';


import { MaterialIcons } from '@expo/vector-icons';

import { Ionicons, FontAwesome} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MinorHeader from '../Header/MinorHeader';
import HTMLView from 'react-native-htmlview';
import Html from 'react-native-render-html';
import { EndPoint } from "../Constant/links";
import {useFonts} from 'expo-font';

import 'expo-dev-client';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';

// kila navigation tunayoicreate kwenye routes/homeStack.js huwa inakuwa na 
  // props by default ko tunaitumia hiyo ili kupata page zilizopo kule

const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-9624381293919157/5067534703';
const adUnitId2 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-9624381293919157~1439949764';

const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
  requestNonPersonalizedAdsOnly: true
});

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true
});



export default function ReadExpert({  route, navigation  }) {

const theme = useContext(themeContext)
const [darkMode, setdarkMode] = useState(false)


const { 
    StudentName, 
    StudentPlace, 
    Body,
    StudentImage,
    Instagram,
    Youtube,
    Github,
    Email,
    Whatsapp,
    Phone,
    Created,
    Updated,
    year,

    id 
   } = route.params;



let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});
  const url2 = "abcd://abcd.com";
// const StudentPhoneNumber = '+255628431507'
// const StudentEmail = "juniordimoso8@gmail.com"
// const Email = "juniordimoso8@gmail.com"

// const Phone = "0628431507"


  //FUNCTION YA KURUDI KWENY HOME PAGE
const {width, height} = Dimensions.get('window');
  const goBackPage = () =>{
    navigation.goBack();

  }


  const openUrl = async (url) => {
        const isSupported = await Linking.canOpenURL(url);
        if (isSupported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this url: ${url}`);
        }
    }

const sendTextMessage = useCallback(async (phNumber, message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${phNumber}${separator}body=${message}`
        await Linking.openURL(url)
    }, [])

const message = "USMA APP!!"


//KWA AJILI YA KURENDER HTML
const renderersProps ={
  img:{
    enableExperimentalPercentWidth:true
  }
}


  // Utility function to format the date as "YYYY-MM-DD"
  const formatDate = (dateString) => {
    if (!dateString) {
      return null;
    }
    const [year, month, day] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };
const htmlContent = ' <h1>This is the html document</h1> <img src="../assets/me.jpg" /> ';
const htmlContent2 = '<p style=\"text-align:center\"><span style=\"color:#fff\"><strong>SMART INVIGILATION SYSTEM</strong></span></p>\r\n\r\n<p>Examination cheating activities like face movement, head movements, hand movements, or hand contact are extensively involved, and the rectitude and worthiness of fair and unbiased examination are prohibited by such cheating activities. The aim of this project is to develop a model to supervise or control unethical activities in real-time examinations. Exam supervision is fallible due to limited human abilities and capacity to handle students in examination rooms, and these errors can be reduced with the help of the Smart Invigilation System.</p>\r\n\r\n<p>This work presents an automated system for exams invigilation using machine learning and computer vision approaches i.e., Dlib and Opencv . Dlib is an object detection algorithm that is implemented to detect the suspicious activities of students during examinations based on their face movements, and for starting capturing the video of students Opencv is used.</p>\r\n\r\n<p>The model is fully efficient in detecting and monitoring students in one frame during examinations. Different real-time scenarios are considered to evaluate the performance of the Automatic Invigilation System. The proposed invigilation model can be implemented in colleges, universities, and schools to detect and alert student suspicious activities. Hopefully, through the implementation of the proposed invigilation system, we can prevent and solve the problem of cheating because it is unethical.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/media/media/2023/04/10/3q.jpeg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><em>Click the link below to view more information about this project</em></p>'




//ADS
 const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] = useState(false);
  
  const loadInterstitial = () => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInterstitialLoaded(false);
        interstitial.load();
      }
    );

    interstitial.load();

    return () => {
      unsubscribeClosed();
      unsubscribeLoaded();
    }
  }

  const loadRewardedInterstitial = () => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setRewardedInterstitialLoaded(true);
      }
    );

    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log(`User earned reward of ${reward.amount} ${reward.type}`);
      }
    );

    const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setRewardedInterstitialLoaded(false);
        rewardedInterstitial.load();
      }
    );

    rewardedInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeEarned();
    }
  };

  useEffect(() => {
    const unsubscribeInterstitialEvents = loadInterstitial();
    const unsubscribeRewardedInterstitialEvents = loadRewardedInterstitial();

    return () => {
      unsubscribeInterstitialEvents();
      unsubscribeRewardedInterstitialEvents();
    };
  }, [])




 
  return (

    <>{!fontsLoaded ? (<View/>):(

   
    <View style={[globalStyles.container, {backgroundColor:theme.backgroundColor}]}>
  
   
   <MinorHeader title="Expert"/>

   
    <ScrollView>

      <View style={[globalStyles.userInfoSection, {backgroundColor:theme.backgroundColor}]}>
        <View style={[globalStyles.ImageAndTitleContainer, {backgroundColor:theme.backgroundColor}]}
          >

          <View style={globalStyles.ImageArticleContainer}
          >
          { StudentImage ? (
          <Image 
            
            source={{uri: EndPoint + '/' + StudentImage}}
            style={globalStyles.ArticleMainImage}
            //source={StudentImage}
            />

            ):(
             
              <Image 
          source={require('../assets/500.png')} 
          style={globalStyles.ArticleMainImage} 
           />
            )}

            </View>
          
          <View style={globalStyles.TitleArticleContainer}>
            <Text style={[globalStyles.ArticleMainTitleText, {color:theme.color}]}>{StudentName}</Text>
           {/* <Text style={[globalStyles.caption, {color:theme.color}]}>{CategoryName}</Text>
         */}
          </View>
        </View>
      </View>

      <View style={[globalStyles.userInfoSection, {backgroundColor:theme.backgroundColor}]}>
        <View style={globalStyles.row}>
          <Icon name="school" style={[globalStyles.icons, {color:theme.color}]} size={20}/>
          <Text style={[{marginLeft: 20}, {color:theme.color}]}>Location: {StudentPlace}</Text>
        </View>
        {Phone && (
        <View style={globalStyles.row}>
          <Icon name="school" style={[globalStyles.icons, {color:theme.color}]} size={20}/>
          <Text style={[{marginLeft: 20}, {color:theme.color}]}>Phone Number: {Phone}</Text>
        </View>)}
         {Email && (
        <View style={globalStyles.row}>
          <FontAwesome name="book" style={[globalStyles.icons, {color:theme.color}]} size={20}/>
          <Text style={[{marginLeft: 20}, {color:theme.color}]}>Email: {Email}</Text>
        </View>)}
       
      </View>




{ Body && (
      <View style={[globalStyles.infoBoxWrapper,{backgroundColor:theme.backgroundColor}]}>
         <Text 
         style={[globalStyles.AboutArticleText, {color:theme.color}]}
         >
            About Expert
         </Text>
         
         <Html 
contentWidth={400}
source={{html: Body}}
renderersProps={renderersProps}
tagsStyles={{
  
  p:{
    color:theme.color,
    // fontSize:16
    fontFamily:'Light',
    lineHeight:25,

  },
  
  a:{
    color:theme.color,
    textDecoration:'none',
    fontFamily:'Light',
  },
  h1:{
    color:theme.color,
    textAlign:'center',
    
    fontFamily:'Medium',
  },
   h2:{
    color:theme.color,
    textAlign:'center',
    fontFamily:'Medium',
  },
   h3:{
    color:theme.color,
    textAlign:'center',
    
    fontFamily:'Light',
  },
   h4:{
    color:theme.color,
    textAlign:'center',
    fontFamily:'Light',
  },
  // img:{
  //   width:150,
  //   height:150,
  // }
}}


/>
      </View>

)}














      <View style={[globalStyles.menuWrapper, {backgroundColor:theme.backgroundColor}]}>
       
       {Github && (
         <TouchableOpacity onPress={() => {openUrl(Github)}}>
          <View style={[globalStyles.menuItem, {backgroundColor:theme.backgroundColor}]}>
            <FontAwesome name="github" color="#FF6347" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:theme.color}]}>Github Link</Text>
          </View>
        </TouchableOpacity>)}

        
        {Youtube && (
        <TouchableOpacity onPress={() => {Linking.openURL(Youtube)}}>
          <View style={[globalStyles.menuItem, {backgroundColor:theme.backgroundColor}]}>
            <FontAwesome name="youtube" color="#FF6347" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:theme.color}]}>Youtube Channel</Text>
          </View>
        </TouchableOpacity>)}

        {Phone && (
        <TouchableOpacity onPress={() => { Linking.openURL(`whatsapp://send?phone=${Phone}&text=${message}`)}}>
          <View style={[globalStyles.menuItem, {backgroundColor:theme.backgroundColor}]}>
            <FontAwesome name="whatsapp" color="#FF6347" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:theme.color}]}>Whatsapp Link</Text>
          </View>
        </TouchableOpacity>)}

        {Phone && (
        <TouchableOpacity  onPress={() => sendTextMessage(Phone, message)}>
          <View style={[globalStyles.menuItem, {backgroundColor:theme.backgroundColor}]}>
            <Icon name="message" color="#FF6347" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:theme.color}]}>Send Message</Text>
          </View>
        </TouchableOpacity>)}

          {Email && (
         <TouchableOpacity onPress={() => {  Linking.openURL(`mailto:${Email}?subject=Hello ${StudentName}&body=${message}`)}}>
          <View style={[globalStyles.menuItem, {backgroundColor:theme.backgroundColor}]}>
            <Icon name="email" color="#FF6347" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:theme.color}]}>Send Email</Text>
          </View>
        </TouchableOpacity>)}

         {Phone && (
         <TouchableOpacity onPress={() => {   Linking.openURL(`tel:${Phone}`)}}>
          <View style={[globalStyles.menuItem, {backgroundColor:theme.backgroundColor}]}>
            <Icon name="phone" color="#FF6347" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:theme.color}]}>Call</Text>
          </View>
        </TouchableOpacity>)}









      </View>




</ScrollView>


    </View>

    )}</>
    
  );
}

const styles = StyleSheet.create({
 
});