
import * as React from 'react';
import {useState, useEffect, useContext} from 'react';

import {createStackNavigator} from '@react-navigation/stack';


import {NavigationContainer} from '@react-navigation/native';


import WelcomeScreen from '../Screens/WelcomeScreen';
import HomeScreen from '../Screens/HomeScreen';
import AllArticles from '../Articles/AllArticles';
import ReadArticle from '../Articles/ReadArticle';

import ClickedExpertCategory from '../Experts/ClickedExpertCategory';
import ReadExpert from '../Experts/ReadExpert';
import AllCourses from '../Universities/AllCourses';
import AllProjects from '../Universities/AllProjects';
import ReadProject from '../Universities/ReadProject';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MyTab from '../Tab/MyTab';
import AllPeopleWorks from '../PeopleWorks/AllPeopleWorks';
import ReadWork from '../PeopleWorks/ReadWork';

import SigninScreen from '../AccountScreens/SigninScreen';
import SignupScreen from '../AccountScreens/SignupScreen';
import PreLoaderScreen from '../Screens/PreLoaderScreen';

import AddNewProject from '../Add/AddNewProject';
import AddNewArticle from '../Add/AddNewArticle';
import AddNewExpert from '../Add/AddNewExpert';
import AddNewWork from '../Add/AddNewWork';



const Stack = createStackNavigator();

function MyStack( {naigation}){

  // hii ni kwa ajili ya zile slide za mwanzo km mtu ameshaingia na akaziona
// basi akiingia kwa mara ya pili asizione tena
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
  
  useEffect(() => {
    async function check(){

     const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    console.log(appData);
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    }else {
      setIsAppFirstLaunched(false);
    }



    }
    check()
   
  }, []);

// mwisho hap wa hizo codes za slides za mwanzo

 


  return (

    isAppFirstLaunched != null &&(
  //kama unatumia drawer navigator na stack navigator haina haja ya kus
  //sorround hii stack.navigator na NavigationContainer ila km unatumia
  //stack navigation peke yake basi tumia NavigationContainer

 //<NavigationContainer>
    <Stack.Navigator
    //initialRouteName="Home Stack"
      screenOptions={{
      	headerShown:false,
        headerStyle:{
          backgroundColor:"green",
           //height:100,

        },
        headerTintColor:"white",
        headerTitleStyle: {
              fontWeight: 'bold',
            },
      }}
      >

{isAppFirstLaunched && (
       <Stack.Screen
      name="Welcome Stack"
      component={WelcomeScreen}
      options={{ tabBarVisible: false }}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />
      )}


<Stack.Screen
      name="PreLoader Stack"
      component={PreLoaderScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


 <Stack.Screen
      name="Signin Stack"
      component={SigninScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

       <Stack.Screen
      name="Signup Stack"
      component={SignupScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

       <Stack.Screen
      name="Home Stack"
      component={MyTab}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



          <Stack.Screen
      name="All Articles"
      component={AllArticles}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


          <Stack.Screen
      name="Read Article"
      component={ReadArticle}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


          <Stack.Screen
      name="Clicked Expert Category"
      component={ClickedExpertCategory}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


         <Stack.Screen
      name="Read Expert"
      component={ReadExpert}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />




     <Stack.Screen
      name="All Courses"
      component={AllCourses}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

       <Stack.Screen
      name="All Projects"
      component={AllProjects}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


        <Stack.Screen
      name="Read Project"
      component={ReadProject}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


        <Stack.Screen
      name="All People Works"
      component={AllPeopleWorks}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


        <Stack.Screen
      name="Read Work"
      component={ReadWork}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



        <Stack.Screen
      name="Add New Project"
      component={AddNewProject}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

       <Stack.Screen
      name="Add New Article"
      component={AddNewArticle}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


       <Stack.Screen
      name="Add New Expert"
      component={AddNewExpert}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


       <Stack.Screen
      name="Add New Work"
      component={AddNewWork}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


    
     
     


      </Stack.Navigator>
      //	</NavigationContainer>


      ) 
//bano la kufunga if is first launched


    );
  }
  export default MyStack;