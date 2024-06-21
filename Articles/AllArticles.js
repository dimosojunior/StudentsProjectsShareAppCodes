
import {
  ActivityIndicator,
  FlatList,
  
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  Animated
} from 'react-native';
import {globalStyles} from '../Styles/GlobalStyles';
import { MaterialIcons } from '@expo/vector-icons';

import { Ionicons, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MinorHeader from '../Header/MinorHeader';
import{LinearGradient} from 'expo-linear-gradient';


// This import used to change color
import { EventRegister } from 'react-native-event-listeners';
import theme from '../theme/theme';
import themeContext from '../theme/themeContext';
import React, {useState, useEffect, useContext} from 'react';
import useFetch from '../useFetch';
import { EndPoint } from "../Constant/links";
import { AppColor } from "../Constant/colors";
import LotterViewScreen from '../Screens/LotterViewScreen';
import { useFonts } from 'expo-font'
import AwesomeAlert from 'react-native-awesome-alerts';

// kama unatumia APIS toa hiyo projects prop
import 'expo-dev-client';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';


// gesture-tap-button, page-next-outline, MaterialCommunityIcons
// preview, queue-play-next - MaterialIcons
const marginBottomItem = 10;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;

const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-9624381293919157/5067534703';
const adUnitId2 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-9624381293919157~1439949764';

const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
  requestNonPersonalizedAdsOnly: true
});

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true
});



