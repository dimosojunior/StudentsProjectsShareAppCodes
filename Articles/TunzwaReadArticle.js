
import { StyleSheet,Linking,ScrollView, TextInput,ActivityIndicator,Switch, Text,Animated, View,Image, Button, FlatList,TouchableOpacity,Modal,TouchableWithoutFeedback, Keyboard  } from 'react-native';
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
import {useFonts} from 'expo-font';
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
// kila navigation tunayoicreate kwenye routes/homeStack.js huwa inakuwa na 
  // props by default ko tunaitumia hiyo ili kupata page zilizopo kule
export default function ReadArticle({  route, navigation  }) {

const theme = useContext(themeContext)
const [darkMode, setdarkMode] = useState(false)


const { 
    Title, 
    WrittenBy, 
    ArticleBody,
    ArticleImage,
    pdf,
    Youtube,
    Created,
    Updated,
    year,

    id 
   } = route.params;


  const url2 = "abcd://abcd.com";
const StudentPhoneNumber = '+255628431507'
const StudentEmail = "juniordimoso8@gmail.com"
const Email = "juniordimoso8@gmail.com"

const Phone = "0628431507"


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

 
  return (

   
    <View style={[globalStyles.detailpagecontainer, {backgroundColor:theme.backgroundColor}]}>
  
   
   <MinorHeader title="Read Article"/>

   
    <ScrollView>

      <View style={[globalStyles.userInfoSection, {backgroundColor:theme.backgroundColor}]}>
        <View style={[globalStyles.ImageAndTitleContainer, {backgroundColor:theme.backgroundColor}]}
          >

          <View style={globalStyles.ImageArticleContainer}
          >
          { ArticleImage ? (
          <Image 
            
            source={{uri: EndPoint + '/' + ArticleImage}}
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
            <Text style={[globalStyles.ArticleMainTitleText, {color:theme.color}]}>{Title}</Text>
           {/* <Text style={[globalStyles.caption, {color:theme.color}]}>{CategoryName}</Text>
         */}
          </View>
        </View>
      </View>

      <View style={[globalStyles.userInfoSection, {backgroundColor:theme.backgroundColor}]}>
        <View style={globalStyles.row}>
          <Icon name="school" style={[globalStyles.icons, {color:theme.color}]} size={20}/>
          <Text style={[{marginLeft: 20}, {color:theme.color}]}>WrittenBy: {WrittenBy}</Text>
        </View>
        <View style={globalStyles.row}>
          <FontAwesome name="phone" style={[globalStyles.icons, {color:theme.color}]} size={20}/>
          <Text style={[{marginLeft: 20}, {color:theme.color}]}>Date Created: {Created}</Text>
        </View>
        <View style={globalStyles.row}>
          <MaterialIcons name="email" style={[globalStyles.icons, {color:theme.color}]} size={20}/>
          <Text style={[{marginLeft: 20}, {color:theme.color}]}>Date Updated: {Updated}</Text>
        </View>
      </View>




{ ArticleBody && (
      <View style={[globalStyles.infoBoxWrapper,{backgroundColor:theme.backgroundColor}]}>
         <Text style={{
          fontSize:18,
          textAlign:'center',
          marginBottom:15,
          color:theme.color,
          fontWeight:'bold',

         }}>
           About Article
         </Text>
         
         <Html 
contentWidth={400}
source={{html: ArticleBody}}
renderersProps={renderersProps}

tagsStyles={{
  
  p:{
    color:theme.color,
    fontSize:16

  },
  
  a:{
    color:theme.color,
    textDecoration:'none',
  },
  h1:{
    color:theme.color,
    textAlign:'center',
    fontSize:17,
  },
   h2:{
    color:theme.color,
    textAlign:'center',
    fontSize:17,
  },
   h3:{
    color:theme.color,
    textAlign:'center',
    fontSize:17,
  },
   h4:{
    color:theme.color,
    textAlign:'center',
    fontSize:17,
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
       
        <TouchableOpacity onPress={() => {openUrl(Github)}}>
          <View style={[globalStyles.menuItem, {backgroundColor:theme.backgroundColor}]}>
            <FontAwesome name="github" color="#FF6347" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:theme.color}]}>Github Link</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => {Linking.openURL(Youtube)}}>
          <View style={[globalStyles.menuItem, {backgroundColor:theme.backgroundColor}]}>
            <FontAwesome name="youtube" color="#FF6347" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:theme.color}]}>Youtube Channel</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => { Linking.openURL(`whatsapp://send?phone=${Phone}&text=${message}`)}}>
          <View style={[globalStyles.menuItem, {backgroundColor:theme.backgroundColor}]}>
            <FontAwesome name="whatsapp" color="#FF6347" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:theme.color}]}>Whatsapp Link</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => sendTextMessage(Phone, message)}>
          <View style={[globalStyles.menuItem, {backgroundColor:theme.backgroundColor}]}>
            <Icon name="message" color="#FF6347" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:theme.color}]}>Send Message</Text>
          </View>
        </TouchableOpacity>


         <TouchableOpacity onPress={() => {  Linking.openURL(`mailto:${Email}?subject=Hello ${StudentName}&body=${message}`)}}>
          <View style={[globalStyles.menuItem, {backgroundColor:theme.backgroundColor}]}>
            <Icon name="email" color="#FF6347" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:theme.color}]}>Send Email</Text>
          </View>
        </TouchableOpacity>


         <TouchableOpacity onPress={() => {   Linking.openURL(`tel:${Phone}`)}}>
          <View style={[globalStyles.menuItem, {backgroundColor:theme.backgroundColor}]}>
            <Icon name="phone" color="#FF6347" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:theme.color}]}>Call</Text>
          </View>
        </TouchableOpacity>








      </View>




</ScrollView>


    </View>
    
  );
}

const styles = StyleSheet.create({
 
});