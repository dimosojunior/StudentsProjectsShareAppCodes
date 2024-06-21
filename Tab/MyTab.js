
import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from '../Header/header';

import {NavigationContainer} from '@react-navigation/native';
// import MyStack from '../Stack/MyStack';
import AllExperts from '../Experts/AllExperts';
import { StyleSheet, Text,Dimensions, View, Button,Platform } from 'react-native';


import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons, FontAwesome, FontAwesome5} from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
const Tab = createBottomTabNavigator();

function MyTab( {naigation}){

//   const getTabBarVisibility = route => {
//   console.log("ROUTE NAME");
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
//   console.log(routeName);

//   if (routeName === 'Welcome Stack') {
//     return 'none';
//   }
//   return 'flex';

// };

  return (
  //kama unatumia drawer navigator na stack navigator haina haja ya kus
  //sorround hii stack.navigator na NavigationContainer ila km unatumia
  //stack navigation peke yake basi tumia NavigationContainer

// <NavigationContainer>
    <Tab.Navigator
          screenOptions={({route}) =>({
      	headerShown:false,
        tabBarShowLabel:false,
        tabBarStyle:{
          backgroundColor:"black",
          padding:10,
          //borderTopColor:'red',
          // borderWidth:2,
          elevation: 3,

          shadowOffset: { width: 1, height: 1 },
          shadowColor: Platform.OS === "android" ? 'green' : "green",
          shadowOpacity: 1,
          shadowRadius: 2,
           //height:200,


        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'red',
        // tabBarIcon:({focused, color, size}) =>{
        //   let iconName;
        //   if (route.name === 'HomeTab'){
        //     iconName = focused ? 'home' : 'home-outline'
        //   }
        //   else if (route.name === 'Qrcode') {
        //     iconName = focused ? 'qr-code' : 'qr-code-outline'

        //   }
        //   return <MaterialIcons name={iconName} size={focused? 35: size} color="white" />

        // }
        

      })}
      >
      
      <Tab.Screen
      name="Home Tab"
      component={HomeScreen}
      options={ ({route}) => ({
        

      // tabBarStyle:  {
      // display:getTabBarVisibility(route),
      // //backgroundColor:'yellow'
      //    },

        title:"Home Tab",
        tabBarIcon: ({focused}) => (
            <MaterialIcons  
            name="home"
            size={focused ? 35 :35}
            color={focused ? 'red' : 'white'}

            />

            ),
      })}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='Smart Invigilation App' />,
      //     })}
      />


   



          <Tab.Screen
      name="Experts"
      component={AllExperts}
      options={{
        title:"All Experts",
        tabBarIcon: ({focused}) => (
            <FontAwesome5  
            name="user-graduate"
            size={focused ? 35 :35}
            color={focused ? 'red' : 'white'}

            />

            ),
      }}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='Smart Invigilation App' />,
      //     })}
      />


     



      </Tab.Navigator>
      	// </NavigationContainer>

    );
  }



  //Hii Function inatumika kutoa tab bar style in signin stack


  export default MyTab;