const AllArticles =({route ,navigation }) => {

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



 const { 
    ArticlesName,
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

  // const navigation = useNavigation();
const goBackPage = () =>{
    navigation.goBack();

  }
 
 const {width, height} = Dimensions.get('window');
 

//FOR SEARCHING
const [input, setInput] = useState('');
//console.log(input);



const htmlContent2 = '<p style=\"text-align:center\"><span style=\"color:#e74c3c\"><strong>SMART INVIGILATION SYSTEM</strong></span></p>\r\n\r\n<p>Examination cheating activities like face movement, head movements,'

const renderersProps ={
  img:{
    enableExperimentalPercentWidth:true
  }
}

 // const [isLoading, setIsloading] = useState(false);
  const Yscroll = React.useRef(new Animated.Value(0)).current;




 //FOR ARTICLES APIS
// const { universities:AiArticles, isPending, error } = useFetch('https://dimosojunior.pythonanywhere.com/apis/AIArticles');






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
   const url = EndPoint + `/GetAllArticlesCategory/?id=${id}&page=${current_page}&page_size=2`
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






  const renderUser = ({ item, index }) => {

    // mwanzo kwa ajili ya search
    if (input === ""){



    const scale = Yscroll.interpolate({
      inputRange: [
        -1, 0,
        sizeOfItem * index,
        sizeOfItem * (index + 2)
      ],
      outputRange: [1, 1, 1, 0]
    })




// mwanzo kwa ajili ya search




    return (
      
      <Animated.View style={
        [globalStyles.item,
        {
          transform: [{ scale }]
        },
        ,{backgroundColor:theme.backgroundColor}
        ]
      }>

   <View style={[globalStyles.wrapImageContainer,{backgroundColor:theme.backgroundColor}]}>

      { item.ArticleImage ? (
        <Image
          style={globalStyles.Expertimage}
          source={{uri: EndPoint + '/' + item.ArticleImage}}
          //source={item.ArticleImage} 
          //resizeMode='contain'
          // contentContainerStyle={{ padding: 20 }}
        />
        ):(

          <Image 
          source={require('../assets/500.png')}  
           style={globalStyles.Expertimage}
          
          //source={item.ArticleImage} 
          //resizeMode='contain'
          // contentContainerStyle={{ padding: 20 }}
          
          />
          )}

        </View>

        
        <View style={[globalStyles.wrapText,{backgroundColor:theme.backgroundColor}]}>
          <Text style={[globalStyles.fontSize,{color:theme.color}]}>
        {item.Title}  
          </Text>
          {/*<Text style={globalStyles.place}>
          {item.StudentPlace}  
          `</Text>*/}

           


          
      <TouchableOpacity 
      // onPress={() => 
      //   navigation.navigate('Read Article', item)
      // }

       onPress={async () => {
          if (rewardedInterstitialLoaded) {
            try {
              await rewardedInterstitial.show();
              navigation.navigate('Read Article', item);
            } catch (error) {
              console.log('Error showing ad', error);
              //Alert.alert('Error', 'Failed to show ad. Please try again.');
              navigation.navigate('Read Article', item);
            }
          } else {
            navigation.navigate('Read Article', item);
          }
        }}

      >
     <View style={{
      justifyContent:'center',
      alignItems:'center',
      //backgroundColor:'red',
      marginTop:1,
      padding:1,
     }}>
    <MaterialCommunityIcons 
    name="gesture-tap-button" size={30} color={AppColor}
    style={{
      marginTop:10,

    }} />
    

      </View>  
      </TouchableOpacity>   


        </View>


      </Animated.View>

      
    )





// hili bano la chini ni la if ya juu kama mtu akitype   
}


 if(item.Title.toLowerCase().includes(input.toLowerCase())){





const scale = Yscroll.interpolate({
      inputRange: [
        -1, 0,
        sizeOfItem * index,
        sizeOfItem * (index + 2)
      ],
      outputRange: [1, 1, 1, 0]
    })



    return (
      
      <Animated.View style={
        [globalStyles.item,
        {
          transform: [{ scale }]
        },
        ,{backgroundColor:theme.backgroundColor}
        ]
      }>

   <View style={[globalStyles.wrapImageContainer,{backgroundColor:theme.backgroundColor}]}>

      { item.ArticleImage ? (
        <Image
          style={globalStyles.Expertimage}
          source={{uri: EndPoint + '/' + item.ArticleImage}}
          //source={item.ArticleImage} 
          //resizeMode='contain'
          // contentContainerStyle={{ padding: 20 }}
        />
        ):(

          <Image 
          source={require('../assets/500.png')}  
           style={globalStyles.Expertimage}
          
          //source={item.ArticleImage} 
          //resizeMode='contain'
          // contentContainerStyle={{ padding: 20 }}
          
          />
          )}

        </View>

        
        <View style={[globalStyles.wrapText,{backgroundColor:theme.backgroundColor}]}>
          <Text style={[globalStyles.fontSize,{color:theme.color}]}>
        {item.Title}  
          </Text>
          {/*<Text style={globalStyles.place}>
          {item.StudentPlace}  
          `</Text>*/}

           


          
      <TouchableOpacity 
      // onPress={() => 
      //   navigation.navigate('Read Article', item)
      // }

       onPress={async () => {
          if (rewardedInterstitialLoaded) {
            try {
              await rewardedInterstitial.show();
              navigation.navigate('Read Article', item);
            } catch (error) {
              console.log('Error showing ad', error);
              //Alert.alert('Error', 'Failed to show ad. Please try again.');
              navigation.navigate('Read Article', item);
            }
          } else {
            navigation.navigate('Read Article', item);
          }
        }}

      >
     <View style={{
      justifyContent:'center',
      alignItems:'center',
      //backgroundColor:'red',
      marginTop:1,
      padding:1,
     }}>
    <MaterialCommunityIcons 
    name="gesture-tap-button" size={30} color={AppColor}
    style={{
      marginTop:10,

    }} />
    

      </View>  
      </TouchableOpacity>   


        </View>


      </Animated.View>

      
    )




// hili bano la chini ni la if ya pili mwisho
  }


}
// hili bano la chini ni la renderItem mwisho












    
      
 return (

  <>{!fontsLoaded ? (<View/>):(

   
<>
 {!isPending ? (
   

    <View style={[globalStyles.container,{backgroundColor:theme.backgroundColor}]}>
    







<MinorHeader title="Articles" />










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
            
            placeholder="Enter Article Category"
            placeholderTextColor="red"
          />
          </TouchableOpacity>
        </View>
       
      </View>



{/*MWISHO WA VIEW YA SEARCH*/}







<TouchableOpacity>
<Text style={[globalStyles.universityheadertext,{color:theme.color}]}>{ArticlesName}</Text>
</TouchableOpacity>






     {queryset && queryset.length > 0 ? (          
         <>
         
         
        {setLoading===true?(<ActivityIndicator/>):(
      <>
      
          <Animated.FlatList
            data={queryset}
            keyExtractor={item => `key-${item.id}`}
            renderItem={renderUser}
            ListFooterComponent={renderLoader}
            onEndReached={getItems}
            onEndReachedThreshold={0.5}

            contentContainerStyle={{
              padding: 20
            }}
            onScroll={
              Animated.event(
                [{ nativeEvent: { contentOffset: { y: Yscroll } } }],
                { useNativeDriver: true }
              )}
            
              />


              </>
      )}
        

  </>         
  ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:theme.backgroundColor}]}>
  <Text style={globalStyles.noitemText}>No any {ArticlesName} uploaded!
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






  
export default AllArticles;



const styles = StyleSheet.create({
 

});