import React, { useState, useEffect } from 'react';

import { View,SafeAreaView, TextInput, Alert, Image, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView, Touchable, TouchableOpacity } from 'react-native';

import Background from './PageStyling/Background';
import Btn from './PageStyling/Btn';
import { black } from './PageStyling/Constants';
import LoginField from './PageStyling/LoginField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import {globalStyles} from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Ionicons, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {useFonts} from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';

const SigninScreen = ({ navigation }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };



    //const [isPending, setIsPending] = useState(false);
let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});



  const { width, height } = Dimensions.get('window');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //TO MAKE A LOADING MESSAGE ON A BUTTON
  const [isPending, setPending] = useState(false);

  //const navigation = useNavigation();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      try {
        const userResponse = await axios.get(
          EndPoint + '/account/user_data/',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const userData = userResponse.data;
        // Fetch and set cart data here
        // const cartResponse = await axios.get(
        //   'https://hotelappapisv1.pythonanywhere.com/Hotel/Cart/',
        //   {
        //     headers: {
        //       Authorization: `Token ${token}`,
        //     },
        //   }
        // );

        // const cartData = cartResponse.data;
        // // Update the cart state with the fetched data
        // setCart(cartData);

        // navigation.replace('Home Stack', { userData });
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home Stack' }],
        });
      } catch (error) {
        
      }
    }
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
      showAlertFunction('Invalid credentials.');
    }
  };

  const handleLogin = async () => {

    if (!email && !password) {
      //setError('Please fill in all fields correctly');
      showAlertFunction("Please fill in all fields correctly");
      return;
    }

    if (!email) {
     // setError('Please enter your registration email correctly');
      showAlertFunction("Please enter your registration email correctly");
      return;
    }

    if (!password) {
      //setError('Please enter your registration password correctly');
      showAlertFunction("Please enter your registration password correctly");
      return;
    }
    setPending(true);

    try {
      const response = await axios.post(EndPoint + '/account/login_user/', {
        email: email,
        password: password,
      });

      const token = response.data.token;
      await AsyncStorage.setItem('userToken', token);
      //navigation.emit('updateUserToken', token);

      // Now, make another request to get user data
      const userResponse = await axios.get(EndPoint + '/account/user_data/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const userData = userResponse.data;
      // Save user data to AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      // Emit the 'updateUserToken' event
      // hii inasaidia kupata a login user token automatically without
      // page refreshing
      EventRegister.emit('updateUserToken', token);



      // Pass the userData to Home Stack
      // navigation.replace('MainScreen', { userData });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home Stack' }],
      });
    } catch (error) {
      //setError('Invalid credentials');
      // showAlertFunction("Invalid credentials");
      
      handleErrorMessage(error);
      setPending(false);
    }
  };




  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (

    <>{!fontsLoaded ? (<View/>):(

<SafeAreaView  style={{
  height:'100%',
  justifyContent: 'center',
  flex: 1,
  backgroundColor:'black', //'#C0C0C0',
}}>

    <View style={{
      alignItems: 'center',
      // width: width,
      
      backgroundColor: 'black',
      height:'100%'


    }}>
     


        <View
          style={{
            // backgroundColor: 'rgb(5,5,49)',

            justifyContent:'center',
            height: height,
            width: width,
            borderTopLeftRadius: 0,
            paddingTop: 10,
            alignItems: 'center',
             flex: 1,
            //marginTop: 10,
          }}>


           <Image
            source={require('../assets/icon2.png')}
            style={{
              width: '40%',
              height: 100,
              marginBottom: 20,
              borderRadius: 100,
              //marginTop: 80,
            }}
          />



          <Text style={{
            fontSize: 25,
            color: 'green',
            // fontWeight: 'bold',
            marginBottom: 0,
            fontFamily:'Medium',

          }}>
            Login
          </Text>

          



          <LoginField
            placeholder="Enter valid email"
            keyboardType={'email-address'}
            value={email}
            onChangeText={text => setEmail(text)}

          />

          <View 
            style={{borderRadius: 10,
             color: 'white', 
             // paddingHorizontal: 20, 
             width:width-70, 
             //backgroundColor: 'white',
              marginVertical: 10,
              // paddingVertical:15,
              borderWidth:1,
              borderColor:'green',
              flexDirection:"row",
              justifyContent:"space-between",
              paddingHorizontal: 10, 
          }}
          >
          <TextInput
          style={{
            // justifyContent:"center",
            //backgroundColor:"red",
            padding:15,
            //paddingLeft:20,
            fontFamily:'Light',
            paddingHorizontal: 5,
            width:'75%',
            color: 'white',  

          }}
          placeholder="Enter Password"
          secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry based on isPasswordVisible state
          value={password}
          onChangeText={(text) => setPassword(text)}
        placeholderTextColor={black}/>

        <View style={{
          // width:width-70,
          justifyContent:"center",
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
          style={{ alignSelf: 'flex-end', marginRight: 20,color:'white' }}>
          <Text style={{ color: 'white', fontSize: 16,fontWeight:'bold' }}>
            {/*{isPasswordVisible ? 'Hide' : 'Show'} Password*/}
            {isPasswordVisible ? (
              <FontAwesome size={25} color="white" name="eye-slash" />
            ):(
              <FontAwesome size={25} color="white" name="eye" />
            )}
          </Text>
        </TouchableOpacity>

        </View>
        </View>




  {/* <Text style={styles.errorText}>{error}</Text>*/}


          {!isPending &&
            <TouchableOpacity
              onPress={handleLogin}
            >


              <Btn textColor='white' bgColor={black} btnLabel="Login" />



            </TouchableOpacity>}

            <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ 
              
              fontFamily:'Light',
              color:'red',
             }}>You don't have an account ? </Text>
            <TouchableOpacity 
            onPress={() => navigation.navigate("Signup Stack")}
            >
            <Text style={{ 
              color: black, 
              fontFamily:'Medium' ,
              fontSize: 16 
            }}>Signup</Text>
            </TouchableOpacity>
          </View>


          {isPending &&


            <ActivityIndicator size="large" color="green" /> 
            }



         

        </View>


     

    </View>


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



</SafeAreaView>

 )}</>

  );
};
export default SigninScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontFamily:'Light',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily:'Light',
  },
});


