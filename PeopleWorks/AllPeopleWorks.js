
import { StyleSheet,TextInput,Platform, ActivityIndicator,KeyboardAvoidingView, Text,Animated,ScrollView, View,Image, Button, FlatList,TouchableOpacity,Modal,TouchableWithoutFeedback, Keyboard  } from 'react-native';
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
import HobsPage from '../RenderedComponents/HobsPage';

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
import 'expo-dev-client';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-9624381293919157/5067534703';
const adUnitId2 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-9624381293919157~1439949764';

const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
  requestNonPersonalizedAdsOnly: true
});

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true
});



const AllPeopleWorks =({route ,navigation }) => {
   //Ads
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

  const { 
    CategoryName,
    id 
   } = route.params



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


//FOR SEARCHING
const [input, setInput] = useState('');
//console.log(input);
 const {width, height} = Dimensions.get('window');
 




 const [modalVisible, setModalVisible] = useState(false);

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
   const url = EndPoint + `/GetAllPeopleWorks/?id=${id}&page=${current_page}&page_size=2`
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
        style={[globalStyles.listContainerPeopleWork,{backgroundColor:theme.backgroundColor}]}
        from={{opacity: 0, translateY: 50}}
        animate={{opacity: 1, translateY: 0}}
        transition={{delay: 1000 + index * 200}}>


    


      
        <View style={globalStyles.imageContainerPeopleWork}>
        { item.WorkImage ? (
          <Image 
          // kama unatumia APIS
          source={{uri: EndPoint + '/' + item.WorkImage}}
          //source={item.CategoryImage} 
          style={globalStyles.imagePeopleWork} 
          />
          ):(
          <Image 
          source={require('../assets/500.png')}  
          style={globalStyles.imagePeopleWork} 
          />

          )}
        </View>

         <View style={globalStyles.TextContainerPeopleWork}>
        <Text style={[globalStyles.nameTextPeopleWork,{color:theme.color}]}>{item.Title}</Text>
      <Text style={globalStyles.priceTextPeopleWork}>Designed By: {item.CreatedBy}</Text>
         </View>
         <TouchableOpacity 
         
         // onPress={() => 
         //  navigation.navigate('Read Work', item)}

           onPress={async () => {
          if (rewardedInterstitialLoaded) {
            try {
              await rewardedInterstitial.show();
              navigation.navigate('Read Work', item);
            } catch (error) {
              console.log('Error showing ad', error);
              //Alert.alert('Error', 'Failed to show ad. Please try again.');
              navigation.navigate('Read Work', item);
            }
          } else {
            navigation.navigate('Read Work', item);
          }
        }}

         >

          <View style={globalStyles.buttonPeopleWork}>
            <Text style={globalStyles.buttonTextPeopleWork}>More</Text>
          </View>

        </TouchableOpacity>


      </MotiView>

     

          );








    // hili bano la chini ni la if ya juu kama mtu akitype   
}


 if(item.Title.toLowerCase().includes(input.toLowerCase()) || item.CreatedBy.toLowerCase().includes(input.toLowerCase())){




return (


     

      <MotiView
        style={[globalStyles.listContainerPeopleWork,{backgroundColor:theme.backgroundColor}]}
        from={{opacity: 0, translateY: 50}}
        animate={{opacity: 1, translateY: 0}}
        transition={{delay: 1000 + index * 200}}>


    


      
        <View style={globalStyles.imageContainerPeopleWork}>
        { item.WorkImage ? (
          <Image 
          // kama unatumia APIS
          source={{uri: EndPoint + '/' + item.WorkImage}}
          //source={item.CategoryImage} 
          style={globalStyles.imagePeopleWork} 
          />
          ):(
          <Image 
          source={require('../assets/500.png')}  
          style={globalStyles.imagePeopleWork} 
          />

          )}
        </View>

         <View style={globalStyles.TextContainerPeopleWork}>
        <Text style={[globalStyles.nameTextPeopleWork,{color:theme.color}]}>{item.Title}</Text>
      <Text style={globalStyles.priceTextPeopleWork}>Designed By: {item.CreatedBy}</Text>
         </View>
         <TouchableOpacity 
         
         // onPress={() => 
         //  navigation.navigate('Read Work', item)}

            onPress={async () => {
          if (rewardedInterstitialLoaded) {
            try {
              await rewardedInterstitial.show();
              navigation.navigate('Read Work', item);
            } catch (error) {
              console.log('Error showing ad', error);
              //Alert.alert('Error', 'Failed to show ad. Please try again.');
              navigation.navigate('Read Work', item);
            }
          } else {
            navigation.navigate('Read Work', item);
          }
        }}
        
         >

          <View style={globalStyles.buttonPeopleWork}>
            <Text style={globalStyles.buttonTextPeopleWork}>More</Text>
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


// { MWANZO WA container1}
 <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>



<MinorHeader title="Works"/>






{/*MWANZO WA VIEW YA SEARCH*/}

      <View 
      style={globalStyles.SearchContainer}
      >
        
        <View
          
            
       style={globalStyles.InputContainer}     
            

          >

          <TouchableOpacity>
          {/*<FontAwesome size={20} name="search" />*/}
          
          <TextInput
          style={globalStyles.TextInput}
          value={input} onChangeText ={(text) => setInput(text)}
            
            placeholder="Designer name / work name"
            placeholderTextColor="red"
          />
          </TouchableOpacity>
        </View>
       
      </View>



{/*MWISHO WA VIEW YA SEARCH*/}




 <TouchableOpacity>
<Text style={[globalStyles.Articlesheadertext,{color:theme.color}]}>{CategoryName}</Text>
</TouchableOpacity>





 {queryset && queryset.length > 0 ? (          
         <>
         




{setLoading===true?(<ActivityIndicator/>):(
      <>
      <FlatList
        data={queryset}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        //horizontal
        numColumns={1}
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
  <Text style={globalStyles.noitemText}>No any work uploaded!
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








{/*MODAL FOR MAKING ORDER*/}
    <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.KeyboardAvoidingViewModal}
    >
    <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1,marginTop:height/4, justifyContent: 'center', alignItems: 'center', }}>
          <View style={globalStyles.ModalView}>
            <Text style={globalStyles.ViewOrderModalTitle}>{CategoryName}</Text>

            <View style={globalStyles.form}>

 


                <View style={{ marginTop:10 }}>
                    <Text 
                    style={globalStyles.EnterQuntityText}
                    > By pressing Continue button, you can get more informations about this work and the designer.</Text>
                    < View style={globalStyles.inputPeopleWork2}>
   
                    </View>
                </View>


            </View>

          
            

            <View style={globalStyles.ButtonConatinerPeopleWork}>
             <TouchableOpacity style={globalStyles.ButtonClosePeopleWork}  onPress={() => setModalVisible(false)} >
                        <Text style={globalStyles.ConfirmCancelButtonText}>CLOSE</Text>
                    </TouchableOpacity>

                    
                    <TouchableOpacity 
                    style={globalStyles.ButtonAddPeopleWork}  
                     onPress={() => {
                setModalVisible(false);
                navigation.navigate('Read Work', item);
                
              }}
                     >
                        <Text style={globalStyles.ConfirmCancelButtonText}>CONTINUE</Text>
                    </TouchableOpacity>
            </View>
          </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </Modal>




    </View>
// MWISHO WA container1


):(

<LotterViewScreen />

)}

    </>


)}</>

  );
};






  
export default AllPeopleWorks;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'black',

    
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  universityheadertext:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold',
    color:'red',
    // marginBottom:20,
    marginTop:0,
  
  },
});