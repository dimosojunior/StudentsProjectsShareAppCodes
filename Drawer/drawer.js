
import {DrawerItemList,createDrawerNavigator} from '@react-navigation/drawer';

import {NavigationContainer, DarkTheme,DefaultTheme} from '@react-navigation/native';


import MyStack from '../Stack/MyStack';

import { StyleSheet,ScrollView,TouchableOpacity,Modal, Dimensions,Image,Switch, Text, View, Button } from 'react-native';

import {MaterialIcons, Ionicons, FontAwesome} from '@expo/vector-icons';


import { EventRegister } from 'react-native-event-listeners';
import theme from '../theme/theme';
import themeContext from '../theme/themeContext';
import React, {useState, useEffect, useContext} from 'react';
import {useFonts} from 'expo-font';
import Header from '../Header/header';
import MyTab from '../Tab/MyTab';
// import Test from '../Screens/Test';
// import Test2 from '../Screens/Test2';
import WelcomeScreen from '../Screens/WelcomeScreen';
import {globalStyles} from '../Styles/GlobalStyles';
import AboutUsScreen from '../Screens/AboutUsScreen';
import PeopleWorksCategory from '../PeopleWorks/PeopleWorksCategory';
import Privacy from '../Screens/Privacy';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from "../Constant/links";
import AddScreen from '../Screens/AddScreen';

const Drawer = createDrawerNavigator();
function MyDrawer(){


     let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});

const [modalVisible, setModalVisible] = useState(false);

  const {width,height} = Dimensions.get('window');

  const [darkMode, setdarkMode] = useState(false)
  //const theme = useContext(themeContext)
