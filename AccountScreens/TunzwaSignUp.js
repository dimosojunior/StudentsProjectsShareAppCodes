import React, { useState, useEffect } from 'react';

import {View,Alert,StyleSheet,ActivityIndicator,Image, Text,Dimensions,ScrollView, Touchable, TouchableOpacity} from 'react-native';

import Background from './PageStyling/Background';
import Btn from './PageStyling/Btn';
import {black} from './PageStyling/Constants';
import Field from './PageStyling/Field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { EndPoint } from '../Constant/links';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useFonts} from 'expo-font';
import RegistrationLotterViewScreen from '../Screens/RegistrationLotterViewScreen';

const SignupScreen = ({navigation}) => {

  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

   const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };



  const {width,height} = Dimensions.get('window');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [password2, setPassword2] = useState('');

  const [phone, setPhone] = useState('');
  //const [profile_image, setProfile_image] = useState('');
  

  const [error, setError] = useState(null); // State to hold the error message
const [isPending, setPending] =useState(false);
const emailRegex = /\S+@\S+\.\S+/;

const [errorMessage, setErrorMessage] = useState('');

const handleErrorMessage = (error) => {
    if (error.response) {
      // The request was made and the server responded with an error status code
      // if (error.response.status === 401) {
      //   showAlertFunction('Registration error. Please try again later.');
      // } else if (error.response.status === 404) {
      //   showAlertFunction('Not Found: The requested resource was not found.');

      // } 
      // else {
      //   showAlertFunction('An error occurred while processing your request.');
      // }
    }  if (error.message === 'Network Error') {
      showAlertFunction('Network Error: Please check your internet connection.');
    } else {
      showAlertFunction('Registration error. Please try again later.');
    }
  };

  const handleRegistration = async () => {
    // Reset the error message
    setError(null);

    // Validation checks
    if (!email && !password && !username && !phone) {
      //setError('All fields are required');
      showAlertFunction("Please fill in all fields correctly");
      return;
    }

    if (!email) {
      //setError('please enter your valid email');
       showAlertFunction("Please enter your valid email correctly");
      return;
    }

    if (!password) {
      //setError('please enter your password');
       showAlertFunction("Please enter your password");
      return;
    }


     if (password !== password2) {
      showAlertFunction("Passwords do not match");
      return;
    }

    // Validate email format
  
  if (!emailRegex.test(email)) {
    showAlertFunction("Please enter a valid email address");
    return;
  }

  // Validate password length
  if (password.length < 4) {
    showAlertFunction("Password must be at least 4 characters long");
    return;
  }

    if (!username) {
     // setError('please enter your username');
      showAlertFunction("please enter your username");
      return;
    }

    if (!phone) {
      //setError('please enter your phone number');
       showAlertFunction("please enter your phone number");
      return;
    }

    setPending(true);

    try {
      const response = await axios.post(
        EndPoint + '/account/register_user/', {
        email: email,
        password: password,
        username: username,
        phone: phone,
      });
      //Alert.alert("You have registered Successfully");
       showAlertFunction("You have registered Successfully, you can login now");
      navigation.replace('Signin Stack');

      const token = response.data.token; // Extract the token from the response
      // You can now save the token to your app's state, AsyncStorage, or Redux store
    } catch (error) {
      if (error.response) {
        if (error.response.data.email) {
         // setError('Email already exists');
          showAlertFunction("Email already exists");
          setPending(false);
        } else if (error.response.data.username) {
          //setError('Username already exists');
          showAlertFunction("Username already exists");
          setPending(false);
        }else if (error.response.data.phone) {
          //setError('Phone number already exists');
          showAlertFunction("Phone number already exists");
          setPending(false);
        }


      } else {
        //setError('Registration error. Please try again later.');
        //showAlertFunction("Registration error. Please try again later.");
        handleErrorMessage(error);
        setPending(false);
      }
    }
  };

  return (
   
   <>{!fontsLoaded ? (<View/>):(
      
<ScrollView keyboardShouldPersistTaps="handled">

     <View style={{
        alignItems: 'center',
         width: width,
         justifyContent:'center',
         flex:1,
         backgroundColor:'black',

       }}>


        <Image
            source={require('../assets/icon2.png')}
            style={{
              width: '40%',
              height: 100,
              marginBottom: 20,
              borderRadius: 100,
              marginTop: 80,
            }}
          />

       <Text style={{
            fontSize: 22, 
            color: 'green', 
            fontFamily:'Light',
            marginBottom:10,
            marginTop:0,
          }}>
            Signup
          </Text>

         {/* {error && <Text style={{ color: 'red' }}>{error}</Text>}
       */}


  
        <View
          style={{
            // backgroundColor: 'rgb(5,5,49)',
            
            // justifyContent:'center',
            height: height,
            width: width,
            borderTopLeftRadius: 0,
            paddingTop: 10,
            alignItems: 'center',
            marginTop:10,
          }}>
          
       
          <Field
            placeholder="email"
            keyboardType={'email-address'}
            value={email}
        onChangeText={setEmail}

          />

      
           <Field
            placeholder="Username"
            value={username}
        onChangeText={setUsername}

          />

           <Field
            placeholder="Phone number"
            value={phone}
        onChangeText={setPhone}
        keyboardType="numeric"

          />
        

  
          <Field placeholder="Password" 
          secureTextEntry={true} 
          value={password}
        onChangeText={setPassword}
          />


          <Field placeholder="Confirm Password" secureTextEntry={true} 
          value={password2}
        onChangeText={setPassword2}
          />

   
       { !isPending && 
          <TouchableOpacity
          onPress={handleRegistration}
          >
          
          
          <Btn textColor='white' bgColor={black} btnLabel="Signup" />
          

          
         </TouchableOpacity>}

      { isPending && 
         
          <ActivityIndicator size="large" color="green" /> 

       }

          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ 
              fontSize: 16, 
              fontFamily:'Light',
              color:'red',
             }}>Already have an account ? </Text>
            <TouchableOpacity 
            onPress={() => navigation.navigate("Signin Stack")}
            >
            <Text style={{ 
              color: black, 
              fontFamily:'Medium', 
              fontSize: 16 }}>Signin</Text>
            </TouchableOpacity>
          </View>
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





      </ScrollView>

)}</>
  );
};

export default SignupScreen;
