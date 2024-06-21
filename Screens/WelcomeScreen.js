

import { StyleSheet, Text,ScrollView, View,Image, Button, FlatList,TouchableOpacity,Modal,TouchableWithoutFeedback, Keyboard  } from 'react-native';


import useFetch from '../useFetch';
import axios from 'axios';

// import HomeScreenCard from '../Shared/HomeScreenCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LottieView from 'lottie-react-native';

import theme from '../theme/theme';
import themeContext from '../theme/themeContext';
import React, {useState, useEffect, useContext} from 'react';
import LotterViewScreen from '../Screens/LotterViewScreen';

const WelcomeScreen =({navigation}) => {

   // To change color
const theme = useContext(themeContext)
const [darkMode, setdarkMode] = useState(false)

  //const navigation = useNavigation();

  const [onboardings, setOnboardings] = useState([
    {
      Title:'Reason for our success',
      Description:'Believe in yourself, for you hold the power to unlock your greatest potential, embrace failure as a stepping stone to success. Every stumble is an opportunity to learn  and grow.',
      OnboardingImage:require('../assets/Loading/loading9.json'), 
      id:'1'
    },
    {
      Title:'Our main key',
      Description:'Be the driver of your own destiny. Take the wheel and steer your education towards greatness. Challenges are not roadblocks but opportunities to prove your resilience and determination.',
      OnboardingImage:require('../assets/Loading/loading10.json'),  
      id:'2'},
    {
      Title:'Hospitality',
       Description:'Knowledge is a gift that becomes more valuable when shared with others. Strive for progress, not perfection. Every small step forward is a victory.',
      OnboardingImage:require('../assets/Loading/loading8.json'), 
      id:'3'
    },
 
    ]);
  
//  FOR UNIVERSITY APIS
// const { onboardings, isPending, error } = useFetch('https://dd83-197-250-225-180.eu.ngrok.io/apis/onboardings');
// https://myapis.pythonanywhere.com/authentication/user_list_view/

 //FOR  APIS
//const { datas:onboardings, isPending, error } = useFetch('https://lisheapisapp.pythonanywhere.com/Lishe/OnBoarding/');


 const {width, height} = Dimensions.get('window');
 const Slide = ({item}) => {
  return (

          <View 
          style={{
            alignItems: 'center',
            height:height/2

          }}>


           <View 
          style={{
            alignItems: 'center',
            width:width,
            justifyContent:'center',
            marginTop:40,

          }}>

      

 <LottieView
        style={{
          //flex:1,
          height:height/2,
          width:width,

        }}
        source={item?.OnboardingImage} // Replace with your animation JSON file
        autoPlay
        loop
      />

      </View>


      <View style={{
        width:width,
        paddingHorizontal:20,
        alignItems:'center',

      }}>

       <Text style={styles.title1}>
       {item?.Title}
       </Text>
       
        <Text style={[styles.title,{color:theme.color}]}>{item?.Description}</Text>
       
      </View>
    </View>


      );
};




const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != onboardings.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };




  const skip = () => {
    const lastSlideIndex = onboardings.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          
          justifyContent: 'space-between',
          paddingHorizontal: 0,
          

          
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
            
            height:height/14
          }}>
          {/* Render indicator */}
          {onboardings.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor:'red',
                  width: 15,
                  height:15,
                  borderRadius:10,
                },
              ]}
            />
          ))}
        </View>

        
        <View style={{marginBottom: 40}}>
          {currentSlideIndex == onboardings.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                style={styles.getstarted}
                onPress={() => navigation.replace('PreLoader Stack')}>
                <Text style={[{
                  // fontWeight: 'bold', 
                  fontSize: 16,
                 
                  color:'black',
                  padding:10,
                  borderRadius:10
                },{color:theme.color}]}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : null }

         
            <View style={{flexDirection: 'row'}}>
            {/*kwa ajili ya viradio*/}

              <View style={{width: 15}} />
            
            </View>
          
        </View>
      </View>
    );
  };


 
  return (


    
    

  // {<Header />}


// {mwanzo wa list za modules}
<View style={{flex: 1,
width: Dimensions.get('window').width,
height:height,
}}>




{/*mwanzo wa flat list*/}


 


<FlatList 
keyExtractor={item => item.id}
ref={ref}
onMomentumScrollEnd={updateCurrentSlideIndex}
// contentContainerStyle={{height: height/2 + 100}}
showsHorizontalScrollIndicator={false}
horizontal
data={onboardings}
pagingEnabled
// contentContainerStyle={{
//   marginTop:10,
//   paddingBottom:30,
//   flex:1,
//   flexDirection:'row',
// }}
// numColumns ={2} 

renderItem = {({item}) => <Slide item={item}/>}

/>
  
<Footer />


{/*mwisho wa flat list*/}

















</View>




     
  );
}
export default WelcomeScreen;

const styles = StyleSheet.create({
 // header:{
 //  width:'100',
 // height:'15%',
 // backgroundColor:'#c8c8c8',
 // alignItems:'center',
 // justifyContent:'center',
 // },


subtitle: {
    color:'white',
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },

  title1: {
    color:'green',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,

    // textAlign: 'center',
  },

  title: {
    color:'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,

    // textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 15,
    width: 15,
    backgroundColor: 'green',
    marginHorizontal: 3,
    borderRadius: 10,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getstarted:{
    flex: 1,
    
    borderRadius: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',

  },


    });