const navigation = useNavigation();
const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');




  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
    fetchUserData();
  }, [userData]);

  const fetchUserData = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const parsedUserData = JSON.parse(userDataJSON);
        setUserData(parsedUserData);

        //console.log(parsedUserData);
        //console.log(userDataJSON);
      }
    } catch (error) {
      // console.log(error);
    }
  };


 useEffect(() => {
    checkLoggedIn();


  }, [userToken]);

  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
  };





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














 const handleLogout = async () => {
    try {
      if (!userToken) {
        
        return;
      }

      // Make a POST request to your Django logout API
      const response = await axios.post(
        EndPoint + `/account/logout_user/`,
        null,
        {
          headers: {
            Authorization: `Token ${userToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // If the logout was successful, remove the user token from AsyncStorage
      if (response.status === 200) {
        await AsyncStorage.removeItem('userToken', () => {
          setModalVisible(false);
          // Callback function to navigate to the Signin screen after token removal
          navigation.navigate('Signin Stack');
      //     navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Signin Stack' }],
      // });

        });
        
      } else {
        console.log('Failed to logout');
      }
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };


	return(

<>{!fontsLoaded ? (<View/>):(

   <Drawer.Navigator
       //initialRouteName="MyStack"
       // drawerPosition = "left"
       // drawerType="front"
       // edgeWidth={100}
       hideStatusBar={true}
       overlayColor="black"
        drawerContent={
          (props) => {

             return (
            <>
              <View style={{
                // backgroundColor: 'rgb(5,5,49)',
              }}>
                <ScrollView>

                  <View
                    style={{
                      // height: height,
                      width: '100%',
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottomColor: "#f4f4f4",
                      borderBottomWidth: 1,
                      marginBottom: 12,

                    }}
                  >
                    {userData && userData.profile_image ?
                       <Image
                      //source={require('../assets/me.jpg')}
                      source={{ uri: EndPoint + '/' + userData.profile_image }}
                       
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 60,
                          marginBottom: 10,
                          marginTop: 30,
                        }}
                      />

                      :
                      <Image
                      source={require('../assets/splashe.png')}
                       
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 60,
                          marginBottom: 10,
                          marginTop: 30,
                        }}
                      />
                    }


                    <Text style={{
                      // fontSize: 18,
                      // fontWeight: 'bold',
                      fontFamily:'Medium',
                      color: 'white'
                    }}>Welcome {userData ? userData.username : ''}</Text>
                  </View>

                  <DrawerItemList {...props} />









            
              



                </ScrollView>
              </View>







  <View style={{
                    
                    position: "absolute",
                    bottom: 10,
                    right:10,
                    // right: width/2 - 70,
                    // backgroundColor: 'green',
                    padding: 10,
                    borderRadius: 6,

                  }}>
                  
                 <Switch 
          //style={{transform: [{scaleX: 1.5 }, {scaleY: 1.5 }]}}
          value={darkMode}
          color='red'
          size={50}
          
          

          onValueChange={(value) => {setdarkMode(value);
            EventRegister.emit('ChangeTheme', value)
          }}
          // style={{
          //   width:200
          // }}
          />
                </View>


                    
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left:10,
                    // right: width/2 - 70,
                    backgroundColor: 'green',
                    padding: 10,
                    borderRadius: 6,
                    


                  }}
                  // onPress={handleLogout}
                  onPress={() => {

                    setModalVisible(true);
                  }}
                >
                  <Text style={{
                   color: '#fff',
                    fontFamily:'Light',

                  }}>Logout</Text>
                </TouchableOpacity>



              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                  <View style={globalStyles.ModalView}>
                    <Text style={{ marginLeft: 90, fontFamily:'Light', }}>Hello {userData ? userData.username : ''}</Text>

                    <ScrollView keyboardShouldPersistTaps="handled">

                      <View style={globalStyles.form}>

                        <Text style={{ fontFamily:'Light', marginLeft: 3 }}>Are you sure you want to logout ?</Text>


                        <View style={{ marginTop: 20 }}>


                        </View>
                      </View>

                      <View style={globalStyles.ButtonConatiner}>
                        <TouchableOpacity style={globalStyles.ButtonClose} onPress={() => setModalVisible(false)} >
                          <Text style={{
                            color: 'white',
                             fontFamily:'Light',
                          }}>NO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={globalStyles.ButtonAdd}
                          onPress={handleLogout} 
                          >
                          <Text style={{
                            color: 'white',
                             fontFamily:'Light',
                          }}>YES</Text>
                        </TouchableOpacity>
                      </View>

                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </>

          )
        }
      }
          
       screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        // header: () => (
        //   <Header />
        // ),
        drawerStyle: {
          // backgroundColor: 'rgb(5,5,49)',
          //backgroundColor: '#F0F0F0',
          backgroundColor:'#233329',
          width: width /2 + 40 //260
        },
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          //fontWeight: "bold"
           fontFamily:'Light',
        },
        drawerLabelStyle: {
          color: "white",
          //fontSize: 16,
           fontFamily:'Light',

        },
        // drawerIconStyle: {
        //   color: "white",
        //   fontSize:16,
        //   border:4,
        //   borderColor:'red',

        // }
      }}
    >



   {/*  <Drawer.Screen
          name="Welcome"
          options={{
            drawerLabel: "Welcome",
            title: "Welcome",
            
            drawerIcon: () => (
              <MaterialIcons name="home" size={40} color="green" />
            )
          }}
          component={WelcomeScreen}
        />

*/}



        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: "Home",
            title: "Home",
            
            drawerIcon: () => (
              <MaterialIcons name="home" size={30} color="white" />
            )
          }}
          component={MyStack}
        />





  <Drawer.Screen
          name="Works"
          options={{
            drawerLabel: "Works",
            title: "Works",
            
            drawerIcon: () => (
              <FontAwesome name="product-hunt" size={30} color="white" />
            )
          }}
          component={PeopleWorksCategory}
        />






            <Drawer.Screen
          name="Upload"
          options={{
            drawerLabel: "Upload",
            title: "Upload",
            
            drawerIcon: () => (
              <FontAwesome name="file" size={30} color="white" />
            )
          }}
          component={AddScreen}
        />




          <Drawer.Screen
          name="About App"
          options={{
            drawerLabel: "About App",
            title: "About App",
            
            drawerIcon: () => (
              <FontAwesome name="user-circle" size={30} color="white" />
            )
          }}
          component={AboutUsScreen}
        />





            <Drawer.Screen
          name="Privacy"
          options={{
            drawerLabel: "Privacy",
            title: "Privacy",
            
            drawerIcon: () => (
              <FontAwesome name="folder-open" size={30} color="white" />
            )
          }}
          component={Privacy}
        />






     

       







           


  




{/*<Switch 

value={darkMode}
onValueChange={(value) => {setdarkMode(value);
  EventRegister.emit('ChangeTheme', value)
}}
/>*/}









      
      </Drawer.Navigator>
    
		
)}</>


		);
}
export default MyDrawer;




const styles = StyleSheet.create({
    menuicon: { 

       // color:'black', 
        


    },

     });