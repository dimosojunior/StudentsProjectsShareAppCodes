
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
import AwesomeAlert from 'react-native-awesome-alerts';

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

import { EndPoint } from "../Constant/links";
import LotterViewScreen from '../Screens/LotterViewScreen';

const HobsPage =({input, setInput}) => {
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

// HII NI FUNCTION YAKUNAVIGATE KWENDA KWENYE KOZI ZA CHUO HUSIKA
const [CategoryName, setCategoryName] = useState('University of Dodoma');
    const move = (CategoryName) =>{
      setCategoryName(CategoryName);
      console.log(CategoryName)
      navigation.navigate(CategoryName);
    }
//INAISHIA HAPA HII NI FUNCTION YAKUNAVIGATE KWENDA KWENYE KOZI ZA CHUO HUSIKA
  

 
  
 const {width, height} = Dimensions.get('window');
 



//Load more
const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);




const getItems = () => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setPending(false);
    return;
  } else {
    setIsLoading(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetAllHob/?page=${current_page}&page_size=2`
    // console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.queryset.length > 0) {
          setQueryset([...queryset, ...data.queryset]);
          setIsLoading(false);
          setLoading(false);
          setcurrent_page(current_page + 1);
          setPending(false);

          // console.log("NEW CRRRENT", current_page);
          // console.log(queryset);

        } else {
          setIsLoading(false);
          setEndReached(true);
          setLoading(false);
          setPending(false);
        }
      });
  }
};





 const renderLoader = () => {
    return (
      isLoading ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="red" />
        </View> : null
    );
  };

  // const loadMoreItem = () => {
  //   setcurrent_page(current_page + 1);
  // };

  useEffect(() => {
    setLoading(true)
    getItems();
  }, []);


 
// MWANZO WA FLAT LIST COLUMN MBILI PAMOJA NA FUNCTION YAKE


  const renderItem = ({item, index}) => {



 // mwanzo kwa ajili ya search
    if (input === ""){
 
    return (


     

      <MotiView
        style={[globalStyles.listContainer,{backgroundColor:theme.backgroundColor}]}
        from={{opacity: 0, translateY: 50}}
        animate={{opacity: 1, translateY: 0}}
        transition={{delay: 1000 + index * 200}}>

      
        <View style={globalStyles.imageContainer}>
        { item.CategoryImage ? (
          <Image 
          // kama unatumia APIS
          source={{uri: EndPoint + '/' + item.CategoryImage}}
          //source={item.CategoryImage} 
          style={globalStyles.image} 
          />
          ):(
          <Image 
          source={require('../assets/500.png')}  
          style={globalStyles.image} 
          />

          )}
        </View>

        <Text style={[globalStyles.nameText,{color:theme.color}]}>{item.CategoryName}</Text>
        <Text style={[globalStyles.priceText,{color:theme.color}]}>{item.price}</Text>
         
         <TouchableOpacity 
         
         onPress={() => navigation.navigate('Clicked Expert Category', item)}
         >

          <View style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>View</Text>
          </View>

        </TouchableOpacity>


      </MotiView>

     

          );








    // hili bano la chini ni la if ya juu kama mtu akitype   
}


 if(item.CategoryName.toLowerCase().includes(input.toLowerCase())){






    return (


     

      <MotiView
        style={[globalStyles.listContainer,{backgroundColor:theme.backgroundColor}]}
        from={{opacity: 0, translateY: 50}}
        animate={{opacity: 1, translateY: 0}}
        transition={{delay: 1000 + index * 200}}>

      
        <View style={globalStyles.imageContainer}>
        { item.CategoryImage ? (
          <Image 
          // kama unatumia APIS
          source={{uri: EndPoint + '/' + item.CategoryImage}}
          //source={item.CategoryImage} 
          style={globalStyles.image} 
          />
          ):(
          <Image 
          source={require('../assets/500.png')}  
          style={globalStyles.image} 
          />

          )}
        </View>

        <Text style={[globalStyles.nameText,{color:theme.color}]}>{item.CategoryName}</Text>
        <Text style={[globalStyles.priceText,{color:theme.color}]}>{item.price}</Text>
         
         <TouchableOpacity 
         
         onPress={() => navigation.navigate('Clicked Expert Category', item)}
         >

          <View style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>View</Text>
          </View>

        </TouchableOpacity>


      </MotiView>

     

          );



// hili bano la chini ni la if ya pili mwisho
  }










 // hili bano la chini ni la renderItem mwisho  

  };

// MWISHO WA FLAT LIST COLUMN MBILI PAMOJA NA FUNCTION YAKE



  return (


    <>{!fontsLoaded ? (<View/>):(

<>
 {!isPending ? (

    <View style={[globalStyles.container, {backgroundColor:theme.backgroundColor}]}>
    















{queryset && queryset.length > 0 ? (          
         <>


{setLoading===true?(<ActivityIndicator/>):(
      <>
      <FlatList
        data={queryset}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        //horizontal
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderLoader}
        onEndReached={getItems}
        onEndReachedThreshold={0.5}
      />


 </>
      )}








  </>         
  ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:theme.backgroundColor}]}>
  <Text style={globalStyles.noitemText}>No any data is uploaded!
  </Text>


  <View style={globalStyles.ErrorImageContainer}>
      <Image 
          source={require('../assets/500.png')}  
           style={globalStyles.ErrorImage}
          
          //source={item.ArticleImage} 
          //resizeMode='contain'
          contentContainerStyle={{ padding: 20 }}
          
          />
  </View>


</View>

  )}  
       





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


):(

<LotterViewScreen />

)}

    </>



)}</>
  );
};






  
export default HobsPage;



const styles = StyleSheet.create({
 
});